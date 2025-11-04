import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/img/PurpleShadow.png')} style={styles.backgroundImage} resizeMode='stretch'/>
      
      <View style={styles.content}>
        <Text style={styles.title}>PingWorld</Text>
        <ActivityIndicator size="large" color="#C5B7F4" style={styles.spinner} />
        <Text style={styles.subtitle}>Loading...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1f29",
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
    fontSize: 42,
    fontWeight: 'bold',
    fontFamily: 'DynaPuff',
    color: '#fff',
    marginBottom: 40,
  },
  spinner: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'DynaPuff',
    color: '#C5B7F4',
    fontWeight: '600',
  },
});






