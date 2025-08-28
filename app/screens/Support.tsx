import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppHeader } from '../../components/AppHeader';
import { COLORS } from '../../constants/Colors';
import { useLanguage } from '../../constants/LanguageContext';

export default function SupportScreen() {
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <AppHeader title={t('support')} />
      
      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.supportCard}>
          <Text style={styles.title}>Centre d'Aide WIB Maroc</Text>
          <Text style={styles.subtitle}>
            Nous sommes là pour vous accompagner dans votre parcours entrepreneurial
          </Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📞 Contactez-nous</Text>
            
            <TouchableOpacity style={styles.contactItem}>
              <Text style={styles.contactIcon}>📧</Text>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>support@wibmaroc.ma</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.contactItem}>
              <Text style={styles.contactIcon}>📱</Text>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Téléphone</Text>
                <Text style={styles.contactValue}>+212 5 22 48 96 32</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.contactItem}>
              <Text style={styles.contactIcon}>💬</Text>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>WhatsApp</Text>
                <Text style={styles.contactValue}>+212 6 61 23 45 67</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🕒 Horaires d'ouverture</Text>
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleDay}>Lundi - Vendredi</Text>
              <Text style={styles.scheduleTime}>9h00 - 18h00</Text>
            </View>
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleDay}>Samedi</Text>
              <Text style={styles.scheduleTime}>9h00 - 13h00</Text>
            </View>
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleDay}>Dimanche</Text>
              <Text style={styles.scheduleTime}>Fermé</Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>❓ Questions Fréquentes</Text>
            
            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>Comment créer mon profil entrepreneur ?</Text>
              <Text style={styles.faqAnswer}>
                Rendez-vous dans la section "Profil" et complétez toutes les informations demandées.
              </Text>
            </View>
            
            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>Comment accéder aux formations ?</Text>
              <Text style={styles.faqAnswer}>
                Utilisez la section "Découverte" pour explorer tous nos modules de formation.
              </Text>
            </View>
            
            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>Comment contacter un coach ?</Text>
              <Text style={styles.faqAnswer}>
                Accédez au "Coach WIB" depuis le menu principal pour démarrer une conversation.
              </Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📍 Nos Bureaux</Text>
            <Text style={styles.addressText}>
              WIB Maroc{'\n'}
              123 Boulevard Mohammed V{'\n'}
              Casablanca 20000{'\n'}
              Maroc
            </Text>
          </View>
          
          <TouchableOpacity style={styles.emergencyButton}>
            <Text style={styles.emergencyText}>🚨 Support Urgent</Text>
            <Text style={styles.emergencySubtext}>Disponible 24h/7j</Text>
          </TouchableOpacity>
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
  supportCard: {
    backgroundColor: 'rgba(108, 106, 106, 0.95)',
    borderRadius: 20,
    padding: 24,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 12,
  },
  contactIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  scheduleDay: {
    fontSize: 14,
    color: '#333',
  },
  scheduleTime: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  faqItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  addressText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
  },
  emergencyButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginTop: 16,
  },
  emergencyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  emergencySubtext: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
});
