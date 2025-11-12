import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export const triggerHaptic = (type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' = 'light') => {
  try {
    let hapticType: 'impactLight' | 'impactMedium' | 'impactHeavy' | 'notificationSuccess' | 'notificationWarning' | 'notificationError';
    
    switch (type) {
      case 'light':
        hapticType = 'impactLight';
        break;
      case 'medium':
        hapticType = 'impactMedium';
        break;
      case 'heavy':
        hapticType = 'impactHeavy';
        break;
      case 'success':
        hapticType = 'notificationSuccess';
        break;
      case 'warning':
        hapticType = 'notificationWarning';
        break;
      case 'error':
        hapticType = 'notificationError';
        break;
      default:
        hapticType = 'impactLight';
    }
    
    ReactNativeHapticFeedback.trigger(hapticType, hapticOptions);
  } catch (error) {
    console.warn('Haptic feedback error:', error);
  }
};

