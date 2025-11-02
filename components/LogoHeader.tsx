import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { LOGO_IMAGE } from '@/constants/logo';

export default function LogoHeader() {
  return (
    <View style={styles.container}>
      <Image
        source={LOGO_IMAGE}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  logo: {
    width: 120,
    height: 40,
  },
});

