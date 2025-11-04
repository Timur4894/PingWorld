import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStack';
import { Colors } from '../../constants/colors';
import GradientButton from '../../components/GradientButton';
import InputField from '../../components/InputField';  
import BackSvg from '../../assets/svg/BackSvg';
import FireSvg from '../../assets/svg/FireSvg';
import EditSvg from '../../assets/svg/EditSvg';
import CopySvg from '../../assets/svg/CopySvg';

export default function ReceiveHelloScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList, 'ReceiveHello'>>();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');


  return (
    <View style={styles.container}>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '95%', marginTop: 20}}>
        <TouchableOpacity onPress={()=>{navigation.goBack()}}>
          <BackSvg />
        </TouchableOpacity>

        <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
          <Text style={{fontSize: 22, fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textPrimary, marginRight: 8}}>182</Text>
          <FireSvg />
        </View>
      </View>

      <Text style={{fontSize: 42, fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textPrimary, textAlign: 'center'}}>King Von {'\n'} <Text style={{fontSize: 42, fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textAccent, textAlign: 'center'}}>Pinged You</Text></Text>

      <View style={{backgroundColor: Colors.cardBackground, borderRadius: 25, padding: 16, width: '85%', alignItems: 'center'}}>
        <Image source={require('../../assets/img/PurpleShadow.png')} style={styles.backgroundImage} resizeMode='stretch'/>

        <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start'}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textPrimary}}>Legendary</Text>
          <Image source={require('../../assets/img/stars/Legendary.png')}/>
        </View>

        
        <Image source={require('../../assets/img/TEST.png')}/>
      </View>

      <View style={{marginBottom: 0}}>
        <View style={{width: '85%', backgroundColor: Colors.cardBackground, borderRadius: 22, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: Colors.cardBorder, justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textPrimary, textDecorationLine: 'underline'}}>https://t.me/kkutsen</Text>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
            <CopySvg style={{marginLeft: 8}}/>
          </TouchableOpacity>
        </View>

        <Text style={{alignSelf: "center", fontSize: 14, fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textError,  marginTop: 10}}>Report link or user</Text>

      </View>

      <GradientButton
        title="Pong!"
        onPress={()=>{navigation.navigate('SendHello')}}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'space-around',
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
    width: '100%',
    marginTop: 60,
    marginBottom: 40,
  },
  title: { 
    fontSize: 38, 
    fontWeight: '800', 
    fontFamily: 'DynaPuff',
    color: Colors.textPrimary,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  signUpText: {
    color: Colors.textPrimary,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontFamily: 'DynaPuff',
  },
  signUpLink: {
    color: Colors.textAccent,
    fontWeight: 'bold',
  },
});


