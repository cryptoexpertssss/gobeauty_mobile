import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { Lock, Mail, AlertCircle } from 'lucide-react-native';
import { LOGO_URL } from '@/constants/logo';
import { validateEmail, getEmailErrorMessage } from '@/utils/validation';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { login } = useAuth();
  const [role, setRole] = useState<UserRole>('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState<string>('');

  const handleEmailBlur = () => {
    if (email && !validateEmail(email)) {
      setEmailError(getEmailErrorMessage(email));
    } else {
      setEmailError('');
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    // Clear error when user starts typing
    if (emailError) {
      setEmailError('');
    }
  };

  const handleLogin = async () => {
    // Validate email
    if (!validateEmail(email)) {
      setEmailError(getEmailErrorMessage(email));
      return;
    }

    if (!password) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }

    setIsLoading(true);
    const result = await login(email, password, role);
    setIsLoading(false);

    if (result.success) {
      if (role === 'admin') {
        router.replace('/admin');
      } else {
        router.replace('/(tabs)');
      }
    } else {
      Alert.alert('Error', result.error || 'Login failed');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.content, { paddingTop: insets.top + 40 }]}>
        <View style={styles.header}>
          <View style={styles.logoImageContainer}>
            <Image source={{ uri: LOGO_URL }} style={styles.logoImage} resizeMode="contain" />
          </View>
          <Text style={styles.title}>Welcome to Go Beauty</Text>
          <Text style={styles.subtitle}>
            {role === 'admin' 
              ? 'Admin Portal - Manage appointments'
              : 'Book beauty services with top professionals'}
          </Text>
        </View>

        <View style={styles.roleToggle}>
          <TouchableOpacity
            style={[styles.roleButton, role === 'client' && styles.roleButtonActive]}
            onPress={() => setRole('client')}
          >
            <Text style={[styles.roleButtonText, role === 'client' && styles.roleButtonTextActive]}>
              Client
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roleButton, role === 'admin' && styles.roleButtonActive]}
            onPress={() => setRole('admin')}
          >
            <Text style={[styles.roleButtonText, role === 'admin' && styles.roleButtonTextActive]}>
              Admin
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View>
            <View style={[styles.inputContainer, emailError && styles.inputContainerError]}>
              <Mail color={emailError ? "#EF4444" : "#9CA3AF"} size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={handleEmailChange}
                onBlur={handleEmailBlur}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
            {emailError ? (
              <View style={styles.errorContainer}>
                <AlertCircle color="#EF4444" size={14} />
                <Text style={styles.errorText}>{emailError}</Text>
              </View>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Lock color="#9CA3AF" size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {role === 'admin' && (
            <View style={styles.adminHint}>
              <Text style={styles.adminHintText}>
                Demo: admin@gobeauty.com / admin123
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.loginButton,
              (isLoading || (email && !validateEmail(email))) && styles.loginButtonDisabled
            ]}
            onPress={handleLogin}
            disabled={isLoading || (email && !validateEmail(email))}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.loginButtonText}>
                {role === 'admin' ? 'Login as Admin' : 'Continue'}
              </Text>
            )}
          </TouchableOpacity>

          {role === 'client' && (
            <Text style={styles.disclaimer}>
              By continuing, you agree to our Terms & Privacy Policy
            </Text>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoImageContainer: {
    width: 240,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: '#1F2937',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  roleToggle: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 4,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  roleButtonActive: {
    backgroundColor: '#FF6B9D',
  },
  roleButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#6B7280',
  },
  roleButtonTextActive: {
    color: '#FFFFFF',
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputContainerError: {
    borderColor: '#EF4444',
    shadowColor: '#EF4444',
    shadowOpacity: 0.1,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 4,
    gap: 6,
  },
  errorText: {
    fontSize: 13,
    color: '#EF4444',
    fontWeight: '500' as const,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  adminHint: {
    backgroundColor: '#FFF7ED',
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  adminHintText: {
    fontSize: 14,
    color: '#92400E',
    fontWeight: '500' as const,
  },
  loginButton: {
    backgroundColor: '#FF6B9D',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
  disclaimer: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 8,
  },
});
