import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  nickname: string;
  token?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    checkAuthState();
  }, []);


  const checkAuthState = async () => {
    try {
      // Check if we have stored user data
      const userData = await AsyncStorage.getItem('userData');
      
      if (userData) {
        // Simple check - if we have stored data, user is logged in
        const parsedUserData = JSON.parse(userData);
        setUser(parsedUserData);
      } else {
        // No stored user data
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
      // Clear potentially corrupted data
      await AsyncStorage.removeItem('userData');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData: User) => {
    try {
      setError(null);
      
      // Проверяем, что данные пользователя корректны
      if (!userData || !userData.id || !userData.nickname) {
        throw new Error('Некорректные данные пользователя');
      }
      
      // Store user data locally
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      
      setUser(userData);
    } catch (error) {
      console.error('Error during login:', error);
      setError(error instanceof Error ? error.message : 'Произошла ошибка при входе');
      throw error;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      
      // Clear stored data
      await AsyncStorage.removeItem('userData');
      
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
      setError(error instanceof Error ? error.message : 'Произошла ошибка при выходе');
      throw error;
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
    error,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
