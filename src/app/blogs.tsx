import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { allBlogsStyles as styles } from '../styles/allBlogsStyles';

export default function ProfileScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All Blogs</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Browse all Blogs</Text>
      </View>   
    </SafeAreaView>
  );
}