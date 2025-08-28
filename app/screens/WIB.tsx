import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../../components/AppHeader';
import { COLORS } from '../../constants/Colors';
import { useLanguage } from '../../constants/LanguageContext';

export default function WIBScreen() {
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <AppHeader title={t('wib')} />
      
      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.wibCard}>
          <View style={styles.logoSection}>
            <Text style={styles.logoLarge}>🌸</Text>
            <Text style={styles.appName}>WIB Maroc</Text>
            <Text style={styles.tagline}>Women in Business</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎯 Notre Mission</Text>
            <Text style={styles.sectionText}>
              WIB Maroc est une plateforme dédiée à l'accompagnement et au développement de l'entrepreneuriat féminin au Maroc. 
              Nous offrons un écosystème complet pour soutenir les femmes entrepreneures à chaque étape de leur parcours.
            </Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💡 Nos Services</Text>
            
            <View style={styles.serviceItem}>
              <Text style={styles.serviceIcon}>🤖</Text>
              <View style={styles.serviceContent}>
                <Text style={styles.serviceTitle}>Coach WIB Personnel</Text>
                <Text style={styles.serviceDescription}>
                  Un assistant IA disponible 24h/7j pour répondre à vos questions entrepreneuriales
                </Text>
              </View>
            </View>
            
            <View style={styles.serviceItem}>
              <Text style={styles.serviceIcon}>📍</Text>
              <View style={styles.serviceContent}>
                <Text style={styles.serviceTitle}>Bourse des Opportunités</Text>
                <Text style={styles.serviceDescription}>
                  Découvrez les marchés, conseils et opportunités solidaires
                </Text>
              </View>
            </View>
            
            <View style={styles.serviceItem}>
              <Text style={styles.serviceIcon}>💰</Text>
              <View style={styles.serviceContent}>
                <Text style={styles.serviceTitle}>Gestion Financière</Text>
                <Text style={styles.serviceDescription}>
                  Outils pour gérer vos finances personnelles et professionnelles
                </Text>
              </View>
            </View>
            
            <View style={styles.serviceItem}>
              <Text style={styles.serviceIcon}>🎤</Text>
              <View style={styles.serviceContent}>
                <Text style={styles.serviceTitle}>Séminaires & Formations</Text>
                <Text style={styles.serviceDescription}>
                  Formations en direct et replays avec des expertes du domaine
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🌟 Nos Valeurs</Text>
            
            <View style={styles.valueItem}>
              <Text style={styles.valueTitle}>🤝 Solidarité</Text>
              <Text style={styles.valueText}>
                Nous croyons en la force du collectif et de l'entraide entre femmes entrepreneures
              </Text>
            </View>
            
            <View style={styles.valueItem}>
              <Text style={styles.valueTitle}>💪 Empowerment</Text>
              <Text style={styles.valueText}>
                Nous donnons aux femmes les outils et la confiance pour réussir
              </Text>
            </View>
            
            <View style={styles.valueItem}>
              <Text style={styles.valueTitle}>🚀 Innovation</Text>
              <Text style={styles.valueText}>
                Nous utilisons la technologie pour simplifier l'entrepreneuriat
              </Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📊 Impact</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>2,500+</Text>
                <Text style={styles.statLabel}>Entrepreneures accompagnées</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>150+</Text>
                <Text style={styles.statLabel}>Formations dispensées</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>85%</Text>
                <Text style={styles.statLabel}>Taux de réussite</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Villes couvertes</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🏢 À Propos</Text>
            <Text style={styles.sectionText}>
              Lancée en 2020, WIB Maroc est née de la volonté de créer un écosystème digital 
              inclusif pour les femmes entrepreneures marocaines. Notre équipe multidisciplinaire 
              travaille chaque jour pour démocratiser l'accès à l'entrepreneuriat et briser les 
              barrières traditionnelles.
            </Text>
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
  wibCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 24,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoLarge: {
    fontSize: 64,
    marginBottom: 12,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 16,
  },
  sectionText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    textAlign: 'justify',
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  serviceIcon: {
    fontSize: 24,
    marginRight: 16,
    marginTop: 2,
  },
  serviceContent: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  valueItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  valueTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  valueText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
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
    lineHeight: 16,
  },
});
