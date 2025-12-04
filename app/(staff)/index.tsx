import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Report } from '../../src/types';

const { width } = Dimensions.get('window');
const CARD_PADDING = 16;
const CARD_GAP = 8;
const CARD_WIDTH = (width - (CARD_PADDING * 2) - CARD_GAP) / 2;

// Color Palette
const COLORS = {
  white: '#FFFFFF',
  red: '#E53935',
  blue: '#1E88E5',
  yellow: '#FFD600',
  darkBlue: '#0D47A1',
  lightGray: '#f5f5f5',
  black: '#000'
};

const mockAssignedReports: Report[] = [
  {
    id: '1',
    citizenId: '1',
    title: 'Slow Internet in Barangay X',
    description: 'Connection drops every evening.',
    status: 'IN_REVIEW',
    categoryId: '1',
    attachments: [],
    createdAt: '',
    updatedAt: '',
  },
  {
    id: '2',
    citizenId: '2',
    title: 'Cybersecurity Concern',
    description: 'Suspicious email activity reported.',
    status: 'PENDING',
    categoryId: '2',
    attachments: [],
    createdAt: '',
    updatedAt: '',
  },
];

export default function StaffDashboardScreen() {
  const totalAssigned = mockAssignedReports.length;
  const pendingCount = mockAssignedReports.filter(r => r.status === 'PENDING').length;
  const inReviewCount = mockAssignedReports.filter(r => r.status === 'IN_REVIEW').length;
  const resolvedCount = mockAssignedReports.filter(r => r.status === 'RESOLVED').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RESOLVED':
        return '#4CAF50';
      case 'IN_REVIEW':
        return COLORS.yellow;
      case 'REJECTED':
        return COLORS.red;
      case 'PENDING':
      default:
        return COLORS.blue;
    }
  };

  const Card: React.FC<{ value: number | string; label: string; color: string }> = ({ value, label, color }) => (
    <View style={[
      styles.card,
      {
        backgroundColor: COLORS.white,
        borderTopWidth: 4,
        borderTopColor: color,
      }
    ]}>
      <View style={styles.cardContent}>
        <Text style={[styles.cardValue, { color }]}>{value}</Text>
        <Text style={styles.cardLabel}>{label}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Staff Dashboard</Text>
        <Text style={styles.subtitle}>Welcome back, Staff</Text>
      </View>

      <View style={styles.grid}>
        <Card 
          value={totalAssigned} 
          label="TOTAL ASSIGNED" 
          color={COLORS.black} 
        />
        <Card 
          value={pendingCount} 
          label="PENDING" 
          color={COLORS.blue} 
        />
        <Card 
          value={inReviewCount} 
          label="IN REVIEW" 
          color={COLORS.yellow} 
        />
        <Card 
          value={resolvedCount} 
          label="RESOLVED" 
          color="#4CAF50" 
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Assigned Reports</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.reportsList}>
          {mockAssignedReports.map((item) => (
            <View key={item.id} style={styles.reportItem}>
              <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
              <View style={styles.reportContent}>
                <Text style={styles.reportTitle}>{item.title}</Text>
                <View style={styles.reportMeta}>
                  <Text style={styles.reportDescription}>{item.description}</Text>
                </View>
                <View style={styles.reportFooter}>
                  <Text style={styles.reportId}>#{item.id}</Text>
                  <Text style={styles.reportStatus}>
                    Status: <Text style={{ color: getStatusColor(item.status) }}>{item.status}</Text>
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.lightGray,
  },
  header: {
    marginBottom: 16,
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.darkBlue,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
    rowGap: 10,
    columnGap: CARD_GAP,
  },
  card: {
    width: CARD_WIDTH,
    padding: 12,
    borderRadius: 8,
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    minHeight: 80,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: 11,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    lineHeight: 14,
  },
  section: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
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
    color: COLORS.darkBlue,
  },
  seeAllText: {
    color: COLORS.blue,
    fontWeight: '500',
  },
  reportsList: {
    gap: 12,
  },
  reportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    elevation: 1,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  reportContent: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#333',
  },
  reportMeta: {
    marginBottom: 4,
  },
  reportFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  reportId: {
    fontSize: 12,
    color: '#666',
  },
  reportStatus: {
    fontSize: 12,
    color: '#666',
  },
  reportDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
});
