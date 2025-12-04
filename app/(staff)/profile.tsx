import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../src/context/AuthContext';

export default function StaffProfile() {
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: 'person-outline', label: 'Edit Profile' },
    { icon: 'notifications-none', label: 'Notifications' },
    { icon: 'lock-outline', label: 'Change Password' },
    { icon: 'help-outline', label: 'Help & Support' },
    { icon: 'info-outline', label: 'About Us' },
    { icon: 'logout', label: 'Logout', color: '#FF3B30', onPress: logout },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={user?.photoURL ? { uri: user.photoURL } : require('../../assets/icon.png')}
            style={styles.avatar}
          />
          <View style={styles.editIcon}>
            <MaterialIcons name="edit" size={16} color="#1E88E5" />
          </View>
        </View>
        <Text style={styles.name}>{user?.name || 'Staff Member'}</Text>
        <Text style={styles.email}>{user?.email || 'staff@example.com'}</Text>
        <Text style={styles.role}>Staff</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <View style={styles.menuIconContainer}>
              <MaterialIcons 
                name={item.icon as any} 
                size={24} 
                color={item.color || '#666'} 
              />
            </View>
            <Text style={[styles.menuText, item.color && { color: item.color }]}>
              {item.label}
            </Text>
            <MaterialIcons 
              name="chevron-right" 
              size={24} 
              color="#999" 
              style={styles.chevronIcon}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
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
    borderColor: '#fff',
    backgroundColor: '#e0e0e0',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: '#1E88E5',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  menuContainer: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIconContainer: {
    width: 32,
    alignItems: 'center',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 16,
  },
  chevronIcon: {
    opacity: 0.5,
  },
});
