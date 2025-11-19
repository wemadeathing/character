import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Card, Input, Avatar, Badge } from '../components';
import Theme from '../constants/theme';

export default function ComponentShowcaseScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Component Library</Text>
        <Text style={styles.heroSubtitle}>
          Your iOS design system with 5 production-ready components
        </Text>
      </View>

      {/* Buttons Section */}
      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Buttons</Text>
        <Text style={styles.sectionDesc}>5 variants • 3 sizes • Icons • Loading states</Text>

        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Variants</Text>
          <View style={styles.buttonRow}>
            <Button title="Primary" onPress={() => {}} />
          </View>
          <View style={styles.buttonRow}>
            <Button title="Secondary" variant="secondary" onPress={() => {}} />
          </View>
          <View style={styles.buttonRow}>
            <Button title="Outline" variant="outline" onPress={() => {}} />
          </View>
          <View style={styles.buttonRow}>
            <Button title="Ghost" variant="ghost" onPress={() => {}} />
          </View>
          <View style={styles.buttonRow}>
            <Button title="Danger" variant="danger" onPress={() => {}} />
          </View>
        </View>

        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Sizes</Text>
          <View style={styles.buttonRow}>
            <Button title="Small" size="small" onPress={() => {}} />
          </View>
          <View style={styles.buttonRow}>
            <Button title="Medium" size="medium" onPress={() => {}} />
          </View>
          <View style={styles.buttonRow}>
            <Button title="Large" size="large" onPress={() => {}} />
          </View>
        </View>

        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>States</Text>
          <View style={styles.buttonRow}>
            <Button title="With Icon" icon="heart" onPress={() => {}} />
          </View>
          <View style={styles.buttonRow}>
            <Button title="Loading..." loading onPress={() => {}} />
          </View>
          <View style={styles.buttonRow}>
            <Button title="Disabled" disabled onPress={() => {}} />
          </View>
        </View>
      </Card>

      {/* Cards Section */}
      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Cards</Text>
        <Text style={styles.sectionDesc}>Flexible containers with shadows</Text>

        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Shadow Variants</Text>

          <Card shadow="small" style={styles.cardExample}>
            <Text style={styles.cardExampleText}>Small Shadow</Text>
          </Card>

          <Card shadow="medium" style={styles.cardExample}>
            <Text style={styles.cardExampleText}>Medium Shadow (default)</Text>
          </Card>

          <Card shadow="large" style={styles.cardExample}>
            <Text style={styles.cardExampleText}>Large Shadow</Text>
          </Card>

          <Card shadow="none" style={styles.cardExample}>
            <Text style={styles.cardExampleText}>No Shadow</Text>
          </Card>

          <Card
            onPress={() => console.log('Card tapped!')}
            style={styles.cardExample}
          >
            <Text style={styles.cardExampleText}>Touchable Card 👆</Text>
          </Card>
        </View>
      </Card>

      {/* Inputs Section */}
      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Inputs</Text>
        <Text style={styles.sectionDesc}>Text fields with labels, icons, and validation</Text>

        <View style={styles.subsection}>
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            leftIcon="mail-outline"
            containerStyle={styles.inputExample}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            leftIcon="lock-closed-outline"
            containerStyle={styles.inputExample}
          />

          <Input
            label="Email with Error"
            placeholder="test@example"
            error="Please enter a valid email address"
            leftIcon="mail-outline"
            containerStyle={styles.inputExample}
          />

          <Input
            label="Search"
            placeholder="Search..."
            leftIcon="search-outline"
            rightIcon="close-circle"
            onRightIconPress={() => console.log('Clear search')}
            helperText="Try searching for something"
            containerStyle={styles.inputExample}
          />
        </View>
      </Card>

      {/* Avatars Section */}
      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Avatars</Text>
        <Text style={styles.sectionDesc}>User avatars with 4 sizes</Text>

        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Sizes</Text>
          <View style={styles.avatarRow}>
            <View style={styles.avatarItem}>
              <Avatar name="John Doe" size="small" />
              <Text style={styles.avatarLabel}>Small</Text>
            </View>
            <View style={styles.avatarItem}>
              <Avatar name="Jane Smith" size="medium" />
              <Text style={styles.avatarLabel}>Medium</Text>
            </View>
            <View style={styles.avatarItem}>
              <Avatar name="Bob Wilson" size="large" />
              <Text style={styles.avatarLabel}>Large</Text>
            </View>
            <View style={styles.avatarItem}>
              <Avatar name="Alice Brown" size="xlarge" />
              <Text style={styles.avatarLabel}>XLarge</Text>
            </View>
          </View>
        </View>

        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Variants</Text>
          <View style={styles.avatarRow}>
            <View style={styles.avatarItem}>
              <Avatar name="Sarah Chen" size="large" />
              <Text style={styles.avatarLabel}>Initials</Text>
            </View>
            <View style={styles.avatarItem}>
              <Avatar size="large" />
              <Text style={styles.avatarLabel}>Default Icon</Text>
            </View>
            <View style={styles.avatarItem}>
              <Avatar name="Mike Johnson" size="large" showBorder />
              <Text style={styles.avatarLabel}>With Border</Text>
            </View>
          </View>
        </View>
      </Card>

      {/* Badges Section */}
      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Badges</Text>
        <Text style={styles.sectionDesc}>Notification badges with 6 color variants</Text>

        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Variants</Text>
          <View style={styles.badgeRow}>
            <View style={styles.badgeItem}>
              <Badge count={5} variant="primary" />
              <Text style={styles.badgeLabel}>Primary</Text>
            </View>
            <View style={styles.badgeItem}>
              <Badge count={12} variant="success" />
              <Text style={styles.badgeLabel}>Success</Text>
            </View>
            <View style={styles.badgeItem}>
              <Badge count={3} variant="warning" />
              <Text style={styles.badgeLabel}>Warning</Text>
            </View>
            <View style={styles.badgeItem}>
              <Badge count={99} variant="error" />
              <Text style={styles.badgeLabel}>Error</Text>
            </View>
            <View style={styles.badgeItem}>
              <Badge count={7} variant="info" />
              <Text style={styles.badgeLabel}>Info</Text>
            </View>
            <View style={styles.badgeItem}>
              <Badge count={2} variant="neutral" />
              <Text style={styles.badgeLabel}>Neutral</Text>
            </View>
          </View>
        </View>

        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Special Cases</Text>
          <View style={styles.badgeRow}>
            <View style={styles.badgeItem}>
              <Badge count={150} max={99} />
              <Text style={styles.badgeLabel}>99+</Text>
            </View>
            <View style={styles.badgeItem}>
              <Badge label="New" variant="success" />
              <Text style={styles.badgeLabel}>Label</Text>
            </View>
            <View style={styles.badgeItem}>
              <Badge dot variant="error" />
              <Text style={styles.badgeLabel}>Dot</Text>
            </View>
          </View>
        </View>

        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Sizes</Text>
          <View style={styles.badgeRow}>
            <View style={styles.badgeItem}>
              <Badge count={5} size="small" />
              <Text style={styles.badgeLabel}>Small</Text>
            </View>
            <View style={styles.badgeItem}>
              <Badge count={5} size="medium" />
              <Text style={styles.badgeLabel}>Medium</Text>
            </View>
            <View style={styles.badgeItem}>
              <Badge count={5} size="large" />
              <Text style={styles.badgeLabel}>Large</Text>
            </View>
          </View>
        </View>
      </Card>

      {/* Theme Section */}
      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Theme</Text>
        <Text style={styles.sectionDesc}>Centralized design tokens</Text>

        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Colors</Text>
          <View style={styles.colorRow}>
            <View style={styles.colorItem}>
              <View style={[styles.colorSwatch, { backgroundColor: Theme.colors.primary }]} />
              <Text style={styles.colorLabel}>Primary</Text>
            </View>
            <View style={styles.colorItem}>
              <View style={[styles.colorSwatch, { backgroundColor: Theme.colors.success }]} />
              <Text style={styles.colorLabel}>Success</Text>
            </View>
            <View style={styles.colorItem}>
              <View style={[styles.colorSwatch, { backgroundColor: Theme.colors.warning }]} />
              <Text style={styles.colorLabel}>Warning</Text>
            </View>
            <View style={styles.colorItem}>
              <View style={[styles.colorSwatch, { backgroundColor: Theme.colors.error }]} />
              <Text style={styles.colorLabel}>Error</Text>
            </View>
          </View>
        </View>

        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Typography</Text>
          <Text style={[styles.typoExample, { fontSize: Theme.typography.xxxl }]}>
            Extra Large (32px)
          </Text>
          <Text style={[styles.typoExample, { fontSize: Theme.typography.xl }]}>
            Large (20px)
          </Text>
          <Text style={[styles.typoExample, { fontSize: Theme.typography.md }]}>
            Medium (16px)
          </Text>
          <Text style={[styles.typoExample, { fontSize: Theme.typography.sm }]}>
            Small (14px)
          </Text>
          <Text style={[styles.typoExample, { fontSize: Theme.typography.xs }]}>
            Extra Small (12px)
          </Text>
        </View>

        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Spacing</Text>
          <View style={styles.spacingRow}>
            <View style={[styles.spacingBox, { width: Theme.spacing.xs }]} />
            <Text style={styles.spacingLabel}>XS (4)</Text>
          </View>
          <View style={styles.spacingRow}>
            <View style={[styles.spacingBox, { width: Theme.spacing.sm }]} />
            <Text style={styles.spacingLabel}>SM (8)</Text>
          </View>
          <View style={styles.spacingRow}>
            <View style={[styles.spacingBox, { width: Theme.spacing.md }]} />
            <Text style={styles.spacingLabel}>MD (16)</Text>
          </View>
          <View style={styles.spacingRow}>
            <View style={[styles.spacingBox, { width: Theme.spacing.lg }]} />
            <Text style={styles.spacingLabel}>LG (24)</Text>
          </View>
          <View style={styles.spacingRow}>
            <View style={[styles.spacingBox, { width: Theme.spacing.xl }]} />
            <Text style={styles.spacingLabel}>XL (32)</Text>
          </View>
        </View>
      </Card>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          All components follow iOS Human Interface Guidelines
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  content: {
    paddingBottom: Theme.spacing.xl,
  },
  hero: {
    backgroundColor: Theme.colors.primary,
    padding: Theme.spacing.xl,
    paddingTop: Theme.spacing.xxl,
    marginBottom: Theme.spacing.md,
  },
  heroTitle: {
    fontSize: Theme.typography.xxxl,
    fontWeight: Theme.typography.bold,
    color: Theme.colors.white,
    marginBottom: Theme.spacing.xs,
  },
  heroSubtitle: {
    fontSize: Theme.typography.md,
    color: Theme.colors.white,
    opacity: 0.9,
  },
  section: {
    marginHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  sectionTitle: {
    fontSize: Theme.typography.xxl,
    fontWeight: Theme.typography.bold,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },
  sectionDesc: {
    fontSize: Theme.typography.sm,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.lg,
  },
  subsection: {
    marginBottom: Theme.spacing.lg,
  },
  subsectionTitle: {
    fontSize: Theme.typography.md,
    fontWeight: Theme.typography.semibold,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.md,
  },
  buttonRow: {
    marginBottom: Theme.spacing.sm,
  },
  cardExample: {
    marginBottom: Theme.spacing.md,
  },
  cardExampleText: {
    fontSize: Theme.typography.md,
    color: Theme.colors.text,
    textAlign: 'center',
  },
  inputExample: {
    marginBottom: Theme.spacing.md,
  },
  avatarRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Theme.spacing.md,
    flexWrap: 'wrap',
  },
  avatarItem: {
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  avatarLabel: {
    fontSize: Theme.typography.xs,
    color: Theme.colors.textSecondary,
    marginTop: Theme.spacing.xs,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Theme.spacing.md,
    flexWrap: 'wrap',
  },
  badgeItem: {
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  badgeLabel: {
    fontSize: Theme.typography.xs,
    color: Theme.colors.textSecondary,
    marginTop: Theme.spacing.xs,
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Theme.spacing.md,
  },
  colorItem: {
    alignItems: 'center',
  },
  colorSwatch: {
    width: 60,
    height: 60,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.xs,
    ...Theme.shadows.small,
  },
  colorLabel: {
    fontSize: Theme.typography.xs,
    color: Theme.colors.textSecondary,
  },
  typoExample: {
    color: Theme.colors.text,
    marginBottom: Theme.spacing.sm,
  },
  spacingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  spacingBox: {
    height: 20,
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borderRadius.sm,
    marginRight: Theme.spacing.md,
  },
  spacingLabel: {
    fontSize: Theme.typography.sm,
    color: Theme.colors.textSecondary,
  },
  footer: {
    padding: Theme.spacing.lg,
    alignItems: 'center',
  },
  footerText: {
    fontSize: Theme.typography.sm,
    color: Theme.colors.textTertiary,
    textAlign: 'center',
  },
});
