import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuth } from '../context/authContext';

function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // Check if current screen is inside the auth group ('login' or 'signup')
    const currentRoute = segments[0];
    const isAuthRoute = currentRoute === 'login' || currentRoute === 'signup';

    if (!user && !isAuthRoute) {
      // User is logged out and trying to access a protected screen -> Redirect to login
      router.replace('/login' as any);
    } else if (user && isAuthRoute) {
      // User is logged in and trying to access login/signup -> Redirect to feed
      router.replace('/');
    }
  }, [user, isLoading, segments]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007aff" />
      </View>
    );
  }

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}