import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Colors } from '../../constants/colors';
import { useModal } from '../../context/ModalContext';
import { getHeightPercentage, getWidthPercentage, moderateScale, scaleMargin, scaleSize } from '../../utils/scaling';
import BigCircle from '../../assets/svg/btn/BigCircle';
import SmallCircle from '../../assets/svg/btn/SmallCircle';
import MidCircle from '../../assets/svg/btn/MidCircle';

interface PingButtonProps {
  onPingSent: () => void;
  disabled?: boolean;
  pingsRemaining?: number;
}

const PingButton: React.FC<PingButtonProps> = ({
  onPingSent,
  disabled = false,
}) => {
  const { showModal } = useModal();
  const scaleValue = useRef(new Animated.Value(1)).current;
  const progressValue = useRef(new Animated.Value(0)).current;
  const smallCircleRotation = useRef(new Animated.Value(0)).current;
  const bigCircleRotation = useRef(new Animated.Value(0)).current;
  const midCircleRotation = useRef(new Animated.Value(0)).current;
  const [isPressing, setIsPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  const rotationAnimations = useRef<Animated.CompositeAnimation[]>([]);
  const vibrationInterval = useRef<NodeJS.Timeout | null>(null);
  const currentProgressRef = useRef(0);
  const isPressingRef = useRef(false);

  const handlePressIn = () => {
    if (disabled) {
      showModal({
        title: 'No pings left',
        message: 'You have used all your daily pings. Come back tomorrow!',
        type: 'warning',
      });
      return;
    }

    setIsPressing(true);
    isPressingRef.current = true;
    
    Animated.spring(scaleValue, {
      toValue: 1.2,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();

    Animated.timing(progressValue, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        onPingSent();
        resetButton();
      }
    });

    // Start rotation animations for circles
    smallCircleRotation.setValue(0);
    bigCircleRotation.setValue(0);
    midCircleRotation.setValue(0);

    const smallCircleAnim = Animated.loop(
      Animated.timing(smallCircleRotation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    );

    const bigCircleAnim = Animated.loop(
      Animated.timing(bigCircleRotation, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    );

    const midCircleAnim = Animated.loop(
      Animated.timing(midCircleRotation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    );

    rotationAnimations.current = [smallCircleAnim, bigCircleAnim, midCircleAnim];
    smallCircleAnim.start();
    bigCircleAnim.start();
    midCircleAnim.start();

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 0.025;
        currentProgressRef.current = newProgress;
        if (newProgress >= 1) {
          clearInterval(progressInterval);
          return 1;
        }
        return newProgress;
      });
    }, 100);

    // Start haptic feedback with increasing intensity
    const startHapticFeedback = () => {
      const hapticOptions = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
      };

      const triggerHaptic = () => {
        if (!isPressingRef.current) return;
        
        const currentProgress = currentProgressRef.current;
        
        // Calculate haptic intensity based on progress
        // Start with longer intervals, decrease as progress increases
        const baseInterval = 300; // Start with 300ms interval
        const minInterval = 30; // Minimum interval at max progress
        const currentInterval = baseInterval - (currentProgress * (baseInterval - minInterval));
        
        // Haptic type changes based on progress for better feel
        let hapticType: 'impactLight' | 'impactMedium' | 'impactHeavy';
        if (currentProgress < 0.3) {
          hapticType = 'impactLight';
        } else if (currentProgress < 0.7) {
          hapticType = 'impactMedium';
        } else {
          hapticType = 'impactHeavy';
        }
        
        try {
          ReactNativeHapticFeedback.trigger(hapticType, hapticOptions);
        } catch (error) {
          console.warn('Haptic feedback error:', error);
        }
        
        vibrationInterval.current = setTimeout(() => {
          triggerHaptic();
        }, Math.max(currentInterval, minInterval));
      };
      
      triggerHaptic();
    };
    
    startHapticFeedback();
  };

  const handlePressOut = () => {
    if (!isPressing) return;
    
    setIsPressing(false);
    isPressingRef.current = false;
    resetButton();
  };

  const resetButton = () => {
    // Stop all rotation animations
    rotationAnimations.current.forEach(anim => anim.stop());
    rotationAnimations.current = [];

    // Stop haptic feedback
    if (vibrationInterval.current) {
      clearTimeout(vibrationInterval.current);
      vibrationInterval.current = null;
    }

    // Reset rotation values
    Animated.timing(smallCircleRotation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(bigCircleRotation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(midCircleRotation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();

    Animated.timing(progressValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();

    setProgress(0);
    currentProgressRef.current = 0;
    
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  const progressWidth = progressValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  // Rotation interpolations for each circle (different directions and speeds)
  const smallCircleRotate = smallCircleRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const bigCircleRotate = bigCircleRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg'], // Counter-clockwise
  });

  const midCircleRotate = midCircleRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            transform: [{ scale: scaleValue }],
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        <View
          style={styles.button}
          onTouchStart={handlePressIn}
          onTouchEnd={handlePressOut}
          onTouchCancel={handlePressOut}
        >
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              alignSelf: 'center',
              transform: [{ rotate: smallCircleRotate }],
            }}
          >
            <SmallCircle/>
          
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              top: scaleSize(25),
              alignSelf: 'center',
              transform: [{ rotate: bigCircleRotate }],
            }}
          >
            <BigCircle 
             
            />
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              top: scaleSize(40),
              alignSelf: 'center',
              transform: [{ rotate: midCircleRotate }],
            }}
          >
            <MidCircle/>
          </Animated.View>
          <Text style={styles.textButton}>Ping</Text>
          {/* {isPressing && (
            <View style={styles.progressContainer}>
              <Animated.View
                style={[
                  styles.progressBar,
                  {
                    width: progressWidth,
                  },
                ]}
              />
            </View>
          )} */}
        </View>
      </Animated.View>
      
      {/* Progress text */}
      {/* {isPressing && (
        <Text style={styles.progressText}>
          {Math.round(progress * 100)}%
        </Text>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: getWidthPercentage(45),
    height: getHeightPercentage(20),
  },
  buttonImage: {
    width: getWidthPercentage(45),
    height: getHeightPercentage(20),
  },
  progressContainer: {
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.accent,
    borderRadius: 2,
  },
  progressText: {
    position: 'absolute',
    bottom: -30,
    fontSize: moderateScale(14),
    fontFamily: 'DynaPuff',
    color: Colors.textAccent,
    fontWeight: 'bold',
  },
  textButton: {
    fontSize: moderateScale(26),
    fontFamily: 'DynaPuff',
    position: 'absolute',
    top: scaleSize(80),
    // alignSelf: 'center',
    // marginTop: 20,
    color: Colors.textPrimary,
    fontWeight: 'bold',
  },
});

export default PingButton;

