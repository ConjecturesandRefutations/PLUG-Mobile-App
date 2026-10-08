import { Dimensions, StyleSheet } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const headerStyles = StyleSheet.create({
  wrapper: {
    zIndex: 1000, // Keeps header and menu on top of screen content
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  logoText: {
    fontSize: 28,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#ffb3c6',
    letterSpacing: 1.5,
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
    padding: 2,
  },

  /* Drawer Overlay Layout */
  overlayContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT,
    flexDirection: 'row',
    zIndex: 999,
  },
  drawerContainer: {
    width: '80%',
    backgroundColor: '#e3e3e3',
    paddingHorizontal: 16,
    paddingTop: 24,
    height: '100%',
  },
  backdrop: {
    width: '20%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },

  /* Button Styles */
  menuButton: {
    borderRadius: 3,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  menuButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 1,
  },

  /* Button Background Colors */
  homeButton: {
    backgroundColor: '#8ecbfd',
  },
  profileButton: {
    backgroundColor: '#9fda9c',
  },
  usersButton: {
    backgroundColor: '#fbaec1',
  },
  blogsButton: {
    backgroundColor: '#fdd835',
  },
  logoutButton: {
    backgroundColor: '#a0a0a0',
  },
});