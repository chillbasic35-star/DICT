import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function SupervisorAnalytics() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Analytics</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Reports Overview</Text>
          <Text style={styles.cardText}>Total Reports: 124</Text>
          <Text style={styles.cardText}>Resolved: 89</Text>
          <Text style={styles.cardText}>In Progress: 25</Text>
          <Text style={styles.cardText}>Pending: 10</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Staff Performance</Text>
          <Text style={styles.cardText}>Top Performer: John Doe (42 reports)</Text>
          <Text style={styles.cardText}>Average Resolution Time: 2.3 days</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Categories</Text>
          <Text style={styles.cardText}>Infrastructure: 45%</Text>
          <Text style={styles.cardText}>Utilities: 30%</Text>
          <Text style={styles.cardText}>Public Safety: 15%</Text>
          <Text style={styles.cardText}>Others: 10%</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#2c3e50',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
});
