import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useAuth } from '../context/AuthContext'; // 1. Import useAuth
import { headerStyles as styles } from '../styles/headerStyles';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAuth(); // 2. Destructure logout function

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      setIsMenuOpen(false);
      // 3. Call AuthContext logout (clears SecureStore AND sets user to null)
      await logout();
      router.replace('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Logout Error', 'Unable to log out. Please try again.');
    }
  };

  return (
    <View style={styles.wrapper}>
      {/* Header Bar */}
      <View style={styles.headerContainer}>
        {/* Brand Logo */}
        <TouchableOpacity activeOpacity={0.8}
          onPress={() => {
          setIsMenuOpen(false);
          router.navigate('/');
              }}>
          <Text style={styles.logoText}>PLUG</Text>
        </TouchableOpacity>

        {/* Action Icons */}
        <View style={styles.iconGroup}>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
            <Ionicons name="search-outline" size={24} color="#4a4a4a" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
            <Ionicons name="mail" size={24} color="#4a4a4a" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
            <Ionicons name="notifications" size={24} color="#4a4a4a" />
          </TouchableOpacity>

          {/* Toggle Burger / Close X Icon */}
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.7} onPress={toggleMenu}>
            <Ionicons
              name={isMenuOpen ? 'close' : 'menu'}
              size={28}
              color="#4a4a4a"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Slide-out Drawer Menu Overlay */}
      {isMenuOpen && (
        <View style={styles.overlayContainer}>
          {/* Left Menu Drawer */}
          <View style={styles.drawerContainer}>
            <TouchableOpacity
              style={[styles.menuButton, styles.homeButton]}
              activeOpacity={0.8}
              onPress={() => {
                setIsMenuOpen(false);
                router.navigate('/');
              }}
            >
              <Text style={styles.menuButtonText}>HOME</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.menuButton, styles.profileButton]}
              activeOpacity={0.8}
              onPress={() => {
                setIsMenuOpen(false);
                router.navigate('/profile');
              }}
            >
              <Text style={styles.menuButtonText}>PROFILE</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.menuButton, styles.usersButton]}
              activeOpacity={0.8}
              onPress={() => {
                setIsMenuOpen(false);
                router.navigate('/users');
              }}
            >
              <Text style={styles.menuButtonText}>USERS</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.menuButton, styles.blogsButton]}
              activeOpacity={0.8}
              onPress={() => {
                setIsMenuOpen(false);
                router.navigate('/blogs');
              }}
            >
              <Text style={styles.menuButtonText}>BLOGS</Text>
            </TouchableOpacity>

            {/* Logout Button */}
            <TouchableOpacity
              style={[styles.menuButton, styles.logoutButton]}
              activeOpacity={0.8}
              onPress={handleLogout}
            >
              <Text style={styles.menuButtonText}>LOGOUT</Text>
            </TouchableOpacity>
          </View>

          {/* Right Outside Backdrop */}
          <TouchableWithoutFeedback onPress={() => setIsMenuOpen(false)}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>
        </View>
      )}
    </View>
  );
}