import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';
import { useEffect, useState, useCallback, useMemo } from 'react';

export type UserRole = 'client' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

const AUTH_STORAGE_KEY = '@gobeauty_auth_user';

export const [AuthProvider, useAuth] = createContextHook(() => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = useCallback(async (email: string, password: string, role: UserRole) => {
    if (role === 'admin') {
      if (email === 'admin@gobeauty.com' && password === 'admin123') {
        const adminUser: User = {
          id: 'admin-1',
          name: 'Admin',
          email: 'admin@gobeauty.com',
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        };
        await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(adminUser));
        setUser(adminUser);
        return { success: true };
      } else {
        return { success: false, error: 'Invalid admin credentials' };
      }
    } else {
      if (email && password) {
        const clientUser: User = {
          id: `client-${Date.now()}`,
          name: email.split('@')[0],
          email,
          role: 'client',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        };
        await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(clientUser));
        setUser(clientUser);
        return { success: true };
      } else {
        return { success: false, error: 'Please fill in all fields' };
      }
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
      setUser(null);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  }, []);

  const isAdmin = useMemo(() => user?.role === 'admin', [user]);
  const isClient = useMemo(() => user?.role === 'client', [user]);

  return useMemo(
    () => ({
      user,
      isLoading,
      login,
      logout,
      isAdmin,
      isClient,
    }),
    [user, isLoading, login, logout, isAdmin, isClient]
  );
});
