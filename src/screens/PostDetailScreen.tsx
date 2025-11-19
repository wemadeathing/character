import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/HomeStack';
import { Card, Avatar, Button, Badge } from '../components';
import { Ionicons } from '@expo/vector-icons';
import Theme from '../constants/theme';

type Props = NativeStackScreenProps<HomeStackParamList, 'PostDetail'>;

export default function PostDetailScreen({ route }: Props) {
  const { id, title } = route.params;
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // In a real app, you'd fetch the post data based on the id
  const post = {
    id,
    title,
    author: 'Sarah Chen',
    authorBio: 'Senior Mobile Developer at Tech Co.',
    date: 'December 15, 2024',
    readTime: '5 min read',
    category: 'Tutorial',
    likes: 156,
    comments: 24,
    content: `React Native has revolutionized mobile app development by allowing developers to build native mobile applications using JavaScript and React. With the power of Expo, getting started has never been easier.

In this comprehensive guide, we'll explore the fundamentals of React Native development and how Expo simplifies the entire process.

## What is React Native?

React Native is a framework for building native mobile applications using React. Unlike hybrid apps that run in a WebView, React Native apps use actual native components, resulting in better performance and a more authentic user experience.

## Why Expo?

Expo is a framework and platform for React Native that provides a set of tools and services that make development faster and easier:

• Pre-configured development environment
• Access to native APIs without ejecting
• Over-the-air updates
• Easy deployment to app stores
• Rich ecosystem of libraries

## Getting Started

Starting a new Expo project is as simple as running a single command. The Expo CLI handles all the configuration and setup for you, allowing you to focus on building your app.

## Component Architecture

Building reusable components is key to maintaining a scalable React Native application. By creating a component library with consistent styling and behavior, you can significantly speed up development while ensuring a cohesive user experience.

## Conclusion

React Native and Expo together provide a powerful platform for building mobile applications. Whether you're a seasoned developer or just getting started, these tools make mobile development accessible and enjoyable.`,
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    // Implement share functionality
    console.log('Share post');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Badge label={post.category} variant="primary" />
        <Text style={styles.title}>{post.title}</Text>

        <View style={styles.metadata}>
          <Text style={styles.date}>{post.date}</Text>
          <Text style={styles.readTime}>• {post.readTime}</Text>
        </View>
      </View>

      <Card style={styles.authorCard}>
        <View style={styles.authorContent}>
          <Avatar name={post.author} size="medium" />
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>{post.author}</Text>
            <Text style={styles.authorBio}>{post.authorBio}</Text>
          </View>
          <Button
            title="Follow"
            variant="outline"
            size="small"
            onPress={() => console.log('Follow author')}
          />
        </View>
      </Card>

      <View style={styles.content}>
        <Text style={styles.bodyText}>{post.content}</Text>
      </View>

      <View style={styles.actions}>
        <Card style={styles.actionsCard} padding="md">
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Ionicons name="heart" size={20} color={Theme.colors.error} />
              <Text style={styles.statText}>{post.likes} likes</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="chatbubble" size={20} color={Theme.colors.primary} />
              <Text style={styles.statText}>{post.comments} comments</Text>
            </View>
          </View>

          <View style={styles.buttonRow}>
            <Button
              title={isLiked ? 'Liked' : 'Like'}
              icon={isLiked ? 'heart' : 'heart-outline'}
              variant={isLiked ? 'primary' : 'outline'}
              onPress={handleLike}
              style={styles.actionButton}
            />
            <Button
              title={isSaved ? 'Saved' : 'Save'}
              icon={isSaved ? 'bookmark' : 'bookmark-outline'}
              variant="outline"
              onPress={handleSave}
              style={styles.actionButton}
            />
            <Button
              title="Share"
              icon="share-outline"
              variant="outline"
              onPress={handleShare}
              style={styles.actionButton}
            />
          </View>
        </Card>
      </View>

      <View style={styles.commentsSection}>
        <Text style={styles.sectionTitle}>Comments ({post.comments})</Text>
        <Card style={styles.commentCard}>
          <Text style={styles.commentPlaceholder}>
            Comments section coming soon...
          </Text>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    backgroundColor: Theme.colors.surface,
    padding: Theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  title: {
    fontSize: Theme.typography.xxxl,
    fontWeight: Theme.typography.bold,
    color: Theme.colors.text,
    marginTop: Theme.spacing.sm,
    lineHeight: Theme.typography.xxxl * Theme.typography.lineHeightTight,
  },
  metadata: {
    flexDirection: 'row',
    marginTop: Theme.spacing.sm,
  },
  date: {
    fontSize: Theme.typography.sm,
    color: Theme.colors.textSecondary,
  },
  readTime: {
    fontSize: Theme.typography.sm,
    color: Theme.colors.textSecondary,
    marginLeft: Theme.spacing.xs,
  },
  authorCard: {
    margin: Theme.spacing.md,
  },
  authorContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorInfo: {
    flex: 1,
    marginLeft: Theme.spacing.md,
  },
  authorName: {
    fontSize: Theme.typography.md,
    fontWeight: Theme.typography.semibold,
    color: Theme.colors.text,
  },
  authorBio: {
    fontSize: Theme.typography.sm,
    color: Theme.colors.textSecondary,
    marginTop: 2,
  },
  content: {
    padding: Theme.spacing.lg,
  },
  bodyText: {
    fontSize: Theme.typography.md,
    color: Theme.colors.text,
    lineHeight: Theme.typography.md * Theme.typography.lineHeightRelaxed,
  },
  actions: {
    padding: Theme.spacing.md,
  },
  actionsCard: {
    marginBottom: 0,
  },
  stats: {
    flexDirection: 'row',
    marginBottom: Theme.spacing.md,
    paddingBottom: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.borderLight,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Theme.spacing.lg,
  },
  statText: {
    fontSize: Theme.typography.sm,
    color: Theme.colors.textSecondary,
    marginLeft: Theme.spacing.xs,
    fontWeight: Theme.typography.medium,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
  commentsSection: {
    padding: Theme.spacing.md,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: Theme.typography.xl,
    fontWeight: Theme.typography.bold,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.md,
  },
  commentCard: {
    marginBottom: Theme.spacing.lg,
  },
  commentPlaceholder: {
    fontSize: Theme.typography.sm,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
