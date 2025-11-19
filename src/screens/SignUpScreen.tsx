import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';
import { Input, Button, Card } from '../components';
import Theme from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

type SignUpScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'SignUp'>;

interface SignUpScreenProps {
  navigation: SignUpScreenNavigationProp;
  onSignUp?: () => void;
}

export default function SignUpScreen({ navigation, onSignUp }: SignUpScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    // Reset errors
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Validation
    let hasError = false;

    if (!name.trim()) {
      setNameError('Name is required');
      hasError = true;
    } else if (name.trim().length < 2) {
      setNameError('Name must be at least 2 characters');
      hasError = true;
    }

    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      hasError = true;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      setPasswordError('Password must contain uppercase, lowercase, and number');
      hasError = true;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      hasError = true;
    }

    if (hasError) return;

    // Simulate sign up
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('Sign up successful', { name, email, password });
      // In real app, call onSignUp() to update auth state
      if (onSignUp) onSignUp();
    }, 1500);
  };

  const handleSocialSignUp = (provider: string) => {
    console.log(`Sign up with ${provider}`);
  };

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
          <Ionicons name="person-add" size={64} color={Theme.colors.primary} />
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>
        </View>

        <Card style={styles.formCard}>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              setNameError('');
            }}
            error={nameError}
            leftIcon="person-outline"
            autoCapitalize="words"
            containerStyle={styles.input}
          />

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

          <Input
            label="Password"
            placeholder="Create a password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError('');
            }}
            error={passwordError}
            secureTextEntry
            leftIcon="lock-closed-outline"
            helperText="At least 8 characters with uppercase, lowercase, and number"
            containerStyle={styles.input}
          />

          <Input
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setConfirmPasswordError('');
            }}
            error={confirmPasswordError}
            secureTextEntry
            leftIcon="lock-closed-outline"
            containerStyle={styles.input}
          />

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By signing up, you agree to our{' '}
              <Text style={styles.termsLink}>Terms of Service</Text>
              {' '}and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </View>

          <Button
            title="Create Account"
            onPress={handleSignUp}
            loading={isLoading}
            fullWidth
            style={styles.signUpButton}
          />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <Button
            title="Sign up with Apple"
            icon="logo-apple"
            variant="outline"
            onPress={() => handleSocialSignUp('Apple')}
            fullWidth
            style={styles.socialButton}
          />

          <Button
            title="Sign up with Google"
            icon="logo-google"
            variant="outline"
            onPress={() => handleSocialSignUp('Google')}
            fullWidth
            style={styles.socialButton}
          />
        </Card>

        <View style={styles.loginPrompt}>
          <Text style={styles.loginPromptText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
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
  },
  formCard: {
    marginBottom: Theme.spacing.lg,
  },
  input: {
    marginBottom: Theme.spacing.md,
  },
  termsContainer: {
    marginBottom: Theme.spacing.lg,
  },
  termsText: {
    fontSize: Theme.typography.xs,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: Theme.typography.xs * Theme.typography.lineHeightRelaxed,
  },
  termsLink: {
    color: Theme.colors.primary,
    fontWeight: Theme.typography.semibold,
  },
  signUpButton: {
    marginBottom: Theme.spacing.lg,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Theme.colors.border,
  },
  dividerText: {
    fontSize: Theme.typography.sm,
    color: Theme.colors.textSecondary,
    marginHorizontal: Theme.spacing.md,
  },
  socialButton: {
    marginBottom: Theme.spacing.sm,
  },
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginPromptText: {
    fontSize: Theme.typography.md,
    color: Theme.colors.textSecondary,
  },
  loginLink: {
    fontSize: Theme.typography.md,
    color: Theme.colors.primary,
    fontWeight: Theme.typography.semibold,
  },
});
