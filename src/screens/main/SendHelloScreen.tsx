import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import GradientButton from '../../components/GradientButton';
import InputField from '../../components/InputField';  
import WorldSvg from '../../assets/svg/WorldSvg';
import HumanSvg from '../../assets/svg/HumanSvg';
import FireSvg from '../../assets/svg/FireSvg';


export default function SendHelloScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Login'>>();

  const data = [
    {
      name: 'King Von',
      image: require('../../assets/img/stars/Legendary.png'),

    },
    {
      name: 'John Doe',
      image: require('../../assets/img/stars/Legendary.png'),
    }
  ];

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/img/PurpleShadow.png')} style={styles.backgroundImage} resizeMode='stretch'/>



      <View style={{justifyContent: 'space-between', width: '90%', alignItems: 'center', flexDirection: 'row', marginTop: 60}}>
        <TouchableOpacity onPress={()=>{navigation.navigate('StatsScreen')}}>
          <WorldSvg fill='#fff' width={30} height={30}/>
        </TouchableOpacity>
    
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 24, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#fff'}}>12</Text>
          <FireSvg style={{marginBottom: 10, marginLeft: 8}}/>
        </View>

        <TouchableOpacity onPress={()=>{navigation.navigate('SettingsScreen')}}>
          <HumanSvg fill='#fff' width={30} height={30}/>
        </TouchableOpacity>
      </View>



      <View style={{alignItems: 'center', gap: 30}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#fff'}}>Pings left today:  <Text style={{fontSize: 18, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#C5B7F4'}}>5</Text></Text>
        <TouchableOpacity>
          <Image source={require('../../assets/img/PingBtn.png')}/>
        </TouchableOpacity>
      </View>
     


      {data.length > 0 ?  (
        <View>
          <Text style={{fontSize: 22,textAlign: 'center', fontWeight: 'bold', marginBottom: 20,fontFamily: 'DynaPuff', color: '#fff'}}>People who pinged you</Text>

          {data.map((item, index) => (
            <View style={{width: '100%', backgroundColor: '#383D4F', borderRadius: 22, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#303445', justifyContent: 'space-between', flexDirection: 'row', marginBottom: 10}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#fff'}}>{item.name}</Text>
              <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={()=>{navigation.navigate('ReceiveHello')}}>
                <Text style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#C5B7F4', }}>view profile</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={{alignSelf: 'center', marginTop: 10, marginBottom: 20}} onPress={()=>{}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#C5B7F4'}}>show more</Text>
          </TouchableOpacity>
       </View>
      ) : (
        <Text style={{fontSize: 14, fontFamily: 'DynaPuff', color: '#9899B5', textAlign: 'center', marginBottom: 20}}>No one has pinged you yet, be the first to surprise someone!</Text>
      )}

    
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'space-between',
    padding: 16, 
    alignItems: 'center',
    backgroundColor: "#272B38",
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


