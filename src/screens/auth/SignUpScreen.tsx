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
import CountryPickerModal, { Country } from '../../components/CountryPickerModal';


export default function SignUpScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList, 'SignUpScreen'>>();
  const { signup } = useAuth();
  const { showModal } = useModal();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isCountryPickerVisible, setIsCountryPickerVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSignUp = async () => {
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

    if (!contact.trim()) {
      showModal({
        title: 'Error',
        message: 'Please enter your contact link',
        type: 'error',
      });
      return;
    }

    try {
      setIsLoading(true);
      const contacts = [{
        title: 'main',
        url: contact.trim(),
      }];
      await signup(nickname.trim(), password, contacts, selectedCountry?.code);
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
      
      showModal({
        title: 'Signup Error',
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
        
        <TouchableOpacity
          style={styles.countrySelector}
          onPress={() => setIsCountryPickerVisible(true)}
        >
          <Text style={styles.countryLabel}>Country</Text>
          <View style={styles.countrySelectorContent}>
            {selectedCountry ? (
              <>
                <Text style={styles.countryFlag}>{selectedCountry.flag}</Text>
                <Text style={styles.countryName}>{selectedCountry.name}</Text>
              </>
            ) : (
              <Text style={styles.countryPlaceholder}>Select your country</Text>
            )}
            <Text style={styles.arrow}>▼</Text>
          </View>
        </TouchableOpacity>
    
        <TouchableOpacity onPress={()=>{navigation.replace('Login')}}>
            <Text style={styles.signUpText}>
            Already have an account? <Text style={styles.signUpLink}>Log in</Text>
            </Text>
        </TouchableOpacity>
       
      </View>
      </View>

      <GradientButton
        title={isLoading ? "Creating..." : "Save"}
        onPress={onSignUp}
        disabled={isLoading}
      />
      
      <CountryPickerModal
        visible={isCountryPickerVisible}
        selectedCountry={selectedCountry}
        onSelect={setSelectedCountry}
        onClose={() => setIsCountryPickerVisible(false)}
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
  countrySelector: {
    width: '100%',
    marginVertical: 10,
  },
  countryLabel: {
    fontFamily: 'DynaPuff',
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  countrySelectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.borderInput,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  countryFlag: {
    fontSize: 24,
    marginRight: 12,
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'DynaPuff',
    color: Colors.textPrimary,
  },
  countryPlaceholder: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'DynaPuff',
    color: 'rgba(255,255,255,0.6)',
  },
  arrow: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 8,
  },
});


