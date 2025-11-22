import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stats } from '../types';

interface StatsState {
  stats: Stats;
  isLoading: boolean;

  // Actions
  setStats: (stats: Stats) => void;
  updateStat: (statName: keyof Stats, value: number) => void;
  incrementStat: (statName: keyof Stats, amount: number) => void;
  loadStats: () => Promise<void>;
  saveStats: () => Promise<void>;
  resetStats: () => void;
}

const DEFAULT_STATS: Stats = {
  strength: 1,
  intellect: 1,
  spirit: 1,
  charisma: 1,
  heart: 1,
  discipline: 1,
};

export const useStatsStore = create<StatsState>((set, get) => ({
  stats: DEFAULT_STATS,
  isLoading: false,

  setStats: (stats) => {
    set({ stats });
    get().saveStats();
  },

  updateStat: (statName, value) => {
    // Clamp value between 1 and 5
    const clampedValue = Math.max(1, Math.min(5, value));
    set({
      stats: {
        ...get().stats,
        [statName]: clampedValue,
      },
    });
    get().saveStats();
  },

  incrementStat: (statName, amount) => {
    const currentValue = get().stats[statName];
    const newValue = Math.max(1, Math.min(5, currentValue + amount));
    set({
      stats: {
        ...get().stats,
        [statName]: newValue,
      },
    });
    get().saveStats();
  },

  loadStats: async () => {
    try {
      set({ isLoading: true });
      const statsData = await AsyncStorage.getItem('stats');
      if (statsData) {
        const stats = JSON.parse(statsData);
        set({ stats, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Error loading stats:', error);
      set({ isLoading: false });
    }
  },

  saveStats: async () => {
    try {
      const stats = get().stats;
      await AsyncStorage.setItem('stats', JSON.stringify(stats));
    } catch (error) {
      console.error('Error saving stats:', error);
    }
  },

  resetStats: () => {
    set({ stats: DEFAULT_STATS });
    get().saveStats();
  },
}));
