import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';
import { supabase } from '../lib/supabase';

// Fonction pour déterminer le type de contenu à partir de l'URI du fichier
const getContentType = (uri: string): string => {
  const extension = uri.split('.').pop()?.toLowerCase();
  if (extension === 'jpg' || extension === 'jpeg') return 'image/jpeg';
  if (extension === 'png') return 'image/png';
  if (extension === 'mp4') return 'video/mp4';
  // Type par défaut si l'extension n'est pas reconnue
  return 'application/octet-stream';
};

/**
 * Uploade un fichier sur Supabase Storage.
 * @param fileUri - L'URI local du fichier à uploader.
 * @param bucket - Le nom du bucket de destination sur Supabase.
 * @returns L'URL publique du fichier uploadé.
 */
export const uploadFile = async (fileUri: string, bucket: string): Promise<string> => {
  try {
    const base64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const fileName = `${Date.now()}_${fileUri.split('/').pop()}`;
    const arrayBuffer = decode(base64);
    const contentType = getContentType(fileUri);

    const { data, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, arrayBuffer, {
        contentType,
        upsert: false,
      });

    if (uploadError) {
      console.error('Erreur d_upload Supabase:', uploadError);
      throw new Error(`Erreur d'upload: ${uploadError.message}`);
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    if (!publicUrlData || !publicUrlData.publicUrl) {
      throw new Error("Impossible d'obtenir l'URL publique du fichier.");
    }

    return publicUrlData.publicUrl;

  } catch (err: any) {
    const errorMessage = err instanceof Error ? err.message : 'Une erreur inconnue est survenue lors de l_upload.';
    console.error("Erreur lors de l'upload du fichier:", errorMessage);
    throw new Error(errorMessage);
  }
};
