import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SendHelloScreen from '../screens/main/SendHelloScreen';
import ReceiveHelloScreen from '../screens/main/ReceiveHelloScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import WellcomeScreen from '../screens/WellcomeScreen';
import SettingsScreen from '../screens/main/SettingsScreen';
import StatsScreen from '../screens/main/StatsScreen';

export type RootStackParamList = {
  Login: undefined;
  SendHello: undefined;
  ReceiveHello: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Wellcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Wellcome" component={WellcomeScreen} options={{ title: 'Wellcome' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title: 'Sign Up' }} />
        <Stack.Screen name="SendHello" component={SendHelloScreen} options={{ title: 'Send Hello' }} />
        <Stack.Screen name="ReceiveHello" component={ReceiveHelloScreen} options={{ title: 'Receive Hello' }} />
        <Stack.Screen name="StatsScreen" component={StatsScreen} options={{ title: 'World' }} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ title: 'Settings' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


