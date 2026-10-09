import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { headerStyles as styles } from '../styles/headerStyles';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      setIsMenuOpen(false);
      // Remove saved user session from device storage
      await SecureStore.deleteItemAsync('user_session');
      // Redirect to login screen
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
        <TouchableOpacity activeOpacity={0.8}>
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
            <TouchableOpacity style={[styles.menuButton, styles.homeButton]} 
            activeOpacity={0.8}
            onPress={() => {
                setIsMenuOpen(false);
                router.push('/');
              }}>
              <Text style={styles.menuButtonText}>HOME</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.menuButton, styles.profileButton]}
              activeOpacity={0.8}
              onPress={() => {
                setIsMenuOpen(false);
                router.push('/profile');
              }}
            >
              <Text style={styles.menuButtonText}>PROFILE</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuButton, styles.usersButton]} activeOpacity={0.8}
            onPress={() => {
                setIsMenuOpen(false);
                router.push('/users');
              }}>
              <Text style={styles.menuButtonText}>USERS</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuButton, styles.blogsButton]} 
            onPress={() => {
                setIsMenuOpen(false);
                router.push('/blogs');
              }}activeOpacity={0.8}>
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

          {/* Right Outside Backdrop (Clicking closes menu) */}
          <TouchableWithoutFeedback onPress={() => setIsMenuOpen(false)}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>
        </View>
      )}
    </View>
  );
}