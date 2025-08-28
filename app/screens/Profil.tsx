import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../../components/AppHeader';
import { COLORS } from '../../constants/Colors';
import { useLanguage } from '../../constants/LanguageContext';

export default function ProfilScreen() {
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <AppHeader title={t('profile')} />
      
      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <View style={styles.profileImageLarge}>
            <Text style={styles.profileIconLarge}>👤</Text>
          </View>
          
          <Text style={styles.userName}>Fatima Zahra Benali</Text>
          <Text style={styles.userRole}>Entrepreneure & Consultante</Text>
          
          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>📧 Email</Text>
              <Text style={styles.infoValue}>fatima.benali@wibmaroc.ma</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>📱 Téléphone</Text>
              <Text style={styles.infoValue}>+212 6 12 34 56 78</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>🏢 Entreprise</Text>
              <Text style={styles.infoValue}>Benali Consulting</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>📍 Ville</Text>
              <Text style={styles.infoValue}>Casablanca, Maroc</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>🎯 Secteur</Text>
              <Text style={styles.infoValue}>Conseil en Management</Text>
            </View>
          </View>
          
          <View style={styles.bioSection}>
            <Text style={styles.bioTitle}>À propos</Text>
            <Text style={styles.bioText}>
              Entrepreneure passionnée avec plus de 8 ans d'expérience dans le conseil en management. 
              Membre active de la communauté WIB Maroc depuis 2020, j'accompagne les femmes entrepreneures 
              dans le développement de leurs projets et la croissance de leurs entreprises.
            </Text>
          </View>
          
          <View style={styles.statsSection}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>Formations suivies</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Badges obtenus</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>120</Text>
              <Text style={styles.statLabel}>Points WIB</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  profileCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  profileImageLarge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileIconLarge: {
    fontSize: 48,
    color: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
    textAlign: 'center',
  },
  userRole: {
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: 24,
    textAlign: 'center',
  },
  infoSection: {
    width: '100%',
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#222',
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  bioSection: {
    width: '100%',
    marginBottom: 24,
  },
  bioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
  },
  bioText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    textAlign: 'justify',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
