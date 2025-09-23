import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { COLORS } from '../../constants/Colors'

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = React.useState(false)
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const [showForgotPassword, setShowForgotPassword] = React.useState(false)
  const [resetEmail, setResetEmail] = React.useState('')
  const [resetLoading, setResetLoading] = React.useState(false)

  const onSignInPress = async () => {
    if (!isLoaded) return
    if (!emailAddress || !password) {
      setError(t('allFieldsRequired'))
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
        setError(t('signInError'))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      const errorMessage = err.errors?.[0]?.message || t('signInError')
      if (errorMessage.includes('password') || errorMessage.includes('credentials')) {
        setError('Email ou mot de passe incorrect. Vérifiez vos identifiants et réessayez.')
      } else {
        setError(errorMessage)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const onForgotPasswordPress = async () => {
    if (!resetEmail.trim()) {
      setError('Veuillez saisir votre adresse email')
      return
    }

    setResetLoading(true)
    setError('')

    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: resetEmail,
      })
      router.push({ pathname: '/reset-password' } as any);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      const errorMessage = err.errors?.[0]?.message || 'Erreur lors de l\'envoi du code'
      setError(errorMessage)
    } finally {
      setResetLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          
          <Text style={styles.flowerEmoji}>🌸</Text>
          <Text style={styles.welcomeTitle}>WIB Maroc</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.title}>{t('welcome')}</Text>
          <Text style={styles.subtitle}>{t('signInToContinue')}</Text>
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('email')}</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              value={emailAddress}
              placeholder={t('enterEmail')}
              placeholderTextColor="#999"
              onChangeText={setEmailAddress}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('password')}</Text>
            <TextInput
              style={styles.input}
              value={password}
              placeholder={t('enterPassword')}
              placeholderTextColor="#999"
              secureTextEntry
              onChangeText={setPassword}
              onSubmitEditing={onSignInPress}
              returnKeyType="go"
            />
            <TouchableOpacity onPress={() => setShowForgotPassword(!showForgotPassword)} style={{alignSelf: 'flex-end', marginTop: 10}}>
                <Text style={styles.link}>{t('forgotPassword')}</Text>
            </TouchableOpacity>
          </View>

          {showForgotPassword && (
            <View style={styles.inputContainer}>
                <Text style={styles.label}>{t('resetPassword')}</Text>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={resetEmail}
                    placeholder={t('enterEmail')}
                    placeholderTextColor="#999"
                    onChangeText={setResetEmail}
                />
                <TouchableOpacity 
                    style={[styles.button, resetLoading && styles.buttonDisabled]} 
                    onPress={onForgotPasswordPress}
                    disabled={resetLoading}
                >
                    {resetLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>{t('sendResetCode')}</Text>
                    )}
                </TouchableOpacity>
            </View>
          )}
          
          <TouchableOpacity 
            style={[styles.button, isLoading && styles.buttonDisabled]} 
            onPress={onSignInPress}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>{t('signIn')}</Text>
            )}
          </TouchableOpacity>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {t('dontHaveAccount')}{' '}
              <Link href="/sign-up" asChild>
                <Text style={styles.link}>{t('signUp')}</Text>
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7ff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 100,
    marginBottom: 10,
  },
  flowerEmoji: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 5,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    marginTop: 25,
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 15,
  },
  link: {
    color: COLORS.primary,
    fontWeight: '600',
    textDecorationLine: 'none' as const,
  },
  errorContainer: {
    backgroundColor: '#fff5f5',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#dc3545',
  },
  errorText: {
    color: '#dc3545',
    marginBottom: 15,
    textAlign: 'center' as const,
  }
});