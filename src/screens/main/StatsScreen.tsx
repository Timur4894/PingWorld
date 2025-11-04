import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import GradientButton from '../../components/GradientButton';
import InputField from '../../components/InputField';  
import FireSvg from '../../assets/svg/FireSvg';
import BackSvg from '../../assets/svg/BackSvg';
import FadeInView from '../../components/Animated/FadeInView';
import AnimatedButton from '../../components/Animated/AnimatedButton';
import AnimatedCard from '../../components/Animated/AnimatedCard';
import PulseView from '../../components/Animated/PulseView';


interface LeaderboardEntry {
  id: string;
  nickname: string;
  current_streak: number;
  total_pings?: number;
  rank?: number;
}

interface LeaderboardData {
  data: LeaderboardEntry[];
  total_users?: number;
  timestamp?: string;
}

export default function StatsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'StatsScreen'>>();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      // Создаем демо-данные для лидерборда
      const response = {
        data: [
          { id: '1', nickname: 'DemoUser1', current_streak: 15, avatar: 'elephant' },
          { id: '2', nickname: 'DemoUser2', current_streak: 12, avatar: 'lion' },
          { id: '3', nickname: 'DemoUser3', current_streak: 10, avatar: 'tiger' },
          { id: '4', nickname: 'DemoUser4', current_streak: 8, avatar: 'bear' },
          { id: '5', nickname: 'DemoUser5', current_streak: 6, avatar: 'fox' }
        ]
      };
      
      // Handle different possible response structures
      if (response.data) {
        setLeaderboard(response.data);
        setTotalUsers(response.data.length);
      } else if (Array.isArray(response)) {
        setLeaderboard(response);
        setTotalUsers(response.length);
      } else {
        setLeaderboard([]);
        setTotalUsers(0);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load leaderboard';
      Alert.alert('Error', errorMessage);
      console.error('Leaderboard fetch error:', error);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <Image source={require('../../assets/img/PurpleShadow.png')} style={styles.backgroundImage} resizeMode='stretch'/>
        <ActivityIndicator size="large" color="#C5B7F4" />
        <Text style={{fontSize: 18, fontFamily: 'DynaPuff', color: '#fff', marginTop: 20}}>Loading leaderboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={require('../../assets/img/PurpleShadow.png')} style={styles.backgroundImage} resizeMode='stretch'/>

      <FadeInView delay={0} direction="down" style={{alignSelf: 'flex-start', width: '95%',marginLeft: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center',marginBottom: 20}}>
          <AnimatedButton onPress={()=>{navigation.goBack()}}>
            <BackSvg />
          </AnimatedButton>
        </View>
      </FadeInView>

      <FadeInView delay={200} direction="up">
        <Text style={{fontSize:32, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#fff', marginBottom: 50, textAlign: 'center'}}>
          Already <PulseView scale={1.05} duration={2500}>
            <Text style={{fontSize:32, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#C5B7F4', marginBottom: -10}}>
              {totalUsers}
            </Text>
          </PulseView> people have pinged at least once!
        </Text>
      </FadeInView>

      <FadeInView delay={400} direction="up" style={{marginLeft: 16}}>
        <Text style={{fontSize:22, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#fff', marginBottom: 20}}>Top pingers</Text>
      </FadeInView>
      
      <View style={{gap: 12, width: '100%', paddingHorizontal: 16}}>
        {leaderboard.length > 0 ? (
          leaderboard.map((entry, index) => (    
            <AnimatedCard key={entry.id || index} delay={600 + (index * 200)} pressable={true}>
              <View style={{width: '100%', backgroundColor: '#383D4F', borderRadius: 22, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#303445', justifyContent: 'space-between', flexDirection: 'row'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                  <Text style={{fontSize: 18, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#C5B7F4', marginRight: 12, minWidth: 30}}>
                    #{index + 1}
                  </Text>
                  <Text style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#fff', flex: 1}}>
                    {entry.nickname}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#fff'}}>
                    {entry.current_streak}
                  </Text>
                  <FireSvg style={{marginLeft: 8, marginTop: -10}}/>
                </View>
              </View>
            </AnimatedCard>
          ))
        ) : (
          <FadeInView delay={600} direction="up">
            <View style={{width: '100%', backgroundColor: '#383D4F', borderRadius: 22, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#303445', justifyContent: 'center'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#fff', textAlign: 'center'}}>
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
    // padding: 16, 
    // alignItems: 'center',
    backgroundColor: "#1c1f29",
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


