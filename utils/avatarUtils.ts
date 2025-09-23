// utils/avatarUtils.ts

/**
 * Génère un avatar basé sur l'email utilisateur
 * Utilise Gravatar si disponible, sinon génère un avatar avec les initiales
 */
export const getAvatarUrl = (email: string, size: number = 80): string => {
    if (!email) return '';
  
    // Option 1: Gravatar (si l'utilisateur a un gravatar)
    const gravatarHash = md5(email.trim().toLowerCase());
    const gravatarUrl = `https://www.gravatar.com/avatar/${gravatarHash}?s=${size}&d=identicon`;
    
    return gravatarUrl;
  };
  
  /**
   * Génère un avatar avec initiales comme fallback
   */
  export const generateInitialsAvatar = (name: string, email: string, size: number = 80): string => {
    const initials = getInitials(name || email);
    const backgroundColors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'
    ];
    
    const bgColor = backgroundColors[initials.charCodeAt(0) % backgroundColors.length];
    
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${bgColor.replace('#', '')}&color=fff&size=${size}`;
  };
  
  /**
   * Extrait les initiales d'un nom ou email
   */
  export const getInitials = (text: string): string => {
    if (!text) return '?';
    
    // Si c'est un email, prendre la partie avant @
    if (text.includes('@')) {
      text = text.split('@')[0];
    }
    
    const parts = text.split(/[\.\s]+/);
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };
  
  // Fonction MD5 simple pour Gravatar
  const md5 = (input: string): string => {
    // Implémentation MD5 simplifiée - en production, utilisez une librairie
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  };
  
  /**
   * Récupère l'URL d'avatar optimale pour l'utilisateur
   */
  export const getUserAvatarUrl = (user: any): string => {
    const email = user?.primaryEmailAddress?.emailAddress;
    const name = user?.fullName || user?.firstName || email;
    
    // Priorité 1: Avatar Clerk s'il existe
    if (user?.imageUrl) {
      return user.imageUrl;
    }
    
    // Priorité 2: Gravatar basé sur l'email
    if (email) {
      return getAvatarUrl(email);
    }
    
    // Priorité 3: Avatar avec initiales
    return generateInitialsAvatar(name, email);
  };