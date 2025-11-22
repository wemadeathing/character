import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomeScreen from './WelcomeScreen';
import AvatarCreatorScreen from './AvatarCreatorScreen';
import DiagnosticScreen from './DiagnosticScreen';
import { useUserStore } from '../store/userStore';
import { useStatsStore } from '../store/statsStore';
import { AvatarConfig, Stats } from '../types';

interface OnboardingScreenProps {
  onComplete: () => void;
}

type OnboardingStep = 'welcome' | 'avatar' | 'diagnostic';

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [username, setUsername] = useState('');
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig | null>(null);

  const createGuestUser = useUserStore((state) => state.createGuestUser);
  const setStats = useStatsStore((state) => state.setStats);

  const handleWelcomeContinue = (name: string) => {
    setUsername(name);
    setCurrentStep('avatar');
  };

  const handleAvatarComplete = (config: AvatarConfig) => {
    setAvatarConfig(config);
    setCurrentStep('diagnostic');
  };

  const handleDiagnosticComplete = async (stats: Stats) => {
    // Save the user data
    if (avatarConfig) {
      await createGuestUser(username, avatarConfig);
    }

    // Save the stats
    setStats(stats);

    // Mark onboarding as complete
    try {
      await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
      onComplete();
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  return (
    <View style={styles.container}>
      {currentStep === 'welcome' && (
        <WelcomeScreen onContinue={handleWelcomeContinue} />
      )}
      {currentStep === 'avatar' && (
        <AvatarCreatorScreen onComplete={handleAvatarComplete} />
      )}
      {currentStep === 'diagnostic' && (
        <DiagnosticScreen onComplete={handleDiagnosticComplete} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
