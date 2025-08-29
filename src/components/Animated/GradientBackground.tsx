import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, interpolate, Extrapolate } from 'react-native-reanimated';

type Props = { children: React.ReactNode };

export default function GradientBackground({ children }: Props) {
  const t = useSharedValue(0);
  React.useEffect(() => {
    t.value = withRepeat(withTiming(1, { duration: 6000 }), -1, true);
  }, [t]);

  const animatedStyle = useAnimatedStyle(() => {
    const angle = interpolate(t.value, [0, 1], [0, 360], Extrapolate.CLAMP);
    return {
      backgroundColor: '#FFB703',
      // Simple animated overlay blocks to fake gradient waves
      opacity: 1,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.layer, { backgroundColor: '#FFB703' }, animatedStyle]} />
      <Animated.View style={[styles.layer, { backgroundColor: '#FB8500', transform: [{ rotate: '12deg' }] }]} />
      <Animated.View style={[styles.layer, { backgroundColor: '#FF4D97', transform: [{ rotate: '-8deg' }], opacity: 0.8 }]} />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  layer: {
    ...StyleSheet.absoluteFillObject,
  },
  content: { flex: 1, padding: 16 },
});


