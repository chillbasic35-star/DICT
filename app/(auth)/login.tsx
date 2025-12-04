import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, Image, Animated, Easing } from 'react-native';
import Logo from '../../src/components/Logo';
import { useRouter, useFocusEffect } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [key, setKey] = useState(0);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(30)).current;

  // Force remount of TextInputs when screen gains focus to prevent autofill
  useFocusEffect(
    React.useCallback(() => {
      setEmail('');
      setPassword('');
      setKey(prev => prev + 1);
      
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
    }, [fadeAnim, slideUpAnim])
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
            <Logo size={800} />
          </Animated.View>
          <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>Department of Information and</Animated.Text>
          <Animated.Text style={[styles.title1, { opacity: fadeAnim }]}>Communications Technology</Animated.Text>
          <Animated.Text style={[styles.title2, { opacity: fadeAnim }]}>Citizen Portal Login</Animated.Text>
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
  title: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 1, 
    textAlign: 'center', 
    color: '#0156acff' 
  },
  title1: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 24, 
    textAlign: 'center', 
    color: '#0156acff' 
  },
  title2: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 24, 
    textAlign: 'center', 
    color: '#333' 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  link: { 
    marginTop: 16, 
    textAlign: 'center', 
    color: '#0066cc', 
    marginBottom: 100, 
    fontWeight: 'bold'
  },
});
