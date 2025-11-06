import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { Colors } from '../constants/colors';
import { moderateScale, scaleMargin } from '../utils/scaling';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/img/PurpleShadow.png')} style={styles.backgroundImage} resizeMode='stretch'/>
      
      <View style={styles.content}>
        <Text style={styles.title}>PingWorld</Text>
        <ActivityIndicator size="large" color={Colors.accent} style={styles.spinner} />
        <Text style={styles.subtitle}>Loading...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backgroundImage: {
    position: 'absolute',
    width: '110%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(42),
    fontWeight: 'bold',
    fontFamily: 'DynaPuff',
    color: Colors.textPrimary,
    marginBottom: scaleMargin(40),
  },
  spinner: {
    marginBottom: scaleMargin(20),
  },
  subtitle: {
    fontSize: moderateScale(18),
    fontFamily: 'DynaPuff',
    color: Colors.textAccent,
    fontWeight: '600',
  },
});






