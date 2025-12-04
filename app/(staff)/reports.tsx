import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type ReportStatus = 'pending' | 'in-progress' | 'resolved' | 'rejected';

interface Report {
  id: string;
  title: string;
  category: string;
  date: string;
  status: ReportStatus;
  location: string;
  description: string;
  image?: string;
}

export default function AssignedReports() {
  // Sample data - replace with actual data from your backend
  const reports: Report[] = [
    {
      id: 'RPT-001',
      title: 'Broken Street Light',
      category: 'Infrastructure',
      date: '2023-12-01',
      status: 'in-progress',
      location: 'Rizal Street, Poblacion',
      description: 'Street light not working for 3 days now',
      image: 'https://example.com/street-light.jpg'
    },
    {
      id: 'RPT-002',
      title: 'Garbage Not Collected',
      category: 'Sanitation',
      date: '2023-12-02',
      status: 'pending',
      location: 'Bonifacio Street, Barangay 1',
      description: 'Garbage has not been collected for a week',
    },
  ];

  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case 'resolved':
        return '#4CAF50';
      case 'in-progress':
        return '#2196F3';
      case 'rejected':
        return '#F44336';
      case 'pending':
      default:
        return '#FF9800';
    }
  };

  const handleViewReport = (reportId: string) => {
    // Navigate to report details
    console.log('View report:', reportId);
  };

  const handleUpdateStatus = (reportId: string) => {
    // Handle status update
    console.log('Update status for report:', reportId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Assigned Reports</Text>
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Filter</Text>
            <MaterialIcons name="filter-list" size={20} color="#1E88E5" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {reports.map((report) => (
          <View key={report.id} style={styles.reportCard}>
            <View style={styles.reportHeader}>
              <Text style={styles.reportId}>{report.id}</Text>
              <View 
                style={[
                  styles.statusBadge, 
                  { backgroundColor: `${getStatusColor(report.status)}20` }
                ]}
              >
                <View 
                  style={[
                    styles.statusDot, 
                    { backgroundColor: getStatusColor(report.status) }
                  ]} 
                />
                <Text 
                  style={[
                    styles.statusText, 
                    { color: getStatusColor(report.status) }
                  ]}
                >
                  {report.status.replace('-', ' ')}
                </Text>
              </View>
            </View>
            
            <Text style={styles.reportTitle}>{report.title}</Text>
            <Text style={styles.reportCategory}>{report.category}</Text>
            
            <View style={styles.reportMeta}>
              <View style={styles.metaItem}>
                <MaterialIcons name="location-on" size={16} color="#666" />
                <Text style={styles.metaText}>{report.location}</Text>
              </View>
              <View style={styles.metaItem}>
                <MaterialIcons name="event" size={16} color="#666" />
                <Text style={styles.metaText}>{report.date}</Text>
              </View>
            </View>

            <Text style={styles.reportDescription} numberOfLines={2}>
              {report.description}
            </Text>

            {report.image && (
              <Image 
                source={{ uri: report.image }} 
                style={styles.reportImage} 
                resizeMode="cover"
              />
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={() => handleViewReport(report.id)}
              >
                <Text style={styles.secondaryButtonText}>View Details</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={() => handleUpdateStatus(report.id)}
              >
                <Text style={styles.primaryButtonText}>Update Status</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterText: {
    marginRight: 4,
    color: '#1E88E5',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  reportCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  reportId: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  reportCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  reportMeta: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    marginLeft: 4,
    fontSize: 13,
    color: '#666',
  },
  reportDescription: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    marginBottom: 12,
  },
  reportImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#1E88E5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#1E88E5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  secondaryButtonText: {
    color: '#1E88E5',
    fontWeight: '600',
    fontSize: 14,
  },
});
