import { StyleSheet } from 'react-native';

export const allUsersStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F6F4',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerArea: {
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: '300',
    color: '#333333',
    marginBottom: 16,
    textAlign: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#333333',
  },

  /* Card Layout Matching Web UI */
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e2e2',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  imageContainer: {
    width: '100%',
    height: 280,
    backgroundColor: '#dcdcdc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#cccccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  userNameText: {
    fontSize: 26,
    fontWeight: '400',
    color: '#3897f0',
    marginBottom: 10,
  },
  metaText: {
    fontSize: 15,
    color: '#333333',
    lineHeight: 22,
  },

  emptyContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  emptyText: {
    fontSize: 18,
    color: '#666666',
  },
  loadingMore: {
    marginVertical: 16,
  }
});