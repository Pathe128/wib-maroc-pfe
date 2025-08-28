import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { COLORS } from '../../constants/Colors';
import { useLanguage } from '../../constants/LanguageContext';
import { aiService } from '../../services/AIService';

export default function Idee() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const [idea, setIdea] = useState('');
  const [summary, setSummary] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
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

  const handleSend = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    setSummary('');
    setSuggestions([]);
    try {
      // Prompt IA multilingue
      const prompt = t('idee_prompt', { idea });
      const response = await aiService.generateResponse(prompt, { language, conversationHistory: [] });
      setSummary(response.text);
      setSuggestions(response.suggestions || []);
    } catch (e) {
      setSummary(t('idee_error'));
    }
    setLoading(false);
  };

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
              <Text style={styles.headerTitle}>{t('idee')}</Text>
            </View>
            <Text style={styles.headerSubtitle}>{t('ideeSubtitle')}</Text>
          </LinearGradient>
        </Animated.View>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
          {/* Champ idée */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('idee_describe')}</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder={t('idee_placeholder')}
                placeholderTextColor="#999"
                value={idea}
                onChangeText={setIdea}
                multiline
              />
              <TouchableOpacity style={styles.micButton} disabled>
                <Ionicons name="mic-outline" size={22} color="#bbb" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.sendButton, !idea.trim() && { opacity: 0.5 }]}
              onPress={handleSend}
              disabled={!idea.trim() || loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.sendButtonText}>{t('idee_send')}</Text>
              )}
            </TouchableOpacity>
          </View>
          {/* Résumé IA */}
          {summary ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('idee_summary')}</Text>
              <Text style={styles.summary}>{summary}</Text>
            </View>
          ) : null}
          {/* Suggestions IA */}
          {suggestions.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('idee_suggestions')}</Text>
              {suggestions.map((s, idx) => (
                <TouchableOpacity key={idx} style={styles.suggestionBtn}>
                  <Text style={styles.suggestionText}>{s}</Text>
                </TouchableOpacity>
              ))}
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
  inputRow: { flexDirection: 'row', alignItems: 'flex-end' },
  input: { flex: 1, backgroundColor: '#fff', borderRadius: 8, padding: 12, fontSize: 15, borderWidth: 1, borderColor: '#eee', minHeight: 48, maxHeight: 120, marginRight: 8 },
  micButton: { backgroundColor: '#f3f3f3', borderRadius: 20, padding: 8 },
  sendButton: { backgroundColor: COLORS.primary, borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginTop: 12 },
  sendButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  summary: { fontSize: 15, color: '#4caf50', marginTop: 4 },
  suggestionBtn: { backgroundColor: COLORS.secondary + '20', borderRadius: 8, padding: 10, marginBottom: 8 },
  suggestionText: { color: COLORS.secondary, fontWeight: '600', fontSize: 15 },
}); 