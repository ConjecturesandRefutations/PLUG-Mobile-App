import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { AuthProvider, useAuth } from '../context/AuthContext';

function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const currentRoute = segments[0];
  const isAuthRoute = currentRoute === 'login' || currentRoute === 'signup';

  useEffect(() => {
    if (isLoading) return;

    if (!user && !isAuthRoute) {
      router.replace('/login' as any);
    } else if (user && isAuthRoute) {
      router.replace('/');
    }
  }, [user, isLoading, segments]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007aff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top Header */}
      {!isAuthRoute && (
        <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
          <Header />
        </SafeAreaView>
      )}

      {/* Main Page Content */}
      <View style={styles.content}>
        <Slot />
      </View>

    </View>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerSafeArea: {
    backgroundColor: '#ffffff',
    zIndex: 1000,
    elevation: 1000,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
  footerSafeArea: {
    backgroundColor: '#F7F6F4',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});