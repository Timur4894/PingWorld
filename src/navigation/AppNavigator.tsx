import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import LoadingScreen from '../screens/LoadingScreen';
import { useAuth } from '../context/AuthContext';

export type RootStackParamList = {
  AuthStack: undefined;
  MainStack: undefined;
};

export default function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {user !== null ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}


