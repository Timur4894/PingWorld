import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import GradientButton from '../../components/GradientButton';
import InputField from '../../components/InputField';  
import BackSvg from '../../assets/svg/BackSvg';
import FireSvg from '../../assets/svg/FireSvg';
import EditSvg from '../../assets/svg/EditSvg';

export default function SettingsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Login'>>();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');


  return (
    <View style={styles.container}>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '95%'}}>
        <TouchableOpacity onPress={()=>{navigation.goBack()}}>
          <BackSvg />
        </TouchableOpacity>

        {/* <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
          <Text style={{fontSize: 22, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#fff', marginRight: 8}}>182</Text>
          <FireSvg />
        </View> */}
      </View>

      <Text style={{fontSize: 42, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#fff'}}>My Avatar</Text>

      <View style={{backgroundColor: '#383D4F', borderRadius: 25, padding: 16, width: '85%', alignItems: 'center'}}>
        <Image source={require('../../assets/img/PurpleShadow.png')} style={styles.backgroundImage} resizeMode='stretch'/>

        <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start'}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#fff'}}>Legendary</Text>
          <Image source={require('../../assets/img/stars/Legendary.png')}/>
        </View>

        
        <Image source={require('../../assets/img/TEST.png')}/>
      </View>

      <View style={{gap: 20}}>
        <View style={{width: '85%', backgroundColor: '#383D4F', borderRadius: 22, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#303445', justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#fff'}}>Tymur Latush</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#fff'}}>100</Text>
            <FireSvg style={{marginLeft: 8, marginTop: -10}}/>
          </View>
        </View>

        <View style={{width: '85%', backgroundColor: '#383D4F', borderRadius: 22, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#303445', justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#fff'}}>https://t.me/kkutsen</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#fff'}}>100</Text>
            <EditSvg style={{marginLeft: 8}}/>
          </View>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'space-around',
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


