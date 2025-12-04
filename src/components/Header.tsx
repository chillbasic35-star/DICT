// src/components/Header.tsx
import { View, StyleSheet, Image } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Image
        source={require('../../assets/DICT SUB-BRAND LOGO.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingVertical: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logo: {
    width: '70%',
    height: 50,
    maxWidth: 250,
  },
});