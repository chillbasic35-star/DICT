// app/(citizen)/_layout.tsx
import React from 'react';
import { Tabs, Redirect } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { Image, View, Text, StyleSheet, TouchableOpacity, AccessibilityState, Falsy, GestureResponderEvent, RecursiveArray, RegisteredStyle, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CitizenLayout() {
  const { user } = useAuth();

  if (!user) return <Redirect href="/(auth)/login" />;
  if (user.role !== 'CITIZEN') return <Redirect href="/" />;

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
        },
        headerTitle: HeaderTitle,
        headerTitleAlign: 'left',
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'My Reports',
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <Ionicons 
              name="list" 
              size={24} 
              color={focused ? '#1E88E5' : '#666'} 
            />
          ),
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: 'Profile',
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <Ionicons 
              name="person" 
              size={24} 
              color={focused ? '#1E88E5' : '#666'} 
            />
          ),
        }} 
      />
    </Tabs>
  );
}

const HeaderTitle = () => (
  <View style={styles.headerContainer}>
    <Image
      source={require('../../assets/logo.png')}
      style={styles.logo}
      resizeMode="contain"
    />
    <View style={styles.textContainer}>
      <Text style={styles.headerText}>Department of Information and</Text>
      <Text style={styles.headerText}>Communications Technology</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  headerText: {
    fontSize: 12,
    color: '#333',
    lineHeight: 16,
  },
});