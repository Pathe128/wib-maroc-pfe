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

interface Group {
  id: string;
  name: string;
  region: string;
  profession: string;
  members: number;
  icon: string;
  color: string;
}

interface Member {
  id: string;
  name: string;
  profession: string;
  region: string;
  avatar: string;
  isMentor: boolean;
  rating: number;
  projects: number;
}

const groups: Group[] = [
  { id: '1', name: 'Entrepreneurs Casablanca', region: 'Casablanca', profession: 'Entrepreneuriat', members: 156, icon: '🏢', color: '#4CAF50' },
  { id: '2', name: 'Tech Maroc', region: 'Rabat', profession: 'Technologie', members: 89, icon: '💻', color: '#2196F3' },
  { id: '3', name: 'Artisans Fès', region: 'Fès', profession: 'Artisanat', members: 234, icon: '🛠️', color: '#FF9800' },
  { id: '4', name: 'Commerce Marrakech', region: 'Marrakech', profession: 'Commerce', members: 178, icon: '🛍️', color: '#9C27B0' },
  { id: '5', name: 'Services Tanger', region: 'Tanger', profession: 'Services', members: 92, icon: '🎯', color: '#E91E63' },
  { id: '6', name: 'Agriculture Agadir', region: 'Agadir', profession: 'Agriculture', members: 145, icon: '🌾', color: '#795548' },
];

const members: Member[] = [
  { id: '1', name: 'Amina Benali', profession: 'Entrepreneure Tech', region: 'Casablanca', avatar: '👩‍💼', isMentor: true, rating: 4.8, projects: 12 },
  { id: '2', name: 'Karim Alami', profession: 'Consultant Finance', region: 'Rabat', avatar: '👨‍💼', isMentor: true, rating: 4.9, projects: 18 },
  { id: '3', name: 'Fatima Zahra', profession: 'Artisane Céramique', region: 'Fès', avatar: '👩‍🎨', isMentor: false, rating: 4.7, projects: 8 },
  { id: '4', name: 'Hassan Tazi', profession: 'Expert Marketing', region: 'Marrakech', avatar: '👨‍💻', isMentor: true, rating: 4.6, projects: 15 },
  { id: '5', name: 'Nadia El Fassi', profession: 'Coach Business', region: 'Tanger', avatar: '👩‍🏫', isMentor: true, rating: 4.9, projects: 22 },
  { id: '6', name: 'Mohammed Berrada', profession: 'Agriculteur Bio', region: 'Agadir', avatar: '👨‍🌾', isMentor: false, rating: 4.5, projects: 6 },
];

