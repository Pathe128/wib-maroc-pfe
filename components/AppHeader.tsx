import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDrawer } from '../constants/DrawerContext';

interface AppHeaderProps {
  title: string;
  showLogo?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ title, showLogo = true }) => {
  const { toggleDrawer } = useDrawer();
  const router = useRouter();

  const navigateToHome = () => {
    router.push('/');
  };

  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleDrawer}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      {showLogo && (
        <TouchableOpacity onPress={navigateToHome}>
          <Text style={styles.logo}>🌸</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuIcon: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  logo: {
    fontSize: 32,
  },
});
