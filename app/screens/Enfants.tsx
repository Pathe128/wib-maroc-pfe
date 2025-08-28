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

interface MiniJeu {
  id: string;
  titre: string;
  description: string;
  icon: string;
  color: string;
  niveau: 'facile' | 'moyen' | 'difficile';
  score: number;
  maxScore: number;
}

interface RecitEnfant {
  id: string;
  nom: string;
  age: number;
  titre: string;
  contenu: string;
  date: string;
  likes: number;
  avatar: string;
}

const miniJeux: MiniJeu[] = [
  {
    id: '1',
    titre: 'Le Marchand',
    description: 'Apprends à compter l\'argent et gérer une boutique',
    icon: '🏪',
    color: '#4CAF50',
    niveau: 'facile',
    score: 85,
    maxScore: 100
  },
  {
    id: '2',
    titre: 'Le Banquier',
    description: 'Découvre comment fonctionne une banque',
    icon: '🏦',
    color: '#2196F3',
    niveau: 'moyen',
    score: 72,
    maxScore: 100
  },
  {
    id: '3',
    titre: 'L\'Agriculteur',
    description: 'Plante, récolte et vends tes produits',
    icon: '🌾',
    color: '#FF9800',
    niveau: 'facile',
    score: 95,
    maxScore: 100
  },
  {
    id: '4',
    titre: 'L\'Artisan',
    description: 'Crée des objets et fixe les prix',
    icon: '🛠️',
    color: '#9C27B0',
    niveau: 'moyen',
    score: 68,
    maxScore: 100
  },
  {
    id: '5',
    titre: 'L\'Entrepreneur',
    description: 'Lance ton entreprise et gère tes employés',
    icon: '💼',
    color: '#E91E63',
    niveau: 'difficile',
    score: 45,
    maxScore: 100
  },
  {
    id: '6',
    titre: 'Le Comptable',
    description: 'Apprends à faire les comptes',
    icon: '📊',
    color: '#795548',
    niveau: 'difficile',
    score: 38,
    maxScore: 100
  }
];

const recitsEnfants: RecitEnfant[] = [
  {
    id: '1',
    nom: 'Amina',
    age: 8,
    titre: 'Ma première boutique',
    contenu: 'J\'ai créé une boutique de bonbons avec mes amis. On a appris à compter l\'argent et à faire des bénéfices ! C\'était super amusant.',
    date: '2024-01-20',
    likes: 12,
    avatar: '👧'
  },
  {
    id: '2',
    nom: 'Karim',
    age: 10,
    titre: 'Mon jardin secret',
    contenu: 'J\'ai planté des tomates et des carottes. Quand elles ont poussé, je les ai vendues à mes voisins. J\'ai gagné 50 dirhams !',
    date: '2024-01-18',
    likes: 8,
    avatar: '👦'
  },
  {
    id: '3',
    nom: 'Fatima',
    age: 9,
    titre: 'La banque des enfants',
    contenu: 'Avec mes copines, on a créé une banque pour nos économies. On prête de l\'argent pour acheter des jouets et on récupère avec des intérêts !',
    date: '2024-01-15',
    likes: 15,
    avatar: '👧'
  },
  {
    id: '4',
    nom: 'Hassan',
    age: 11,
    titre: 'Mon atelier de peinture',
    contenu: 'J\'ai ouvert un atelier de peinture dans ma chambre. Je vends mes tableaux à ma famille. Maman dit que je suis un vrai artiste !',
    date: '2024-01-12',
    likes: 6,
    avatar: '👦'
  }
];

