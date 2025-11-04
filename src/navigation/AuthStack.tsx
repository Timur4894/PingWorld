import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import WellcomeScreen from '../screens/WellcomeScreen';

export type AuthStackParamList = {
  Wellcome: undefined;
  Login: undefined;
  SignUpScreen: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator 
      initialRouteName="Wellcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Wellcome" component={WellcomeScreen} options={{ title: 'Wellcome' }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title: 'Sign Up' }} />
    </Stack.Navigator>
  );
}


