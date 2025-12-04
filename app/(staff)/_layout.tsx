import React from 'react';
import { Tabs, Redirect } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { Image, View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function StaffLayout() {
  const { user, logout } = useAuth();

  if (!user) return <Redirect href="/(auth)/login" />;
  if (user.role !== 'STAFF') return <Redirect href="/" />;

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
          title: 'Assigned Reports',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="assignment" size={24} color={color} />
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
    width: 40,
    height: 40,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  headerText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
    lineHeight: 16,
  },
});
