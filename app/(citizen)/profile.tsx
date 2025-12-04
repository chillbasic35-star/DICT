import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../src/context/AuthContext';

const COLORS = {
  white: '#FFFFFF',
  primary: '#1E88E5',
  textPrimary: '#212121',
  textSecondary: '#757575',
  lightGray: '#F5F5F5',
  mediumGray: '#E0E0E0',
  error: '#F44336',
};

type MenuItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
};

export default function ProfileScreen() {
  const router = useRouter();
const { user, logout: signOut } = useAuth();

  const menuItems: MenuItem[] = [
    { icon: 'person-outline', label: 'Edit Profile', onPress: () => router.push('/(citizen)/edit-profile') },
    { icon: 'document-text-outline', label: 'My Reports', onPress: () => router.push('/(citizen)/') },
    { icon: 'settings-outline', label: 'Settings', onPress: () => router.push('/(citizen)/settings') },
    { icon: 'help-circle-outline', label: 'Help & Support', onPress: () => router.push('/(citizen)/support') },
    { icon: 'information-circle-outline', label: 'About', onPress: () => router.push('/(citizen)/about') },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={user?.photoURL ? { uri: user.photoURL } : require('../../assets/icon.png')}
            style={styles.avatar}
          />
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => console.log('Edit profile picture')}
            activeOpacity={0.8}
          >
            <Ionicons name="camera" size={16} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>{user?.name || 'Citizen User'}</Text>
        <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
      </View>

      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <Ionicons name={item.icon} size={24} color={COLORS.primary} />
            <Text style={styles.menuItemText}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={signOut}
        activeOpacity={0.7}
      >
        <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
        <Text style={[styles.logoutText, { color: COLORS.error }]}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: 'white',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#E0E0E0',
  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  userName: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  menuSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 24,
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  menuItemText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 32,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
});