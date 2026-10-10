import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { indexStyles as styles } from '../styles/indexStyles';

export default function FeedScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>PLUG Feed</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome to your main feed!</Text>
      </View>   
    </SafeAreaView>
  );
}
