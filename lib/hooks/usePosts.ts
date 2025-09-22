import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { createPost, getPostById, getPosts } from '../../services/api'; // Ajoutez getPostById

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// ✅ AJOUTEZ CE HOOK MANQUANT
export const usePost = (id: string) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => getPostById(id),
    enabled: !!id, // Ne s'exécute que si l'ID existe
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      console.log('✅ Post créé avec succès:', data);
      
      queryClient.setQueryData(['posts'], (oldData: any) => {
        if (!oldData) return [data];
        return [data[0], ...oldData];
      });
      
      setTimeout(() => {
        router.back();
      }, 1000);
    },
    onError: (error: any) => {
      console.error("❌ Erreur création post:", error);
      Alert.alert(
        'Erreur',
        error.message || 'Une erreur est survenue lors de la création du post.'
      );
    }
  });
};