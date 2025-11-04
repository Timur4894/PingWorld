import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, ViewStyle, TouchableOpacity } from 'react-native';

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  onPress?: () => void;
  style?: ViewStyle;
  pressable?: boolean;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  delay = 0,
  onPress,
  style,
  pressable = false,
}) => {
  const scaleValue = useRef(new Animated.Value(0.8)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;
  const pressScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 1,
        delay,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleValue, opacityValue, delay]);

  const handlePressIn = () => {
    if (pressable) {
      Animated.spring(pressScale, {
        toValue: 0.95,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (pressable) {
      Animated.spring(pressScale, {
        toValue: 1,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }).start();
    }
  };

  const CardComponent = pressable ? TouchableOpacity : View;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: opacityValue,
          transform: [
            { scale: Animated.multiply(scaleValue, pressScale) },
          ],
        },
        style,
      ]}
    >
      <CardComponent
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={pressable ? 0.9 : 1}
        style={styles.card}
      >
        {children}
      </CardComponent>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
  },
});

export default AnimatedCard;

