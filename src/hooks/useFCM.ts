import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import axiosClient from '../api/axiosClient';
import { onTokenRefresh } from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userManagementApi from '../api/UserManagementApi';

const FCM_TOKEN_KEY = 'fcm_token';

export const useFCM = () => {
  const { user } = useAuth();
  const { showModal } = useModal();
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const lastSentTokenRef = useRef<string | null>(null);

  const sendFCMTokenToServer = async (fcmToken: string) => {
    try {
      await userManagementApi.addFCMToken(fcmToken);
      console.log('✅ FCM token successfully sent to server');
      lastSentTokenRef.current = fcmToken;
      await AsyncStorage.setItem(FCM_TOKEN_KEY, fcmToken);
    } catch (error: any) {
      console.error('❌ Error sending FCM token to server:', error.response?.status, error.response?.data);
      throw error;
    }
  };

  const setupFCM = async () => {
    if (!user) {
      console.log('👤 User not authenticated, skipping FCM setup');
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
      return;
    }

    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        console.log('⚠️ Push permission not granted');
        return;
      }

      const fcmToken = await messaging().getToken();
      console.log('📲 FCM Token:', fcmToken);

      if (!fcmToken) {
        console.log('⚠️ FCM token is empty');
        return;
      }

      const lastSentToken = lastSentTokenRef.current;
      const storedToken = await AsyncStorage.getItem(FCM_TOKEN_KEY);

      if (fcmToken !== lastSentToken && fcmToken !== storedToken) {
        await sendFCMTokenToServer(fcmToken);
      } else {
        console.log('ℹ️ FCM token already sent, skipping');
      }

      const unsubscribe = messaging().onMessage(async remoteMessage => {
        showModal({
          title: remoteMessage.notification?.title ?? 'New notification',
          message: remoteMessage.notification?.body ?? '',
          type: 'info',
        });
      });

      unsubscribeRef.current = unsubscribe;

      messaging().onTokenRefresh(async newToken => {
        console.log('🔄 FCM token refreshed:', newToken);
        if (user) {
          await sendFCMTokenToServer(newToken);
        }
      });
    } catch (err) {
      console.error('❌ FCM setup error:', err);
    }
  };

  useEffect(() => {
    setupFCM();

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [user]);

  useEffect(() => {
    if (!user) {
      lastSentTokenRef.current = null;
      AsyncStorage.removeItem(FCM_TOKEN_KEY).catch(console.error);
      return;
    }

    const handleTokenRefresh = async () => {
      console.log('🔄 Access token refreshed, resending FCM token...');
      try {
        const fcmToken = await messaging().getToken();
        if (fcmToken && fcmToken !== lastSentTokenRef.current) {
          await sendFCMTokenToServer(fcmToken);
        }
      } catch (error) {
        console.error('❌ Error resending FCM token after refresh:', error);
      }
    };

    const unsubscribe = onTokenRefresh(handleTokenRefresh);

    return () => {
      unsubscribe();
    };
  }, [user]);
};

