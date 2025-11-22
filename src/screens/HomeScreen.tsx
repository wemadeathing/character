import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUserStore } from '../store/userStore';
import { useStatsStore } from '../store/statsStore';
import { useGoalsStore } from '../store/goalsStore';
import HexagonChart from '../components/HexagonChart';
import Avatar from '../components/Avatar';

export default function HomeScreen() {
  const user = useUserStore((state) => state.user);
  const loadUser = useUserStore((state) => state.loadUser);
  const stats = useStatsStore((state) => state.stats);
  const loadStats = useStatsStore((state) => state.loadStats);
  const goals = useGoalsStore((state) => state.goals);
  const loadGoals = useGoalsStore((state) => state.loadGoals);

  useEffect(() => {
    loadUser();
    loadStats();
    loadGoals();
  }, []);

  const activeGoals = goals.filter((g) => g.status === 'active');
  const completedGoals = goals.filter((g) => g.status === 'completed');

  return (
    <ScrollView style={styles.container}>
      {/* Header with User Info */}
      <View style={styles.header}>
        <Text style={styles.greeting}>⚔️ {user?.username || 'Hero'}</Text>
        <View style={styles.titleBadge}>
          <Text style={styles.title}>{user?.title || 'Novice Explorer'}</Text>
        </View>
        <Text style={styles.level}>Level {user?.level || 1}</Text>
      </View>

      {/* XP Progress */}
      <View style={styles.xpCard}>
        <View style={styles.xpHeader}>
          <Ionicons name="star" size={20} color="#FFD700" />
          <Text style={styles.xpLabel}>Total XP</Text>
        </View>
        <Text style={styles.xpValue}>{user?.totalXP || 0}</Text>
      </View>

      {/* Hexagon Chart */}
      <View style={styles.chartCard}>
        <Text style={styles.sectionTitle}>Your Stats</Text>
        <HexagonChart stats={stats} size={300} showLabels={true} />
      </View>

      {/* Avatar */}
      <View style={styles.avatarCard}>
        <Text style={styles.sectionTitle}>Your Character</Text>
        {user?.avatarConfig && (
          <Avatar config={user.avatarConfig} size={180} />
        )}
      </View>

      {/* Quick Stats */}
      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Ionicons name="list" size={28} color="#4A90E2" />
          <Text style={styles.statNumber}>{activeGoals.length}</Text>
          <Text style={styles.statLabel}>Active Quests</Text>
        </View>

        <View style={styles.statBox}>
          <Ionicons name="checkmark-circle" size={28} color="#2ECC71" />
          <Text style={styles.statNumber}>{completedGoals.length}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </View>

      {/* Floating Action Button would go here */}
      <View style={styles.fabContainer}>
        <TouchableOpacity style={styles.fab}>
          <Ionicons name="add" size={32} color="#FFF" />
        </TouchableOpacity>
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
    backgroundColor: '#4A90E2',
    padding: 24,
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  titleBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  level: {
    fontSize: 14,
    color: '#E3F2FD',
  },
  xpCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginTop: -20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  xpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  xpLabel: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  xpValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  chartCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  avatarCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 80,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
