import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
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
} from 'react-native';
import { COLORS } from '../../constants/Colors';

export default function ResetPasswordScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const { t } = useTranslation();
  const [code, setCode] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const onResetPasswordPress = async () => {
    if (!isLoaded) return;
    if (!code || !password || !confirmPassword) {
      setError(t('allFieldsRequired'));
      return;
    }
    if (password !== confirmPassword) {
      setError(t('passwordsDoNotMatch'));
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      });

      if (result.status === 'complete') {
        if (setActive) {
            await setActive({ session: result.createdSessionId });
        } else {
            // Gérer le cas où setActive n'est pas disponible
            setError(t('sessionError'));
        }
        router.replace('/');
      } else {
        console.error(JSON.stringify(result, null, 2));
        setError(t('resetPasswordError'));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError(err.errors?.[0]?.message || t('resetPasswordError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.title}>{t('resetPassword')}</Text>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('resetCode')}</Text>
            <TextInput
              style={styles.input}
              value={code}
              placeholder={t('enterResetCode')}
              placeholderTextColor="#999"
              onChangeText={setCode}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('newPassword')}</Text>
            <TextInput
              style={styles.input}
              value={password}
              placeholder={t('enterNewPassword')}
              placeholderTextColor="#999"
              secureTextEntry
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('confirmNewPassword')}</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              placeholder={t('confirmNewPassword')}
              placeholderTextColor="#999"
              secureTextEntry
              onChangeText={setConfirmPassword}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={onResetPasswordPress}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>{t('resetPassword')}</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
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
      errorText: {
        color: '#dc3545',
        marginBottom: 15,
        textAlign: 'center' as const,
      }
});
