import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import Logo from '../../src/components/Logo';
import { useRouter, useFocusEffect } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [key, setKey] = useState(0);

  // Force remount of TextInputs when screen gains focus to prevent autofill
  useFocusEffect(
    React.useCallback(() => {
      setEmail('');
      setPassword('');
      setKey(prev => prev + 1);
    }, [])
  );

  const onSubmit = async () => {
    try {
      await login(email.trim(), password);
      router.replace('/');
    } catch (e) {
      // When real backend errors are implemented, you can show them here.
    } finally {
      // Always clear inputs after a login attempt
      setEmail('');
      setPassword('');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Logo size={800} />
        <Text style={styles.title}>Department of Information and</Text>
        <Text style={styles.title1}>Communications Technology</Text>
        <Text style={styles.title2}>Sign In to your Account</Text>
        <TextInput
          key={`email-${key}`}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="new-password"
          autoCorrect={false}
          textContentType="none"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          key={`password-${key}`}
          placeholder="Password"
          secureTextEntry
          autoComplete="new-password"
          autoCorrect={false}
          textContentType="none"
          importantForAutofill="no"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <Button title="Login" onPress={onSubmit} />
        <Text style={styles.link} onPress={() => router.push('/(auth)/register')}>
          Create an account
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 24,
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },
    title: { fontSize: 16, fontWeight: 'bold', marginBottom: 1, textAlign: 'center', color: '#0156acff' },
    title1: { fontSize: 16, fontWeight: 'bold', marginBottom: 24, textAlign: 'center', color: '#0156acff' },
    title2: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center', color: '#333' },
    input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  link: { marginTop: 16, textAlign: 'center', color: '#0066cc', marginBottom: 100 },
});
