import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGoalsStore } from '../store/goalsStore';
import { useUserStore } from '../store/userStore';
import { useStatsStore } from '../store/statsStore';
import { Goal, STAT_CONFIG, Stats } from '../types';

export default function SkillTreeScreen() {
  const goals = useGoalsStore((state) => state.goals);
  const loadGoals = useGoalsStore((state) => state.loadGoals);
  const addGoal = useGoalsStore((state) => state.addGoal);
  const completeGoal = useGoalsStore((state) => state.completeGoal);
  const addXP = useUserStore((state) => state.addXP);
  const incrementStat = useStatsStore((state) => state.incrementStat);

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  // Add goal form state
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalDescription, setNewGoalDescription] = useState('');
  const [newGoalStat, setNewGoalStat] = useState<keyof Stats>('strength');
  const [newGoalXP, setNewGoalXP] = useState('100');

  useEffect(() => {
    loadGoals();
  }, []);

  const activeGoals = goals.filter((g) => g.status === 'active');
  const completedGoals = goals.filter((g) => g.status === 'completed');

  const handleAddGoal = () => {
    if (!newGoalTitle.trim()) return;

    addGoal({
      title: newGoalTitle,
      description: newGoalDescription || undefined,
      statTag: newGoalStat,
      xpReward: parseInt(newGoalXP) || 100,
      status: 'active',
    });

    // Reset form
    setNewGoalTitle('');
    setNewGoalDescription('');
    setNewGoalStat('strength');
    setNewGoalXP('100');
    setAddModalVisible(false);
  };

  const handleCompleteGoal = (goal: Goal) => {
    completeGoal(goal.id);
    addXP(goal.xpReward);

    // Increase the stat by a small amount
    const statIncrease = goal.xpReward >= 500 ? 1 : 0.5;
    incrementStat(goal.statTag, statIncrease);

    setDetailModalVisible(false);
    setSelectedGoal(null);
  };

  const renderGoalCard = (goal: Goal) => {
    const statConfig = STAT_CONFIG[goal.statTag];

    return (
      <TouchableOpacity
        key={goal.id}
        style={styles.goalCard}
        onPress={() => {
          setSelectedGoal(goal);
          setDetailModalVisible(true);
        }}
      >
        <View style={styles.goalHeader}>
          <Text style={styles.goalIcon}>{statConfig.icon}</Text>
          <View style={styles.goalInfo}>
            <Text style={styles.goalTitle}>{goal.title}</Text>
            <Text style={[styles.goalStat, { color: statConfig.color }]}>
              {statConfig.label}
            </Text>
          </View>
          <View style={[styles.xpBadge, { backgroundColor: statConfig.color }]}>
            <Text style={styles.xpBadgeText}>+{goal.xpReward} XP</Text>
          </View>
        </View>
        {goal.description && (
          <Text style={styles.goalDescription} numberOfLines={2}>
            {goal.description}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Quest Board</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setAddModalVisible(true)}
          >
            <Ionicons name="add-circle" size={32} color="#4A90E2" />
          </TouchableOpacity>
        </View>

        {/* Active Goals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            🎯 Active Quests ({activeGoals.length})
          </Text>
          {activeGoals.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="flag-outline" size={48} color="#CCC" />
              <Text style={styles.emptyText}>No active quests</Text>
              <Text style={styles.emptySubtext}>
                Tap the + button to add a new goal
              </Text>
            </View>
          ) : (
            activeGoals.map(renderGoalCard)
          )}
        </View>

        {/* Completed Goals */}
        {completedGoals.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              ✅ Completed ({completedGoals.length})
            </Text>
            {completedGoals.map(renderGoalCard)}
          </View>
        )}
      </ScrollView>

      {/* Add Goal Modal */}
      <Modal
        visible={addModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Quest</Text>
              <TouchableOpacity onPress={() => setAddModalVisible(false)}>
                <Ionicons name="close" size={28} color="#666" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Quest Title"
              value={newGoalTitle}
              onChangeText={setNewGoalTitle}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description (optional)"
              value={newGoalDescription}
              onChangeText={setNewGoalDescription}
              multiline
              numberOfLines={3}
            />

            <Text style={styles.label}>Stat Type</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statPicker}>
              {(Object.keys(STAT_CONFIG) as (keyof Stats)[]).map((stat) => {
                const config = STAT_CONFIG[stat];
                const isSelected = stat === newGoalStat;
                return (
                  <TouchableOpacity
                    key={stat}
                    style={[
                      styles.statOption,
                      isSelected && { backgroundColor: config.color },
                    ]}
                    onPress={() => setNewGoalStat(stat)}
                  >
                    <Text style={styles.statOptionIcon}>{config.icon}</Text>
                    <Text
                      style={[
                        styles.statOptionText,
                        isSelected && { color: '#FFF' },
                      ]}
                    >
                      {config.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <Text style={styles.label}>XP Reward</Text>
            <TextInput
              style={styles.input}
              placeholder="100"
              value={newGoalXP}
              onChangeText={setNewGoalXP}
              keyboardType="number-pad"
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleAddGoal}>
              <Text style={styles.submitButtonText}>Create Quest</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Goal Detail Modal */}
      <Modal
        visible={detailModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setDetailModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedGoal && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedGoal.title}</Text>
                  <TouchableOpacity onPress={() => setDetailModalVisible(false)}>
                    <Ionicons name="close" size={28} color="#666" />
                  </TouchableOpacity>
                </View>

                <View style={styles.detailContent}>
                  <Text style={styles.detailStat}>
                    {STAT_CONFIG[selectedGoal.statTag].icon}{' '}
                    {STAT_CONFIG[selectedGoal.statTag].label}
                  </Text>

                  {selectedGoal.description && (
                    <Text style={styles.detailDescription}>
                      {selectedGoal.description}
                    </Text>
                  )}

                  <View style={styles.xpRewardBox}>
                    <Ionicons name="star" size={24} color="#FFD700" />
                    <Text style={styles.xpRewardText}>
                      +{selectedGoal.xpReward} XP
                    </Text>
                  </View>

                  {selectedGoal.status === 'active' && (
                    <TouchableOpacity
                      style={styles.completeButton}
                      onPress={() => handleCompleteGoal(selectedGoal)}
                    >
                      <Ionicons name="checkmark-circle" size={24} color="#FFF" />
                      <Text style={styles.completeButtonText}>Complete Quest</Text>
                    </TouchableOpacity>
                  )}

                  {selectedGoal.status === 'completed' && (
                    <View style={styles.completedBadge}>
                      <Ionicons name="checkmark-circle" size={24} color="#2ECC71" />
                      <Text style={styles.completedText}>Completed!</Text>
                    </View>
                  )}
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    padding: 4,
  },
  section: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  goalCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  goalStat: {
    fontSize: 12,
    fontWeight: '500',
  },
  xpBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  xpBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
  },
  goalDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#BBB',
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  statPicker: {
    marginBottom: 16,
  },
  statOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
    alignItems: 'center',
  },
  statOptionIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  statOptionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  submitButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  detailContent: {
    paddingBottom: 20,
  },
  detailStat: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A90E2',
    marginBottom: 16,
  },
  detailDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 24,
  },
  xpRewardBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF9E6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  xpRewardText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginLeft: 8,
  },
  completeButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 8,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  completedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2ECC71',
    marginLeft: 8,
  },
});