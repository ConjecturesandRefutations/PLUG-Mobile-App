import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { profileStyles as styles } from '../styles/profileStyles';

export default function ProfileScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Profile</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome to your profile!</Text>
      </View>  
    </SafeAreaView>
  );
}