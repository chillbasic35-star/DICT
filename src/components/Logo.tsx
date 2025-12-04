import { View, Image, StyleSheet } from 'react-native';

export default function Logo({ size = 200 }: { size?: number }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={[styles.logo, { width: size, height: size * 0.3 }]} // Adjust aspect ratio as needed
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  logo: {
    maxWidth: '100%',
  },
});
