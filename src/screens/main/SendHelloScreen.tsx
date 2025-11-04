import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import WorldSvg from '../../assets/svg/WorldSvg';
import HumanSvg from '../../assets/svg/HumanSvg';
import FireSvg from '../../assets/svg/FireSvg';
import FadeInView from '../../components/Animated/FadeInView';
import AnimatedButton from '../../components/Animated/AnimatedButton';
import AnimatedCard from '../../components/Animated/AnimatedCard';
import PulseView from '../../components/Animated/PulseView';
import PingButton from '../../components/Animated/PingButton';

export default function SendHelloScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'SendHello'>>();

  // Статические данные для UI
  const currentStreak: number = 5;
  const pingsRemaining: number = 3;
  const receivedPings = [
    { id: '1', sender_nickname: 'DemoUser1' },
    { id: '2', sender_nickname: 'DemoUser2' },
    { id: '3', sender_nickname: 'DemoUser3' }
  ];
  const showAll = false;
  const displayPings = showAll ? receivedPings : receivedPings.slice(0, 2);

  const handleShowMore = () => {
  };

  const handlePingSent = () => {
    // Пустая функция - просто для клика
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/img/PurpleShadow.png')} style={styles.backgroundImage} resizeMode='stretch'/>


      <FadeInView delay={0} direction="down">
        <View style={{justifyContent: 'space-between', width: '90%', alignItems: 'center', flexDirection: 'row', marginTop: 60}}>
          <AnimatedButton onPress={()=>{navigation.navigate('StatsScreen')}}>
            <WorldSvg fill='#fff' width={30} height={30}/>
          </AnimatedButton>
      
          <FadeInView delay={200} direction="up">
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <PulseView scale={1.1} duration={2000}>
                <Text style={{fontSize: 24, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#fff'}}>
                  {currentStreak}
                </Text>
              </PulseView>
              <FireSvg style={{marginBottom: 10, marginLeft: 8}}/>
            </View>
          </FadeInView>

          <AnimatedButton onPress={()=>{navigation.navigate('SettingsScreen')}}>
            <HumanSvg fill='#fff' width={30} height={30}/>
          </AnimatedButton>
        </View>
      </FadeInView>



      <FadeInView delay={400} direction="up">
        <View style={{alignItems: 'center', gap: 30}}>
          <FadeInView delay={600} direction="up">
            <Text style={{fontSize: 18, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#fff'}}>
              Pings left today:  
              <Text style={{fontSize: 18, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#C5B7F4'}}>
                {pingsRemaining}
              </Text>
            </Text>
          </FadeInView>
          <FadeInView delay={800} direction="up">
            <PulseView scale={1.05} duration={3000}>
              <PingButton 
                onPingSent={handlePingSent}
                disabled={pingsRemaining === 0}
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
              <Text style={{fontSize: 22,textAlign: 'center', fontWeight: 'bold', marginBottom: 20,fontFamily: 'DynaPuff', color: '#fff'}}>People who pinged you</Text>
            </FadeInView>

            {displayPings.map((ping, index) => (
              <AnimatedCard key={ping.id || index} delay={1400 + (index * 200)} pressable={true} onPress={()=>{navigation.navigate('ReceiveHello')}}>
                <View style={{width: '100%', backgroundColor: '#383D4F', borderRadius: 22, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#303445', justifyContent: 'space-between', flexDirection: 'row', marginBottom: 10}}>
                  <Text style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#fff'}}>{ping.sender_nickname}</Text>
                  <AnimatedButton onPress={()=>{navigation.navigate('ReceiveHello')}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#C5B7F4', }}>view profile</Text>
                  </AnimatedButton>
                </View>
              </AnimatedCard>
            ))}
            
            {receivedPings.length > 2 && !showAll && (
              <FadeInView delay={1600 + (displayPings.length * 200)} direction="up">
                <AnimatedButton onPress={handleShowMore} style={{alignSelf: 'center', marginTop: 10, marginBottom: 20}}>
                  <Text style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'DynaPuff', color: '#C5B7F4'}}>show more</Text>
                </AnimatedButton>
              </FadeInView>
            )}
          </View>
        ) : (
          <FadeInView delay={1200} direction="up">
            <Text style={{fontSize: 14, fontFamily: 'DynaPuff', color: '#9899B5', textAlign: 'center', marginBottom: 20}}>No one has pinged you yet, be the first to surprise someone!</Text>
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


