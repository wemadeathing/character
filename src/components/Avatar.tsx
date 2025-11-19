import React from 'react';
import { View, Image, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Theme from '../constants/theme';

type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';

interface AvatarProps {
  source?: string;
  name?: string;
  size?: AvatarSize;
  style?: ViewStyle;
  showBorder?: boolean;
}

export default function Avatar({
  source,
  name,
  size = 'medium',
  style,
  showBorder = false,
}: AvatarProps) {
  const dimensions = {
    small: 32,
    medium: 48,
    large: 64,
    xlarge: 96,
  };

  const iconSizes = {
    small: 16,
    medium: 24,
    large: 32,
    xlarge: 48,
  };

  const fontSize = {
    small: Theme.typography.xs,
    medium: Theme.typography.md,
    large: Theme.typography.xl,
    xlarge: Theme.typography.xxxl,
  };

  const avatarSize = dimensions[size];
  const iconSize = iconSizes[size];
  const textSize = fontSize[size];

  const getInitials = (fullName: string) => {
    const names = fullName.trim().split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  const avatarStyles = [
    styles.avatar,
    {
      width: avatarSize,
      height: avatarSize,
      borderRadius: avatarSize / 2,
    },
    showBorder && styles.avatarBorder,
    style,
  ];

  // If source is provided, show image
  if (source) {
    return (
      <View style={avatarStyles}>
        <Image
          source={{ uri: source }}
          style={[
            styles.image,
            {
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
            },
          ]}
          resizeMode="cover"
        />
      </View>
    );
  }

  // If name is provided, show initials
  if (name) {
    return (
      <View style={avatarStyles}>
        <Text style={[styles.initials, { fontSize: textSize }]}>
          {getInitials(name)}
        </Text>
      </View>
    );
  }

  // Default: show person icon
  return (
    <View style={avatarStyles}>
      <Ionicons name="person" size={iconSize} color={Theme.colors.white} />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarBorder: {
    borderWidth: 3,
    borderColor: Theme.colors.white,
    ...Theme.shadows.small,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initials: {
    color: Theme.colors.white,
    fontWeight: Theme.typography.semibold,
  },
});
