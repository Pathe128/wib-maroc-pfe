import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/Colors';

export default function OnboardingIntro() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/onboarding/CommunityPage');
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.container}>
      <View style={styles.centered}>
        <Text style={styles.logo}>🌸</Text>
        <Text style={styles.title}>WIB Maroc</Text>
        <Text style={styles.desc}>Women in Business</Text>
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
  },
  logo: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  desc: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.85,
    fontStyle: 'italic',
  },
}); 