// app/(supervisor)/index.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { StatCardProps } from './types';

const StatCard: React.FC<StatCardProps> = ({ value, label, color, style }) => (
  <View style={[styles.statCard, { borderLeftColor: color }, style]}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const stats = [
  { value: '42', label: 'Total Reports', color: '#3B82F6' },
  { value: '15', label: 'Assigned', color: '#F59E0B' },
  { value: '10', label: 'In Progress', color: '#8B5CF6' },
  { value: '17', label: 'Resolved', color: '#10B981' },
];

export default function SupervisorDashboard() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Supervisor Dashboard</Text>
        <Text style={styles.subtitle}>Manage reports and staff assignments</Text>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            value={stat.value}
            label={stat.label}
            color={stat.color}
          />
        ))}
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/(supervisor)/reports')}
          >
            <Text style={styles.actionButtonText}>View All Reports</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/(supervisor)/staff')}
          >
            <Text style={styles.actionButtonText}>Manage Staff</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  quickActions: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '500',
  },
});