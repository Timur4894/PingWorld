import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthStack';
import GradientButton from '../../components/GradientButton';
import InputField from '../../components/InputField';
import { Colors } from '../../constants/colors';
import { useAuth } from '../../context/AuthContext';
import { useModal } from '../../context/ModalContext';


export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList, 'Login'>>();
  const { login } = useAuth();
  const { showModal } = useModal();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async () => {
    // Валидация полей
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
      // После успешного логина навигация произойдет автоматически через AppNavigator
    } catch (error: any) {
      console.error('Login error:', error);
      // Детальная обработка ошибок
      let errorMessage = 'Login failed';
      
      if (error.response) {
        // Сервер вернул ошибку
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
        // Запрос был отправлен, но ответа не получено
        errorMessage = 'Network error. Please check your connection';
      } else {
        // Ошибка при настройке запроса
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
    <View style={styles.container}>
      <Image source={require('../../assets/img/PurpleShadow.png')} style={styles.backgroundImage} resizeMode='stretch'/>

    <View style={{width: '100%'}}>
     
      <View style={styles.header}>
        <Text style={styles.title}>Log in</Text>
        <Image source={require('../../assets/img/Roket.png')}/>
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
        <TouchableOpacity onPress={() => navigation.replace('SignUpScreen')}>
          <Text style={styles.signUpText}>
            Don't have an account yet? <Text style={styles.signUpLink}>Sign up</Text>
          </Text>
        </TouchableOpacity>
       
      </View>
    </View>      

      <GradientButton
        title={isLoading ? "Login..." : "Log in"}
        onPress={onLogin}
        disabled={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: 16, 
    paddingVertical: 60,
    alignItems: 'center',
    backgroundColor: Colors.backgroundDark,
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
    // flex: 1,
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


