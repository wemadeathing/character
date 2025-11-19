import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello!</Text>
        <Text style={styles.subtitle}>Welcome to your app</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="home" size={32} color="#4A90E2" />
          <Text style={styles.cardTitle}>Home Dashboard</Text>
        </View>
        <Text style={styles.cardDescription}>
          This is your main home screen. You can customize this to show your app's main features and content.
        </Text>
      </View>

      <View style={styles.grid}>
        <TouchableOpacity style={styles.gridItem}>
          <Ionicons name="analytics-outline" size={32} color="#4A90E2" />
          <Text style={styles.gridItemText}>Analytics</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem}>
          <Ionicons name="settings-outline" size={32} color="#4A90E2" />
          <Text style={styles.gridItemText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem}>
          <Ionicons name="notifications-outline" size={32} color="#4A90E2" />
          <Text style={styles.gridItemText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem}>
          <Ionicons name="person-outline" size={32} color="#4A90E2" />
          <Text style={styles.gridItemText}>Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={24} color="#007AFF" />
        <Text style={styles.infoText}>
          Tap any of the items above to explore more features
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    paddingTop: 60,
    marginBottom: 16,
  },
  greeting: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
  card: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginLeft: 12,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  gridItem: {
    width: '45%',
    backgroundColor: '#FFFFFF',
    margin: '2.5%',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gridItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    marginTop: 8,
  },
  infoCard: {
    backgroundColor: '#E3F2FD',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#1976D2',
    marginLeft: 12,
    flex: 1,
  },
});
