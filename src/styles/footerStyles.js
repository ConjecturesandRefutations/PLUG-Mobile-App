import { StyleSheet } from 'react-native';

export const footerStyles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    paddingBottom: 10,
  },
  footerLink: {
    color: '#007aff',
    fontSize: 13,
  },
  footerDivider: {
    color: '#007aff',
    fontSize: 13,
    marginHorizontal: 6,
  },
});