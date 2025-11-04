import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  style?: ViewStyle;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

const FadeInView: React.FC<FadeInViewProps> = ({
  children,
  delay = 0,
  duration = 800,
  style,
  direction = 'up',
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    const getTranslateValue = () => {
      switch (direction) {
        case 'up':
          return { translateY: translateAnim };
        case 'down':
          return { translateY: Animated.multiply(translateAnim, -1) };
        case 'left':
          return { translateX: translateAnim };
        case 'right':
          return { translateX: Animated.multiply(translateAnim, -1) };
        default:
          return {};
      }
    };

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateAnim, duration, delay, direction]);

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return [{ translateY: translateAnim }];
      case 'down':
        return [{ translateY: Animated.multiply(translateAnim, -1) }];
      case 'left':
        return [{ translateX: translateAnim }];
      case 'right':
        return [{ translateX: Animated.multiply(translateAnim, -1) }];
      default:
        return [];
    }
  };

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: fadeAnim,
          transform: getTransform(),
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default FadeInView;

