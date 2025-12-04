import React, { useState, useRef, useCallback } from 'react';
import { Animated, Easing } from 'react-native';
import { View, Text, StyleSheet, TextInput, Button, Alert, ScrollView, Image } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
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
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(30)).current;
  
  // Initialize animations when component mounts
  useFocusEffect(
    useCallback(() => {
      // Reset animations
      fadeAnim.setValue(0);
      slideUpAnim.setValue(30);
      
      // Start animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideUpAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        })
      ]).start();
      
      return () => {
        fadeAnim.setValue(0);
        slideUpAnim.setValue(30);
      };
    }, [fadeAnim, slideUpAnim])
  );

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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image 
        source={require('../../assets/back.png')} 
        style={styles.backgroundImage} 
      />
      <View style={styles.overlay}>
        <Animated.View 
          style={[
            styles.container, 
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }] 
            }
          ]}
        >
          <Animated.View style={{ opacity: fadeAnim }}>
            <Logo size={400} />
          </Animated.View>
<Animated.Text style={[styles.title1, { opacity: fadeAnim }]}>
            Department of Information and
          </Animated.Text>
          <Animated.Text style={[styles.title2, { opacity: fadeAnim }]}>
            Communications Technology
          </Animated.Text>
          <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
            Citizen Registration
          </Animated.Text>
          
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
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  } as const,
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 16,
  },
  container: {
    flexGrow: 1,
    padding: 24,
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
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
    fontWeight: 'bold'
  },
});
