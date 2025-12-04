import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { useUsers } from '../../src/context/UserContext';
import Logo from '../../src/components/Logo';


export default function RegisterScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const { addUser } = useUsers();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async () => {
    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert('Missing information', 'Please fill in all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Password and confirm password must match.');
      return;
    }

    try {
      setSubmitting(true);

      // Create new citizen user and store it
      const newUser = {
        id: String(Date.now()),
        name: fullName,
        email,
        role: 'CITIZEN' as const,
        isActive: true,
      };

      await addUser(newUser);
      await login(email, password);
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setContactNumber('');
      router.replace('/');
    } catch (error) {
      Alert.alert('Registration failed', 'Unable to register right now. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Logo size={500} />
      <Text style={styles.title1}>Department of Information and</Text>
      <Text style={styles.title2}>Communications Technology</Text>
      <Text style={styles.title}>Citizen Registration</Text>
      
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Juan Dela Cruz"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Contact Number (optional)</Text>
      <TextInput
        style={styles.input}
        value={contactNumber}
        onChangeText={setContactNumber}
        placeholder="09XXXXXXXXX"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
      />

      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Re-enter password"
        secureTextEntry
      />

      <View style={styles.buttonContainer}>
        <Button title={submitting ? 'Registering...' : 'Register'} onPress={handleRegister} disabled={submitting} />
      </View>

      <View style={styles.loginLinkContainer}>
        <Text onPress={() => router.replace('/(auth)/login')} style={styles.loginLink}>
          Already have an account? Log in
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  title1: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 1,
    textAlign: 'center',
    color: '#0156acff',
  },
  title2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#0156acff',
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  buttonContainer: {
    marginTop: 8,
  },
  loginLinkContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  loginLink: {
    color: '#0066cc',
  },
});
