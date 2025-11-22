// Core stat types for the RPG system
export interface Stats {
  strength: number;      // Physical power
  intellect: number;     // Mental capability
  spirit: number;        // Emotional resilience
  charisma: number;      // Social skills
  heart: number;         // Compassion & empathy
  discipline: number;    // Focus & consistency
}

// Avatar customization configuration
export interface AvatarConfig {
  body: number;          // Body type/shape index
  hair: number;          // Hair style index
  hairColor: string;     // Hair color hex
  eyes: number;          // Eye style index
  eyeColor: string;      // Eye color hex
  outfit: number;        // Outfit index
  outfitColor: string;   // Outfit color hex
  skinTone: string;      // Skin tone hex
}

// User profile
export interface UserProfile {
  id: string;
  username: string;
  title: string;         // e.g., "Level 3 Creator", "Novice Explorer"
  level: number;
  totalXP: number;
  avatarConfig: AvatarConfig;
  createdAt: string;
}

// Goal/Quest in the skill tree
export interface Goal {
  id: string;
  userId: string;
  title: string;
  description?: string;
  statTag: keyof Stats;  // Which stat this goal improves
  xpReward: number;
  status: 'active' | 'completed' | 'archived';
  reflectionNotes?: string;
  createdAt: string;
  completedAt?: string;
}

// XP Log entry for history tracking
export interface XPLog {
  id: string;
  userId: string;
  goalId?: string;
  statAffected: keyof Stats;
  xpGained: number;
  createdAt: string;
}

// Stat display configuration
export const STAT_CONFIG = {
  strength: { label: 'Strength', color: '#E74C3C', icon: '💪' },
  intellect: { label: 'Intellect', color: '#3498DB', icon: '🧠' },
  spirit: { label: 'Spirit', color: '#9B59B6', icon: '✨' },
  charisma: { label: 'Charisma', color: '#E67E22', icon: '🎭' },
  heart: { label: 'Heart', color: '#E91E63', icon: '❤️' },
  discipline: { label: 'Discipline', color: '#2ECC71', icon: '🎯' },
} as const;

// Helper function to calculate level from XP
export const calculateLevel = (xp: number): number => {
  // Simple formula: level = floor(sqrt(xp / 100))
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

// Helper function to get title based on level
export const getTitle = (level: number): string => {
  if (level >= 20) return 'Legendary Hero';
  if (level >= 15) return 'Master Adventurer';
  if (level >= 10) return 'Seasoned Explorer';
  if (level >= 5) return 'Rising Champion';
  if (level >= 3) return 'Aspiring Creator';
  return 'Novice Explorer';
};
