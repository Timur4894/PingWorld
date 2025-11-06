import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authApi from '../api/authApi';
import userManagementApi from '../api/UserManagementApi';
import { clearTokens } from '../api/axiosClient';

const TOKEN_KEY = 'auth_token';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        console.log('AuthContext init - token from storage:', token ? '✅ ЕСТЬ' : '❌ ОТСУТСТВУЕТ');
        
        if (token) {
          console.log('Token found in storage, checking validity...');
          try {
            const response = await userManagementApi.getMe();
            console.log('AuthContext init - getMe response:', response.data);
            setUser(response.data.data || response.data);
          } catch (error) {
            console.error('AuthContext init - getMe failed:', error.response?.status, error.response?.data);
            if (error.response?.status === 401) {
              console.log('401 error in init - clearing invalid token');
              await clearTokens();
              setUser(null);
            } else {
              console.log('Non-401 error in init - keeping token, may be temporary network issue');
              setUser(null);
            }
          }
        } else {
          console.log('No token found in storage');
          setUser(null);
        }
      } catch (error) {
        console.error('AuthContext init error:', error);
        setUser(null);
        console.log('Error in init - NOT clearing token, may be temporary issue');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = async (nickname, password) => {
    try {
      console.log('🔐 Starting login...');
      const response = await authApi.login(nickname, password);
      console.log('✅ Login response received:', response.data);
      
      // Токен автоматически сохраняется в axiosClient interceptor
      // Проверяем, что токен был сохранен
      const tokenAfterLogin = await AsyncStorage.getItem(TOKEN_KEY);
      console.log('🔑 Token после логина:', tokenAfterLogin ? '✅ ЕСТЬ' : '❌ ОТСУТСТВУЕТ');
      
      if (!tokenAfterLogin) {
        console.error('❌ КРИТИЧЕСКАЯ ОШИБКА: Token не был сохранен после логина!');
        throw new Error('Token не был сохранен после логина');
      }
      
      const userData = response.data?.data?.user || response.data?.user || response.data?.data;
      
      if (userData) {
        setUser(userData);
        console.log('👤 User set from login response');
      } else {
        console.log('⚠️ User data not in login response, fetching via getMe()...');
        try {
          const userResponse = await userManagementApi.getMe();
          console.log('✅ getMe() после логина успешен:', userResponse.data);
          setUser(userResponse.data?.data || userResponse.data);
        } catch (getMeError) {
          console.error('❌ getMe() после логина провалился:', getMeError.response?.status);
          console.error('   Это означает, что token не работает!');
          // Проверяем token еще раз
          const tokenCheck = await AsyncStorage.getItem(TOKEN_KEY);
          console.error('   Token в AsyncStorage при ошибке:', tokenCheck ? '✅ ЕСТЬ' : '❌ ОТСУТСТВУЕТ');
          throw getMeError;
        }
      }
    } catch (error) {
      console.error('❌ Login error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw error;
    }
  };

  const signup = async (nickname, password, contacts, country) => {
    try {
      console.log('📝 Starting signup...');
      const response = await authApi.signup(nickname, password, contacts, country);
      console.log('✅ Signup response received:', response.data);
      
      // Токен автоматически сохраняется в axiosClient interceptor
      // Проверяем, что токен был сохранен
      const tokenAfterSignup = await AsyncStorage.getItem(TOKEN_KEY);
      console.log('🔑 Token после регистрации:', tokenAfterSignup ? '✅ ЕСТЬ' : '❌ ОТСУТСТВУЕТ');
      
      if (!tokenAfterSignup) {
        console.error('❌ КРИТИЧЕСКАЯ ОШИБКА: Token не был сохранен после регистрации!');
        throw new Error('Token не был сохранен после регистрации');
      }
      
      const userData = response.data?.data?.user || response.data?.user || response.data?.data;
      
      if (userData) {
        setUser(userData);
        console.log('👤 User set from signup response');
      } else {
        console.log('⚠️ User data not in signup response, fetching via getMe()...');
        try {
          const userResponse = await userManagementApi.getMe();
          console.log('✅ getMe() после регистрации успешен:', userResponse.data);
          setUser(userResponse.data?.data || userResponse.data);
        } catch (getMeError) {
          console.error('❌ getMe() после регистрации провалился:', getMeError.response?.status);
          console.error('   Это означает, что token не работает!');
          // Проверяем token еще раз
          const tokenCheck = await AsyncStorage.getItem(TOKEN_KEY);
          console.error('   Token в AsyncStorage при ошибке:', tokenCheck ? '✅ ЕСТЬ' : '❌ ОТСУТСТВУЕТ');
          throw getMeError;
        }
      }
    } catch (error) {
      console.error('❌ Signup error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await clearTokens();
      setUser(null);
    }
  };

  const deleteAccount = async () => {
    try {
      await userManagementApi.deleteMe();
      await clearTokens();
      setUser(null);
    } catch (error) {
      console.error('Delete account error:', error);
      throw error;
    }
  };

  const refreshUser = async () => {
    try {
      const response = await userManagementApi.getMe();
      const userData = response.data?.data || response.data;
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Error refreshing user:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, deleteAccount, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
