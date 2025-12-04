import React, { createContext, useContext, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { User } from '../types';
import * as SecureStore from 'expo-secure-store';

type UserContextType = {
  users: User[];
  addUser: (user: User) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  getUserByEmail: (email: string) => User | undefined;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'dict_users';

const initialUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'dictadmin@gmail.com',
    role: 'ADMIN',
    isActive: true,
  },
];

// Platform-aware storage
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
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [loaded, setLoaded] = useState(false);

  // Load users from storage on mount
  useEffect(() => {
    (async () => {
      const stored = await storage.getItem(USERS_STORAGE_KEY);
      if (stored) {
        setUsers(JSON.parse(stored));
      }
      setLoaded(true);
    })();
  }, []);

  // Save users to storage whenever they change
  useEffect(() => {
    if (loaded) {
      (async () => {
        await storage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      })();
    }
  }, [users, loaded]);

  const addUser = async (user: User) => {
    setUsers(prev => [...prev, user]);
  };

  const deleteUser = async (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  const getUserByEmail = (email: string): User | undefined => {
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  };

  return (
    <UserContext.Provider value={{ users, addUser, deleteUser, getUserByEmail }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUsers must be used within UserProvider');
  return ctx;
};
