// app/(admin)/index.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_PADDING = 16;
const CARD_GAP = 16;
const CARD_WIDTH = (width - (CARD_PADDING * 2) - CARD_GAP) / 2;

const COLORS = {
  white: '#FFFFFF',
  primary: '#1E88E5',
  secondary: '#0D47A1',
  success: '#4CAF50',
  warning: '#FFA000',
  danger: '#E53935',
  info: '#00ACC1',
  lightGray: '#F5F5F5',
  darkGray: '#212121',
  text: '#333333',
};

const stats: Array<{
  value: string;
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  color: string;
}> = [
  { 
    value: '1,254', 
    label: 'Total Reports', 
    icon: 'assignment', 
    color: COLORS.primary 
  },
  { 
    value: '856', 
    label: 'Resolved', 
    icon: 'check-circle', 
    color: COLORS.success 
  },
  { 
    value: '245', 
    label: 'In Progress', 
    icon: 'hourglass-empty', 
    color: COLORS.warning 
  },
  { 
    value: '153', 
    label: 'Pending', 
    icon: 'schedule', 
    color: COLORS.danger 
  },
  { 
    value: '1,842', 
    label: 'Total Users', 
    icon: 'people', 
    color: '#9C27B0' 
  },
];

interface StatCardProps {
  value: string | number;
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  color: string;
}

const StatCard = ({ value, label, icon, color }: StatCardProps) => (
  <View style={[styles.card, { backgroundColor: COLORS.white }]}>
    <View style={styles.cardContent}>
      <View style={[styles.iconContainer, { backgroundColor: `${color}10` }]}>
        <MaterialIcons name={icon} size={20} color={color} />
      </View>
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardValue}>{value}</Text>
        <Text style={styles.cardLabel}>{label}</Text>
      </View>
    </View>
  </View>
);

export default function AdminDashboard() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <Text style={styles.headerSubtitle}>Welcome back, Admin</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              label={stat.label}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </View>
      </View>

      <View style={styles.recentActivity}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.activityItem}>
          <View style={styles.activityIcon}>
            <MaterialIcons name="assignment" size={20} color={COLORS.primary} />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>New report submitted by John Doe</Text>
            <Text style={styles.activityTime}>2 hours ago</Text>
          </View>
        </View>
        <View style={styles.activityItem}>
          <View style={styles.activityIcon}>
            <MaterialIcons name="check-circle" size={20} color={COLORS.success} />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>Report #1234 has been resolved</Text>
            <Text style={styles.activityTime}>5 hours ago</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.text,
    opacity: 0.7,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  seeAllText: {
    color: COLORS.primary,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 12,
  },
  card: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: 12,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTextContainer: {
    marginLeft: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardValue: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 2,
  },
  cardLabel: {
    fontSize: 12,
    color: '#666',
  },
  recentActivity: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: COLORS.darkGray,
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#9E9E9E',
  },
});