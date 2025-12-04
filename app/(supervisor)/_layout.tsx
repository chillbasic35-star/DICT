// app/(supervisor)/_layout.tsx
import React from 'react';
import { Tabs, Redirect } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { Image, View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function SupervisorLayout() {
  const { user } = useAuth();

  if (!user) return <Redirect href="/(auth)/login" />;
  if (user.role !== 'SUPERVISOR') return <Redirect href="/" />;

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 60,
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 0,
        },
        headerShown: true,
        headerTitle: HeaderTitle,
        headerTitleAlign: 'left',
        headerStyle: {
          backgroundColor: '#fff',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#e0e0e0',
        },
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#1e88e5',
        tabBarInactiveTintColor: '#757575',
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: -4,
          marginBottom: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={24} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="reports" 
        options={{
          title: 'Reports',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="description" size={24} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="staff" 
        options={{
          title: 'Staff',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="people" size={24} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="analytics" 
        options={{
          title: 'Analytics',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="analytics" size={24} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person-outline" size={24} color={color} />
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
    <Text style={styles.headerTitle}>DICT Supervisor</Text>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
  },
});