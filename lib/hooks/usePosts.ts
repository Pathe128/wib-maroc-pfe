import { useQuery } from '@tanstack/react-query';
import { getPosts, getPostById } from '../../services/postService';

/**
 * Hook pour récupérer la liste de tous les posts.
 */
export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });
};

/**
 * Hook pour récupérer les détails d'un post spécifique.
 * @param id - L'ID du post à récupérer.
 */
export const usePost = (id: string) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => getPostById(id),
    enabled: !!id, // La requête ne s'exécutera que si l'ID est fourni
  });
};
