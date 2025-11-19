import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SplashScreenProps {
  onFinish: (hasCompletedOnboarding: boolean) => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      // Simulate splash screen delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Check if user has completed onboarding
      const hasCompleted = await AsyncStorage.getItem('hasCompletedOnboarding');
      onFinish(hasCompleted === 'true');
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      onFinish(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Your App Name</Text>
      <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  loader: {
    marginTop: 30,
  },
});
