import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Avatar from '../components/Avatar';
import { AvatarConfig } from '../types';

interface AvatarCreatorScreenProps {
  onComplete: (config: AvatarConfig) => void;
}

const SKIN_TONES = ['#F5D7B8', '#E8B896', '#C68642', '#8D5524', '#4A2C1A'];
const HAIR_COLORS = ['#000000', '#8B4513', '#FFD700', '#FF6347', '#9B59B6', '#2ECC71'];
const EYE_COLORS = ['#4A90E2', '#2ECC71', '#8B4513', '#9B59B6', '#E74C3C'];
const OUTFIT_COLORS = ['#2C3E50', '#E74C3C', '#3498DB', '#2ECC71', '#F39C12', '#9B59B6'];

type TabType = 'body' | 'hair' | 'eyes' | 'outfit';

export default function AvatarCreatorScreen({ onComplete }: AvatarCreatorScreenProps) {
  const [activeTab, setActiveTab] = useState<TabType>('body');
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>({
    body: 0,
    hair: 0,
    hairColor: '#8B4513',
    eyes: 0,
    eyeColor: '#4A90E2',
    outfit: 0,
    outfitColor: '#2C3E50',
    skinTone: '#F5D7B8',
  });

  const updateConfig = (updates: Partial<AvatarConfig>) => {
    setAvatarConfig({ ...avatarConfig, ...updates });
  };

  const renderColorPicker = (colors: string[], selectedColor: string, onSelect: (color: string) => void) => (
    <View style={styles.colorGrid}>
      {colors.map((color) => (
        <TouchableOpacity
          key={color}
          style={[
            styles.colorOption,
            { backgroundColor: color },
            selectedColor === color && styles.selectedColorOption,
          ]}
          onPress={() => onSelect(color)}
        />
      ))}
    </View>
  );

  const renderStylePicker = (count: number, selected: number, onSelect: (index: number) => void, label: string) => (
    <View style={styles.styleGrid}>
      {Array.from({ length: count }).map((_, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.styleOption, selected === index && styles.selectedStyleOption]}
          onPress={() => onSelect(index)}
        >
          <Text style={styles.styleOptionText}>
            {label} {index + 1}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'body':
        return (
          <View>
            <Text style={styles.sectionTitle}>Body Type</Text>
            {renderStylePicker(3, avatarConfig.body, (index) => updateConfig({ body: index }), 'Type')}
            <Text style={styles.sectionTitle}>Skin Tone</Text>
            {renderColorPicker(SKIN_TONES, avatarConfig.skinTone, (color) => updateConfig({ skinTone: color }))}
          </View>
        );

      case 'hair':
        return (
          <View>
            <Text style={styles.sectionTitle}>Hair Style</Text>
            {renderStylePicker(3, avatarConfig.hair, (index) => updateConfig({ hair: index }), 'Style')}
            <Text style={styles.sectionTitle}>Hair Color</Text>
            {renderColorPicker(HAIR_COLORS, avatarConfig.hairColor, (color) => updateConfig({ hairColor: color }))}
          </View>
        );

      case 'eyes':
        return (
          <View>
            <Text style={styles.sectionTitle}>Eye Style</Text>
            {renderStylePicker(3, avatarConfig.eyes, (index) => updateConfig({ eyes: index }), 'Style')}
            <Text style={styles.sectionTitle}>Eye Color</Text>
            {renderColorPicker(EYE_COLORS, avatarConfig.eyeColor, (color) => updateConfig({ eyeColor: color }))}
          </View>
        );

      case 'outfit':
        return (
          <View>
            <Text style={styles.sectionTitle}>Outfit Style</Text>
            {renderStylePicker(3, avatarConfig.outfit, (index) => updateConfig({ outfit: index }), 'Style')}
            <Text style={styles.sectionTitle}>Outfit Color</Text>
            {renderColorPicker(OUTFIT_COLORS, avatarConfig.outfitColor, (color) => updateConfig({ outfitColor: color }))}
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Create Your Avatar</Text>

        {/* Avatar Preview */}
        <View style={styles.avatarPreview}>
          <Avatar config={avatarConfig} size={200} />
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {(['body', 'hair', 'eyes', 'outfit'] as TabType[]).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View style={styles.content}>{renderTabContent()}</View>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => onComplete(avatarConfig)}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
    marginBottom: 20,
    color: '#333',
  },
  avatarPreview: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#4A90E2',
    fontWeight: '600',
  },
  content: {
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 12,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },
  colorOption: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  selectedColorOption: {
    borderColor: '#4A90E2',
    borderWidth: 3,
    transform: [{ scale: 1.1 }],
  },
  styleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },
  styleOption: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    backgroundColor: '#F9F9F9',
  },
  selectedStyleOption: {
    borderColor: '#4A90E2',
    backgroundColor: '#E3F2FD',
  },
  styleOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
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
