import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../components/footer';
import Header from '../components/header';
import { allUsersStyles as styles } from '../styles/allUsersStyles';

export default function ProfileScreen() {

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <Header />
      <View style={styles.header}>
        <Text style={styles.title}>All Users</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Browse all users</Text>
      </View>
      {/* Footer Section */}
      <Footer />      
    </SafeAreaView>
  );
}