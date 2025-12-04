// app/(supervisor)/staff.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { StaffMember } from './types';

// Mock data
const mockStaff: StaffMember[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'STAFF', isActive: true, assignedReports: 5 },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'STAFF', isActive: true, assignedReports: 3 },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'STAFF', isActive: false, assignedReports: 0 },
];

export default function SupervisorStaff() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [newStatus, setNewStatus] = useState(true);

  const filteredStaff = mockStaff.filter(staff =>
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusChange = (staff: StaffMember) => {
    setSelectedStaff(staff);
    setNewStatus(!staff.isActive);
    setStatusModalVisible(true);
  };

  const confirmStatusChange = () => {
    if (!selectedStaff) return;
    
    // In a real app, this would call your API to update the staff status
    console.log(`Updated ${selectedStaff.name}'s status to ${newStatus ? 'active' : 'inactive'}`);
    Alert.alert('Success', `Staff status updated to ${newStatus ? 'Active' : 'Inactive'}`);
    
    setStatusModalVisible(false);
    setSelectedStaff(null);
  };

  const getStatusColor = (isActive: boolean): string => {
    return isActive ? '#10B981' : '#EF4444';
  };

  const getStatusText = (isActive: boolean): string => {
    return isActive ? 'Active' : 'Inactive';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Staff</Text>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Search staff..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredStaff}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.staffCard}>
            <View style={styles.staffInfo}>
              <Text style={styles.staffName}>{item.name}</Text>
              <Text style={styles.staffEmail}>{item.email}</Text>
              <View style={styles.staffMeta}>
                <Text style={styles.staffRole}>{item.role}</Text>
                <Text style={styles.staffReports}>{item.assignedReports} assigned reports</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={[styles.statusButton, { backgroundColor: getStatusColor(item.isActive) }]}
              onPress={() => handleStatusChange(item)}
            >
              <Text style={styles.statusButtonText}>
                {getStatusText(item.isActive)}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={statusModalVisible}
        onRequestClose={() => setStatusModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>
              {newStatus ? 'Activate' : 'Deactivate'} Staff
            </Text>
            
            <Text style={styles.modalText}>
              Are you sure you want to {newStatus ? 'activate' : 'deactivate'} {selectedStaff?.name}?
            </Text>

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={() => setStatusModalVisible(false)}
              >
                <Text style={[styles.buttonText, { color: '#4B5563' }]}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.button, 
                  newStatus ? styles.activateButton : styles.deactivateButton
                ]}
                onPress={confirmStatusChange}
              >
                <Text style={styles.buttonText}>
                  {newStatus ? 'Activate' : 'Deactivate'}
                </Text>
              </Pressable>
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
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  staffCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  staffInfo: {
    flex: 1,
  },
  staffName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  staffEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  staffMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  staffRole: {
    fontSize: 12,
    color: '#4B5563',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  staffReports: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    minWidth: 80,
    alignItems: 'center',
  },
  statusButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1F2937',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
  },
  activateButton: {
    backgroundColor: '#10B981',
  },
  deactivateButton: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});