import { supabase } from '../lib/supabase';

/**
 * Récupère tous les posts avec les informations de l'auteur.
 */
export const getPosts = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      users (*),
      likes (user_id)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

/**
 * Récupère un post spécifique par son ID, avec les informations de l'auteur.
 */
export const getPostById = async (id: string) => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      users (*),
      likes (user_id)
    `)
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

