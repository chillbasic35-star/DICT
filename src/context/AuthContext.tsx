import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Platform, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { User } from '../types';
import { useUsers } from './UserContext';

type AuthState = {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
};

type AuthContextType = AuthState & {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const storage = {
  getItem: async (key: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
      if (typeof window === 'undefined') return null;
      return window.localStorage.getItem(key);
    }
    return SecureStore.getItemAsync(key);
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      if (typeof window === 'undefined') return;
      window.localStorage.setItem(key, value);
      return;
    }
    await SecureStore.setItemAsync(key, value);
  },
  deleteItem: async (key: string): Promise<void> => {
    if (Platform.OS === 'web') {
      if (typeof window === 'undefined') return;
      window.localStorage.removeItem(key);
      return;
    }
    await SecureStore.deleteItemAsync(key);
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use optional chaining since UserContext might not be available yet
  const userContext = useUsers();
  const getUserByEmail = userContext?.getUserByEmail || (() => undefined);
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: null,
    loading: true,
  });

  useEffect(() => {
    (async () => {
      const token = await storage.getItem('accessToken');
      const userStr = await storage.getItem('user');
      if (token && userStr) {
        setState({ user: JSON.parse(userStr), accessToken: token, loading: false });
      } else {
        setState(s => ({ ...s, loading: false }));
      }
    })();
  }, []);

  const refreshUser = useCallback(async () => {
    const userStr = await storage.getItem('user');
    if (userStr && getUserByEmail) {
      try {
        const storedUser = JSON.parse(userStr);
        const currentUser = getUserByEmail(storedUser.email);
        if (currentUser) {
          await storage.setItem('user', JSON.stringify(currentUser));
          setState(s => ({ ...s, user: currentUser }));
        }
      } catch (error) {
        console.error('Error refreshing user:', error);
      }
    }
  }, [getUserByEmail]);

  const login = async (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    
    if (!getUserByEmail) {
      throw new Error('Authentication service is not available');
    }
    
    const user = getUserByEmail(normalizedEmail);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    if (!user.isActive) {
      throw new Error('This account has been deactivated');
    }

    // In a real app, you would verify the password here
    // For now, we'll just check if the password is not empty
    if (!password) {
      throw new Error('Password is required');
    }

    const token = `dummy-token-${Date.now()}`;
    await storage.setItem('accessToken', token);
    await storage.setItem('user', JSON.stringify(user));

    setState({ user, accessToken: token, loading: false });
  };

  const logout = async () => {
    await storage.deleteItem('accessToken');
    await storage.deleteItem('user');
    setState({ user: null, accessToken: null, loading: false });
  };

  const contextValue = {
    ...state,
    login,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!state.loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
