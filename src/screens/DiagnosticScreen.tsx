import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import HexagonChart from '../components/HexagonChart';
import { Stats, STAT_CONFIG } from '../types';

interface DiagnosticScreenProps {
  onComplete: (stats: Stats) => void;
}

export default function DiagnosticScreen({ onComplete }: DiagnosticScreenProps) {
  const [stats, setStats] = useState<Stats>({
    strength: 3,
    intellect: 3,
    spirit: 3,
    charisma: 3,
    heart: 3,
    discipline: 3,
  });

  const updateStat = (statName: keyof Stats, value: number) => {
    setStats({
      ...stats,
      [statName]: Math.round(value),
    });
  };

  const renderStatSlider = (statName: keyof Stats) => {
    const config = STAT_CONFIG[statName];
    const value = stats[statName];

    return (
      <View key={statName} style={styles.statContainer}>
        <View style={styles.statHeader}>
          <Text style={styles.statIcon}>{config.icon}</Text>
          <Text style={styles.statLabel}>{config.label}</Text>
          <View style={[styles.statBadge, { backgroundColor: config.color }]}>
            <Text style={styles.statValue}>{value}</Text>
          </View>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={5}
          step={1}
          value={value}
          onValueChange={(val) => updateStat(statName, val)}
          minimumTrackTintColor={config.color}
          maximumTrackTintColor="#E0E0E0"
          thumbTintColor={config.color}
        />
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabelText}>Low</Text>
          <Text style={styles.sliderLabelText}>High</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>The Diagnostic</Text>
        <Text style={styles.subtitle}>
          Rate your current abilities from 1 to 5
        </Text>

        {/* Hexagon Chart Preview */}
        <View style={styles.chartContainer}>
          <HexagonChart stats={stats} size={280} showLabels={false} />
        </View>

        {/* Stat Sliders */}
        <View style={styles.slidersContainer}>
          {(Object.keys(stats) as (keyof Stats)[]).map((statName) =>
            renderStatSlider(statName)
          )}
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => onComplete(stats)}
        >
          <Text style={styles.continueButtonText}>Generate Character</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  slidersContainer: {
    marginHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statContainer: {
    marginBottom: 24,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  statLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  sliderLabelText: {
    fontSize: 12,
    color: '#999',
  },
  continueButton: {
    marginHorizontal: 20,
    marginTop: 30,
    backgroundColor: '#4A90E2',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
});
