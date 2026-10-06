import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FeedScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userSession = await AsyncStorage.getItem('userSession');

      if (!userSession) {
        router.replace('/login' as any);
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      router.replace('/login' as any);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userSession');
    router.replace('/login' as any);
  };

  if (isAuthenticated === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007aff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>PLUG Feed</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome to your main feed!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  logoutText: { color: '#ff3b30', fontSize: 16 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  welcomeText: { fontSize: 18, color: '#333' },
});