import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SendHelloScreen from '../screens/main/SendHelloScreen';
import ReceiveHelloScreen from '../screens/main/ReceiveHelloScreen';
import SettingsScreen from '../screens/main/SettingsScreen';
import StatsScreen from '../screens/main/StatsScreen';

interface Ping {
  id?: string;
  sender_id: string;
  sender_nickname: string;
  sender_avatar: {
    url: string;
    rarity: 'common' | 'rare' | 'legendary';
  };
  sender_contacts?: Array<{
    title: string;
    url: string;
  }>;
}

export type MainStackParamList = {
  SendHello: undefined;
  ReceiveHello: { ping: Ping };
  StatsScreen: undefined;
  SettingsScreen: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainStack() {
  return (
    <Stack.Navigator 
      initialRouteName="SendHello"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SendHello" component={SendHelloScreen} options={{ title: 'Send Hello' }} />
      <Stack.Screen name="ReceiveHello" component={ReceiveHelloScreen} options={{ title: 'Receive Hello' }} />
      <Stack.Screen name="StatsScreen" component={StatsScreen} options={{ title: 'World' }} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ title: 'Settings' }} />
    </Stack.Navigator>
  );
}


