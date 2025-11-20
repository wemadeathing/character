import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextType, User, LoginCredentials, SignUpCredentials, AuthState } from '../types/auth';

const AUTH_STORAGE_KEY = '@auth_state';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Load auth state from AsyncStorage on mount
  useEffect(() => {
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    try {
      const savedState = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (savedState) {
        const parsedState: AuthState = JSON.parse(savedState);
        setState({
          ...parsedState,
          isLoading: false,
        });
      } else {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error('Failed to load auth state:', error);
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const saveAuthState = async (newState: Omit<AuthState, 'isLoading'>) => {
    try {
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newState));
    } catch (error) {
      console.error('Failed to save auth state:', error);
    }
  };

  const login = async ({ email, password }: LoginCredentials) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In real app, you'd call your API here
    // const response = await api.login(email, password);

    // Mock user data
    const mockUser: User = {
      id: 'user_' + Date.now(),
      name: email.split('@')[0],
      email,
      createdAt: new Date().toISOString(),
    };

    const mockToken = 'mock_token_' + Date.now();

    const newState = {
      user: mockUser,
      token: mockToken,
      isAuthenticated: true,
    };

    setState({ ...newState, isLoading: false });
    await saveAuthState(newState);
  };

  const signup = async ({ name, email, password }: SignUpCredentials) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In real app, you'd call your API here
    // const response = await api.signup(name, email, password);

    // Mock user data
    const mockUser: User = {
      id: 'user_' + Date.now(),
      name,
      email,
      createdAt: new Date().toISOString(),
    };

    const mockToken = 'mock_token_' + Date.now();

    const newState = {
      user: mockUser,
      token: mockToken,
      isAuthenticated: true,
    };

    setState({ ...newState, isLoading: false });
    await saveAuthState(newState);
  };

  const logout = async () => {
    // In real app, you might call API to invalidate token
    // await api.logout();

    const newState = {
      user: null,
      token: null,
      isAuthenticated: false,
    };

    setState({ ...newState, isLoading: false });
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!state.user) return;

    const updatedUser = { ...state.user, ...updates };

    const newState = {
      user: updatedUser,
      token: state.token,
      isAuthenticated: true,
    };

    setState({ ...newState, isLoading: false });
    await saveAuthState(newState);
  };

  const value: AuthContextType = {
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    login,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
