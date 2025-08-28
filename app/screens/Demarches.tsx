import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { COLORS } from '../../constants/Colors';
import { useLanguage } from '../../constants/LanguageContext';

const { width } = Dimensions.get('window');

interface Dossier {
  id: string;
  type: 'credit' | 'subvention';
  titre: string;
  statut: 'en_cours' | 'valide' | 'refuse' | 'termine';
  dateDepot: string;
  montant: number;
  progression: number;
  documents: string[];
  audioNotes: string[];
}

const dossiers: Dossier[] = [
  {
    id: '1',
    type: 'credit',
    titre: 'Crédit Commerce Local',
    statut: 'en_cours',
    dateDepot: '2024-01-15',
    montant: 50000,
    progression: 65,
    documents: ['Carte d\'identité', 'Justificatif domicile', 'Plan d\'affaires'],
    audioNotes: ['Note audio 1: Présentation projet', 'Note audio 2: Justification montant']
  },
  {
    id: '2',
    type: 'subvention',
    titre: 'Subvention Agriculture Bio',
    statut: 'valide',
    dateDepot: '2024-01-10',
    montant: 25000,
    progression: 100,
    documents: ['Attestation formation', 'Plan culturel', 'Budget prévisionnel'],
    audioNotes: ['Note audio 1: Objectifs agricoles', 'Note audio 2: Impact environnemental']
  },
  {
    id: '3',
    type: 'credit',
    titre: 'Crédit Équipement Tech',
    statut: 'refuse',
    dateDepot: '2024-01-05',
    montant: 75000,
    progression: 0,
    documents: ['Devis équipements', 'CV équipe', 'Étude marché'],
    audioNotes: ['Note audio 1: Besoins techniques', 'Note audio 2: ROI prévu']
  }
];

const typesDemarche = [
  { id: 'credit', titre: 'Demande de Crédit', icon: '💰', color: '#4CAF50', description: 'Financement pour votre projet' },
  { id: 'subvention', titre: 'Demande de Subvention', icon: '🎯', color: '#2196F3', description: 'Aide financière publique' },
  { id: 'formation', titre: 'Formation', icon: '📚', color: '#FF9800', description: 'Développement de compétences' },
  { id: 'accompagnement', titre: 'Accompagnement', icon: '🤝', color: '#9C27B0', description: 'Support personnalisé' }
];

