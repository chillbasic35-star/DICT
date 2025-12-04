// app/(citizen)/index.tsx
import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Report } from '../../src/types';
import { useAuth } from '../../src/context/AuthContext';

const { width } = Dimensions.get('window');
const CARD_PADDING = 16;
const CARD_GAP = 12;
const CARD_WIDTH = (width - (CARD_PADDING * 2) - (CARD_GAP * 2)) / 3;

// Color Palette
const COLORS = {
  white: '#FFFFFF',
  red: '#EF5350',
  blue: '#42A5F5',
  green: '#66BB6A',
  yellow: '#FFCA28',
  darkBlue: '#1565C0',
  lightGray: '#F5F5F5',
  mediumGray: '#E0E0E0',
  darkGray: '#424242',
  black: '#212121',
  background: '#f5f5f5',
  primary: '#1E88E5',
  primaryLight: '#64B5F6',
  primaryDark: '#1565C0',
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#2196F3',
  textPrimary: '#212121',
  textSecondary: '#757575',
  divider: '#BDBDBD',
  surface: '#FFFFFF',
  shadow: '#000000',
};

const mockReports: Report[] = [
  {
    id: '1',
    citizenId: '1',
    title: 'Slow Internet in Barangay X',
    description: 'Connection drops every evening.',
    status: 'PENDING',
    categoryId: '1',
    attachments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    citizenId: '1',
    title: 'Damaged Road in Purok 2',
    description: 'Large pothole causing traffic',
    status: 'IN_PROGRESS',
    categoryId: '2',
    attachments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    citizenId: '1',
    title: 'Street Light Not Working',
    description: 'Light post #45 not functioning',
    status: 'RESOLVED',
    categoryId: '3',
    attachments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const Card: React.FC<{ 
  value: number | string; 
  label: string; 
  color: string; 
  icon?: keyof typeof Ionicons.glyphMap 
}> = ({ value, label, color, icon }) => (
  <View style={[styles.card, { borderTopColor: color }]}>
    <View style={styles.cardContent}>
      <Text style={[styles.cardValue, { color }]}>{value}</Text>
      <Text style={styles.cardLabel}>{label}</Text>
    </View>
    {icon && (
      <Ionicons 
        name={icon} 
        size={24} 
        color={color} 
        style={styles.cardIcon}
      />
    )}
  </View>
);

export default function CitizenDashboardScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const stats = useMemo(() => ({
    total: mockReports.length,
    pending: mockReports.filter(r => r.status === 'PENDING').length,
    inProgress: mockReports.filter(r => r.status === 'IN_PROGRESS').length,
    resolved: mockReports.filter(r => r.status === 'RESOLVED').length,
  }), []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return COLORS.warning;
      case 'IN_PROGRESS': return COLORS.info;
      case 'RESOLVED': return COLORS.success;
      default: return COLORS.textSecondary;
    }
  };

  return (
    <View style={styles.container}>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {user?.name?.split(' ')[0] || 'User'}</Text>
            <Text style={styles.subtitle}>Welcome back to your dashboard</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(citizen)/profile')}>
            <Image
              source={user?.photoURL ? { uri: user.photoURL } : require('../../assets/icon.png')}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.newReportButton}
          onPress={() => router.push('/(citizen)/new-report')}
        >
          <Ionicons name="add" size={24} color="white" />
          <Text style={styles.newReportButtonText}>New Report</Text>
        </TouchableOpacity>

        <View style={styles.statsSection}>
          <Card 
            value={stats.total} 
            label="TOTAL REPORTS" 
            color={COLORS.primary}
            icon="document-text-outline"
          />
          <Card 
            value={stats.pending} 
            label="PENDING" 
            color={COLORS.warning}
            icon="time-outline"
          />
          <Card 
            value={stats.resolved} 
            label="RESOLVED" 
            color={COLORS.success}
            icon="checkmark-circle-outline"
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Reports</Text>
          </View>

          {mockReports.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="document-text-outline" size={48} color={COLORS.mediumGray} />
              <Text style={styles.emptyStateText}>No reports yet</Text>
              <Text style={styles.emptyStateSubtext}>Tap the + button to create your first report</Text>
            </View>
          ) : (
            <View style={styles.reportsList}>
              {mockReports.map((report) => (
                <TouchableOpacity 
                  key={report.id} 
                  style={styles.reportItem}
                  onPress={() => router.push(`/(citizen)/reports/${report.id}`)}
                >
                  <View style={[styles.statusDot, { backgroundColor: getStatusColor(report.status) }]} />
                  <View style={styles.reportContent}>
                    <Text style={styles.reportTitle} numberOfLines={1}>{report.title}</Text>
                    <Text style={styles.reportDescription} numberOfLines={1}>{report.description}</Text>
                    <View style={styles.reportFooter}>
                      <Text style={styles.reportDate}>
                        {new Date(report.createdAt).toLocaleDateString()}
                      </Text>
                      <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(report.status)}20` }]}>
                        <Text style={[styles.statusText, { color: getStatusColor(report.status) }]}>
                          {report.status.replace('_', ' ')}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    position: 'relative',
  },
  welcomeText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 16,
  },
  notificationIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.error,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderTopWidth: 4,
  },
  cardContent: {
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  section: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
    color: COLORS.textPrimary,
  },
  newReportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 24,
    elevation: 2,
  },
  newReportButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    marginTop: 12,
    fontWeight: '500',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  reportsList: {
    marginTop: 8,
  },
  reportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  reportContent: {
    flex: 1,
    marginRight: 12,
  },
  reportTitle: {
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 4,
    fontWeight: '500',
  },
  reportDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  reportFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportDate: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  statusBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
});