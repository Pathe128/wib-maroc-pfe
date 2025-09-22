import { Database } from './database.types';

// Type pour un post, incluant les informations de l'utilisateur (auteur)
export type Post = Database['public']['Tables']['posts']['Row'] & {
  users: Database['public']['Tables']['users']['Row'];
  likes: { user_id: string }[]; // Simplifié pour l'instant
};

// Vous pouvez ajouter d'autres types ici au besoin
// export type Comment = Database['public']['Tables']['comments']['Row'];