export default function Demarches() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [selectedTab, setSelectedTab] = useState<'nouveau' | 'suivi'>('nouveau');
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  // Animation de pulsation pour l'enregistrement
  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          })
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isRecording]);

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'en_cours': return '#FF9800';
      case 'valide': return '#4CAF50';
      case 'refuse': return '#F44336';
      case 'termine': return '#2196F3';
      default: return '#666';
    }
  };

  const getStatusText = (statut: string) => {
    switch (statut) {
      case 'en_cours': return t('statut_en_cours');
      case 'valide': return t('statut_valide');
      case 'refuse': return t('statut_refuse');
      case 'termine': return t('statut_termine');
      default: return t('statut_inconnu');
    }
  };

  const renderTypeDemarche = ({ item }: { item: any }) => (
    <Animated.View style={[styles.typeCard, { opacity: fadeAnim }]}>
      <TouchableOpacity style={styles.typeButton}>
        <View style={[styles.typeIcon, { backgroundColor: item.color }]}>
          <Text style={styles.typeIconText}>{item.icon}</Text>
        </View>
        <View style={styles.typeInfo}>
          <Text style={styles.typeTitle}>{item.titre}</Text>
          <Text style={styles.typeDescription}>{item.description}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#666" />
      </TouchableOpacity>
    </Animated.View>
  );

  const renderDossier = ({ item }: { item: Dossier }) => (
    <Animated.View style={[styles.dossierCard, { opacity: fadeAnim }]}>
      <View style={styles.dossierHeader}>
        <View style={styles.dossierType}>
          <Text style={styles.dossierTypeIcon}>
            {item.type === 'credit' ? '💰' : '🎯'}
          </Text>
          <Text style={styles.dossierTypeText}>
            {item.type === 'credit' ? 'Crédit' : 'Subvention'}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.statut) }]}>
          <Text style={styles.statusText}>{getStatusText(item.statut)}</Text>
        </View>
      </View>
      
      <Text style={styles.dossierTitle}>{item.titre}</Text>
      <Text style={styles.dossierDate}>Déposé le {item.dateDepot}</Text>
      <Text style={styles.dossierMontant}>{item.montant.toLocaleString()} MAD</Text>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${item.progression}%`,
                backgroundColor: getStatusColor(item.statut)
              }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>{item.progression}%</Text>
      </View>

      <View style={styles.dossierActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="document-outline" size={16} color={COLORS.primary} />
          <Text style={styles.actionText}>Documents ({item.documents.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="mic-outline" size={16} color={COLORS.primary} />
          <Text style={styles.actionText}>Audio ({item.audioNotes.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="call-outline" size={16} color={COLORS.primary} />
          <Text style={styles.actionText}>Suivi</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderNouvelleDemarche = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{t('demarches_new_section_title')}</Text>
      
      {/* Types de démarche */}
      <FlatList
        data={typesDemarche}
        renderItem={renderTypeDemarche}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />

      {/* Section Audio + Photo */}
      <View style={styles.mediaSection}>
        <Text style={styles.mediaTitle}>{t('demarches_media_section_title')}</Text>
        
        <View style={styles.mediaContainer}>
          <TouchableOpacity 
            style={[styles.mediaButton, styles.audioButton]}
            onPress={() => setIsRecording(!isRecording)}
          >
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <Ionicons 
                name={isRecording ? "stop-circle" : "mic"} 
                size={32} 
                color={isRecording ? "#F44336" : COLORS.primary} 
              />
            </Animated.View>
            <Text style={styles.mediaButtonText}>
              {isRecording ? t('demarches_media_button_stop') : t('demarches_media_button_record')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.mediaButton, styles.photoButton]}>
            <Ionicons name="camera" size={32} color={COLORS.primary} />
            <Text style={styles.mediaButtonText}>{t('demarches_media_button_take_photo')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mediaPreview}>
          <Text style={styles.mediaPreviewTitle}>{t('demarches_media_preview_title')}</Text>
          <View style={styles.mediaPreviewContent}>
            <View style={styles.mediaPreviewItem}>
              <Ionicons name="mic" size={20} color="#666" />
              <Text style={styles.mediaPreviewText}>{t('demarches_media_preview_no_recording')}</Text>
            </View>
            <View style={styles.mediaPreviewItem}>
              <Ionicons name="camera" size={20} color="#666" />
              <Text style={styles.mediaPreviewText}>{t('demarches_media_preview_no_photo')}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const renderSuiviDossiers = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{t('demarches_suivi_section_title')}</Text>
      
      <FlatList
        data={dossiers}
        renderItem={renderDossier}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header animé */}
        <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            style={[styles.header, { paddingTop: 64, paddingVertical: 32 }]}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 2 }}>
              <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 8 }}>
                <Ionicons name="arrow-back" size={28} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>{t('demarches')}</Text>
            </View>
            <Text style={styles.headerSubtitle}>{t('demarchesSubtitle')}</Text>
          </LinearGradient>
        </Animated.View>
        {/* Tabs dynamiques */}
        <View style={styles.tabsRow}>
          <TouchableOpacity onPress={() => setSelectedTab('nouveau')} style={[styles.tab, selectedTab === 'nouveau' && styles.tabActive]}>
            <Text style={[styles.tabText, selectedTab === 'nouveau' && styles.tabTextActive]}>{t('demarches_tab_nouveau')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTab('suivi')} style={[styles.tab, selectedTab === 'suivi' && styles.tabActive]}>
            <Text style={[styles.tabText, selectedTab === 'suivi' && styles.tabTextActive]}>{t('demarches_tab_suivi')}</Text>
          </TouchableOpacity>
        </View>
        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {selectedTab === 'nouveau' && renderNouvelleDemarche()}
          {selectedTab === 'suivi' && renderSuiviDossiers()}
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'android' ? 32 : 0,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
    padding: 4,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  helpButton: {
    padding: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: 'rgba(147, 51, 234, 0.1)',
  },
  tabText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  typeCard: {
    marginBottom: 12,
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  typeIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  typeIconText: {
    fontSize: 24,
  },
  typeInfo: {
    flex: 1,
  },
  typeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  typeDescription: {
    fontSize: 14,
    color: '#666',
  },
  mediaSection: {
    marginTop: 24,
  },
  mediaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  mediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  mediaButton: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginHorizontal: 4,
  },
  audioButton: {
    backgroundColor: 'rgba(147, 51, 234, 0.1)',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  photoButton: {
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    borderWidth: 2,
    borderColor: COLORS.secondary,
  },
  mediaButtonText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  mediaPreview: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mediaPreviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  mediaPreviewContent: {
    gap: 8,
  },
  mediaPreviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  mediaPreviewText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  dossierCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dossierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dossierType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dossierTypeIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  dossierTypeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  dossierTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  dossierDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  dossierMontant: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  dossierActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionText: {
    marginLeft: 4,
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '500',
  },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  tabTextActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
}); 