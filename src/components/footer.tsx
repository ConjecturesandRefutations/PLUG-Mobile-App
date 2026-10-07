import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity activeOpacity={0.7}>
        <Text style={styles.footerLink}>Privacy Policy</Text>
      </TouchableOpacity>
      <Text style={styles.footerDivider}>|</Text>
      <TouchableOpacity activeOpacity={0.7}>
        <Text style={styles.footerLink}>Terms & Conditions</Text>
      </TouchableOpacity>
      <Text style={styles.footerDivider}>|</Text>
      <TouchableOpacity activeOpacity={0.7}>
        <Text style={styles.footerLink}>Site by Alfie Collins</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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