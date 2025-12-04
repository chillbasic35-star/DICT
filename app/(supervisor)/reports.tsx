// app/(supervisor)/reports.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Report, StaffMember } from './types';

// Mock data
const mockReports: Report[] = [
  { id: 'RPT-1001', title: 'Slow Internet Connection', status: 'PENDING', priority: 'HIGH', assignedTo: null },
  { id: 'RPT-1002', title: 'No Signal in Area 5', status: 'ASSIGNED', priority: 'MEDIUM', assignedTo: 'John Doe' },
  { id: 'RPT-1003', title: 'Router Malfunction', status: 'IN_PROGRESS', priority: 'HIGH', assignedTo: 'Jane Smith' },
  { id: 'RPT-1004', title: 'Cable Damage', status: 'PENDING', priority: 'LOW', assignedTo: null },
];

const mockStaff: StaffMember[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'STAFF', isActive: true, assignedReports: 5 },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'STAFF', isActive: true, assignedReports: 3 },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'STAFF', isActive: false, assignedReports: 0 },
];

export default function SupervisorReports() {
  const router = useRouter();
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAssign = (report: Report) => {
    setSelectedReport(report);
    setAssignModalVisible(true);
  };

  const confirmAssignment = () => {
    if (!selectedReport) return;
    
    // In a real app, this would call your API to update the assignment
    console.log(`Assigned ${selectedReport.id} to ${selectedStaff}`);
    Alert.alert('Success', `Report ${selectedReport.id} has been assigned.`);
    
    setAssignModalVisible(false);
    setSelectedReport(null);
    setSelectedStaff('');
  };

  const filteredReports = mockReports.filter(report =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Report['status']): string => {
    switch (status) {
      case 'PENDING': return '#F59E0B';
      case 'ASSIGNED': return '#3B82F6';
      case 'IN_PROGRESS': return '#8B5CF6';
      case 'RESOLVED': return '#10B981';
      case 'REJECTED': return '#EF4444';
      default: return '#9CA3AF';
    }
  };

  const getPriorityColor = (priority: Report['priority']): string => {
    switch (priority) {
      case 'HIGH': return '#EF4444';
      case 'MEDIUM': return '#F59E0B';
      case 'LOW': return '#10B981';
      default: return '#9CA3AF';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Reports</Text>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Search reports..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredReports}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reportCard}>
            <View style={styles.reportHeader}>
              <Text style={styles.reportId}>{item.id}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                <Text style={styles.statusText}>{item.status.replace('_', ' ')}</Text>
              </View>
            </View>
            <Text style={styles.reportTitle}>{item.title}</Text>
            <View style={styles.reportFooter}>
              <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) }]}>
                <Text style={styles.priorityText}>{item.priority}</Text>
              </View>
              <Text style={styles.assignedTo}>
                {item.assignedTo ? `Assigned to: ${item.assignedTo}` : 'Unassigned'}
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.assignButton}
              onPress={() => handleAssign(item)}
            >
              <Text style={styles.assignButtonText}>
                {item.assignedTo ? 'Reassign' : 'Assign'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={assignModalVisible}
        onRequestClose={() => setAssignModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>
              Assign {selectedReport?.id} to Staff
            </Text>
            
            <Text style={styles.label}>Select Staff Member</Text>
            <View style={styles.dropdown}>
              {mockStaff.map((staff) => (
                <Pressable
                  key={staff.id}
                  style={[
                    styles.dropdownItem,
                    selectedStaff === staff.id && styles.dropdownItemSelected
                  ]}
                  onPress={() => setSelectedStaff(staff.id)}
                >
                  <Text style={styles.dropdownItemText}>{staff.name}</Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={() => setAssignModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.confirmButton, !selectedStaff && styles.buttonDisabled]}
                onPress={confirmAssignment}
                disabled={!selectedStaff}
              >
                <Text style={styles.buttonText}>Confirm</Text>
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
  reportCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reportId: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  reportFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 12,
  },
  priorityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  assignedTo: {
    fontSize: 14,
    color: '#6B7280',
  },
  assignButton: {
    backgroundColor: '#3B82F6',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  assignButtonText: {
    color: 'white',
    fontWeight: '500',
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
    marginBottom: 20,
    color: '#1F2937',
    textAlign: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 8,
    color: '#4B5563',
    fontWeight: '500',
  },
  dropdown: {
    width: '100%',
    marginBottom: 20,
  },
  dropdownItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    marginBottom: 8,
  },
  dropdownItemSelected: {
    backgroundColor: '#EFF6FF',
    borderColor: '#3B82F6',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#1F2937',
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
  confirmButton: {
    backgroundColor: '#3B82F6',
  },
  buttonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});