import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Animated, Alert } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

interface PingButtonProps {
  onPingSent: () => void;
  disabled?: boolean;
  pingsRemaining?: number;
}

const PingButton: React.FC<PingButtonProps> = ({
  onPingSent,
  disabled = false,
  pingsRemaining = 0,
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const progressValue = useRef(new Animated.Value(0)).current;
  const [isPressing, setIsPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const pressTimer = useRef<NodeJS.Timeout | null>(null);

  const handlePressIn = () => {
    if (disabled) {
      Alert.alert('No pings left', 'You have used all your daily pings. Come back tomorrow!');
      return;
    }

    setIsPressing(true);
    
    // Start scaling animation
    Animated.spring(scaleValue, {
      toValue: 1.2,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();

    // Start progress animation
    Animated.timing(progressValue, {
      toValue: 1,
      duration: 4000, // 4 seconds
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        onPingSent();
        resetButton();
      }
    });

    // Update progress every 100ms
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 0.025; // 100ms / 4000ms = 0.025
        if (newProgress >= 1) {
          clearInterval(progressInterval);
          return 1;
        }
        return newProgress;
      });
    }, 100);
  };

  const handlePressOut = () => {
    if (!isPressing) return;
    
    setIsPressing(false);
    resetButton();
  };

  const resetButton = () => {
    // Reset scale
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();

    // Reset progress
    Animated.timing(progressValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();

    setProgress(0);
    
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  const progressWidth = progressValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
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
          <Image source={require('../../assets/img/PingBtn.png')} style={styles.buttonImage} />
          
          {/* Progress bar */}
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
      {isPressing && (
        <Text style={styles.progressText}>
          {Math.round(progress * 100)}%
        </Text>
      )}
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
  },
  buttonImage: {
    width: 120,
    height: 120,
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
    backgroundColor: '#C5B7F4',
    borderRadius: 2,
  },
  progressText: {
    position: 'absolute',
    bottom: -30,
    fontSize: 14,
    fontFamily: 'DynaPuff',
    color: '#C5B7F4',
    fontWeight: 'bold',
  },
});

export default PingButton;

