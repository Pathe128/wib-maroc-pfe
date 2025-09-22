import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';
import { supabase } from '../lib/supabase';

// 1. UPLOAD DE FICHIER VERS LE BUCKET MEDIA
const getContentType = (uri: string) => {
  const extension = uri.split('.').pop()?.toLowerCase();
  if (extension === 'jpg' || extension === 'jpeg') return 'image/jpeg';
  if (extension === 'png') return 'image/png';
  if (extension === 'mp4' || extension === 'mov') return 'video/mp4';
  if (extension === 'gif') return 'image/gif';
  return 'application/octet-stream';
};

export const uploadMedia = async (fileUri: string): Promise<string> => {
  try {
    console.log('Début upload média:', fileUri);
    
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (!fileInfo.exists) {
      throw new Error('Le fichier n\'existe pas');
    }

    const base64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileUri.split('.').pop()}`;
    const contentType = getContentType(fileUri);
    const arrayBuffer = decode(base64);

    console.log('Upload vers Supabase Storage...');
    const { data, error: uploadError } = await supabase.storage
      .from('media')
      .upload(fileName, arrayBuffer, {
        contentType,
        upsert: false,
      });

    if (uploadError) {
      console.error('Erreur upload Supabase:', uploadError);
      throw new Error(`Erreur d'upload: ${uploadError.message}`);
    }

    const { data: publicUrlData } = supabase.storage
      .from('media')
      .getPublicUrl(data.path);

    console.log('Upload réussi, URL:', publicUrlData.publicUrl);
    return publicUrlData.publicUrl;
  } catch (err: any) {
    console.error("Erreur détaillée lors de l'upload:", err);
    throw new Error(err.message || 'Erreur lors de l\'upload');
  }
};

// 2. CRÉATION DE POST
interface CreatePostPayload {
  title: string;
  description?: string;
  mediaUrl?: string;
  userId: string; // ID Clerk (ex: "user_xxx")
  mediaType?: 'image' | 'video';
}

export const createPost = async (payload: CreatePostPayload) => {
  try {
    console.log('Création du post avec payload:', payload);
    
    // 1. Récupérer ou créer l'utilisateur
    let userId = await getOrCreateUser(payload.userId);
    
    // 2. Créer ou récupérer un groupe par défaut
    const defaultGroupId = await getOrCreateDefaultGroup(userId);

    // 3. Créer le post
    const postData: any = {
      title: payload.title,
      description: payload.description,
      user_id: userId,
      group_id: defaultGroupId,
      status: 'published'
    };

    // Séparer image et video selon le type
    if (payload.mediaUrl) {
      if (payload.mediaType === 'image') {
        postData.image = payload.mediaUrl;
      } else if (payload.mediaType === 'video') {
        postData.video = payload.mediaUrl;
      }
    }

    console.log('Données du post à créer:', postData);

    const { data, error } = await supabase
      .from('posts')
      .insert([postData])
      .select(`
        *,
        users (*)
      `);

    if (error) {
      console.error('Erreur Supabase détaillée:', error);
      throw new Error(`Erreur création post: ${error.message}`);
    }

    console.log('Post créé avec succès:', data);
    return data;
  } catch (error) {
    console.error('Erreur dans createPost:', error);
    throw error;
  }
};

// Fonction pour récupérer ou créer un utilisateur
const getOrCreateUser = async (clerkId: string): Promise<string> => {
  try {
    console.log('Recherche utilisateur avec clerk_id:', clerkId);
    
    // 1. Essayer de récupérer l'utilisateur existant
    const { data: existingUser, error: userError } = await supabase
      .from('users')
      .select('id, name, email')
      .eq('clerk_id', clerkId) // CORRECTION ICI : utiliser clerk_id directement
      .single();

    if (userError && userError.code === 'PGRST116') {
      // 2. Si l'utilisateur n'existe pas, le créer
      console.log('Utilisateur non trouvé, création...');
      return await createUser(clerkId);
    } else if (userError) {
      console.error('Erreur recherche utilisateur:', userError);
      throw new Error(`Erreur utilisateur: ${userError.message}`);
    }

    console.log('Utilisateur trouvé:', existingUser.id);
    return existingUser.id;
  } catch (error) {
    console.error('Erreur getOrCreateUser:', error);
    throw error;
  }
};

