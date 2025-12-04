import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Alert,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { User } from '../../src/types';
import { useUsers } from '../../src/context/UserContext';

export default function AdminUsersScreen() {
  const { users, addUser, deleteUser } = useUsers();
  const [showModal, setShowModal] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'CITIZEN' | 'STAFF' | 'ADMIN' | 'SUPERVISOR'>('CITIZEN');
  const [filterRole, setFilterRole] = useState<'ALL' | 'CITIZEN' | 'STAFF' | 'ADMIN' | 'SUPERVISOR'>('ALL');

  const filteredUsers = filterRole === 'ALL' ? users : users.filter(u => u.role === filterRole);

  const handleCreateUser = async () => {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Missing information', 'Please fill in all fields.');
      return;
    }

    try {
      // Here you would typically make an API call to your backend to create the user
      // For example:
      // const response = await fetch('YOUR_API_ENDPOINT/users', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     name: fullName,
      //     email,
      //     password,
      //     role,
      //   }),
      // });
      // const data = await response.json();

      const newUser: User = {
        id: String(Date.now()),
        name: fullName,
        email,
        role,
        isActive: true,
      };

      await addUser(newUser);
      
      Alert.alert(
        'User created',
        `${role} account for ${fullName} (${email}) has been created successfully.`
      );

      // Reset form
      setFullName('');
      setEmail('');
      setPassword('');
      setShowModal(false);
    } catch (error) {
      console.error('Error creating user:', error);
      Alert.alert('Error', 'Failed to create user. Please try again.');
    }
    setPassword('');
    setRole('CITIZEN');
    setShowModal(false);
  };

  const handleDeleteUser = (userId: string) => {
    Alert.alert('Delete User', 'Are you sure you want to delete this user?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          await deleteUser(userId);
          Alert.alert('User deleted', 'The user has been removed.');
        },
      },
    ]);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return '#f44336';
      case 'STAFF':
        return '#2196f3';
      case 'CITIZEN':
        return '#4caf50';
      case 'SUPERVISOR':
        return '#9c27b0';
      default:
        return '#999';
    }
  };

  const openCreateModal = () => {
    setFullName('');
    setEmail('');
    setPassword('');
    setRole('CITIZEN');
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>User Management</Text>
          <Button title="+ Create User" onPress={openCreateModal} />
        </View>

        <View style={styles.filterContainer}>
          <Text style={styles.sectionTitle}>Filter by Role</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={filterRole}
              style={styles.picker}
              onValueChange={(itemValue: 'ALL' | 'CITIZEN' | 'STAFF' | 'ADMIN' | 'SUPERVISOR') => setFilterRole(itemValue)}
              dropdownIconColor="#666"
            >
              <Picker.Item label="All Roles" value="ALL" />
              <Picker.Item label="Citizen" value="CITIZEN" />
              <Picker.Item label="Staff" value="STAFF" />
              <Picker.Item label="Supervisor" value="SUPERVISOR" />
              <Picker.Item label="Admin" value="ADMIN" />
            </Picker>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Users ({filteredUsers.length})</Text>
        <FlatList
          data={filteredUsers}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.userItem}>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
                <View style={styles.userMeta}>
                  <View
                    style={[
                      styles.roleBadge,
                      { backgroundColor: getRoleBadgeColor(item.role) },
                    ]}
                  >
                    <Text style={styles.roleText}>{item.role}</Text>
                  </View>
                  <Text style={styles.statusText}>
                    {item.isActive ? '✓ Active' : '✗ Inactive'}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => handleDeleteUser(item.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>

      {/* Create User Modal */}
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New User</Text>

            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter full name"
              value={fullName}
              onChangeText={setFullName}
              autoComplete="off"
              autoCorrect={false}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="new-password"
              autoCorrect={false}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="new-password"
              autoCorrect={false}
            />

            <View style={styles.roleContainer}>
              <Text>Role:</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={[styles.radioButton, role === 'CITIZEN' && styles.radioButtonSelected]}
                  onPress={() => setRole('CITIZEN')}
                >
                  <Text>Citizen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.radioButton, role === 'STAFF' && styles.radioButtonSelected]}
                  onPress={() => setRole('STAFF')}
                >
                  <Text>Staff</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.radioButton, role === 'ADMIN' && styles.radioButtonSelected]}
                  onPress={() => setRole('ADMIN')}
                >
                  <Text>Admin</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.radioButton, role === 'SUPERVISOR' && styles.radioButtonSelected]}
                  onPress={() => setRole('SUPERVISOR')}
                >
                  <Text>Supervisor</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                onPress={() => {
                  setShowModal(false);
                  setFullName('');
                  setEmail('');
                  setPassword('');
                  setRole('CITIZEN');
                }}
              />
              <Button title="Create User" onPress={handleCreateUser} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 8,
  },
  userItem: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 2,
  },
  userEmail: {
    color: '#555',
    fontSize: 12,
    marginBottom: 6,
  },
  userMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  roleText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  statusText: {
    fontSize: 11,
    color: '#4caf50',
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f44336',
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  roleButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 8,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
  },
  roleButtonActive: {
    borderColor: '#2196f3',
    backgroundColor: '#e3f2fd',
  },
  roleButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
  },
  roleButtonTextActive: {
    color: '#2196f3',
  },
  filterContainer: {
    marginBottom: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  picker: {
    height: 40,
    color: '#333',
  },
  roleContainer: {
    marginTop: 12,
    marginBottom: 16,
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
  },
  radioButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  radioButtonSelected: {
    borderColor: '#2196f3',
    backgroundColor: '#e3f2fd',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 8,
  },
});
