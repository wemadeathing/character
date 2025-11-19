import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Theme from '../constants/theme';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  padding?: keyof typeof Theme.spacing;
  shadow?: 'small' | 'medium' | 'large' | 'none';
}

export default function Card({
  children,
  onPress,
  style,
  padding = 'md',
  shadow = 'medium',
}: CardProps) {
  const cardStyles = [
    styles.base,
    { padding: Theme.spacing[padding] },
    shadow !== 'none' && Theme.shadows[shadow],
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyles}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyles}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.md,
    overflow: 'hidden',
  },
});
