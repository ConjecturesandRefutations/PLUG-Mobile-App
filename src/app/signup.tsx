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
import { API_BASE_URL } from '../constants/api';
import { authStyles as styles } from '../styles/authStyles';

export default function SignupScreen() {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

const handleSignup = async () => {
  // Client validations...
  if (!firstName.trim() || !surname.trim() || !email.trim() || !password) {
    Alert.alert('Required Fields', 'Please fill in all required fields.');
    return;
  }

  if (password !== confirmPassword) {
    Alert.alert('Password Mismatch', 'Passwords do not match.');
    return;
  }

  setIsLoading(true);

  try {
    // Point to your API endpoint
    const response = await fetch(`${API_BASE_URL}/authentication/api_signup.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        first_name: firstName.trim(),
        surname: surname.trim(),
        email: email.trim().toLowerCase(),
        password: password,
        password_confirmation: confirmPassword,
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      Alert.alert(
        'Success',
        data.message,
        [
          {
            text: 'OK',
            onPress: () => router.push('/'), // Redirect to Login page
          },
        ]
      );
    } else {
      Alert.alert('Signup Failed', data.message || 'Unable to create account.');
    }
  } catch (error) {
    console.error('Signup network error:', error);
    Alert.alert(
      'Connection Error',
      'Could not connect to server. Check your network or server URL.'
    );
  } finally {
    setIsLoading(false);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
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

          {/* Signup Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Signup</Text>

            {/* Name Row */}
            <View style={styles.inputRowContainer}>
              <View style={styles.inputHalfWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="first name"
                  placeholderTextColor="#8e8e93"
                  value={firstName}
                  onChangeText={setFirstName}
                  editable={!isLoading}
                />
              </View>
              <View style={styles.inputHalfWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="surname"
                  placeholderTextColor="#8e8e93"
                  value={surname}
                  onChangeText={setSurname}
                  editable={!isLoading}
                />
              </View>
            </View>

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

            {/* Confirm Password Input */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="confirm password"
                placeholderTextColor="#8e8e93"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                editable={!isLoading}
              />
            </View>

            {/* Signup Button */}
            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSignup}
              activeOpacity={0.8}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.signupButtonText}>SIGNUP</Text>
              )}
            </TouchableOpacity>

            {/* Legal Text */}
            <Text style={styles.legalText}>
              By signing up, you agree to receive transactional emails from us.
              You can unsubscribe at any time.
            </Text>

            {/* Login Link Section */}
            <View style={styles.loginPromptContainer}>
              <Text style={styles.alreadyAccountText}>Already Have an Account?</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.loginTouch}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                onPress={() => router.push('/')}
                disabled={isLoading}
              >
                <Text style={styles.linkText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer Section */}
          <View style={styles.footerContainer}>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.footerLink}>Privacy Policy</Text>
            </TouchableOpacity>
            <Text style={styles.footerDivider}>|</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.footerLink}>Terms & Conditions</Text>
            </TouchableOpacity>
            <Text style={styles.footerDivider}>|</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.footerLink}>Site by Alfie Collins</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}