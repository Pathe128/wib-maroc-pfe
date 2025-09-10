import { useAuth, useUser } from '@clerk/clerk-expo';
import { useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

// Ce composant protège les routes en fonction de l'état d'authentification
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isSignedIn && !inAuthGroup) {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      router.replace('/(auth)/sign-in');
    } else if (isSignedIn && inAuthGroup) {
      // Rediriger vers la page d'accueil si l'utilisateur est connecté et tente d'accéder à une page d'authentification
      router.replace('/');
    }
  }, [isSignedIn, segments, isLoaded]);

  return <>{children}</>;
}
