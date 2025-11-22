import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Goal, Stats } from '../types';

interface GoalsState {
  goals: Goal[];
  isLoading: boolean;

  // Actions
  addGoal: (goal: Omit<Goal, 'id' | 'userId' | 'createdAt'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  completeGoal: (id: string, reflectionNotes?: string) => void;
  deleteGoal: (id: string) => void;
  loadGoals: () => Promise<void>;
  saveGoals: () => Promise<void>;
  getActiveGoals: () => Goal[];
  getCompletedGoals: () => Goal[];
  getGoalsByStat: (stat: keyof Stats) => Goal[];
}

export const useGoalsStore = create<GoalsState>((set, get) => ({
  goals: [],
  isLoading: false,

  addGoal: (goalData) => {
    const newGoal: Goal = {
      ...goalData,
      id: `goal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: 'local-user', // Will be updated when we add auth
      createdAt: new Date().toISOString(),
      status: 'active',
    };

    set({ goals: [...get().goals, newGoal] });
    get().saveGoals();
  },

  updateGoal: (id, updates) => {
    set({
      goals: get().goals.map((goal) =>
        goal.id === id ? { ...goal, ...updates } : goal
      ),
    });
    get().saveGoals();
  },

  completeGoal: (id, reflectionNotes) => {
    set({
      goals: get().goals.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              status: 'completed' as const,
              reflectionNotes,
              completedAt: new Date().toISOString(),
            }
          : goal
      ),
    });
    get().saveGoals();
  },

  deleteGoal: (id) => {
    set({
      goals: get().goals.filter((goal) => goal.id !== id),
    });
    get().saveGoals();
  },

  loadGoals: async () => {
    try {
      set({ isLoading: true });
      const goalsData = await AsyncStorage.getItem('goals');
      if (goalsData) {
        const goals = JSON.parse(goalsData);
        set({ goals, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Error loading goals:', error);
      set({ isLoading: false });
    }
  },

  saveGoals: async () => {
    try {
      const goals = get().goals;
      await AsyncStorage.setItem('goals', JSON.stringify(goals));
    } catch (error) {
      console.error('Error saving goals:', error);
    }
  },

  getActiveGoals: () => {
    return get().goals.filter((goal) => goal.status === 'active');
  },

  getCompletedGoals: () => {
    return get().goals.filter((goal) => goal.status === 'completed');
  },

  getGoalsByStat: (stat) => {
    return get().goals.filter((goal) => goal.statTag === stat);
  },
}));
