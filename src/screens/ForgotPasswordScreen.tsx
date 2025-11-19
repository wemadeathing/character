import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';
import { Input, Button, Card } from '../components';
import Theme from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

interface ForgotPasswordScreenProps {
  navigation: ForgotPasswordScreenNavigationProp;
}

export default function ForgotPasswordScreen({ navigation }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleResetPassword = async () => {
    setEmailError('');

    if (!email) {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    // Simulate sending reset email
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
      console.log('Password reset email sent to:', email);
    }, 1500);
  };

  if (emailSent) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.successContainer}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark-circle" size={80} color={Theme.colors.success} />
            </View>
            <Text style={styles.successTitle}>Check Your Email</Text>
            <Text style={styles.successText}>
              We've sent password reset instructions to
            </Text>
            <Text style={styles.emailText}>{email}</Text>
            <Text style={styles.successText}>
              Please check your inbox and follow the instructions to reset your password.
            </Text>

            <Button
              title="Back to Login"
              onPress={() => navigation.navigate('Login')}
              fullWidth
              style={styles.backButton}
            />

            <Button
              title="Resend Email"
              variant="outline"
              onPress={handleResetPassword}
              fullWidth
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Ionicons name="mail-unread" size={64} color={Theme.colors.primary} />
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            No worries! Enter your email and we'll send you reset instructions
          </Text>
        </View>

        <Card style={styles.formCard}>
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError('');
            }}
            error={emailError}
            leftIcon="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            containerStyle={styles.input}
          />

          <Button
            title="Send Reset Link"
            onPress={handleResetPassword}
            loading={isLoading}
            fullWidth
            style={styles.resetButton}
          />

          <Button
            title="Back to Login"
            variant="ghost"
            onPress={() => navigation.navigate('Login')}
            fullWidth
          />
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Theme.spacing.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  title: {
    fontSize: Theme.typography.xxxl,
    fontWeight: Theme.typography.bold,
    color: Theme.colors.text,
    marginTop: Theme.spacing.md,
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    fontSize: Theme.typography.md,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Theme.spacing.md,
  },
  formCard: {
    marginBottom: Theme.spacing.lg,
  },
  input: {
    marginBottom: Theme.spacing.lg,
  },
  resetButton: {
    marginBottom: Theme.spacing.sm,
  },
  successContainer: {
    alignItems: 'center',
  },
  successIcon: {
    marginBottom: Theme.spacing.lg,
  },
  successTitle: {
    fontSize: Theme.typography.xxxl,
    fontWeight: Theme.typography.bold,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.md,
  },
  successText: {
    fontSize: Theme.typography.md,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
  },
  emailText: {
    fontSize: Theme.typography.md,
    color: Theme.colors.text,
    fontWeight: Theme.typography.semibold,
    marginBottom: Theme.spacing.md,
  },
  backButton: {
    marginTop: Theme.spacing.xl,
    marginBottom: Theme.spacing.sm,
    width: '100%',
  },
});
