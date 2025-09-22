import { useRouter } from 'expo-router';
import React from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { COLORS } from '../constants/Colors';
import { useDrawer } from '../constants/DrawerContext';
import { useLanguage } from '../constants/LanguageContext';
import { useAuth } from '@clerk/clerk-expo';

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

  const drawerTranslateX = React.useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayOpacity = React.useRef(new Animated.Value(0)).current;

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
          <View style={styles.profileImage}>
            <Text style={styles.profileIcon}>👤</Text>
          </View>
          <Text style={styles.profileName}>Fatima Zahra</Text>
          <Text style={styles.profileRole}>Entrepreneure</Text>
        </View>

        <View style={styles.separator} />

        {/* Navigation Links */}
        <TouchableOpacity style={styles.drawerItem} onPress={navigateToHome}>
          <Text style={styles.drawerItemText}>🏠 {t('home')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem} onPress={navigateToDiscovery}>
          <Text style={styles.drawerItemText}>🌟 {t('discovery')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem} onPress={navigateToCreateEvent}>
          <Text style={styles.drawerItemText}>➕ Créer un événement</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem} onPress={navigateToProfile}>
          <Text style={styles.drawerItemText}>👤 {t('profile')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem} onPress={navigateToSupport}>
          <Text style={styles.drawerItemText}>❓ Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem} onPress={navigateToWIB}>
          <View style={styles.wibItem}>
            <Text style={styles.wibLogo}>🌸</Text>
            <Text style={styles.drawerItemText}>{t('wib')}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.separator} />

        {/* Bouton de déconnexion */}
        <TouchableOpacity 
          style={[styles.drawerItem, { marginTop: 'auto' }]} 
          onPress={handleSignOut}
        >
          <Text style={[styles.drawerItemText, { color: '#ff6b6b' }]}>🚪 {t('signOut')}</Text>
        </TouchableOpacity>

        <View style={styles.separator} />

        {/* Theme Toggle */}
        <View style={styles.themeSection}>
          <Text style={styles.themeText}>🌙 {t('theme')}</Text>
          <TouchableOpacity style={styles.themeToggle}>
            <View style={styles.toggleTrack}>
              <View style={styles.toggleThumb} />
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
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 1001,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileIcon: {
    fontSize: 32,
    color: '#fff',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    color: '#666',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 20,
  },
  drawerItem: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  drawerItemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  wibItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wibLogo: {
    fontSize: 20,
    marginRight: 8,
  },
  themeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  themeText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  themeToggle: {
    padding: 4,
  },
  toggleTrack: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-end',
  },
});
