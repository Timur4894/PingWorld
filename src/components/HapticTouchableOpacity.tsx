import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { triggerHaptic } from '../utils/hapticFeedback';

interface HapticTouchableOpacityProps extends TouchableOpacityProps {
  hapticType?: 'light' | 'medium' | 'heavy';
  hapticOnPressIn?: boolean;
}

export const HapticTouchableOpacity: React.FC<HapticTouchableOpacityProps> = ({
  onPress,
  onPressIn,
  hapticType = 'light',
  hapticOnPressIn = false,
  disabled,
  ...props
}) => {
  const handlePress = (e: any) => {
    if (!disabled && onPress) {
      triggerHaptic(hapticType);
      onPress(e);
    }
  };

  const handlePressIn = (e: any) => {
    if (!disabled && hapticOnPressIn) {
      triggerHaptic(hapticType);
    }
    if (onPressIn) {
      onPressIn(e);
    }
  };

  return (
    <TouchableOpacity
      {...props}
      onPress={handlePress}
      onPressIn={handlePressIn}
      disabled={disabled}
    />
  );
};

export default HapticTouchableOpacity;

