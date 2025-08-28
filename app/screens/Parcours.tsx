import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { COLORS } from '../../constants/Colors';
import { useLanguage } from '../../constants/LanguageContext';

const mockCredits = [
  { id: '1', amount: 5000, organisme_fr: 'Al Amana', organisme_ar: 'الأمانة', date: '2023-10-12', status: 'accordé' },
  { id: '2', amount: 8000, organisme_fr: 'Crédit Agricole', organisme_ar: 'القرض الفلاحي', date: '2024-02-20', status: 'remboursé' },
];
const mockFormations = [
  { id: '1', titre_fr: 'Gestion financière', titre_ar: 'الإدارة المالية', organisme_fr: 'WIB Academy', organisme_ar: 'أكاديمية WIB', date: '2023-09-01', status: 'validée' },
  { id: '2', titre_fr: 'Marketing digital', titre_ar: 'التسويق الرقمي', organisme_fr: 'ANAPEC', organisme_ar: 'أنابيك', date: '2024-01-15', status: 'en cours' },
];
const mockBadges = [
  { id: '1', icon: 'star', color: '#FFC107', titre_fr: '1er stock vendu', titre_ar: 'أول مخزون مباع', desc_fr: 'Bravo pour votre première vente !', desc_ar: 'مبروك على أول عملية بيع!', date: '2023-11-05' },
  { id: '2', icon: 'school', color: '#9333EA', titre_fr: '1ère formation validée', titre_ar: 'أول تكوين ناجح', desc_fr: 'Vous avez validé votre première formation.', desc_ar: 'لقد أنهيت أول تكوين بنجاح.', date: '2023-09-01' },
  { id: '3', icon: 'target', color: '#4caf50', titre_fr: 'Objectif atteint', titre_ar: 'تحقيق الهدف', desc_fr: 'Vous avez atteint un objectif d’épargne.', desc_ar: 'لقد حققت هدف الادخار.', date: '2024-03-10' },
];

export default function Parcours() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const [credits] = useState(mockCredits);
  const [formations] = useState(mockFormations);
  const [badges] = useState(mockBadges);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

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
  }, [language]);

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
              <Text style={styles.headerTitle}>{t('parcours')}</Text>
            </View>
            <Text style={styles.headerSubtitle}>{t('parcoursSubtitle')}</Text>
          </LinearGradient>
        </Animated.View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Historique crédits */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('history_credits')}</Text>
            <FlatList
              data={credits}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.creditRow}>
                  <Ionicons name="card" size={22} color={COLORS.secondary} style={{ marginRight: 8 }} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.creditLabel}>
                      {language === 'fr' ? item.organisme_fr : item.organisme_ar} - {item.amount} MAD
                    </Text>
                    <Text style={styles.creditStatus}>
                      {language === 'fr' ? item.status : (item.status === 'accordé' ? 'ممنوح' : 'مُسدد')} • {item.date}
                    </Text>
                  </View>
                </View>
              )}
              scrollEnabled={false}
            />
          </View>
          {/* Historique formations */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('followed_trainings')}</Text>
            <FlatList
              data={formations}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.formationRow}>
                  <MaterialCommunityIcons name="school" size={22} color={COLORS.primary} style={{ marginRight: 8 }} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formationLabel}>
                      {language === 'fr' ? item.titre_fr : item.titre_ar} - {language === 'fr' ? item.organisme_fr : item.organisme_ar}
                    </Text>
                    <Text style={styles.formationStatus}>
                      {language === 'fr' ? item.status : (item.status === 'validée' ? 'مصادق عليها' : 'قيد التنفيذ')} • {item.date}
                    </Text>
                  </View>
                </View>
              )}
              scrollEnabled={false}
            />
          </View>
          {/* Badges de progrès */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('progress_badges')}</Text>
            <View style={styles.badgesContainer}>
              {badges.map((badge) => (
                <View key={badge.id} style={[styles.badgeCard, { borderLeftColor: badge.color }]}> 
                  <Ionicons name={badge.icon as any} size={28} color={badge.color} style={{ marginRight: 10 }} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.badgeTitle}>{language === 'fr' ? badge.titre_fr : badge.titre_ar}</Text>
                    <Text style={styles.badgeDesc}>{language === 'fr' ? badge.desc_fr : badge.desc_ar}</Text>
                    <Text style={styles.badgeDate}>{badge.date}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
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
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  creditRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 8, shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 1 },
  creditLabel: { fontSize: 15, color: '#333', fontWeight: '600' },
  creditStatus: { fontSize: 13, color: '#999' },
  formationRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 8, shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 1 },
  formationLabel: { fontSize: 15, color: '#333', fontWeight: '600' },
  formationStatus: { fontSize: 13, color: '#999' },
  badgesContainer: { flexDirection: 'column' },
  badgeCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 10, borderLeftWidth: 5, shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 1 },
  badgeTitle: { fontSize: 15, color: '#333', fontWeight: 'bold' },
  badgeDesc: { fontSize: 13, color: '#666', marginBottom: 2 },
  badgeDate: { fontSize: 12, color: '#999' },
}); 