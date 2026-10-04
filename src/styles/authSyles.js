import { StyleSheet } from 'react-native';

export const authStyles = StyleSheet.create({
  /* Layout & Container */
  container: { 
    flex: 1, 
    backgroundColor: '#f4f4f4' 
  },
  keyboardView: { 
    flex: 1 
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  /* Header Section */
  headerContainer: { 
    alignItems: 'center', 
    marginTop: 20, 
    marginBottom: 24, 
    width: '100%' 
  },
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

  /* Card Container */
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
  cardTitle: { 
    fontSize: 26, 
    fontWeight: '700', 
    color: '#1a1a1a', 
    textAlign: 'center', 
    marginBottom: 20 
  },

  /* Inputs & Grids */
  inputWrapper: { 
    position: 'relative', 
    marginBottom: 16 
  },
  inputRowContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    marginBottom: 16 
  },
  inputHalfWrapper: { 
    width: '48%' 
  },
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
  inputIcon: { 
    position: 'absolute', 
    right: 12, 
    top: 13 
  },

  /* Buttons & Action Links */
  loginButton: {
    backgroundColor: '#007aff',
    borderRadius: 8,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: { 
    color: '#ffffff', 
    fontSize: 16, 
    fontWeight: '600', 
    letterSpacing: 0.5 
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
  signupButtonText: { 
    color: '#ffffff', 
    fontSize: 16, 
    fontWeight: '600', 
    letterSpacing: 0.5 
  },
  forgotContainer: { 
    alignSelf: 'flex-start', 
    marginBottom: 20 
  },
  linkText: { 
    color: '#007aff', 
    fontSize: 16, 
    fontWeight: '400' 
  },
  legalText: { 
    fontSize: 13, 
    color: '#1a1a1a', 
    textAlign: 'left', 
    lineHeight: 18, 
    marginBottom: 20 
  },

  /* Switch Links (Login <-> Signup Prompt) */
  signupContainer: { 
    alignItems: 'flex-start' 
  },
  noAccountText: { 
    fontSize: 16, 
    color: '#1a1a1a', 
    marginBottom: 6 
  },
  signupTouch: { 
    marginTop: 2 
  },
  loginPromptContainer: { 
    alignItems: 'flex-start' 
  },
  alreadyAccountText: { 
    fontSize: 16, 
    color: '#1a1a1a', 
    marginBottom: 6 
  },
  loginTouch: { 
    marginTop: 2 
  },

  /* Footer Section */
  footerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    paddingBottom: 10,
  },
  footerLink: { 
    color: '#007aff', 
    fontSize: 13 
  },
  footerDivider: { 
    color: '#007aff', 
    fontSize: 13, 
    marginHorizontal: 6 
  },
});