// Fonction pour créer un nouvel utilisateur
const createUser = async (clerkId: string): Promise<string> => {
  try {
    const userData = {
      clerk_id: clerkId,
      name: 'Utilisateur', // Vous pouvez récupérer le nom depuis Clerk si disponible
      email: `${clerkId}@wibmaroc.com`, // Email unique basé sur clerkId
      role: 'user'
    };

    console.log('Création utilisateur avec données:', userData);

    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert([userData])
      .select('id')
      .single();

    if (createError) {
      console.error('Erreur création utilisateur:', createError);
      
      // Si l'erreur est due à une violation d'email unique, essayer avec un email différent
      if (createError.code === '23505' && createError.details?.includes('email')) {
        console.log('Email déjà utilisé, tentative avec email alternatif...');
        return await createUserWithAlternateEmail(clerkId);
      }
      
      throw new Error(`Erreur création utilisateur: ${createError.message}`);
    }

    console.log('Utilisateur créé avec succès:', newUser.id);
    return newUser.id;
  } catch (error) {
    console.error('Erreur createUser:', error);
    throw error;
  }
};

// Fonction alternative pour créer un utilisateur avec email alternatif
const createUserWithAlternateEmail = async (clerkId: string): Promise<string> => {
  const userData = {
    clerk_id: clerkId,
    name: 'Utilisateur',
    email: `${clerkId}_${Date.now()}@wibmaroc.com`, // Email unique avec timestamp
    role: 'user'
  };

  const { data: newUser, error: createError } = await supabase
    .from('users')
    .insert([userData])
    .select('id')
    .single();

  if (createError) {
    throw new Error(`Erreur création utilisateur (email alternatif): ${createError.message}`);
  }

  return newUser.id;
};

// Fonction pour obtenir ou créer un groupe par défaut
const getOrCreateDefaultGroup = async (userId: string): Promise<string> => {
  try {
    // Chercher un groupe général existant
    const { data: existingGroup, error: groupError } = await supabase
      .from('groups')
      .select('id')
      .eq('name', 'Général')
      .single();

    if (!existingGroup) {
      console.log('Création groupe Général...');
      // Créer un groupe général
      const { data: newGroup, error: createError } = await supabase
        .from('groups')
        .insert([{
          name: 'Général',
          description: 'Groupe par défaut pour tous les posts',
          created_by: userId
        }])
        .select('id')
        .single();

      if (createError) {
        console.error('Erreur création groupe:', createError);
        throw createError;
      }
      
      // Ajouter l'utilisateur comme admin du groupe
      await supabase
        .from('group_members')
        .insert([{
          user_id: userId,
          group_id: newGroup.id,
          role: 'admin'
        }]);

      console.log('Groupe créé avec succès:', newGroup.id);
      return newGroup.id;
    }

    console.log('Groupe existant trouvé:', existingGroup.id);
    return existingGroup.id;
  } catch (error) {
    console.error('Erreur gestion groupe:', error);
    
    // En cas d'erreur, essayer de récupérer n'importe quel groupe existant
    const { data: anyGroup, error: anyGroupError } = await supabase
      .from('groups')
      .select('id')
      .limit(1)
      .single();

    if (!anyGroupError && anyGroup) {
      console.log('Utilisation groupe existant:', anyGroup.id);
      return anyGroup.id;
    }

    // Dernier recours : créer un groupe temporaire
    console.log('Création groupe temporaire...');
    const { data: tempGroup, error: tempError } = await supabase
      .from('groups')
      .insert([{
        name: 'Temporaire',
        description: 'Groupe temporaire',
        created_by: userId
      }])
      .select('id')
      .single();

    if (tempError) {
      console.error('Erreur création groupe temporaire:', tempError);
      // Si tout échoue, utiliser un UUID par défaut (solution temporaire)
      return '550e8400-e29b-41d4-a716-446655440000';
    }

    return tempGroup.id;
  }
};

// 3. RÉCUPÉRATION DES POSTS
export const getPosts = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      users (*),
      groups (*),
      likes (user_id),
      comments (id, user_id, comment, created_at)
    `)
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erreur récupération posts:', error);
    throw new Error(error.message);
  }
  return data;
};