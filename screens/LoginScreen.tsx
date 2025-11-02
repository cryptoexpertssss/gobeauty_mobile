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
import { useAuth, UserRole } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Lock, Mail, AlertCircle } from 'lucide-react-native';
import { LOGO_URL } from '../constants/logo';
import { validateEmail, getEmailErrorMessage } from '../utils/validation';

type RootStackParamList = {
  Main: undefined;
  Admin: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<LoginScreenNavigationProp>();
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
        navigation.replace('Admin');
      } else {
        navigation.replace('Main');
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

// Add styles (you'll need to copy these from the original file)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  roleToggle: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 4,
    marginBottom: 32,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  roleButtonActive: {
    backgroundColor: '#2f95dc',
  },
  roleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  roleButtonTextActive: {
    color: '#fff',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputContainerError: {
    borderWidth: 1,
    borderColor: '#ff6b6b',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  errorContainer: {
    marginTop: 4,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 14,
  },
  adminHint: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  hintText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#2f95dc',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonDisabled: {
    backgroundColor: '#ccc',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});