import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile, AvatarConfig, calculateLevel, getTitle } from '../types';

interface UserState {
  user: UserProfile | null;
  isLoading: boolean;

  // Actions
  setUser: (user: UserProfile) => void;
  updateAvatar: (avatarConfig: AvatarConfig) => void;
  updateUsername: (username: string) => void;
  addXP: (amount: number) => void;
  loadUser: () => Promise<void>;
  saveUser: () => Promise<void>;
  createGuestUser: (username: string, avatarConfig: AvatarConfig) => Promise<void>;
  clearUser: () => void;
}

const DEFAULT_AVATAR: AvatarConfig = {
  body: 0,
  hair: 0,
  hairColor: '#8B4513',
  eyes: 0,
  eyeColor: '#4A90E2',
  outfit: 0,
  outfitColor: '#2C3E50',
  skinTone: '#F5D7B8',
};

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isLoading: false,

  setUser: (user) => {
    set({ user });
    get().saveUser();
  },

  updateAvatar: (avatarConfig) => {
    const user = get().user;
    if (user) {
      set({
        user: {
          ...user,
          avatarConfig,
        },
      });
      get().saveUser();
    }
  },

  updateUsername: (username) => {
    const user = get().user;
    if (user) {
      set({
        user: {
          ...user,
          username,
        },
      });
      get().saveUser();
    }
  },

  addXP: (amount) => {
    const user = get().user;
    if (user) {
      const newXP = user.totalXP + amount;
      const newLevel = calculateLevel(newXP);
      set({
        user: {
          ...user,
          totalXP: newXP,
          level: newLevel,
          title: getTitle(newLevel),
        },
      });
      get().saveUser();
    }
  },

  loadUser: async () => {
    try {
      set({ isLoading: true });
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        set({ user, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Error loading user:', error);
      set({ isLoading: false });
    }
  },

  saveUser: async () => {
    try {
      const user = get().user;
      if (user) {
        await AsyncStorage.setItem('user', JSON.stringify(user));
      }
    } catch (error) {
      console.error('Error saving user:', error);
    }
  },

  createGuestUser: async (username, avatarConfig) => {
    const newUser: UserProfile = {
      id: `guest-${Date.now()}`,
      username,
      title: 'Novice Explorer',
      level: 1,
      totalXP: 0,
      avatarConfig: avatarConfig || DEFAULT_AVATAR,
      createdAt: new Date().toISOString(),
    };

    set({ user: newUser });
    await get().saveUser();
  },

  clearUser: () => {
    set({ user: null });
    AsyncStorage.removeItem('user');
  },
}));
