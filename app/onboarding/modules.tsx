import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppHeader } from '../../components/AppHeader';
import { COLORS } from '../../constants/Colors';
import { useLanguage } from '../../constants/LanguageContext';

const modules = [
  { titleKey: 'coachWIB', route: 'screens/CoachWIB', icon: '🤖' },
  { titleKey: 'bourse', route: 'screens/Bourse', icon: '📍' },
  { titleKey: 'argent', route: 'screens/Argent', icon: '💰' },
  { titleKey: 'idee', route: 'screens/Idee', icon: '💡' },
  { titleKey: 'parcours', route: 'screens/Parcours', icon: '🏅' },
  { titleKey: 'radio', route: 'screens/Radio', icon: '📻' },
  { titleKey: 'communaute', route: 'screens/Communaute', icon: '👩‍👩‍👧‍👧' },
  { titleKey: 'enfants', route: 'screens/Enfants', icon: '🧒' },
  { titleKey: 'demarches', route: 'screens/Demarches', icon: '📝' },
  { titleKey: 'seminaire', route: 'screens/Seminaire', icon: '🎤' },
];

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;
const itemWidth = (screenWidth - 48) / numColumns;

export default function OnboardingModules() {
  const router = useRouter();
  const { t, language, setLanguage } = useLanguage();

  const languages = [
    { code: 'fr', flag: '🇫🇷' },
    { code: 'ar', flag: '🇸🇦' }
  ];

  const nextLanguage = () => {
    const currentIndex = languages.findIndex(lang => lang.code === language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex].code as any);
  };

  // Ajout de la fonction pour réinitialiser l'onboarding
  const resetOnboarding = async () => {
    await AsyncStorage.removeItem('hasSeenOnboarding');
    router.replace('/onboarding');
  };

  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.secondary]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <AppHeader title={t('discovery')} />
      
      <View style={styles.headerContainer}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.languageButton} onPress={nextLanguage}>
            <Text style={styles.languageFlag}>
              {languages.find(lang => lang.code === language)?.flag}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Bouton pour réinitialiser l'onboarding */}
        <TouchableOpacity style={styles.onboardingButton} onPress={resetOnboarding}>
          <Text style={styles.onboardingButtonText}>Voir l'onboarding</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{t('welcome')}</Text>
        <Text style={styles.subtitle}>{t('subtitle')}</Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.gridContainer}>
          {modules.map((item) => (
            <TouchableOpacity
              key={item.route}
              style={[styles.iconButton, { width: itemWidth }]}
              onPress={() => router.push(`/${item.route}` as any)}
              activeOpacity={0.85}
            >
              <Text style={styles.icon}>{item.icon}</Text>
              <Text style={styles.iconLabel}>{t(item.titleKey as any)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  languageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageFlag: {
    fontSize: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
  },
  iconButton: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 24,
    marginBottom: 16,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    fontSize: 38,
    marginBottom: 8,
  },
  iconLabel: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 4,
    lineHeight: 16,
  },
  // Ajout des styles pour le bouton onboarding
  onboardingButton: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  onboardingButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
