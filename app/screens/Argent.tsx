import { useLanguage } from '@/constants/LanguageContext';
import { Ionicons } from '@expo/vector-icons';
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

const mockTransactionsPerso = [
  { id: '1', type: 'income', label_fr: 'Salaire', label_ar: 'راتب', amount: 3000, date: '2024-06-01' },
  { id: '2', type: 'expense', label_fr: 'Courses', label_ar: 'مشتريات', amount: -400, date: '2024-06-03' },
  { id: '3', type: 'expense', label_fr: 'Transport', label_ar: 'نقل', amount: -150, date: '2024-06-04' },
];
const mockTransactionsPro = [
  { id: '1', type: 'income', label_fr: 'Vente artisanat', label_ar: 'بيع الحرف اليدوية', amount: 500, date: '2024-06-05' },
  { id: '2', type: 'expense', label_fr: 'Internet', label_ar: 'الإنترنت', amount: -100, date: '2024-06-06' },
  { id: '3', type: 'expense', label_fr: 'Fournitures', label_ar: 'مستلزمات', amount: -200, date: '2024-06-07' },
];
const tips = [
  { fr: 'Mettez de côté 10% de chaque revenu.', ar: 'ادخر 10% من كل دخل.' },
  { fr: 'Évitez les achats impulsifs.', ar: 'تجنب المشتريات العشوائية.' },
  { fr: 'Tenez un carnet de dépenses.', ar: 'احتفظ بدفتر للمصروفات.' },
  { fr: 'Comparez les prix avant d’acheter.', ar: 'قارن الأسعار قبل الشراء.' }
];
const mockReminders = [
  { id: '1', text_fr: 'Payer la facture électricité', text_ar: 'دفع فاتورة الكهرباء', date: '2024-06-10' },
  { id: '2', text_fr: 'Transférer vers épargne', text_ar: 'تحويل إلى الادخار', date: '2024-06-12' },
];
const savingGoal = { target: 5000, current: 1800 };

function getBalance(transactions: { amount: number }[]): number {
  return transactions.reduce((sum: number, t: { amount: number }) => sum + t.amount, 0);
}

