import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStack';
import WorldSvg from '../../assets/svg/WorldSvg';
import HumanSvg from '../../assets/svg/HumanSvg';
import FireSvg from '../../assets/svg/FireSvg';
import FadeInView from '../../components/Animated/FadeInView';
import AnimatedButton from '../../components/Animated/AnimatedButton';
import AnimatedCard from '../../components/Animated/AnimatedCard';
import PulseView from '../../components/Animated/PulseView';
import PingButton from '../../components/Animated/PingButton';
import { Colors } from '../../constants/colors';
import pingApi from '../../api/pingApi';
import streakApi from '../../api/streakApi';
import { useModal } from '../../context/ModalContext';
import { SendHelloSkeleton } from '../../components/Skeleton/SkeletonScreen';
import { moderateScale, scalePadding, scaleMargin, scaleBorderRadius, getWidthPercentage } from '../../utils/scaling';

interface PingEntry {
  id?: string;
  sender_nickname: string;
  sender_id: string;
  sender_avatar: {
    url: string;
    rarity: 'common' | 'rare' | 'legendary';
  };
  sender_contacts?: Array<{
    title: string;
    url: string;
  }>;
}

export default function SendHelloScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList, 'SendHello'>>();
  const { showModal } = useModal();
  
  const [receivedPings, setReceivedPings] = useState<PingEntry[]>([]);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [pingsRemaining, setPingsRemaining] = useState<number>(3);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [sendingPing, setSendingPing] = useState(false);

  useEffect(() => {
    fetchReceivedPings();
    fetchUserStreak();
  }, []);

  const fetchReceivedPings = async () => {
    try {
      const response = await pingApi.getReceivedPings(1, 10);
      const responseData = response.data?.data || response.data;
      const entries = responseData?.entries || responseData?.pings || responseData || [];
      setReceivedPings(entries);
    } catch (error: any) {
      console.error('Error fetching received pings:', error);
      setReceivedPings([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStreak = async () => {
    try {
      const response = await streakApi.getUserStreak();
      const responseData = response.data?.data || response.data;
      setCurrentStreak(responseData?.current_streak || responseData?.streak || 0);
      setPingsRemaining(responseData?.pings_remaining || responseData?.remaining || 3);
    } catch (error: any) {
      console.error('Error fetching user streak:', error);
      setCurrentStreak(0);
      setPingsRemaining(3);
    }
  };

  const handlePingSent = async () => {
    if (sendingPing || pingsRemaining === 0) return;
    
    try {
      setSendingPing(true);
      await pingApi.sendPing();
      await fetchUserStreak();
      showModal({
        title: 'Success',
        message: 'Ping sent successfully!',
        type: 'success',
      });
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
    } finally {
      setSendingPing(false);
    }
  };

  const handleShowMore = () => {
    setShowAll(true);
  };

  const displayPings = showAll ? receivedPings : receivedPings.slice(0, 2);

  if (loading) {
    return <SendHelloSkeleton />;
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/img/PurpleShadow.png')} style={styles.backgroundImage} resizeMode='stretch'/>


      <FadeInView delay={0} direction="down">
        <View style={{justifyContent: 'space-between', width: getWidthPercentage(90), alignItems: 'center', flexDirection: 'row', marginTop: scaleMargin(60)}}>
          <AnimatedButton onPress={()=>{navigation.navigate('StatsScreen')}}>
            <WorldSvg fill={Colors.textPrimary} width={30} height={30}/>
          </AnimatedButton>
      
          <FadeInView delay={200} direction="up">
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <PulseView scale={1.1} duration={2000}>
                <Text style={{fontSize: moderateScale(24), fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textPrimary}}>
                  {currentStreak}
                </Text>
              </PulseView>
              <FireSvg style={{marginBottom: scaleMargin(10), marginLeft: scaleMargin(8)}}/>
            </View>
          </FadeInView>

          <AnimatedButton onPress={()=>{navigation.navigate('SettingsScreen')}}>
            <HumanSvg fill={Colors.textPrimary} width={30} height={30}/>
          </AnimatedButton>
        </View>
      </FadeInView>



      <FadeInView delay={400} direction="up">
        <View style={{alignItems: 'center', gap: scaleMargin(30)}}>
          <FadeInView delay={600} direction="up">
              <Text style={{fontSize: moderateScale(16), fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textPrimary, textAlign: 'center'}}>
             You can send up to 5 pings per day
              
            </Text>
          </FadeInView>
          <FadeInView delay={800} direction="up">
            <PulseView scale={1.05} duration={3000}>
              <PingButton 
                onPingSent={handlePingSent}
                disabled={pingsRemaining === 0 || sendingPing}
              />
            </PulseView>
          </FadeInView>
        </View>
      </FadeInView>
     


      <FadeInView delay={1000} direction="up">
        {receivedPings && receivedPings.length > 0 ? (
          <View>
            <FadeInView delay={1200} direction="up">
              <Text style={{fontSize: moderateScale(16),textAlign: 'center', fontWeight: 'bold', marginBottom: scaleMargin(20),fontFamily: 'DynaPuff', color: Colors.textPrimary}}>People who pinged you</Text>
            </FadeInView>

            {displayPings.map((ping, index) => (
              <AnimatedCard key={ping.id || index} delay={1400 + (index * 200)} pressable={true} onPress={()=>{navigation.navigate('ReceiveHello', {ping})}}>
                <View style={{width: '100%', backgroundColor: Colors.cardBackground, borderRadius: scaleBorderRadius(22), padding: scalePadding(16), alignItems: 'center', borderWidth: 1, borderColor: Colors.cardBorder, justifyContent: 'space-between', flexDirection: 'row', marginBottom: scaleMargin(10)}}>
                  <Text style={{fontSize: moderateScale(16), fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textPrimary}}>{ping.sender_nickname}</Text>
                
                    <Text style={{fontSize: moderateScale(16), fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textAccent, }}>view profile</Text>
                </View>
              </AnimatedCard>
            ))}
            
            {receivedPings.length > 2 && !showAll && (
              <FadeInView delay={1600 + (displayPings.length * 200)} direction="up">
                <AnimatedButton onPress={handleShowMore} style={{alignSelf: 'center', marginTop: scaleMargin(10), marginBottom: scaleMargin(20)}}>
                  <Text style={{fontSize: moderateScale(16), fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textAccent}}>show more</Text>
                </AnimatedButton>
              </FadeInView>
            )}
          </View>
        ) : (
          <FadeInView delay={1200} direction="up">
            <Text style={{fontSize: moderateScale(14), fontFamily: 'DynaPuff', color: Colors.textSecondary, textAlign: 'center', marginBottom: scaleMargin(20)}}>No one has pinged you yet, be the first to surprise someone!</Text>
          </FadeInView>
        )}
      </FadeInView>

    
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'space-between',
    padding: scalePadding(16), 
    alignItems: 'center',
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


