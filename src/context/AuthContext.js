import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authApi from '../api/authApi';
import userManagementApi from '../api/UserManagementApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const cookies = await AsyncStorage.getItem('cookies');
        console.log('AuthContext init - cookies from storage:', cookies);
        
        if (cookies) {
          try {
            const response = await userManagementApi.getMe();
            console.log('AuthContext init - getMe response:', response.data);
            setUser(response.data.data || response.data);
          } catch (error) {
            console.error('AuthContext init - getMe failed:', error.response?.status, error.response?.data);
            if (error.response?.status === 401) {
              await AsyncStorage.removeItem('cookies');
              setUser(null);
            } else {
              throw error;
            }
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('AuthContext init error:', error);
        setUser(null);
        await AsyncStorage.removeItem('cookies');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = async (nickname, password) => {
    try {
      const response = await authApi.login(nickname, password);
      console.log('Login response:', response.data);
      
      const userData = response.data?.data?.user || response.data?.user || response.data?.data;
      
      if (userData) {
        setUser(userData);
      } else {
        const userResponse = await userManagementApi.getMe();
        setUser(userResponse.data?.data || userResponse.data);
      }
    } catch (error) {
      console.error('Login error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw error;
    }
  };

  const signup = async (nickname, password, contacts) => {
    try {
      const response = await authApi.signup(nickname, password, contacts);
      console.log('Signup response:', response.data);
      
      const userData = response.data?.data?.user || response.data?.user || response.data?.data;
      
      if (userData) {
        setUser(userData);
      } else {
        const userResponse = await userManagementApi.getMe();
        setUser(userResponse.data?.data || userResponse.data);
      }
    } catch (error) {
      console.error('Signup error details:', {
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
      await AsyncStorage.removeItem('cookies');
      setUser(null);
    }
  };

  const deleteAccount = async () => {
    try {
      await userManagementApi.deleteMe();
      await AsyncStorage.removeItem('cookies');
      setUser(null);
    } catch (error) {
      console.error('Delete account error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