export default function Argent() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const [mode, setMode] = useState<'perso' | 'pro'>('perso');
  const [transactionsPerso] = useState(mockTransactionsPerso);
  const [transactionsPro] = useState(mockTransactionsPro);
  const [reminders] = useState(mockReminders);
  const [goal] = useState(savingGoal);
  const [isRecording, setIsRecording] = useState(false);

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

  const transactions = mode === 'perso' ? transactionsPerso : transactionsPro;
  const balance = getBalance(transactions);
  const graphData = transactions.slice(-7).map(t => t.amount);
  const maxAbs = Math.max(...graphData.map(Math.abs), 1);
  const progress = Math.min(goal.current / goal.target, 1);

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
              <Text style={styles.headerTitle}>{t('argent')}</Text>
            </View>
            <Text style={styles.headerSubtitle}>{t('argentSubtitle')}</Text>
          </LinearGradient>
        </Animated.View>
        {/* Switch Perso/Pro + Micro */}
        <View style={[styles.switchRow, { paddingHorizontal: 16 }]}>
          <TouchableOpacity
            style={[styles.switchButton, mode === 'perso' && styles.switchActive]}
            onPress={() => setMode('perso')}
          >
            <Text style={[styles.switchText, mode === 'perso' && styles.switchTextActive]}>{t('argent_perso')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.switchButton, mode === 'pro' && styles.switchActive]}
            onPress={() => setMode('pro')}
          >
            <Text style={[styles.switchText, mode === 'pro' && styles.switchTextActive]}>{t('argent_pro')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.micButton}
            onPress={() => setIsRecording(r => !r)}
          >
            <Ionicons name={isRecording ? 'mic' : 'mic-outline'} size={24} color={isRecording ? COLORS.primary : '#666'} />
            <Text style={styles.micLabel}>{isRecording ? t('argent_recording') : t('argent_voice')}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
          {/* Solde */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{mode === 'perso' ? t('argent_solde_perso') : t('argent_solde_pro')}</Text>
            <Text style={[styles.balance, { color: balance >= 0 ? '#4caf50' : '#d32f2f' }]}>
              {balance >= 0 ? '+ ' : '- '}{Math.abs(balance).toLocaleString()} MAD
            </Text>
          </View>
          {/* Objectif d'épargne visuelle */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('argent_goal')}</Text>
            <View style={styles.goalBarBg}>
              <View style={[styles.goalBar, { width: `${progress * 100}%` }]} />
            </View>
            <Text style={styles.goalText}>{t('argent_progress', { progress: Math.round(progress * 100), current: goal.current, target: goal.target })}</Text>
          </View>
          {/* Transactions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('argent_last_transactions')}</Text>
            <FlatList
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.transactionRow}>
                  <Text style={[styles.transactionAmount, { color: item.amount >= 0 ? '#4caf50' : '#d32f2f' }]}> 
                    {item.amount >= 0 ? '+ ' : '- '}{Math.abs(item.amount)} MAD
                  </Text>
                  <Text style={styles.transactionLabel}>{language === 'fr' ? item.label_fr : item.label_ar}</Text>
                  <Text style={styles.transactionDate}>{item.date}</Text>
                </View>
              )}
              scrollEnabled={false}
            />
          </View>
          {/* Graphique d'évolution */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('argent_evolution')}</Text>
            <View style={styles.graphContainer}>
              {graphData.map((val, idx) => (
                <View key={idx} style={styles.graphBarContainer}>
                  <View style={[styles.graphBar, {
                    height: 40 * Math.abs(val) / maxAbs,
                    backgroundColor: val >= 0 ? '#4caf50' : '#d32f2f',
                    marginTop: val >= 0 ? 40 - 40 * Math.abs(val) / maxAbs : 40,
                  }]} />
                  <Text style={styles.graphLabel}>{val >= 0 ? '+' : '-'}{Math.abs(val)}</Text>
                </View>
              ))}
            </View>
          </View>
          {/* Conseils d'épargne */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('argent_tips')}</Text>
            {tips.map((tip, idx) => (
              <Text key={idx} style={styles.tip}>{language === 'fr' ? tip.fr : tip.ar}</Text>
            ))}
          </View>
          {/* Rappels vocaux */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('argent_reminders')}</Text>
            {reminders.map((rem) => (
              <View key={rem.id} style={styles.reminderRow}>
                <Ionicons name="volume-high" size={18} color={COLORS.secondary} style={{ marginRight: 8 }} />
                <Text style={styles.reminderText}>{language === 'fr' ? rem.text_fr : rem.text_ar}</Text>
                <Text style={styles.reminderDate}>{rem.date}</Text>
              </View>
            ))}
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
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    padding: 4,
    elevation: 2,
    shadowColor: 'rgba(0,0,0,0.04)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  switchButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 12,
  },
  switchActive: {
    backgroundColor: COLORS.primary + '20',
  },
  switchText: {
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
  },
  switchTextActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  micButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    backgroundColor: '#f3f3f3',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  micLabel: {
    marginLeft: 6,
    fontSize: 13,
    color: '#666',
  },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  balance: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  goalBarBg: {
    width: '100%',
    height: 16,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginBottom: 6,
    overflow: 'hidden',
  },
  goalBar: {
    height: 16,
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
  },
  goalText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  transactionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, backgroundColor: '#fff', borderRadius: 8, padding: 8, shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 1 },
  transactionAmount: { fontSize: 14, fontWeight: '600', width: 80 },
  transactionLabel: { fontSize: 14, color: '#333', flex: 1, textAlign: 'center' },
  transactionDate: { fontSize: 12, color: '#999', width: 80, textAlign: 'right' },
  tip: { fontSize: 14, color: '#FFC107', marginBottom: 4 },
  graphContainer: { flexDirection: 'row', alignItems: 'flex-end', height: 60, marginBottom: 8 },
  graphBarContainer: { alignItems: 'center', width: 30 },
  graphBar: { width: 16, borderRadius: 4 },
  graphLabel: { fontSize: 10, color: '#666', marginTop: 2 },
  reminderRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, padding: 8, marginBottom: 6, shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 1 },
  reminderText: { fontSize: 14, color: '#333', flex: 1 },
  reminderDate: { fontSize: 12, color: '#999', width: 80, textAlign: 'right' },
}); 