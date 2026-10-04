import { router } from 'expo-router';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignupScreen() {
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
                  placeholder="surname"
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
                placeholder="confirm password"
                placeholderTextColor="#8e8e93"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>

            {/* Signup Button */}
            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSignup}
              activeOpacity={0.8}
            >
              <Text style={styles.signupButtonText}>SIGNUP</Text>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4' },
  keyboardView: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  headerContainer: { alignItems: 'center', marginTop: 20, marginBottom: 24, width: '100%' },
  logoText: {
    fontSize: 56,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#000000',
    letterSpacing: 2,
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  taglineText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 15,
    lineHeight: 26,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  cardTitle: { fontSize: 26, fontWeight: '700', color: '#1a1a1a', textAlign: 'center', marginBottom: 20 },
  inputRowContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 16 },
  inputHalfWrapper: { width: '48%' },
  inputWrapper: { marginBottom: 16 },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#333333',
    backgroundColor: '#ffffff',
  },
  signupButton: {
    backgroundColor: '#007aff',
    borderRadius: 8,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 10,
  },
  signupButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '600', letterSpacing: 0.5 },
  legalText: { fontSize: 13, color: '#1a1a1a', textAlign: 'left', lineHeight: 18, marginBottom: 20 },
  loginPromptContainer: { alignItems: 'flex-start' },
  alreadyAccountText: { fontSize: 16, color: '#1a1a1a', marginBottom: 6 },
  loginTouch: { marginTop: 2 },
  linkText: { color: '#007aff', fontSize: 16, fontWeight: '400' },
  footerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    paddingBottom: 10,
  },
  footerLink: { color: '#007aff', fontSize: 13 },
  footerDivider: { color: '#007aff', fontSize: 13, marginHorizontal: 6 },
});