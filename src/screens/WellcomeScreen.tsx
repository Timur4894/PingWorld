import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';
import GradientButton from '../components/GradientButton';
import { Colors } from '../constants/colors';
import { moderateScale, scaleHeight, scalePadding } from '../utils/scaling';


export default function WellcomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList, 'Wellcome'>>();


  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
        <Image source={require('../assets/img/PurpleShadow.png')} style={{position: 'absolute', width: '110%',}} resizeMode='stretch'/>

        <View style={{alignItems: 'center', justifyContent: 'center', zIndex: 1}}>
            <Text style={[styles.title, {fontWeight: '400'}]}>Welcome to</Text>
            <Text style={styles.title}>Ping World</Text>
        </View>
      
       
   
        <Image source={require('../assets/img/Onboard.png')} resizeMode='contain' style={{width: '100%', height: scaleHeight(300)}} />

        <Text style={{fontSize: moderateScale(22), fontWeight: '400', textAlign: 'center', fontFamily: 'DynaPuff' , color: Colors.textPrimary}}>Send random hellos and surprise someone new today!</Text>

        <GradientButton
            title="Continue"
            onPress={() => navigation.navigate('Login')}
        />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, paddingVertical: scalePadding(26) },
  scrollContent: { flexGrow: 1, padding: scalePadding(16), justifyContent: 'space-around', alignItems: 'center' },
  title: { fontSize: moderateScale(38), fontWeight: '800', textAlign: 'center', fontFamily: 'DynaPuff' , color: Colors.textPrimary},
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginVertical: 8 },
});


