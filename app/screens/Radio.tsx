import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { COLORS } from '../../constants/Colors';
import { useLanguage } from '../../constants/LanguageContext';

const mockPodcasts = [
  {
    id: '1',
    titre: 'Témoignage de Samira',
    desc: 'Samira raconte son parcours entrepreneurial en darija.',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    type: 'témoignage',
    duree: '3:20'
  },
  {
    id: '2',
    titre: 'Conte : L’oiseau et la persévérance',
    desc: 'Un conte inspirant pour la confiance en soi.',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    type: 'conte',
    duree: '2:45'
  }
];
const mockCapsules = [
  {
    id: '1',
    titre: 'Éducation financière : Gérer son budget',
    desc: 'Conseils pratiques pour mieux gérer son argent.',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    type: 'finance',
    duree: '1:30'
  },
  {
    id: '2',
    titre: 'Capsule confiance : Oser se lancer',
    desc: 'Motivation et confiance en soi pour entreprendre.',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    type: 'confiance',
    duree: '1:10'
  }
];

export default function Radio() {
  const { language, t } = useLanguage();
  const [playingId, setPlayingId] = useState<string | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const router = useRouter();

  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
  }, []);

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
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    };
  }, [language]);

  const handlePlay = async (id: string, url: string) => {
    try {
      // Stop and unload previous sound if any
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      // If clicking the same, just stop
      if (playingId === id) {
        setPlayingId(null);
        return;
      }
      // Create and play new sound
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: url });
      await newSound.setVolumeAsync(1.0);
      soundRef.current = newSound;
      setPlayingId(id);
      await newSound.playAsync();
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setPlayingId(null);
          newSound.unloadAsync();
          soundRef.current = null;
        }
      });
    } catch (error) {
      alert('Erreur lors de la lecture audio: ' + String(error));
    }
  };

  // Nettoyage du son au démontage
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    };
  }, []);

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
              <Text style={styles.headerTitle}>{t('radio')}</Text>
            </View>
            <Text style={styles.headerSubtitle}>{t('radioSubtitle')}</Text>
          </LinearGradient>
        </Animated.View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Podcasts en darija */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {language === 'fr' ? 'Podcasts en darija' : 'بودكاست بالدارجة'}
            </Text>
            {mockPodcasts.map((pod) => (
              <View key={pod.id} style={styles.audioCard}>
                <Ionicons name={pod.type === 'conte' ? 'book' : 'person'} size={22} color={COLORS.secondary} style={{ marginRight: 8 }} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.audioTitle}>{pod.titre}</Text>
                  <Text style={styles.audioDesc}>{pod.desc}</Text>
                  <Text style={styles.audioType}>{language === 'fr' ? pod.type : (pod.type === 'conte' ? 'حكاية' : 'شهادة')}</Text>
                </View>
                <TouchableOpacity onPress={() => handlePlay(pod.id, pod.url)} style={styles.playBtn}>
                  <Ionicons name={playingId === pod.id ? 'pause' : 'play'} size={24} color={COLORS.primary} />
                  <Text style={styles.audioDuration}>{pod.duree}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          {/* Capsules éducation financière & confiance */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {language === 'fr' ? 'Capsules éducatives' : 'كبسولات تعليمية'}
            </Text>
            {mockCapsules.map((cap) => (
              <View key={cap.id} style={styles.audioCard}>
                <Ionicons name={cap.type === 'finance' ? 'cash' : 'heart'} size={22} color={cap.type === 'finance' ? COLORS.primary : COLORS.secondary} style={{ marginRight: 8 }} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.audioTitle}>{cap.titre}</Text>
                  <Text style={styles.audioDesc}>{cap.desc}</Text>
                  <Text style={styles.audioType}>{language === 'fr' ? (cap.type === 'finance' ? 'Éducation financière' : 'Confiance en soi') : (cap.type === 'finance' ? 'مالية' : 'ثقة بالنفس')}</Text>
                </View>
                <TouchableOpacity onPress={() => handlePlay(cap.id, cap.url)} style={styles.playBtn}>
                  <Ionicons name={playingId === cap.id ? 'pause' : 'play'} size={24} color={COLORS.primary} />
                  <Text style={styles.audioDuration}>{cap.duree}</Text>
                </TouchableOpacity>
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
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  audioCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 12, shadowColor: 'rgba(0,0,0,0.04)', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 1 },
  audioTitle: { fontSize: 15, color: '#333', fontWeight: 'bold' },
  audioDesc: { fontSize: 13, color: '#666', marginBottom: 2 },
  audioType: { fontSize: 12, color: '#999', marginBottom: 2 },
  playBtn: { alignItems: 'center', marginLeft: 10 },
  audioDuration: { fontSize: 11, color: '#999', marginTop: 2 },
}); 