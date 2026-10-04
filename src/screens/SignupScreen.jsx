import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// 1. Import SafeAreaView from 'react-native-safe-area-context'
import { SafeAreaView } from 'react-native-safe-area-context';
import { authStyles as styles } from './styles/authStyles';

export default function SignupScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    }
    console.log('Signing up with:', firstName, surname, email, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 2. Change Android behavior to undefined */}
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
                  placeholder="First Name"
                  placeholderTextColor="#8e8e93"
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>
              <View style={styles.inputHalfWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Surname"
                  placeholderTextColor="#8e8e93"
                  value={surname}
                  onChangeText={setSurname}
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
              />
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#8e8e93"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>

            {/* Signup Button */}
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSignup}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>SIGNUP</Text>
            </TouchableOpacity>

            {/* Legal Text */}
            <Text style={styles.legalText}>
              By signing up, you agree to receive transactional emails from us.
              You can unsubscribe at any time.
            </Text>

            {/* Login Link Section */}
            <View style={styles.promptContainer}>
              <Text style={styles.promptText}>Already Have an Account?</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.promptTouch}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                onPress={() => navigation.navigate('Login')}
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
}s