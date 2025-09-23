import { useAuth, useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/Colors';
import { useDrawer } from '../constants/DrawerContext';
import { useLanguage } from '../constants/LanguageContext';
import { getInitials, getUserAvatarUrl } from '../utils/avatarUtils';

const DRAWER_WIDTH = 280;
const screenWidth = Dimensions.get('window').width;

interface GlobalDrawerProps {
  children: React.ReactNode;
}

export const GlobalDrawer: React.FC<GlobalDrawerProps> = ({ children }) => {
  const { isDrawerOpen, closeDrawer } = useDrawer();
  const { t } = useLanguage();
  const router = useRouter();
  const { signOut } = useAuth();
  const { user } = useUser();

  const drawerTranslateX = React.useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayOpacity = React.useRef(new Animated.Value(0)).current;

  // Récupérer l'URL de l'avatar basé sur l'email
  const userAvatarUrl = React.useMemo(() => {
    if (!user) return null;
    return getUserAvatarUrl(user);
  }, [user]);

  // Générer les initiales pour le fallback
  const userInitials = React.useMemo(() => {
    if (!user) return '?';
    const email = user.primaryEmailAddress?.emailAddress;
    const name = user.fullName || user.firstName || email;
    return getInitials(name || email || '');
  }, [user]);

  React.useEffect(() => {
    if (isDrawerOpen) {
      Animated.parallel([
        Animated.timing(drawerTranslateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(drawerTranslateX, {
          toValue: -DRAWER_WIDTH,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isDrawerOpen]);

  const navigateToHome = () => {
    closeDrawer();
    router.push('/');
  };

  const navigateToDiscovery = () => {
    closeDrawer();
    router.push('/onboarding/modules');
  };

  const navigateToCreateEvent = () => {
    closeDrawer();
    router.push('/CreateEventScreen');
  };

  const navigateToProfile = () => {
    closeDrawer();
    router.push('/screens/Profil');
  };

  const navigateToSupport = () => {
    closeDrawer();
    router.push('/screens/Support');
  };

  const navigateToWIB = () => {
    closeDrawer();
    router.push('/screens/WIB');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      closeDrawer();
      router.replace('/(auth)/sign-in');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la déconnexion');
    }
  };

  return (
    <View style={styles.container}>
      {/* Main Content - Always visible */}
      <View style={styles.mainContent}>
        {children}
      </View>

      {/* Drawer Overlay - Only when open */}
      {isDrawerOpen && (
        <Animated.View
          style={[
            styles.overlay,
            {
              opacity: overlayOpacity,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.overlayTouchable}
            onPress={closeDrawer}
            activeOpacity={1}
          />
        </Animated.View>
      )}

      {/* Drawer Content - Slides from left */}
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX: drawerTranslateX }],
          },
        ]}
      >
        {/* Profile Section */}
        <View style={styles.profileSection}>
          {userAvatarUrl ? (
            <Image 
              source={{ uri: userAvatarUrl }} 
              style={styles.profileImage}
              onError={() => console.log('Erreur chargement avatar')}
            />
          ) : (
            <View style={[styles.profileImage, styles.initialsAvatar]}>
              <Text style={styles.initialsText}>{userInitials}</Text>
            </View>
          )}
          <Text style={styles.profileName}>{user?.primaryEmailAddress?.emailAddress}</Text>
          {user?.fullName && (
            <Text style={styles.profileRole}>{user.fullName}</Text>
          )}
        </View>

        <View style={styles.separator} />

        {/* Navigation Principale - En haut */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>NAVIGATION</Text>
          
          <TouchableOpacity style={styles.drawerItem} onPress={navigateToHome}>
            <View style={styles.menuItem}>
              <Text style={styles.menuIcon}>🏠</Text>
              <Text style={styles.drawerItemText}>{t('home')}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerItem} onPress={navigateToDiscovery}>
            <View style={styles.menuItem}>
              <Text style={styles.menuIcon}>🌟</Text>
              <Text style={styles.drawerItemText}>{t('discovery')}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerItem} onPress={navigateToProfile}>
            <View style={styles.menuItem}>
              <Text style={styles.menuIcon}>👤</Text>
              <Text style={styles.drawerItemText}>{t('profile')}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerItem} onPress={navigateToSupport}>
            <View style={styles.menuItem}>
              <Text style={styles.menuIcon}>❓</Text>
              <Text style={styles.drawerItemText}>Support</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerItem} onPress={navigateToWIB}>
            <View style={styles.menuItem}>
              <Text style={styles.menuIcon}>🌸</Text>
              <Text style={styles.drawerItemText}>{t('wib')}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Séparateur avant les actions */}
        <View style={styles.separator} />

        {/* Actions - En bas */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>ACTIONS</Text>
          
          <TouchableOpacity style={styles.drawerItem} onPress={navigateToCreateEvent}>
            <View style={styles.menuItem}>
              <Text style={styles.menuIcon}>➕</Text>
              <Text style={styles.drawerItemText}>Créer un événement</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Déconnexion - Tout en bas */}
        <View style={styles.bottomSection}>
          <TouchableOpacity 
            style={[styles.drawerItem, styles.signOutButton]} 
            onPress={handleSignOut}
          >
            <View style={styles.menuItem}>
              <Text style={styles.menuIcon}>🚪</Text>
              <Text style={styles.signOutText}>{t('signOut')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
  },
  overlayTouchable: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: DRAWER_WIDTH,
    backgroundColor: 'rgba(255,255,255,0.98)',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    zIndex: 1001,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    justifyContent: 'space-between',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  initialsAvatar: {
    backgroundColor: COLORS.primary,
  },
  initialsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
    textAlign: 'center',
  },
  profileRole: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 15,
  },
  menuSection: {
    flex: 1,
  },
  actionsSection: {
    marginBottom: 10,
  },
  bottomSection: {
    marginTop: 'auto',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888',
    marginBottom: 15,
    marginLeft: 8,
    letterSpacing: 1,
  },
  drawerItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 20,
    width: 30,
    marginRight: 12,
  },
  drawerItemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  signOutButton: {
    backgroundColor: '#fff5f5',
    borderWidth: 1,
    borderColor: '#fed7d7',
    marginTop: 10,
  },
  signOutText: {
    fontSize: 16,
    color: '#e53e3e',
    fontWeight: '500',
  },
});