import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../components/Footer';
import { allBlogsStyles as styles } from '../styles/allBlogsStyles';

export default function ProfileScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Change Settings</Text>
      </View>
      <SafeAreaView edges={['bottom']}>
          <Footer />
      </SafeAreaView>   
    </SafeAreaView>
  );
}