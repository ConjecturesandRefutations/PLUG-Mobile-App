import { StyleSheet } from 'react-native';

export const profileStyles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#F7F6F4',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  loader: {
    marginTop: 40,
  },

  /* Profile Header Grid */
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  infoColumn: {
    flex: 1,
    paddingRight: 10,
  },
  userNameText: {
    fontSize: 36,
    fontWeight: '400',
    color: '#333333',
    lineHeight: 42,
    marginBottom: 12,
  },
  bioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bioContainer: {
    marginVertical: 6,
    paddingRight: 8,
  },
  bioText: {
    fontSize: 16,
    color: '#333333',
    fontStyle: 'italic',
    lineHeight: 22,
  },
  noBioText: {
    color: '#28a745',
    fontStyle: 'normal',
    textDecorationLine: 'underline',
  },
  friendsText: {
    fontSize: 16,
    color: '#007aff',
    textDecorationLine: 'underline',
    marginBottom: 8,
  },
  blogsCountText: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 16,
  },

  /* Action Buttons */
  actionButtonsStack: {
    width: 155,
  },
  actionBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    borderRadius: 5,
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  actionBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    marginRight: 6,
  },
  btnIcon: {
    marginLeft: 2,
  },
  messagesBtn: {
    backgroundColor: '#85a5ff',
  },
  photoAlbumBtn: {
    backgroundColor: '#ff9aa2',
  },
  settingsBtn: {
    backgroundColor: '#78848f',
  },

  /* Avatar Column */
  avatarColumn: {
    alignItems: 'center',
    width: 150,
  },
  avatarContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 12,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  changeAvatarText: {
    color: '#007aff',
    fontSize: 15,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  removeAvatarText: {
  fontSize: 14,
  color: '#dc3545', // Red color matching web layout
  textAlign: 'center',
  marginTop: 8,
  textDecorationLine: 'underline',
  },

  /* Blogs Section */
  blogsSection: {
    marginTop: 10,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '300',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 44,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#333333',
  },
  draftsContainer: {
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  draftsText: {
    fontSize: 16,
    color: '#007aff',
    textDecorationLine: 'underline',
  },
  emptyBlogsContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  emptyBlogsText: {
    fontSize: 18,
    color: '#444444',
    textAlign: 'center',
    fontWeight: 300,
  },

  /* Footer Placement */
  footerSafeArea: {
    marginTop: 20,
  },
  addFriendBtn: {
    backgroundColor: '#70c18c', // Green for 'Add friend +'
  },
  requestedBtn: {
    backgroundColor: '#f3b14e', // Orange for 'Requested ⌛'
  },
  friendsBtn: {
    backgroundColor: '#e06666', // Red/Coral for 'Friends ✓'
  },
  blogCard: {
  backgroundColor: '#ffffff',
  borderRadius: 5,
  paddingVertical: 24,
  paddingHorizontal: 20,
  marginBottom: 16,
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#e8e8e8',
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 6,
  elevation: 2,
},
blogTitleText: {
  fontSize: 22,
  fontWeight: '700',
  color: '#333333',
  textAlign: 'center',
  marginBottom: 10,
},
blogMetaText: {
  fontSize: 15,
  color: '#555555',
  textAlign: 'center',
  lineHeight: 22,
},
});