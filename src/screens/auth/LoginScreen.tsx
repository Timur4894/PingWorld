import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import GradientButton from '../../components/GradientButton';
import InputField from '../../components/InputField';
import { useAuth } from '../../context/AuthContext';  


export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Login'>>();
  const { login } = useAuth();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async () => {
    // Простая валидация полей
    if (!nickname.trim()) {
      Alert.alert('Ошибка', 'Пожалуйста, введите никнейм');
      return;
    }
    
    if (!password.trim()) {
      Alert.alert('Ошибка', 'Пожалуйста, введите пароль');
      return;
    }

    if (nickname.length < 3 || nickname.length > 20) {
      Alert.alert('Ошибка', 'Никнейм должен содержать от 3 до 20 символов');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Ошибка', 'Пароль должен содержать минимум 6 символов');
      return;
    }

    setIsLoading(true);
    
    try {
      // Простая симуляция входа (без API)
      const userData = {
        id: Date.now().toString(), // Генерируем простой ID
        nickname: nickname.trim(),
        token: 'demo-token'
      };

      // Сохранение данных пользователя в контексте
      await login(userData);

      // Переход в приложение
      navigation.replace('SendHello');
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert(
        'Ошибка входа', 
        error.message || 'Произошла ошибка при входе'
      );
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
        title={isLoading ? "Вход..." : "Log in"}
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
    backgroundColor: "#303445",
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
    // flex: 1,
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


