import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../constants/Colors'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = React.useState(false)
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')
  const [error, setError] = React.useState('')

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return
    if (!emailAddress || !password) {
      setError(t('allFieldsRequired'));
      return;
    }
    
    setIsLoading(true)
    setError('')

    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      setError(err.errors?.[0]?.message || t('signUpError'))
    } finally {
      setIsLoading(false)
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded || !code) {
      setError(t('verificationCodeRequired'));
      return;
    }
    
    setIsLoading(true)
    setError('')

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2))
        setError(t('verificationFailed'))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      setError(err.errors?.[0]?.message || t('verificationError'))
    } finally {
      setIsLoading(false)
    }
  }

  if (pendingVerification) {
    return (
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        
          
          <View style={styles.card}>
            <Text style={styles.title}>{t('verifyYourEmail')}</Text>
            <Text style={styles.subtitle}>
              {t('verificationCodeSent')} {emailAddress}
            </Text>
            
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            
            <TextInput
              style={styles.input}
              value={code}
              placeholder={t('verificationCode')}
              placeholderTextColor="#999"
              onChangeText={(code) => setCode(code)}
              keyboardType="number-pad"
              autoCapitalize="none"
            />
            
            <TouchableOpacity 
              style={[styles.button, isLoading && styles.buttonDisabled]} 
              onPress={onVerifyPress}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>{t('verify')}</Text>
              )}
            </TouchableOpacity>
            
            <View style={styles.footerText}>
              <Text style={styles.footerTextBase}>
                {t('didntReceiveCode')}
              </Text>
              <TouchableOpacity onPress={onSignUpPress} disabled={isLoading}>
                <Text style={styles.footerLink}>{t('resendCode')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
         
          <Text style={styles.flowerEmoji}>🌸</Text>
          <Text style={styles.welcomeTitle}>WIB Maroc</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.title}>{t('createAccount')}</Text>
          <Text style={styles.subtitle}>
            {t('createAccountSubtitle')}
          </Text>
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <Text style={styles.label}>Votre email</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Entrer l'email"
            placeholderTextColor="#999"
            onChangeText={(email) => {
              setEmailAddress(email);
              setError('');
            }}
            keyboardType="email-address"
          />
          
          <Text style={styles.label}>Votre mot de passe</Text>
          <TextInput
            style={styles.input}
            value={password}
            placeholder={t('enterPassword')}
            placeholderTextColor="#999"
            secureTextEntry={true}
            onChangeText={(pwd) => {
              setPassword(pwd);
              setError('');
            }}
          />
          
          <TouchableOpacity 
            style={[styles.button, isLoading && styles.buttonDisabled]} 
            onPress={onSignUpPress}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>{t('continue')}</Text>
            )}
          </TouchableOpacity>
          
          <View style={styles.footerText}>
            <Text style={styles.footerTextBase}>
              {t('alreadyHaveAccount')}
            </Text>
            <Link href="/sign-in" asChild>
              <TouchableOpacity>
                <Text style={styles.footerLink}>{t('signIn')}</Text>
              </TouchableOpacity>
            </Link>
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
    padding: 25,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 180,
    height: 120,
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
    marginTop: 0,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  label: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 10,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    fontSize: 15,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    color: '#0f172a',
  },
  inputFocused: {
    borderColor: COLORS.primary,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  buttonDisabled: {
    opacity: 0.7,
    shadowOpacity: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  footerText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    flexWrap: 'wrap',
  },
  footerTextBase: {
    color: '#64748b',
    fontSize: 14,
    textAlign: 'center',
  },
  footerLink: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
    backgroundColor: '#fef2f2',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
})