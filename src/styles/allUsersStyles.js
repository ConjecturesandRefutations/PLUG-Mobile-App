import { StyleSheet } from 'react-native';

export const allUsersStyles = StyleSheet.create({
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