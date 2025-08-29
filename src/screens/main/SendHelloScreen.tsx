import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Vibration } from 'react-native';
import DottedBackground from '../../components/DottedBackground';
import GlassTopBar from '../../components/GlassTopBar';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate, Extrapolate, cancelAnimation, runOnJS, useAnimatedReaction } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SendHello'>;

export default function SendHelloScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [remaining, setRemaining] = useState(5);
  const holdProgress = useSharedValue(0);
  const hasSentRef = React.useRef(false);
  const vibrationIntervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const onSend = () => {
    if (remaining <= 0) return;
    setRemaining(prev => prev - 1);
    navigation.navigate('ReceiveHello');
  };

  const startVibration = () => {
    if (vibrationIntervalRef.current) return;
    Vibration.vibrate(30);
    vibrationIntervalRef.current = setInterval(() => Vibration.vibrate(30), 300);
  };

  const stopVibration = () => {
    if (vibrationIntervalRef.current) {
      clearInterval(vibrationIntervalRef.current);
      vibrationIntervalRef.current = null;
    }
    Vibration.cancel();
  };

  const onHoldStart = () => {
    if (remaining <= 0) return;
    hasSentRef.current = false;
    startVibration();
    holdProgress.value = withTiming(1, { duration: 4000 });
  };

  const onHoldEnd = () => {
    stopVibration();
    if (!hasSentRef.current) {
      cancelAnimation(holdProgress);
      holdProgress.value = withTiming(0, { duration: 300 });
    } else {
      holdProgress.value = withTiming(0, { duration: 600 });
    }
  };

  useAnimatedReaction(
    () => holdProgress.value,
    (val) => {
      if (val >= 1 && !hasSentRef.current) {
        hasSentRef.current = true;
        runOnJS(onSend)();
      }
    }
  );

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(holdProgress.value, [0, 1], [1, 1.18], Extrapolate.CLAMP) },
    ],
  }));

  const waveStyle = (index: number) =>
    useAnimatedStyle(() => {
      const start = index * 0.15;
      const end = start + 0.85;
      const local = interpolate(holdProgress.value, [start, end], [0, 1], Extrapolate.CLAMP);
      return {
        opacity: interpolate(local, [0, 1], [0, 0.8]),
        transform: [
          { scale: interpolate(local, [0, 1], [0.2, 3.2], Extrapolate.CLAMP) },
        ],
      };
    });

  return (
    <DottedBackground>
      <View style={styles.center}>
        <GlassTopBar
          title="PingWorld"
          left={<TouchableOpacity onPress={() => navigation.navigate('Settings')}><Text style={styles.headerLink}>Settings</Text></TouchableOpacity>}
          right={<TouchableOpacity onPress={() => navigation.navigate('Stats')}><Text style={styles.headerLink}>World</Text></TouchableOpacity>}
        />
        <Text style={styles.counter}>Осталось приветов: {remaining}</Text>
        <View style={styles.buttonZone}>
          <Animated.View style={[styles.wave, styles.wavePink, waveStyle(0)]} />
          <Animated.View style={[styles.wave, styles.waveOrange, waveStyle(1)]} />
          <Animated.View style={[styles.wave, styles.wavePink, waveStyle(2)]} />
          <Pressable onPressIn={onHoldStart} onPressOut={onHoldEnd} style={styles.pressableHitSlop}>
            <Animated.View style={[styles.mainButton, buttonAnimatedStyle]}>
              <Text style={styles.buttonText}>Привет 👋</Text>
              <Text style={styles.hint}>Удерживайте 4 секунды</Text>
            </Animated.View>
          </Pressable>
        </View>
      </View>
    </DottedBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 100 },
  counter: { fontSize: 20, fontWeight: '700', color: '#f3f3f4' },
  bigButton: { width: 240, height: 240, borderRadius: 120, overflow: 'hidden' },
  headerRow: { position: 'absolute', top: 8, left: 16, right: 16, flexDirection: 'row', justifyContent: 'space-between' },
  headerLink: { color: '#a5a5ff', fontWeight: '700', fontSize: 16 },
  darkContainer: { flex: 1, backgroundColor: '#0B0B0F', padding: 16 },
  buttonZone: { width: 280, height: 280, alignItems: 'center', justifyContent: 'center' },
  mainButton: {
    width: 220,
    height: 220,
    borderRadius: 110,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF4D97',
    shadowColor: '#FF4D97',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.6,
    shadowRadius: 32,
    elevation: 18,
  },
  buttonText: { color: '#fff', fontSize: 28, fontWeight: '800' },
  hint: { color: '#ffe6f0', marginTop: 6, fontSize: 12, opacity: 0.9 },
  pressableHitSlop: { position: 'absolute', width: 260, height: 260, borderRadius: 130 },
  wave: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
  },
  wavePink: { backgroundColor: '#FF4D97' },
  waveOrange: { backgroundColor: '#FB8500' },
});