export default function Enfants() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const [selectedTab, setSelectedTab] = useState<'jeux' | 'recits'>('jeux');
  const [selectedJeu, setSelectedJeu] = useState<MiniJeu | null>(null);

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

    // Animation de rebond pour les éléments enfants
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);

  const getNiveauColor = (niveau: string) => {
    switch (niveau) {
      case 'facile': return '#4CAF50';
      case 'moyen': return '#FF9800';
      case 'difficile': return '#F44336';
      default: return '#666';
    }
  };

  const getNiveauText = (niveau: string) => {
    switch (niveau) {
      case 'facile': return t('niveau_facile');
      case 'moyen': return t('niveau_moyen');
      case 'difficile': return t('niveau_difficile');
      default: return t('niveau_inconnu');
    }
  };

  const renderMiniJeu = ({ item }: { item: MiniJeu }) => (
    <Animated.View 
      style={[
        styles.jeuCard, 
        { 
          opacity: fadeAnim,
          transform: [{ 
            translateY: bounceAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -5]
            })
          }]
        }
      ]}
    >
      <TouchableOpacity 
        style={styles.jeuButton}
        onPress={() => setSelectedJeu(item)}
      >
        <View style={[styles.jeuIcon, { backgroundColor: item.color }]}>
          <Text style={styles.jeuIconText}>{item.icon}</Text>
        </View>
        <View style={styles.jeuInfo}>
          <Text style={styles.jeuTitre}>{item.titre}</Text>
          <Text style={styles.jeuDescription}>{item.description}</Text>
          <View style={styles.jeuNiveau}>
            <View style={[styles.niveauBadge, { backgroundColor: getNiveauColor(item.niveau) }]}>
              <Text style={styles.niveauText}>{getNiveauText(item.niveau)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.jeuScore}>
          <Text style={styles.scoreText}>{item.score}/{item.maxScore}</Text>
          <View style={styles.scoreBar}>
            <View 
              style={[
                styles.scoreFill, 
                { 
                  width: `${(item.score / item.maxScore) * 100}%`,
                  backgroundColor: item.color
                }
              ]} 
            />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderRecit = ({ item }: { item: RecitEnfant }) => (
    <Animated.View 
      style={[
        styles.recitCard, 
        { 
          opacity: fadeAnim,
          transform: [{ 
            translateY: bounceAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -3]
            })
          }]
        }
      ]}
    >
      <View style={styles.recitHeader}>
        <View style={styles.recitAvatar}>
          <Text style={styles.avatarText}>{item.avatar}</Text>
        </View>
        <View style={styles.recitInfo}>
          <Text style={styles.recitNom}>{item.nom}, {item.age} ans</Text>
          <Text style={styles.recitDate}>{item.date}</Text>
        </View>
        <TouchableOpacity style={styles.likeButton}>
          <Ionicons name="heart" size={16} color="#E91E63" />
          <Text style={styles.likeCount}>{item.likes}</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.recitTitre}>{item.titre}</Text>
      <Text style={styles.recitContenu}>{item.contenu}</Text>
      
      <View style={styles.recitActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={16} color={COLORS.primary} />
          <Text style={styles.actionText}>{t('commenter')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={16} color={COLORS.primary} />
          <Text style={styles.actionText}>{t('partager')}</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderJeuxSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🎮 {t('enfants_jeux_title')}</Text>
      <Text style={styles.sectionSubtitle}>{t('enfants_jeux_subtitle')}</Text>
      
      <FlatList
        data={miniJeux}
        renderItem={renderMiniJeu}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  const renderRecitsSection = () => (
    <View style={styles.section}>
      <View style={styles.recitsHeader}>
        <Text style={styles.sectionTitle}>📖 {t('enfants_recits_title')}</Text>
        <TouchableOpacity style={styles.addRecitButton}>
          <Ionicons name="add-circle" size={24} color={COLORS.primary} />
          <Text style={styles.addRecitText}>{t('enfants_add_recit')}</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={recitsEnfants}
        renderItem={renderRecit}
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
              <Text style={styles.headerTitle}>{t('enfants')}</Text>
            </View>
            <Text style={styles.headerSubtitle}>{t('enfantsSubtitle')}</Text>
          </LinearGradient>
        </Animated.View>
        {/* Tabs */}
        <View style={styles.tabsRow}>
          <TouchableOpacity onPress={() => setSelectedTab('jeux')} style={[styles.tab, selectedTab === 'jeux' && styles.tabActive]}>
            <Text style={[styles.tabText, selectedTab === 'jeux' && styles.tabTextActive]}>{t('enfants_tab_jeux')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTab('recits')} style={[styles.tab, selectedTab === 'recits' && styles.tabActive]}>
            <Text style={[styles.tabText, selectedTab === 'recits' && styles.tabTextActive]}>{t('enfants_tab_recits')}</Text>
          </TouchableOpacity>
        </View>
        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {selectedTab === 'jeux' && renderJeuxSection()}
          {selectedTab === 'recits' && renderRecitsSection()}
        </ScrollView>

        {/* Modal pour jeu sélectionné */}
        {selectedJeu && (
          <Animated.View style={[styles.modal, { opacity: fadeAnim }]}>
            <View style={styles.modalContent}>
              <View style={[styles.modalHeader, { backgroundColor: selectedJeu.color }]}>
                <Text style={styles.modalIcon}>{selectedJeu.icon}</Text>
                <Text style={styles.modalTitle}>{selectedJeu.titre}</Text>
              </View>
              <View style={styles.modalBody}>
                <Text style={styles.modalDescription}>{selectedJeu.description}</Text>
                <View style={styles.modalStats}>
                  <Text style={styles.modalStat}>{t('niveau')}: {getNiveauText(selectedJeu.niveau)}</Text>
                  <Text style={styles.modalStat}>{t('score')}: {selectedJeu.score}/{selectedJeu.maxScore}</Text>
                </View>
                <TouchableOpacity 
                  style={[styles.playButton, { backgroundColor: selectedJeu.color }]}
                  onPress={() => setSelectedJeu(null)}
                >
                  <Text style={styles.playButtonText}>🎮 {t('jouer')}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setSelectedJeu(null)}
                >
                  <Text style={styles.closeButtonText}>{t('fermer')}</Text>
                </TouchableOpacity>
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
    backgroundColor: '#FFF8E1',
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
    color: 'rgba(255,255,255,0.9)',
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
    borderBottomColor: '#FFE082',
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
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
  },
  tabText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#FF6B6B',
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
  jeuCard: {
    marginBottom: 16,
  },
  jeuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 20,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  jeuIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  jeuIconText: {
    fontSize: 28,
  },
  jeuInfo: {
    flex: 1,
  },
  jeuTitre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  jeuDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  jeuNiveau: {
    flexDirection: 'row',
  },
  niveauBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  niveauText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  jeuScore: {
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  scoreBar: {
    width: 60,
    height: 6,
    backgroundColor: '#e9ecef',
    borderRadius: 3,
  },
  scoreFill: {
    height: '100%',
    borderRadius: 3,
  },
  recitsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  addRecitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addRecitText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#4ECDC4',
  },
  recitCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  recitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  recitAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE082',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
  },
  recitInfo: {
    flex: 1,
  },
  recitNom: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  recitDate: {
    fontSize: 12,
    color: '#666',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  likeCount: {
    marginLeft: 2,
    fontSize: 12,
    color: '#E91E63',
    fontWeight: 'bold',
  },
  recitTitre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  recitContenu: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  recitActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#FFE082',
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
    color: '#FF6B6B',
    fontWeight: '500',
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
  modalIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
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
  modalStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  modalStat: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  playButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 12,
  },
  playButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#FFE082',
  },
  tabActive: {
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
  },
  tabTextActive: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
}); 