import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
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

interface PingEntry {
  id?: string;
  sender_nickname: string;
  sender_id?: string;
}

export default function SendHelloScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList, 'SendHello'>>();
  
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
      Alert.alert('Success', 'Ping sent successfully!');
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
      
      Alert.alert('Error', errorMessage);
    } finally {
      setSendingPing(false);
    }
  };

  const handleShowMore = () => {
    setShowAll(true);
  };

  const displayPings = showAll ? receivedPings : receivedPings.slice(0, 2);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <Image source={require('../../assets/img/PurpleShadow.png')} style={styles.backgroundImage} resizeMode='stretch'/>
        <ActivityIndicator size="large" color={Colors.accent} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/img/PurpleShadow.png')} style={styles.backgroundImage} resizeMode='stretch'/>


      <FadeInView delay={0} direction="down">
        <View style={{justifyContent: 'space-between', width: '90%', alignItems: 'center', flexDirection: 'row', marginTop: 60}}>
          <AnimatedButton onPress={()=>{navigation.navigate('StatsScreen')}}>
            <WorldSvg fill={Colors.textPrimary} width={30} height={30}/>
          </AnimatedButton>
      
          <FadeInView delay={200} direction="up">
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <PulseView scale={1.1} duration={2000}>
                <Text style={{fontSize: 24, fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textPrimary}}>
                  {currentStreak}
                </Text>
              </PulseView>
              <FireSvg style={{marginBottom: 10, marginLeft: 8}}/>
            </View>
          </FadeInView>

          <AnimatedButton onPress={()=>{navigation.navigate('SettingsScreen')}}>
            <HumanSvg fill={Colors.textPrimary} width={30} height={30}/>
          </AnimatedButton>
        </View>
      </FadeInView>



      <FadeInView delay={400} direction="up">
        <View style={{alignItems: 'center', gap: 30}}>
          <FadeInView delay={600} direction="up">
              <Text style={{fontSize: 18, fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textPrimary}}>
              Pings left today:  
              <Text style={{fontSize: 18, fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textAccent}}>
                {pingsRemaining}
              </Text>
            </Text>
          </FadeInView>
          <FadeInView delay={800} direction="up">
            <PulseView scale={1.05} duration={3000}>
              <PingButton 
                onPingSent={handlePingSent}
                disabled={pingsRemaining === 0 || sendingPing}
                pingsRemaining={pingsRemaining}
              />
            </PulseView>
          </FadeInView>
        </View>
      </FadeInView>
     


      <FadeInView delay={1000} direction="up">
        {receivedPings && receivedPings.length > 0 ? (
          <View>
            <FadeInView delay={1200} direction="up">
              <Text style={{fontSize: 22,textAlign: 'center', fontWeight: 'bold', marginBottom: 20,fontFamily: 'DynaPuff', color: Colors.textPrimary}}>People who pinged you</Text>
            </FadeInView>

            {displayPings.map((ping, index) => (
              <AnimatedCard key={ping.id || index} delay={1400 + (index * 200)} pressable={true} onPress={()=>{navigation.navigate('ReceiveHello')}}>
                <View style={{width: '100%', backgroundColor: Colors.cardBackground, borderRadius: 22, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: Colors.cardBorder, justifyContent: 'space-between', flexDirection: 'row', marginBottom: 10}}>
                  <Text style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textPrimary}}>{ping.sender_nickname}</Text>
                  <AnimatedButton onPress={()=>{navigation.navigate('ReceiveHello')}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textAccent, }}>view profile</Text>
                  </AnimatedButton>
                </View>
              </AnimatedCard>
            ))}
            
            {receivedPings.length > 2 && !showAll && (
              <FadeInView delay={1600 + (displayPings.length * 200)} direction="up">
                <AnimatedButton onPress={handleShowMore} style={{alignSelf: 'center', marginTop: 10, marginBottom: 20}}>
                  <Text style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textAccent}}>show more</Text>
                </AnimatedButton>
              </FadeInView>
            )}
          </View>
        ) : (
          <FadeInView delay={1200} direction="up">
            <Text style={{fontSize: 14, fontFamily: 'DynaPuff', color: Colors.textSecondary, textAlign: 'center', marginBottom: 20}}>No one has pinged you yet, be the first to surprise someone!</Text>
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
    padding: 16, 
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


