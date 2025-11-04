import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthStack';
import GradientButton from '../../components/GradientButton';
import InputField from '../../components/InputField';
import { Colors } from '../../constants/colors';
import { useAuth } from '../../context/AuthContext';


export default function SignUpScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList, 'SignUpScreen'>>();
  const { signup } = useAuth();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSignUp = async () => {
    // Валидация полей
    if (!nickname.trim()) {
      Alert.alert('Error', 'Please enter your nickname');
      return;
    }
    
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }

    if (!contact.trim()) {
      Alert.alert('Error', 'Please enter your contact link');
      return;
    }

    try {
      setIsLoading(true);
      const contacts = [{
        title: 'main',
        url: contact.trim(),
      }];
      await signup(nickname.trim(), password, contacts);
      // После успешной регистрации навигация произойдет автоматически через AppNavigator
    } catch (error: any) {
      console.error('Signup error:', error);
      // Детальная обработка ошибок
      let errorMessage = 'Signup failed';
      
      if (error.response) {
        // Сервер вернул ошибку
        const status = error.response.status;
        const data = error.response.data;
        
        if (status === 400) {
          errorMessage = data?.message || data?.error || 'Invalid data. Please check your input';
        } else if (status === 409) {
          errorMessage = 'Nickname already exists';
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
      
      Alert.alert('Signup Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      <Image source={require('../../assets/img/PurpleShadow.png')} style={styles.backgroundImage} resizeMode='stretch'/>

    <View style={{width: '100%'}}>

      
      <View style={styles.header}>
        <Text style={styles.title}>Your account</Text>
      </View>
      
      <View style={styles.formContainer}>
        <InputField
          label="Nickname"
          placeholder="Paste your socials link here"
          value={nickname}
          onChangeText={setNickname}
        />

        <InputField
          label="Contact link"
          placeholder="Enter your contact link"
          value={contact}
          onChangeText={setContact}
        />
        
        <InputField
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
    
        <TouchableOpacity onPress={()=>{navigation.replace('Login')}}>
            <Text style={styles.signUpText}>
            Already have an account? <Text style={styles.signUpLink}>Log in</Text>
            </Text>
        </TouchableOpacity>
       
      </View>
      </View>

      <GradientButton
        title={isLoading ? "Создание..." : "Save"}
        onPress={onSignUp}
        disabled={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'space-between',
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
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
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


