import { LanguageProvider } from '@/constants/LanguageContext';
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from '../components/AuthProvider';
import { GlobalDrawer } from '../components/GlobalDrawer';
import { CLERK_PUBLISHABLE_KEY } from '../config';
import { COLORS } from '../constants/Colors';
import { DrawerProvider } from '../constants/DrawerContext';

// Création du client React Query
const queryClient = new QueryClient();

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
        setShowOnboarding(hasSeenOnboarding !== 'true');
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la vérification onboarding:', error);
        setShowOnboarding(true);
        setIsLoading(false);
      }
    };
    checkOnboardingStatus();
  }, []);

  // Si le chargement est en cours, afficher un écran de chargement
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          style={styles.loadingGradient}
        >
          <Text style={styles.loadingText}>🌸</Text>
          <Text style={styles.loadingTitle}>WIB Maroc</Text>
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
        </LinearGradient>
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider tokenCache={tokenCache} publishableKey={CLERK_PUBLISHABLE_KEY}>
        <LanguageProvider>
          <DrawerProvider>
            <AuthProvider>
              {showOnboarding ? (
                <Stack
                  screenOptions={{
                    headerShown: false,
                    animation: 'fade',
                  }}
                >
                  <Stack.Screen name="onboarding/index" />
                  <Stack.Screen name="onboarding/CommunityPage" />
                  <Stack.Screen name="onboarding/OpportunitiesPage" />
                  <Stack.Screen name="onboarding/PotentialPage" />
                </Stack>
              ) : (
                <GlobalDrawer>
                  <Stack
                    screenOptions={{
                      headerShown: false,
                      animation: 'fade',
                    }}
                  >
                    <Stack.Screen name="index" />
                    <Stack.Screen name="onboarding/modules" />
                    <Stack.Screen name="screens/Profil" />
                    <Stack.Screen name="screens/Support" />
                    <Stack.Screen name="screens/WIB" />
                    <Stack.Screen name="screens/CoachWIB" />
                    <Stack.Screen name="screens/Bourse" />
                    <Stack.Screen name="screens/Argent" />
                    <Stack.Screen name="screens/Idee" />
                    <Stack.Screen name="screens/Parcours" />
                    <Stack.Screen name="screens/Radio" />
                    <Stack.Screen name="screens/Communaute" />
                    <Stack.Screen name="screens/Enfants" />
                    <Stack.Screen name="screens/Demarches" />
                    <Stack.Screen name="screens/Seminaire" />

                    {/* Ajout des écrans d'authentification */}
                    <Stack.Screen name="(auth)/sign-in" options={{ headerShown: false }} />
                    <Stack.Screen name="(auth)/sign-up" options={{ headerShown: false }} />
                  </Stack>
                </GlobalDrawer>
              )}
            </AuthProvider>
          </DrawerProvider>
        </LanguageProvider>
      </ClerkProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
  },
  loadingGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 64,
    marginBottom: 16,
  },
  loadingTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
});
