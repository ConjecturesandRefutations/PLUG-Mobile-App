import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../components/Footer';
import { API_BASE_URL } from '../constants/api';
import { useAuth } from '../context/AuthContext';
import { authStyles as styles } from '../styles/authStyles';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Required Fields', 'Please enter both email and password.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/authentication/api_login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password,
        }),
      });

      const rawText = await response.text();
      console.log('=== RAW SERVER RESPONSE ===');
      console.log(rawText);

      const data = JSON.parse(rawText);

      if (response.ok && data.success) {
        await login(data.data);
        router.replace('/');
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid email or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        'Connection Error',
        'Could not connect to the server or server returned an unexpected format.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    /* 1. Restrict edges to top, left, right so bottom safe area is handled solely by the Footer layout */
    <SafeAreaView style={[styles.container, { flex: 1 }]} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={[styles.keyboardView, { flex: 1 }]}
      >
        <ScrollView
          style={{ flex: 1 }}
          /* 2. flexGrow ensures full utilization of available height while enabling scrolling if needed */
          contentContainerStyle={[
            styles.scrollContainer,
            { flexGrow: 1, justifyContent: 'center' },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Section */}
          <View style={styles.headerContainer}>
            <Text style={styles.logoText}>PLUG</Text>
            <Text style={styles.taglineText}>
              Connect, communicate and share with friends and family
            </Text>
          </View>

          {/* Login Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Login</Text>

            {/* Email Input */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="email"
                placeholderTextColor="#8e8e93"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
              />
              <Ionicons
                name="scan-outline"
                size={22}
                color="#333"
                style={styles.inputIcon}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="password"
                placeholderTextColor="#8e8e93"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!isLoading}
              />
            </View>

            {/* Forgotten Password Link */}
            <TouchableOpacity
              style={styles.forgotContainer}
              activeOpacity={0.7}
              disabled={isLoading}
            >
              <Text style={styles.linkText}>Forgotten your password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              activeOpacity={0.8}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.loginButtonText}>LOGIN</Text>
              )}
            </TouchableOpacity>

            {/* Signup Link Section */}
            <View style={styles.signupContainer}>
              <Text style={styles.noAccountText}>Don't have an account?</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.signupTouch}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                onPress={() => router.push('/signup')}
                disabled={isLoading}
              >
                <Text style={styles.linkText}>Signup</Text>
              </TouchableOpacity>
            </View>
          </View>
          <SafeAreaView edges={['bottom']}>
            <Footer />
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}