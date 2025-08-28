import { useLanguage } from '@/constants/LanguageContext';
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

const { width } = Dimensions.get('window');

interface Seminaire {
  id: string;
  titre: string;
  description: string;
  date: string;
  heure: string;
  duree: string;
  type: 'live' | 'replay';
  format: 'video' | 'audio';
  intervenant: string;
  participants: number;
  maxParticipants: number;
  prix: number;
  isGratuit: boolean;
  tags: string[];
  thumbnail: string;
}

const seminaires: Seminaire[] = [
  {
    id: '1',
    titre: 'Créer son entreprise au Maroc',
    description: 'Guide complet pour lancer votre projet entrepreneurial avec les bonnes pratiques et les démarches administratives.',
    date: '2024-02-15',
    heure: '14:00',
    duree: '2h30',
    type: 'live',
    format: 'video',
    intervenant: 'Dr. Karim Alami',
    participants: 156,
    maxParticipants: 200,
    prix: 0,
    isGratuit: true,
    tags: ['Entrepreneuriat', 'Démarches', 'Financement'],
    thumbnail: '🎯'
  },
  {
    id: '2',
    titre: 'Gestion financière pour PME',
    description: 'Maîtrisez les bases de la comptabilité et de la gestion financière pour optimiser votre entreprise.',
    date: '2024-02-10',
    heure: '10:00',
    duree: '1h45',
    type: 'replay',
    format: 'video',
    intervenant: 'Mme. Amina Benali',
    participants: 89,
    maxParticipants: 150,
    prix: 50,
    isGratuit: false,
    tags: ['Finance', 'Comptabilité', 'PME'],
    thumbnail: '💰'
  },
  {
    id: '3',
    titre: 'Marketing digital pour artisans',
    description: 'Découvrez comment promouvoir vos produits artisanaux sur les réseaux sociaux et e-commerce.',
    date: '2024-02-08',
    heure: '16:00',
    duree: '1h30',
    type: 'replay',
    format: 'audio',
    intervenant: 'Hassan Tazi',
    participants: 234,
    maxParticipants: 300,
    prix: 0,
    isGratuit: true,
    tags: ['Marketing', 'Digital', 'Artisanat'],
    thumbnail: '📱'
  },
  {
    id: '4',
    titre: 'Export et internationalisation',
    description: 'Comment développer vos marchés à l\'international et exporter vos produits marocains.',
    date: '2024-02-20',
    heure: '15:30',
    duree: '2h00',
    type: 'live',
    format: 'video',
    intervenant: 'Nadia El Fassi',
    participants: 67,
    maxParticipants: 100,
    prix: 75,
    isGratuit: false,
    tags: ['Export', 'International', 'Commerce'],
    thumbnail: '🌍'
  },
  {
    id: '5',
    titre: 'Innovation et technologie',
    description: 'Intégrez les nouvelles technologies dans votre business model pour rester compétitif.',
    date: '2024-02-12',
    heure: '11:00',
    duree: '1h15',
    type: 'replay',
    format: 'audio',
    intervenant: 'Mohammed Berrada',
    participants: 178,
    maxParticipants: 250,
    prix: 0,
    isGratuit: true,
    tags: ['Innovation', 'Tech', 'Transformation'],
    thumbnail: '🚀'
  }
];

