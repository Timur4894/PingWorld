import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStack';
import { Colors } from '../../constants/colors';
import GradientButton from '../../components/GradientButton';
import InputField from '../../components/InputField';  
import FireSvg from '../../assets/svg/FireSvg';
import BackSvg from '../../assets/svg/BackSvg';
import FadeInView from '../../components/Animated/FadeInView';
import AnimatedButton from '../../components/Animated/AnimatedButton';
import AnimatedCard from '../../components/Animated/AnimatedCard';
import PulseView from '../../components/Animated/PulseView';
import leaderboardApi from '../../api/leaderboardApi';
import { useModal } from '../../context/ModalContext';
import { StatsSkeleton } from '../../components/Skeleton/SkeletonScreen';
import { getCountryFlag } from '../../utils/countryUtils';
import { moderateScale, scalePadding, scaleMargin, scaleBorderRadius, getWidthPercentage, scaleSize } from '../../utils/scaling';
import RareStar from '../../assets/svg/stars/RareStar';
import CommonStar from '../../assets/svg/stars/CommonStar';
import MythicStar from '../../assets/svg/stars/MythicStar';
import LegendaryStar from '../../assets/svg/stars/LegendaryStar';

interface Avatar {
  url: string;
  rarity: string;
}

interface LeaderboardEntry {
  id?: string;
  user_id?: string;
  nickname: string;
  country: string;
  avatar: Avatar;
  current_streak: number;
}

export default function StatsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList, 'StatsScreen'>>();
  const { showModal } = useModal();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const response = await leaderboardApi.getLeaderboard(20);
      
      const responseData = response.data?.data || response.data;
      const entries = responseData?.entries || responseData || [];
      
      setLeaderboard(entries);
      setTotalUsers(entries.length);
    } catch (error: any) {
      console.error('Leaderboard fetch error:', error);
      let errorMessage = 'Failed to load leaderboard';
      
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
      setLeaderboard([]);
      setTotalUsers(0);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <StatsSkeleton />;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={require('../../assets/img/PurpleShadow.png')} style={styles.backgroundImage} resizeMode='stretch'/>

      <FadeInView delay={0} direction="down" style={{alignSelf: 'flex-start', width: getWidthPercentage(95),marginLeft: scaleMargin(16) }}>
        <View style={{ flexDirection: 'row', alignItems: 'center',marginBottom: scaleMargin(20)}}>
          <AnimatedButton onPress={()=>{navigation.goBack()}}>
            <BackSvg />
          </AnimatedButton>
        </View>
      </FadeInView>

      <FadeInView delay={200} direction="up">
          <Text style={{fontSize: moderateScale(22), width: '80%', alignSelf: 'center', fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textPrimary, marginBottom: scaleMargin(50), textAlign: 'center'}}>
          Already <PulseView scale={1.05} duration={2500}>
            <Text style={{fontSize: moderateScale(32), fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textAccent, marginBottom: -10}}>
              {totalUsers}
            </Text>
          </PulseView> people have pinged at least once!
        </Text>
      </FadeInView>

      <FadeInView delay={400} direction="up" style={{marginLeft: scaleMargin(16)}}>
        <Text style={{fontSize: moderateScale(18), fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textPrimary, marginBottom: scaleMargin(20)}}>Top pingers</Text>
      </FadeInView>
      
      <View style={{gap: scaleMargin(12), width: '100%', paddingHorizontal: scalePadding(16), marginBottom: scaleMargin(50)}}>
        {leaderboard.length > 0 ? (
          leaderboard.map((entry, index) => (    
            <AnimatedCard key={`${entry.nickname}-${index}`} delay={600 + (index * 200)} pressable={true}>
              <TouchableOpacity onPress={()=>{
                const pingData = {
                  id: entry.id,
                  sender_id: entry.user_id || entry.id || '',
                  sender_nickname: entry.nickname,
                  sender_avatar: {
                    url: entry.avatar.url,
                    rarity: entry.avatar.rarity as 'common' | 'rare' | 'legendary',
                  },
                };
                navigation.navigate('ReceiveHello', {ping: pingData, showPingButton: false});
              }} style={{width: '100%', backgroundColor: Colors.cardBackground, borderRadius: 22, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: Colors.cardBorder, justifyContent: 'space-between', flexDirection: 'row'}}>

                <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                  <Text style={{fontSize: moderateScale(16), fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textAccent, marginRight: scaleMargin(12), minWidth: scaleSize(30)}}>
                    #{index + 1}
                  </Text>
                  {entry.avatar.rarity === 'legendary' && (
                    <Image source={require('../../assets/img/stars/Legendary.png')}/>
                      )}
                  {entry.avatar.rarity === 'rare' && <RareStar  />}
                  {entry.avatar.rarity === 'common' && <CommonStar/>}
                  {entry.avatar.rarity === 'mythic' && <MythicStar  />}
                  {entry.avatar.rarity === 'legendary' && <LegendaryStar  />}

     
                  <Text style={{fontSize: moderateScale(16), fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textPrimary, flex: 1}}>
                    {entry.nickname}
                  </Text>
                  {entry.country && getCountryFlag(entry.country) && (
                    <Text style={{fontSize: moderateScale(18), marginLeft: scaleMargin(8)}}>{getCountryFlag(entry.country)}</Text>
                  )}
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontSize: moderateScale(16), fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textPrimary}}>
                    {entry.current_streak}
                  </Text>
                  <FireSvg style={{marginLeft: scaleMargin(8), marginTop: scaleMargin(-10)}}/>
                </View>
              </TouchableOpacity>
            </AnimatedCard>
          ))
        ) : (
          <FadeInView delay={600} direction="up">
            <View style={{width: '100%', backgroundColor: Colors.cardBackground, borderRadius: scaleBorderRadius(22), padding: scalePadding(16), alignItems: 'center', borderWidth: 1, borderColor: Colors.cardBorder, justifyContent: 'center'}}>
              <Text style={{fontSize: moderateScale(16), fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textPrimary, textAlign: 'center'}}>
                No leaderboard data available
              </Text>
            </View>
          </FadeInView>
        )}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingTop: 60,
    backgroundColor: Colors.background,
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
    marginTop: scaleMargin(60),
    marginBottom: scaleMargin(40),
  },
  title: { 
    fontSize: moderateScale(38), 
    fontWeight: '800', 
    fontFamily: 'DynaPuff',
    color: Colors.textPrimary,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: scalePadding(20),
  },
  signUpText: {
    color: Colors.textPrimary,
    textAlign: 'center',
    marginTop: scaleMargin(20),
    fontSize: moderateScale(16),
    fontFamily: 'DynaPuff',
  },
  signUpLink: {
    color: Colors.textAccent,
    fontWeight: 'bold',
  },
});


