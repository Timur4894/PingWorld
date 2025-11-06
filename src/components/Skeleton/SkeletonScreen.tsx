import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';
import { Colors } from '../../constants/colors';

interface SkeletonBoxProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

const SkeletonBox: React.FC<SkeletonBoxProps> = ({ 
  width = '100%', 
  height = 20, 
  borderRadius = 8,
  style 
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: Colors.cardBackground,
          opacity,
        },
        style,
      ]}
    />
  );
};

export const SendHelloSkeleton = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/img/PurpleShadow.png')} style={styles.backgroundImage} resizeMode='stretch'/>
      
      <View style={styles.header}>
        <SkeletonBox width={40} height={40} borderRadius={20} />
        <SkeletonBox width={100} height={30} />
        <SkeletonBox width={40} height={40} borderRadius={20} />
      </View>

      <View style={styles.centerContent}>
        <SkeletonBox width={200} height={200} borderRadius={100} style={styles.avatar} />
        <SkeletonBox width={150} height={30} style={styles.marginTop} />
        <SkeletonBox width={120} height={20} style={styles.marginTop} />
      </View>

      <View style={styles.cardsContainer}>
        <SkeletonBox width="85%" height={100} borderRadius={22} style={styles.card} />
        <SkeletonBox width="85%" height={100} borderRadius={22} style={styles.card} />
      </View>

      <SkeletonBox width="80%" height={60} borderRadius={25} style={styles.button} />
    </View>
  );
};

export const ReceiveHelloSkeleton = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/img/PurpleShadow.png')} style={styles.backgroundImage} resizeMode='stretch'/>
      
      <View style={styles.header}>
        <SkeletonBox width={40} height={40} borderRadius={20} />
        <SkeletonBox width={80} height={30} />
      </View>

      <SkeletonBox width={250} height={50} style={styles.marginTop} />

      <View style={styles.cardContainer}>
        <SkeletonBox width={200} height={300} borderRadius={50} />
      </View>

      <View style={styles.bottomSection}>
        <SkeletonBox width="85%" height={60} borderRadius={22} style={styles.marginBottom} />
        <SkeletonBox width={150} height={20} />
      </View>

      <SkeletonBox width="80%" height={60} borderRadius={25} style={styles.button} />
    </View>
  );
};

export const SettingsSkeleton = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/img/PurpleShadow.png')} style={styles.backgroundImage} resizeMode='stretch'/>
      
      <View style={styles.header}>
        <SkeletonBox width={40} height={40} borderRadius={20} />
      </View>

      <SkeletonBox width={200} height={50} style={styles.marginTop} />

      <View style={styles.cardContainer}>
        <SkeletonBox width={200} height={300} borderRadius={50} />
      </View>

      <View style={styles.settingsSection}>
        <SkeletonBox width="85%" height={60} borderRadius={22} style={styles.marginBottom} />
        <SkeletonBox width="85%" height={60} borderRadius={22} style={styles.marginBottom} />
        <SkeletonBox width={100} height={20} style={styles.marginTop} />
        <SkeletonBox width={120} height={20} style={styles.marginTop} />
      </View>
    </View>
  );
};

export const StatsSkeleton = () => {
  return (
    <View style={[styles.container, styles.scrollContainer]}>
      <Image source={require('../../assets/img/PurpleShadow.png')} style={styles.backgroundImage} resizeMode='stretch'/>
      
      <View style={styles.header}>
        <SkeletonBox width={40} height={40} borderRadius={20} />
        <SkeletonBox width={150} height={40} />
        <SkeletonBox width={40} height={40} borderRadius={20} />
      </View>

      <View style={styles.statsGrid}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item) => (
          <View key={item} style={styles.statCard}>
            <SkeletonBox width={80} height={80} borderRadius={40} />
            <SkeletonBox width={100} height={20} style={styles.marginTop} />
            <SkeletonBox width={60} height={16} style={styles.marginTop} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: Colors.backgroundSettings,
  },
  backgroundImage: {
    position: 'absolute',
    width: '110%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    marginTop: 20,
    marginBottom: 20,
  },
  centerContent: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatar: {
    marginBottom: 20,
  },
  marginTop: {
    marginTop: 12,
  },
  marginBottom: {
    marginBottom: 12,
  },
  cardsContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  card: {
    marginBottom: 12,
  },
  cardContainer: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 25,
    padding: 16,
    width: '85%',
    alignItems: 'center',
    marginVertical: 20,
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    marginTop: 20,
  },
  settingsSection: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  statCard: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});

export default SkeletonBox;