export default function Seminaire() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [selectedTab, setSelectedTab] = useState<'live' | 'replay'>('live');
  const [selectedSeminaire, setSelectedSeminaire] = useState<Seminaire | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  const getTypeColor = (type: string) => {
    return type === 'live' ? '#F44336' : '#2196F3';
  };

  const getFormatIcon = (format: string) => {
    return format === 'video' ? 'videocam' : 'mic';
  };

  const getTypeText = (type: string) => {
    return type === 'live' ? 'LIVE' : 'REPLAY';
  };

  const renderSeminaire = ({ item }: { item: Seminaire }) => (
    <Animated.View style={[styles.seminaireCard, { opacity: fadeAnim }]}>
      <TouchableOpacity 
        style={styles.seminaireButton}
        onPress={() => setSelectedSeminaire(item)}
      >
        <View style={styles.seminaireHeader}>
          <View style={styles.thumbnailContainer}>
            <Text style={styles.thumbnail}>{item.thumbnail}</Text>
            <View style={[styles.typeBadge, { backgroundColor: getTypeColor(item.type) }]}>
              <Text style={styles.typeText}>{getTypeText(item.type)}</Text>
            </View>
          </View>
          <View style={styles.seminaireInfo}>
            <Text style={styles.seminaireTitre}>{item.titre}</Text>
            <Text style={styles.seminaireDescription}>{item.description}</Text>
            <View style={styles.seminaireMeta}>
              <View style={styles.metaItem}>
                <Ionicons name="person" size={14} color="#666" />
                <Text style={styles.metaText}>{item.intervenant}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="calendar" size={14} color="#666" />
                <Text style={styles.metaText}>{item.date} à {item.heure}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="time" size={14} color="#666" />
                <Text style={styles.metaText}>{item.duree}</Text>
              </View>
            </View>
            <View style={styles.tagsContainer}>
              {item.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        
        <View style={styles.seminaireFooter}>
          <View style={styles.participantsInfo}>
            <Ionicons name="people" size={16} color="#666" />
            <Text style={styles.participantsText}>
              {item.participants}/{item.maxParticipants} participants
            </Text>
          </View>
          <View style={styles.priceContainer}>
            {item.isGratuit ? (
              <View style={styles.gratuitBadge}>
                <Text style={styles.gratuitText}>GRATUIT</Text>
              </View>
            ) : (
              <Text style={styles.priceText}>{item.prix} MAD</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderLiveSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🎥 Séminaires en Direct</Text>
      <Text style={styles.sectionSubtitle}>Rejoignez nos événements en temps réel</Text>
      
      <FlatList
        data={seminaires.filter(s => s.type === 'live')}
        renderItem={renderSeminaire}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  const renderReplaySection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>📺 Replays Disponibles</Text>
      <Text style={styles.sectionSubtitle}>Regardez ou écoutez nos séminaires passés</Text>
      
      <FlatList
        data={seminaires.filter(s => s.type === 'replay')}
        renderItem={renderSeminaire}
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
              <Text style={styles.headerTitle}>{t('seminaire')}</Text>
            </View>
            <Text style={styles.headerSubtitle}>{t('seminaireSubtitle')}</Text>
          </LinearGradient>
        </Animated.View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'live' && styles.activeTab]}
            onPress={() => setSelectedTab('live')}
          >
            <Ionicons 
              name="radio" 
              size={20} 
              color={selectedTab === 'live' ? COLORS.primary : '#666'} 
            />
            <Text style={[styles.tabText, selectedTab === 'live' && styles.activeTabText]}>
              {t('tab_live')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'replay' && styles.activeTab]}
            onPress={() => setSelectedTab('replay')}
          >
            <Ionicons 
              name="play-circle" 
              size={20} 
              color={selectedTab === 'replay' ? COLORS.primary : '#666'} 
            />
            <Text style={[styles.tabText, selectedTab === 'replay' && styles.activeTabText]}>
              {t('tab_replay')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {selectedTab === 'live' && renderLiveSection()}
          {selectedTab === 'replay' && renderReplaySection()}
        </ScrollView>

        {/* Modal pour séminaire sélectionné */}
        {selectedSeminaire && (
          <Animated.View style={[styles.modal, { opacity: fadeAnim }]}>
            <View style={styles.modalContent}>
              <View style={[styles.modalHeader, { backgroundColor: getTypeColor(selectedSeminaire.type) }]}>
                <Text style={styles.modalThumbnail}>{selectedSeminaire.thumbnail}</Text>
                <Text style={styles.modalTitle}>{selectedSeminaire.titre}</Text>
                <View style={styles.modalType}>
                  <Ionicons name={getFormatIcon(selectedSeminaire.format)} size={16} color="#fff" />
                  <Text style={styles.modalTypeText}>
                    {selectedSeminaire.format === 'video' ? t('modal_format_video') : t('modal_format_audio')}
                  </Text>
                </View>
              </View>
              <View style={styles.modalBody}>
                <Text style={styles.modalDescription}>{selectedSeminaire.description}</Text>
                
                <View style={styles.modalDetails}>
                  <View style={styles.detailItem}>
                    <Ionicons name="person" size={16} color="#666" />
                    <Text style={styles.detailText}>{selectedSeminaire.intervenant}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="calendar" size={16} color="#666" />
                    <Text style={styles.detailText}>{selectedSeminaire.date} à {selectedSeminaire.heure}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="time" size={16} color="#666" />
                    <Text style={styles.detailText}>{t('modal_duration')}: {selectedSeminaire.duree}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="people" size={16} color="#666" />
                    <Text style={styles.detailText}>
                      {t('modal_participants')}: {selectedSeminaire.participants}/{selectedSeminaire.maxParticipants}
                    </Text>
                  </View>
                </View>

                <View style={styles.modalTags}>
                  {selectedSeminaire.tags.map((tag, index) => (
                    <View key={index} style={styles.modalTag}>
                      <Text style={styles.modalTagText}>{tag}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.modalActions}>
                  {selectedSeminaire.type === 'live' ? (
                    <TouchableOpacity 
                      style={[styles.actionButton, { backgroundColor: getTypeColor(selectedSeminaire.type) }]}
                      onPress={() => setSelectedSeminaire(null)}
                    >
                      <Ionicons name="radio" size={20} color="#fff" />
                      <Text style={styles.actionButtonText}>{t('modal_action_subscribe')}</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity 
                      style={[styles.actionButton, { backgroundColor: getTypeColor(selectedSeminaire.type) }]}
                      onPress={() => setIsPlaying(!isPlaying)}
                    >
                      <Ionicons name={isPlaying ? "pause" : "play"} size={20} color="#fff" />
                      <Text style={styles.actionButtonText}>
                        {isPlaying ? t('modal_action_pause') : t('modal_action_listen')}
                      </Text>
                    </TouchableOpacity>
                  )}
                  
                  <TouchableOpacity 
                    style={styles.secondaryButton}
                    onPress={() => setSelectedSeminaire(null)}
                  >
                    <Text style={styles.secondaryButtonText}>{t('modal_action_close')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Animated.View>
        )}
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
  searchButton: {
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  seminaireCard: {
    marginBottom: 16,
  },
  seminaireButton: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  seminaireHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  thumbnailContainer: {
    position: 'relative',
    marginRight: 16,
  },
  thumbnail: {
    fontSize: 48,
    width: 80,
    height: 80,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    textAlign: 'center',
    lineHeight: 80,
  },
  typeBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  seminaireInfo: {
    flex: 1,
  },
  seminaireTitre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  seminaireDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  seminaireMeta: {
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: 'rgba(147, 51, 234, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: '500',
  },
  seminaireFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingTop: 12,
  },
  participantsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantsText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  gratuitBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  gratuitText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: width * 0.9,
    maxHeight: '80%',
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalThumbnail: {
    fontSize: 48,
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTypeText: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 4,
  },
  modalBody: {
    padding: 20,
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  modalDetails: {
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  modalTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  modalTag: {
    backgroundColor: 'rgba(147, 51, 234, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  modalTagText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '500',
  },
  modalActions: {
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
}); 