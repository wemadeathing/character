import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/HomeStack';
import { Card, Avatar, Badge } from '../components';
import Theme from '../constants/theme';

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'HomeMain'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

interface Post {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  authorAvatar?: string;
  date: string;
  comments: number;
  likes: number;
  category: string;
}

const POSTS: Post[] = [
  {
    id: '1',
    title: 'Getting Started with React Native',
    excerpt: 'Learn the basics of building mobile apps with React Native and Expo. This comprehensive guide will walk you through...',
    author: 'Sarah Chen',
    date: '2 hours ago',
    comments: 24,
    likes: 156,
    category: 'Tutorial',
  },
  {
    id: '2',
    title: 'iOS Design Patterns You Should Know',
    excerpt: 'Discover essential iOS design patterns that will make your apps feel native and intuitive for users...',
    author: 'Mike Johnson',
    date: '5 hours ago',
    comments: 18,
    likes: 203,
    category: 'Design',
  },
  {
    id: '3',
    title: 'State Management in Modern Apps',
    excerpt: 'Explore different approaches to state management including Context API, Redux, and Zustand...',
    author: 'Emma Wilson',
    date: '1 day ago',
    comments: 42,
    likes: 387,
    category: 'Development',
  },
  {
    id: '4',
    title: 'Building Reusable Components',
    excerpt: 'Create a component library that speeds up development and ensures consistency across your app...',
    author: 'David Kim',
    date: '2 days ago',
    comments: 31,
    likes: 279,
    category: 'Tutorial',
  },
  {
    id: '5',
    title: 'Performance Optimization Tips',
    excerpt: 'Learn how to optimize your React Native app for better performance and user experience...',
    author: 'Lisa Anderson',
    date: '3 days ago',
    comments: 56,
    likes: 492,
    category: 'Performance',
  },
];

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const handlePostPress = (post: Post) => {
    navigation.navigate('PostDetail', {
      id: post.id,
      title: post.title,
    });
  };

  const renderPost = ({ item }: { item: Post }) => (
    <Card
      onPress={() => handlePostPress(item)}
      style={styles.postCard}
    >
      <View style={styles.postHeader}>
        <Avatar name={item.author} size="small" />
        <View style={styles.postMeta}>
          <Text style={styles.authorName}>{item.author}</Text>
          <Text style={styles.postDate}>{item.date}</Text>
        </View>
        <Badge label={item.category} variant="primary" size="small" />
      </View>

      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postExcerpt} numberOfLines={2}>
        {item.excerpt}
      </Text>

      <View style={styles.postFooter}>
        <View style={styles.stat}>
          <Text style={styles.statIcon}>❤️</Text>
          <Text style={styles.statText}>{item.likes}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statIcon}>💬</Text>
          <Text style={styles.statText}>{item.comments}</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello!</Text>
        <Text style={styles.subtitle}>Discover the latest posts</Text>
      </View>

      <FlatList
        data={POSTS}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
    paddingTop: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  greeting: {
    fontSize: Theme.typography.xxxl,
    fontWeight: Theme.typography.bold,
    color: Theme.colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: Theme.typography.md,
    color: Theme.colors.textSecondary,
  },
  listContent: {
    padding: Theme.spacing.md,
  },
  postCard: {
    marginBottom: Theme.spacing.md,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  postMeta: {
    flex: 1,
    marginLeft: Theme.spacing.sm,
  },
  authorName: {
    fontSize: Theme.typography.sm,
    fontWeight: Theme.typography.semibold,
    color: Theme.colors.text,
  },
  postDate: {
    fontSize: Theme.typography.xs,
    color: Theme.colors.textTertiary,
    marginTop: 2,
  },
  postTitle: {
    fontSize: Theme.typography.lg,
    fontWeight: Theme.typography.bold,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },
  postExcerpt: {
    fontSize: Theme.typography.sm,
    color: Theme.colors.textSecondary,
    lineHeight: Theme.typography.lineHeightNormal * Theme.typography.sm,
    marginBottom: Theme.spacing.md,
  },
  postFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.borderLight,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Theme.spacing.lg,
  },
  statIcon: {
    fontSize: 16,
    marginRight: Theme.spacing.xs,
  },
  statText: {
    fontSize: Theme.typography.sm,
    color: Theme.colors.textSecondary,
    fontWeight: Theme.typography.medium,
  },
});
