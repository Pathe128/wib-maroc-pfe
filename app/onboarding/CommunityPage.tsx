import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/Colors';

export default function OnboardingCommunityPage() {
  const router = useRouter();
  return (
    <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.container}>
      <View style={styles.centered}>
        <Image source={require('../../assets/images/01.jpg')} style={styles.image} />
        <Text style={styles.title}>Rejoignez la communauté WIB Maroc !</Text>
        <Text style={styles.desc}>Un réseau d'entraide et d'opportunités pour les femmes entrepreneures marocaines.</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.replace('/onboarding/OpportunitiesPage')}>
          <Text style={styles.buttonText}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  image: {
    width: 220,
    height: 160,
    borderRadius: 16,
    marginBottom: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  desc: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 40,
  },
  buttonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 