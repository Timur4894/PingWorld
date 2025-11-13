import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { HapticTouchableOpacity } from '../../components/HapticTouchableOpacity';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthStack';
import GradientButton from '../../components/GradientButton';
import InputField from '../../components/InputField';
import { Colors } from '../../constants/colors';
import { useAuth } from '../../context/AuthContext';
import { useModal } from '../../context/ModalContext';
import { moderateScale, scalePadding, scaleMargin, scaleSize } from '../../utils/scaling';
import LottieView from 'lottie-react-native';


export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList, 'Login'>>();
  const { login } = useAuth();
  const { showModal } = useModal();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async () => {
    if (!nickname.trim()) {
      showModal({
        title: 'Error',
        message: 'Please enter your nickname',
        type: 'error',
      });
      return;
    }
    
    if (!password.trim()) {
      showModal({
        title: 'Error',
        message: 'Please enter your password',
        type: 'error',
      });
      return;
    }

    try {
      setIsLoading(true);
      await login(nickname.trim(), password);
    } catch (error: any) {
      console.error('Login error:', error);
      let errorMessage = 'Login failed';
      
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;
        
        if (status === 400) {
          errorMessage = data?.message || data?.error || 'Invalid nickname or password';
        } else if (status === 401) {
          errorMessage = 'Invalid credentials';
        } else if (status === 404) {
          errorMessage = 'User not found';
        } else {
          errorMessage = data?.message || data?.error || `Error: ${status}`;
        }
      } else if (error.request) {
        errorMessage = 'Network error. Please check your connection';
      } else {
        errorMessage = error.message || 'An error occurred';
      }
      
      showModal({
        title: 'Login Error',
        message: errorMessage,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <Image source={require('../../assets/img/PurpleShadow.png')} style={styles.backgroundImage} resizeMode='stretch'/>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{width: '100%'}}>
         
          <View style={styles.header}>
            <Text style={styles.title}>Log in</Text>
            {/* <Image source={require('../../assets/img/Roket.png')}/> */}
            <LottieView
                source={require('../../assets/animations/Rocket.json')}
                autoPlay={true}
                loop={true}
                speed={1}
              
                style={{ width: scaleSize(100), height: scaleSize(100) }}
              />   
          </View>
          
          <View style={styles.formContainer}>
            <InputField
              label="Nickname"
              placeholder="Enter your nickname"
              value={nickname}
              onChangeText={setNickname}
            />
            
            <InputField
              label="Password"
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <HapticTouchableOpacity onPress={() => navigation.replace('SignUpScreen')} hapticType="light">
              <Text style={styles.signUpText}>
                Don't have an account yet? <Text style={styles.signUpLink}>Sign up</Text>
              </Text>
            </HapticTouchableOpacity>
           
          </View>
        </View>      

        <GradientButton
          title={isLoading ? "Login..." : "Log in"}
          onPress={onLogin}
          disabled={isLoading}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.backgroundDark,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: scalePadding(16), 
    paddingVertical: scalePadding(60),
    alignItems: 'center',
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


