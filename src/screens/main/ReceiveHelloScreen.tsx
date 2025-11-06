import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Clipboard } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStack';
import { Colors } from '../../constants/colors';
import GradientButton from '../../components/GradientButton';
import InputField from '../../components/InputField';  
import BackSvg from '../../assets/svg/BackSvg';
import FireSvg from '../../assets/svg/FireSvg';
import EditSvg from '../../assets/svg/EditSvg';
import CopySvg from '../../assets/svg/CopySvg';
import userManagementApi from '../../api/UserManagementApi';
import pingApi from '../../api/pingApi';
import { useModal } from '../../context/ModalContext';
import { ReceiveHelloSkeleton } from '../../components/Skeleton/SkeletonScreen';
import { getCountryFlag, getCountryName } from '../../utils/countryUtils';

interface Ping {
  id?: string;
  sender_id: string;
  sender_nickname: string;
  sender_avatar: {
    url: string;
    rarity: 'common' | 'rare' | 'legendary';
  };
  sender_contacts?: Array<{
    title: string;
    url: string;
  }>;
}

interface User {
  id: string;
  nickname: string;
  country?: string;
  avatar: {
    url: string;
    rarity: 'common' | 'rare' | 'legendary';
  };
  contacts: Array<{
    title: string;
    url: string;
  }>;
  current_streak: number;
  created_at: string;
}

type ReceiveHelloRouteProp = RouteProp<MainStackParamList, 'ReceiveHello'>;

export default function ReceiveHelloScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList, 'ReceiveHello'>>();
  const route = useRoute<ReceiveHelloRouteProp>();
  const { showModal } = useModal();
  const {ping, showPingButton = true} = route.params;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userManagementApi.getUser(ping.sender_id);
        console.log('GetUser response:', response.data);
        
        // Обрабатываем оба варианта структуры ответа: { data: {...} } или прямой объект
        const userData = response.data?.data || response.data;
        setUser(userData);
      } catch (error: any) {
        console.error('Error fetching user:', error);
        // При ошибке оставляем user как null, чтобы показать fallback UI
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [ping]);

  const handleReportUser = () => {
    showModal({
      title: 'Report User',
      message: `Are you sure you want to report ${ping.sender_nickname}? This action will be reviewed by our moderation team.`,
      type: 'warning',
      showCancel: true,
      confirmText: 'Report',
      cancelText: 'Cancel',
      onConfirm: async () => {
        try {
          await userManagementApi.reportUser(ping.sender_id, 'Reported user');
          showModal({
            title: 'Report Submitted',
            message: 'Thank you for your report. Our team will review it shortly.',
            type: 'success',
          });
        } catch (error: any) {
          console.error('Error reporting user:', error);
          let errorMessage = 'Failed to submit report';
          
          if (error.response) {
            const status = error.response.status;
            const data = error.response.data;
            errorMessage = data?.message || data?.error || `Error: ${status}`;
          } else if (error.request) {
            errorMessage = 'Network error. Please check your connection';
          } else {
            errorMessage = error.message || 'An error occurred';
          }
          
          showModal({
            title: 'Error',
            message: errorMessage,
            type: 'error',
          });
        }
      },
    });
  };

  const handleCopyContact = async () => {
    try {
      if (ping.sender_contacts && ping.sender_contacts.length > 0) {
        await Clipboard.setString(ping.sender_contacts[0].url);
      }
    } catch (error: any) {
      console.error('Error copying contact:', error);
    }
  };

  const handlePong = async () => {
    try {
      await pingApi.sendPing();
      navigation.goBack();
    } catch (error: any) {
      console.error('Error sending ping:', error);
      let errorMessage = 'Failed to send ping';
      
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;
        errorMessage = data?.message || data?.error || `Error: ${status}`;
      } else if (error.request) {
        errorMessage = 'Network error. Please check your connection';
      } else {
        errorMessage = error.message || 'An error occurred';
      }
      
      showModal({
        title: 'Error',
        message: errorMessage,
        type: 'error',
      });
    }
  };

  if (loading) {
    return <ReceiveHelloSkeleton />;
  }
  
  return (
    <View style={styles.container}>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '95%', marginTop: 20}}>
        <TouchableOpacity onPress={()=>{navigation.goBack()}}>
          <BackSvg />
        </TouchableOpacity>

        <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
          <Text style={{fontSize: 22, fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textPrimary, marginRight: 8}}>{user?.current_streak || 0}</Text>
          <FireSvg />
        </View>
      </View>

      <View style={{alignItems: 'center', marginBottom: 10}}>
        <Text style={{fontSize: 42, fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textPrimary, textAlign: 'center'}}>{ping.sender_nickname} {'\n'} <Text style={{fontSize: 42, fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textAccent, textAlign: 'center'}}>Pinged You</Text></Text>
        {user?.country && (
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
            {getCountryFlag(user.country) && (
              <Text style={{fontSize: 20, marginRight: 8}}>{getCountryFlag(user.country)}</Text>
            )}
            {getCountryName(user.country) && (
              <Text style={{fontSize: 16, fontFamily: 'DynaPuff', color: Colors.textSecondary}}>
                {getCountryName(user.country)}
              </Text>
            )}
          </View>
        )}
      </View>

      <View style={{backgroundColor: Colors.cardBackground, borderRadius: 25, padding: 16, width: '85%', alignItems: 'center'}}>
        <Image source={require('../../assets/img/PurpleShadow.png')} style={styles.backgroundImage} resizeMode='stretch'/>

        <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start'}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textPrimary}}>{ping.sender_avatar.rarity}</Text>
          {ping.sender_avatar.rarity === 'legendary' && <Image source={require('../../assets/img/stars/Legendary.png')}/>}
          {ping.sender_avatar.rarity === 'rare' && <Image source={require('../../assets/img/stars/Rare.png')}/>}
          {ping.sender_avatar.rarity === 'common' && <Image source={require('../../assets/img/stars/Common.png')}/>}
        </View>

        
        <Image source={{uri: ping.sender_avatar.url}} style={{width: '100%', height: 300, borderRadius: 50}} resizeMode='contain'/>
      </View>

      <View style={{marginBottom: 0}}>
        {ping.sender_contacts && ping.sender_contacts.length > 0 && (
          <View style={{width: '85%', backgroundColor: Colors.cardBackground, borderRadius: 22, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: Colors.cardBorder, justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textPrimary, textDecorationLine: 'underline'}}>{ping.sender_contacts[0].url}</Text>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
              <CopySvg style={{marginLeft: 8}}/>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity onPress={()=>{handleReportUser()}}>
          <Text style={{alignSelf: "center", fontSize: 14, fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textError,  marginTop: 10}}>Report link or user</Text>
        </TouchableOpacity>

      </View>

      <GradientButton
        title="Pong!"
        onPress={()=>{handlePong()}}
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


