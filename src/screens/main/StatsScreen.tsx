import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import GradientButton from '../../components/GradientButton';
import InputField from '../../components/InputField';  
import FireSvg from '../../assets/svg/FireSvg';
import BackSvg from '../../assets/svg/BackSvg';


export default function StatsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Login'>>();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');

  const stats = [
    {
      name: 'Tymur Latush',
      value: 100,
    },
    {
      name: 'https://t.me/kkutsen',
      value: 100,
    },
    {
      name: 'https://t.me/kkutsen',
      value: 100,
    },
    {
      name: 'https://t.me/kkutsen',
      value: 100,
    },
    {
      name: 'Tymur Latush',
      value: 100,
    },
    {
      name: 'https://t.me/kkutsen',
      value: 100,
    },
    {
      name: 'https://t.me/kkutsen',
      value: 100,
    },
    {
      name: 'https://t.me/kkutsen',
      value: 100,
    },
  ];


  return (
    <View style={styles.container}>
      <Image source={require('../../assets/img/PurpleShadow.png')} style={styles.backgroundImage} resizeMode='stretch'/>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '95%', marginBottom: 20}}>
        <TouchableOpacity onPress={()=>{navigation.goBack()}}>
          <BackSvg />
        </TouchableOpacity>

        {/* <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
          <Text style={{fontSize: 22, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#fff', marginRight: 8}}>182</Text>
          <FireSvg />
        </View> */}
      </View>

      <Text style={{fontSize:32, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#fff', marginBottom: 50, textAlign: 'center'}}>
        Already <Text style={{fontSize:32, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#C5B7F4', marginBottom: 20}}>
        246
          </Text> people have pinged at least once!
      </Text>

      
      <Text style={{fontSize:22, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#fff', marginBottom: 20}}>Top pingers</Text>
      <View style={{gap: 12}}>
        {stats.map((stat, index) => (    
            <View style={{width: '100%', backgroundColor: '#383D4F', borderRadius: 22, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#303445', justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#fff'}}>{stat.name}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#fff'}}>{stat.value}</Text>
                <FireSvg style={{marginLeft: 8, marginTop: -10}}/>
              </View>
            </View>
        ))}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingTop: 60,
    padding: 16, 
    alignItems: 'center',
    backgroundColor: "#303445",
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
    color: '#fff',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  signUpText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontFamily: 'DynaPuff',
  },
  signUpLink: {
    color: '#C5B7F4',
    fontWeight: 'bold',
  },
});


