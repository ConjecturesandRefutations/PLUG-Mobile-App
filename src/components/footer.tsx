import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { footerStyles as styles } from '../styles/footerStyles';

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
    </View>
  );
}