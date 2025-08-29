import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { colors } from '../utils/theme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SendHelloScreen from '../screens/main/SendHelloScreen';
import ReceiveHelloScreen from '../screens/main/ReceiveHelloScreen';
import SettingsScreen from '../screens/SettingsScreen';
import StatsScreen from '../screens/StatsScreen';

export type RootStackParamList = {
  Login: undefined;
  SendHello: undefined;
  ReceiveHello: undefined;
  Settings: undefined;
  Stats: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Войти' }} />
        <Stack.Screen name="SendHello" component={SendHelloScreen} options={{ title: 'Сказать Привет' }} />
        <Stack.Screen name="ReceiveHello" component={ReceiveHelloScreen} options={{ title: 'Получить Привет' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Настройки' }} />
        <Stack.Screen name="Stats" component={StatsScreen} options={{ title: 'Статистика' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