export default function Communaute() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [selectedTab, setSelectedTab] = useState<'groups' | 'members' | 'mentorship'>('groups');

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

  const renderGroup = ({ item }: { item: Group }) => (
    <Animated.View style={[styles.groupCard, { opacity: fadeAnim }]}>
      <View style={[styles.groupIcon, { backgroundColor: item.color }]}>
        <Text style={styles.groupIconText}>{item.icon}</Text>
      </View>
      <View style={styles.groupInfo}>
        <Text style={styles.groupName}>{item.name}</Text>
        <Text style={styles.groupDetails}>
          {item.region} • {item.profession}
        </Text>
        <View style={styles.groupStats}>
          <Ionicons name="people" size={16} color="#666" />
          <Text style={styles.memberCount}>{item.members} membres</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.joinButton}>
        <Text style={styles.joinButtonText}>Rejoindre</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderMember = ({ item }: { item: Member }) => (
    <Animated.View style={[styles.memberCard, { opacity: fadeAnim }]}>
      <View style={styles.memberAvatar}>
        <Text style={styles.avatarText}>{item.avatar}</Text>
        {item.isMentor && (
          <View style={styles.mentorBadge}>
            <Ionicons name="star" size={12} color="#FFD700" />
          </View>
        )}
      </View>
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{item.name}</Text>
        <Text style={styles.memberProfession}>{item.profession}</Text>
        <Text style={styles.memberRegion}>{item.region}</Text>
        <View style={styles.memberStats}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.projectsText}>{item.projects} projets</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.contactButton}>
        <Ionicons name="chatbubble-outline" size={20} color={COLORS.primary} />
      </TouchableOpacity>
    </Animated.View>
  );

  const renderMentorshipCard = () => (
    <Animated.View style={[styles.mentorshipCard, { opacity: fadeAnim }]}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={styles.mentorshipGradient}
      >
        <View style={styles.mentorshipContent}>
          <Text style={styles.mentorshipIcon}>🤝</Text>
          <Text style={styles.mentorshipTitle}>Programme de Parrainage</Text>
          <Text style={styles.mentorshipDescription}>
            Connectez-vous avec des mentors expérimentés pour développer votre projet
          </Text>
          <View style={styles.mentorshipStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>45</Text>
              <Text style={styles.statLabel}>Mentors</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>128</Text>
              <Text style={styles.statLabel}>Mentorés</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>89%</Text>
              <Text style={styles.statLabel}>Réussite</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.mentorshipButton}>
            <Text style={styles.mentorshipButtonText}>Devenir Mentor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mentorshipButtonSecondary}>
            <Text style={styles.mentorshipButtonSecondaryText}>Trouver un Mentor</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Animated.View>
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
              <Text style={styles.headerTitle}>{t('communaute')}</Text>
            </View>
            <Text style={styles.headerSubtitle}>{t('communauteSubtitle')}</Text>
          </LinearGradient>
        </Animated.View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'groups' && styles.activeTab]}
            onPress={() => setSelectedTab('groups')}
          >
            <Ionicons 
              name="people" 
              size={20} 
              color={selectedTab === 'groups' ? COLORS.primary : '#666'} 
            />
            <Text style={[styles.tabText, selectedTab === 'groups' && styles.activeTabText]}>
              Groupes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'members' && styles.activeTab]}
            onPress={() => setSelectedTab('members')}
          >
            <Ionicons 
              name="person" 
              size={20} 
              color={selectedTab === 'members' ? COLORS.primary : '#666'} 
            />
            <Text style={[styles.tabText, selectedTab === 'members' && styles.activeTabText]}>
              Membres
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'mentorship' && styles.activeTab]}
            onPress={() => setSelectedTab('mentorship')}
          >
            <Ionicons 
              name="star" 
              size={20} 
              color={selectedTab === 'mentorship' ? COLORS.primary : '#666'} 
            />
            <Text style={[styles.tabText, selectedTab === 'mentorship' && styles.activeTabText]}>
              Parrainage
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {selectedTab === 'groups' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Groupes par Région & Métier</Text>
              <FlatList
                data={groups}
                renderItem={renderGroup}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
              />
            </View>
          )}

          {selectedTab === 'members' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Portraits de la Communauté</Text>
              <FlatList
                data={members}
                renderItem={renderMember}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
              />
            </View>
          )}

          {selectedTab === 'mentorship' && (
            <View style={styles.section}>
              {renderMentorshipCard()}
            </View>
          )}
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  groupCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  groupIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  groupIconText: {
    fontSize: 24,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  groupDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  groupStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberCount: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  joinButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  memberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  avatarText: {
    fontSize: 24,
  },
  mentorBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#333',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  memberProfession: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  memberRegion: {
    fontSize: 12,
    color: '#999',
    marginBottom: 6,
  },
  memberStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 2,
  },
  projectsText: {
    fontSize: 12,
    color: '#666',
  },
  contactButton: {
    padding: 8,
  },
  mentorshipCard: {
    marginBottom: 20,
  },
  mentorshipGradient: {
    borderRadius: 20,
    padding: 24,
  },
  mentorshipContent: {
    alignItems: 'center',
  },
  mentorshipIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  mentorshipTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  mentorshipDescription: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  mentorshipStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 16,
  },
  mentorshipButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  mentorshipButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  mentorshipButtonSecondary: {
    borderWidth: 2,
    borderColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  mentorshipButtonSecondaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 