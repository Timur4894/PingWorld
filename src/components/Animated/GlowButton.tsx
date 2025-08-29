import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

type Props = { title: string; onPress: () => void };

export default function GlowButton({ title, onPress }: Props) {
  const glow = useSharedValue(0.6);

  React.useEffect(() => {
    glow.value = withRepeat(withTiming(1, { duration: 1600, easing: Easing.inOut(Easing.quad) }), -1, true);
  }, [glow]);

  const animatedStyle = useAnimatedStyle(() => ({
    shadowOpacity: glow.value,
    transform: [{ scale: 0.98 + glow.value * 0.04 }],
  }));

  return (
    <Animated.View style={[styles.wrapper, animatedStyle]}>
      <Pressable style={styles.button} onPress={onPress} android_ripple={{ color: '#ffffff55' }}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#FF4D97',
    shadowColor: '#FF4D97',
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 16,
    overflow: 'hidden',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { fontSize: 32, fontWeight: '800', color: 'white' },
});


