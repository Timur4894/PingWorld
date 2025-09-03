import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import GradientButton from '../components/GradientButton';


export default function WellcomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Wellcome'>>();


  return (
    <View style={styles.container}>
        <Image source={require('../assets/img/PurpleShadow.png')} style={{position: 'absolute', width: '110%',}} resizeMode='stretch'/>

        <View style={{alignItems: 'center', justifyContent: 'center', zIndex: 1}}>
            <Text style={[styles.title, {fontWeight: '400'}]}>Welcome to</Text>
            <Text style={styles.title}>Ping World</Text>
        </View>
      
       
   
        <Image source={require('../assets/img/Onboard.png')}/>

        <Text style={{fontSize: 22, fontWeight: '400', textAlign: 'center', fontFamily: 'DynaPuff' , color: '#fff'}}>Send random hellos and surprise someone new today!</Text>

        <GradientButton
            title="Continue"
            onPress={() => navigation.navigate('Login')}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'space-around', backgroundColor: "#303445", alignItems: 'center' },
  title: { fontSize: 38, fontWeight: '800', textAlign: 'center', fontFamily: 'DynaPuff' , color: '#fff'},
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginVertical: 8 },
});


