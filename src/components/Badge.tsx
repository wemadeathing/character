import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Theme from '../constants/theme';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
type BadgeSize = 'small' | 'medium' | 'large';

interface BadgeProps {
  label?: string;
  count?: number;
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: ViewStyle;
  textStyle?: TextStyle;
  dot?: boolean;
  max?: number;
}

export default function Badge({
  label,
  count,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
  dot = false,
  max = 99,
}: BadgeProps) {
  const displayCount = count !== undefined && count > max ? `${max}+` : count;

  const badgeStyles = [
    styles.badge,
    styles[variant],
    styles[size],
    dot && styles.dot,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${size}Text` as keyof typeof styles],
    textStyle,
  ];

  // Dot badge (no text)
  if (dot) {
    return <View style={badgeStyles} />;
  }

  // Empty badge (no content)
  if (!label && count === undefined) {
    return null;
  }

  return (
    <View style={badgeStyles}>
      <Text style={textStyles}>
        {label || displayCount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: Theme.borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.xs,
  },

  // Variants
  primary: {
    backgroundColor: Theme.colors.primary,
  },
  success: {
    backgroundColor: Theme.colors.success,
  },
  warning: {
    backgroundColor: Theme.colors.warning,
  },
  error: {
    backgroundColor: Theme.colors.error,
  },
  info: {
    backgroundColor: Theme.colors.info,
  },
  neutral: {
    backgroundColor: Theme.colors.gray,
  },

  // Sizes
  small: {
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
  },
  medium: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
  },
  large: {
    minWidth: 24,
    height: 24,
    paddingHorizontal: 8,
  },

  // Dot variant
  dot: {
    width: 8,
    height: 8,
    minWidth: 8,
    paddingHorizontal: 0,
  },

  // Text styles
  text: {
    color: Theme.colors.white,
    fontWeight: Theme.typography.bold,
  },
  smallText: {
    fontSize: 10,
  },
  mediumText: {
    fontSize: 12,
  },
  largeText: {
    fontSize: 14,
  },
});
