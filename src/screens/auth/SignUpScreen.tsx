import React, { useState, useEffect } from 'react';
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
import CountryPickerModal, { Country } from '../../components/CountryPickerModal';
import EULAModal from '../../components/EULAModal';
import { moderateScale, scalePadding, scaleMargin, scaleBorderRadius, getWidthPercentage, scaleSize } from '../../utils/scaling';
import LottieView from 'lottie-react-native';


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
  const [eulaAccepted, setEulaAccepted] = useState(false);
  const [showEULAModal, setShowEULAModal] = useState(false);
  const [errors, setErrors] = useState({
    nickname: false,
    password: false,
    contact: false,
    country: false,
  });

  const validateFields = () => {
    const newErrors = {
      nickname: !nickname.trim(),
      password: !password.trim(),
      contact: !contact.trim(),
      country: !selectedCountry,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const onSignUp = async () => {
    if (!eulaAccepted) {
      showModal({
        title: 'Terms Required',
        message: 'You must accept the Terms of Service to create an account. Please read and accept the terms.',
        type: 'error',
      });
      setShowEULAModal(true);
      return;
    }

    if (!validateFields()) {
      showModal({
        title: 'Please fill all fields',
        message: 'Please fill in all required fields to continue.',
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
      let errorMessage = 'Signup failed';
      
      if (error.response) {
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
        errorMessage = 'Network error. Please check your connection';
      } else {
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


  const Container = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const containerProps = Platform.OS === 'ios' 
    ? { behavior: 'padding' as const, keyboardVerticalOffset: 0 }
    : {};

  return (
    <Container 
      style={styles.container}
      {...containerProps}
    >
      <Image source={require('../../assets/img/PurpleShadow.png')} style={styles.backgroundImage} resizeMode='stretch'/>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{width: '100%'}}>

        
        <View style={styles.header}>
          <Text style={styles.title}>Your account</Text>
          <LottieView
                source={require('../../assets/animations/sparkles.json')}
                autoPlay={true}
                loop={true}
                speed={1}
              
                style={{ width: scaleSize(100), height: scaleSize(100) }}
              />   
        </View>
        
        <View style={styles.formContainer}>
          <InputField
            label="Nickname"
            placeholder="Paste your socials link here"
            value={nickname}
            onChangeText={(text) => {
              setNickname(text);
              if (errors.nickname) {
                setErrors(prev => ({ ...prev, nickname: false }));
              }
            }}
            error={errors.nickname}
            errorMessage={errors.nickname ? "Please enter your nickname" : undefined}
          />

          <InputField
            label="Contact link"
            placeholder="Enter your contact link"
            value={contact}
            onChangeText={(text) => {
              setContact(text);
              if (errors.contact) {
                setErrors(prev => ({ ...prev, contact: false }));
              }
            }}
            error={errors.contact}
            errorMessage={errors.contact ? "Please enter your contact link" : undefined}
          />
          
          <InputField
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) {
                setErrors(prev => ({ ...prev, password: false }));
              }
            }}
            error={errors.password}
            errorMessage={errors.password ? "Please enter your password" : undefined}
          />
          
          <View style={styles.countrySelectorContainer}>
            <Text style={styles.countryLabel}>Country</Text>
            <HapticTouchableOpacity
              style={styles.countrySelector}
              onPress={() => setIsCountryPickerVisible(true)}
              hapticType="light"
            >
              <View style={[styles.countrySelectorContent, errors.country && styles.countrySelectorError]}>
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
          </HapticTouchableOpacity>
          {errors.country && (
            <Text style={styles.errorText}>Please select your country</Text>
          )}
          </View>
      
          <HapticTouchableOpacity onPress={()=>{navigation.replace('Login')}} hapticType="light">
              <Text style={styles.signUpText}>
              Already have an account? <Text style={styles.signUpLink}>Log in</Text>
              </Text>
          </HapticTouchableOpacity>

          <View style={styles.eulaContainer}>
            <View style={styles.eulaCheckbox}>
              <HapticTouchableOpacity
                onPress={() => {
                  if (!eulaAccepted) {
                    setEulaAccepted(true);
                  } else {
                    setEulaAccepted(false);
                  }
                }}
                hapticType="light"
              >
                <View style={[styles.checkbox, eulaAccepted && styles.checkboxChecked]}>
                  {eulaAccepted && <Text style={styles.checkmark}>✓</Text>}
                </View>
              </HapticTouchableOpacity>
              <View style={styles.eulaTextContainer}>
                <Text style={styles.eulaText}>
                  I accept the{' '}
                </Text>
                <HapticTouchableOpacity onPress={() => setShowEULAModal(true)} hapticType="light">
                  <Text style={styles.eulaLink}>Terms of Service</Text>
                </HapticTouchableOpacity>
              </View>
            </View>
          </View>
         
        </View>
        </View>

        <GradientButton
          title={isLoading ? "Creating..." : "Save"}
          onPress={onSignUp}
          disabled={isLoading || !eulaAccepted}
        />
      </ScrollView>
      
      <CountryPickerModal
        visible={isCountryPickerVisible}
        selectedCountry={selectedCountry}
        onSelect={(country) => {
          setSelectedCountry(country);
          if (errors.country) {
            setErrors(prev => ({ ...prev, country: false }));
          }
          setIsCountryPickerVisible(false);
        }}
        onClose={() => setIsCountryPickerVisible(false)}
      />

      <EULAModal
        visible={showEULAModal}
        onClose={() => {
          setShowEULAModal(false);
        }}
        
      />
    </Container>
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
    width: '100%',
    marginTop: scaleMargin(20),
    marginBottom: scaleMargin(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  countrySelectorContainer: {
    width: '100%',
    marginVertical: scaleMargin(10),
  },
  countrySelector: {
    width: '100%',
  },
  countryLabel: {
    fontFamily: 'DynaPuff',
    color: Colors.textPrimary,
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginBottom: scaleMargin(12),
  },
  countrySelectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.borderInput,
    borderRadius: scaleBorderRadius(20),
    paddingVertical: scalePadding(20),
    paddingHorizontal: scalePadding(16),
    backgroundColor: Colors.cardBackground,
  },
  countrySelectorError: {
    borderColor: Colors.textError,
    backgroundColor: 'rgba(212, 116, 131, 0.1)',
  },
  errorText: {
    fontFamily: 'DynaPuff',
    color: Colors.textError,
    fontSize: moderateScale(12),
    marginTop: scaleMargin(4),
    marginLeft: scaleMargin(4),
  },
  countryFlag: {
    fontSize: moderateScale(24),
    marginRight: scaleMargin(12),
  },
  countryName: {
    flex: 1,
    fontSize: moderateScale(16),
    fontFamily: 'DynaPuff',
    color: Colors.textPrimary,
  },
  countryPlaceholder: {
    flex: 1,
    fontSize: moderateScale(16),
    fontFamily: 'DynaPuff',
    color: 'rgba(255,255,255,0.6)',
  },
  arrow: {
    fontSize: moderateScale(12),
    color: Colors.textSecondary,
    marginLeft: scaleMargin(8),
  },
  eulaContainer: {
    width: '100%',
    marginTop: scaleMargin(20),
    marginBottom: scaleMargin(10),
  },
  eulaCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  eulaTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  checkbox: {
    width: scaleSize(24),
    height: scaleSize(24),
    borderWidth: 2,
    borderColor: Colors.borderInput,
    borderRadius: scaleBorderRadius(6),
    backgroundColor: Colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleMargin(12),
  },
  checkboxChecked: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  checkmark: {
    color: Colors.textPrimary,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  eulaText: {
    flex: 1,
    fontSize: moderateScale(14),
    fontFamily: 'DynaPuff',
    color: Colors.textSecondary,
    lineHeight: scaleSize(20),
  },
  eulaLink: {
    color: Colors.textAccent,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});


