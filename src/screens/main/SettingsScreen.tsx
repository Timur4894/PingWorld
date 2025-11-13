import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform, Dimensions, Clipboard, Linking } from 'react-native';
import { HapticTouchableOpacity } from '../../components/HapticTouchableOpacity';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStack';
import { Colors } from '../../constants/colors';
import GradientButton from '../../components/GradientButton';
import InputFieldChange from '../../components/InputFieldChange';  
import BackSvg from '../../assets/svg/BackSvg';
import FireSvg from '../../assets/svg/FireSvg';
import EditSvg from '../../assets/svg/EditSvg';
import CopySvg from '../../assets/svg/CopySvg';
import userManagementApi from '../../api/UserManagementApi';
import { useAuth } from '../../context/AuthContext';
import { useModal } from '../../context/ModalContext';
import { SettingsSkeleton } from '../../components/Skeleton/SkeletonScreen';
import { getCountryFlag, getCountryName, getCountry } from '../../utils/countryUtils';
import CountryPickerModal, { Country } from '../../components/CountryPickerModal';
import { moderateScale, scaleSize, scaleHeight, scalePadding, scaleMargin, scaleBorderRadius, getWidthPercentage, getHeightPercentage } from '../../utils/scaling';
import CommonStar from '../../assets/svg/stars/CommonStar';
import RareStar from '../../assets/svg/stars/RareStar';
import MythicStar from '../../assets/svg/stars/MythicStar';
import LegendaryStar from '../../assets/svg/stars/LegendaryStar';
import LottieView from 'lottie-react-native';

export default function SettingsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList, 'SettingsScreen'>>();
  const { showModal } = useModal();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUrl, setEditedUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isCountryPickerVisible, setIsCountryPickerVisible] = useState(false);
  const [isSavingCountry, setIsSavingCountry] = useState(false);
  const { user, loading, logout, deleteAccount, refreshUser } = useAuth();

  useEffect(() => {
    if (user?.contacts && user.contacts.length > 0) {
      setEditedUrl(user.contacts[0].url);
    }
    if (user?.country) {
      const country = getCountry(user.country);
      setSelectedCountry(country);
    }
  }, [user]);

  const handleLogout = () => {
    showModal({
      title: 'Logout',
      message: 'Are you sure you want to logout? You will need to login again to access your account.',
      type: 'warning',
      showCancel: true,
      confirmText: 'Logout',
      cancelText: 'Cancel',
      onConfirm: async () => {
        try {
          await logout();
        } catch (error: any) {
          let errorMessage = 'Failed to logout';
          
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
        }
      },
    });
  };

  const handleEditContact = () => {
    setIsEditing(true);
    if (user?.contacts && user.contacts.length > 0) {
      setEditedUrl(user.contacts[0].url);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (user?.contacts && user.contacts.length > 0) {
      setEditedUrl(user.contacts[0].url);
    }
  };

  const handleSaveContact = async () => {
    if (!editedUrl.trim()) {
      showModal({
        title: 'Error',
        message: 'Please enter a valid contact link',
        type: 'error',
      });
      return;
    }

    try {
      setIsSaving(true);
      const currentContact = user?.contacts && user.contacts.length > 0 ? user.contacts[0] : null;
      const contactTitle = currentContact?.title || 'main';
      
      await userManagementApi.updateProfile({
        contacts: [
          {
            title: contactTitle,
            url: editedUrl.trim(),
          },
        ],
      });

      await refreshUser();
      
      showModal({
        title: 'Success',
        message: 'Contact link updated successfully!',
        type: 'success',
        onConfirm: () => {
          setIsEditing(false);
        },
      });
    } catch (error: any) {
      console.error('Error updating contact:', error);
      let errorMessage = 'Failed to update contact link';
      
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
      setIsSaving(false);
    }
  };

  const handleSaveCountry = async () => {
    try {
      setIsSavingCountry(true);
      
      await userManagementApi.updateProfile({
        country: selectedCountry?.code || '',
        contacts: user?.contacts || [],
      });

      await refreshUser();
      

      
      showModal({
        title: 'Success',
        message: 'Country updated successfully!',
        type: 'success',
      });
    } catch (error: any) {
      console.error('Error updating country:', error);
      let errorMessage = 'Failed to update country';
      
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
      setIsSavingCountry(false);
    }
  };

  const handleDeleteAccount = () => {
    showModal({
      title: 'Delete Account',
      message: 'Are you sure you want to delete your account? This action cannot be undone. All your data will be permanently removed.',
      type: 'warning',
      showCancel: true,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: async () => {
        try {
          setIsDeleting(true);
          await deleteAccount();
        } catch (error: any) {
          let errorMessage = 'Failed to delete account';
          
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
          setIsDeleting(false);
        }
      },
    });
  };

  const handleCopyContact = async () => {
    const contactUrl = user?.contacts && user.contacts.length > 0 ? user.contacts[0].url : '';
    if (contactUrl) {
      try {
        await Clipboard.setString(contactUrl);
        showModal({
          title: 'Copied!',
          message: 'Contact link copied to clipboard',
          type: 'success',
        });
      } catch (error) {
        showModal({
          title: 'Error',
          message: 'Failed to copy link',
          type: 'error',
        });
      }
    }
  };

  const truncateText = (text: string, maxLength: number = 30): string => {
    if (!text) return 'No contact link';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  if (loading) {
    return <SettingsSkeleton />;
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: getWidthPercentage(95), marginTop: scaleMargin(30)}}>
          <HapticTouchableOpacity onPress={()=>{navigation.goBack()}} hapticType="light">
            <BackSvg />
          </HapticTouchableOpacity>
         
        </View>

        <View style={{alignItems: 'center', marginBottom: scaleMargin(10)}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: moderateScale(32), fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textPrimary, textAlign: 'center'}}>
              My avatar
            </Text>
            <LottieView
                  source={require('../../assets/animations/sparkles.json')}
                  autoPlay={true}
                  loop={true}
                  speed={1}
                
                  style={{ width: scaleSize(150), height: scaleSize(150), position: 'absolute', right: -120, bottom: -50 }}
                />   
          </View>
          
          <HapticTouchableOpacity 
            style={{flexDirection: 'row', alignItems: 'center', marginTop: scaleMargin(8)}} 
            onPress={()=>{setIsCountryPickerVisible(true)}}
            hapticType="light"
          >
            {user?.country ? (
              <>
                {getCountryFlag(user.country) && (
                  <Text style={{fontSize: moderateScale(18), marginRight: scaleMargin(8)}}>{getCountryFlag(user.country)}</Text>
                )}
                {getCountryName(user.country) && (
                  <Text style={{fontSize: moderateScale(18), fontFamily: 'DynaPuff', color: Colors.textSecondary}}>
                    {getCountryName(user.country)}
                  </Text>
                )}
                <EditSvg color={Colors.textPrimary} style={{marginLeft: scaleMargin(8)}}/>
              </>
            ) : (
              <>
                <Text style={{fontSize: moderateScale(20), fontFamily: 'DynaPuff', color: Colors.textSecondary}}>
                  Select country
                </Text>
                <EditSvg color={Colors.textPrimary} style={{marginLeft: scaleMargin(8)}}/>
              </>
            )}
          </HapticTouchableOpacity>
        </View>

        {selectedCountry && selectedCountry.code !== user?.country && (
          <View style={{width: getWidthPercentage(85), marginBottom: scaleMargin(12)}}>
            <GradientButton
              title={isSavingCountry ? "Saving..." : "Save Country"}
              onPress={handleSaveCountry}
              disabled={isSavingCountry}
            />
          </View>
        )}
          

        <View style={{backgroundColor: Colors.cardBackground, borderRadius: scaleBorderRadius(25), padding: scalePadding(16), width: getWidthPercentage(85), alignItems: 'center'}}>
          <Image source={require('../../assets/img/PurpleShadow.png')} style={styles.backgroundImage} resizeMode='stretch'/>

          <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start'}}>
            <Text style={{fontSize: moderateScale(16), fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textPrimary}}>{user.avatar.rarity}</Text>
            {user.avatar?.rarity === 'legendary' && <LegendaryStar />}
            {user.avatar?.rarity === 'mythic' && <MythicStar />}
            {user.avatar?.rarity === 'rare' && <RareStar  />} 
            {user.avatar?.rarity === 'common' && <CommonStar />}
          </View>

          
          <Image source={{uri: user.avatar.url}} style={{width: getWidthPercentage(85), height: getHeightPercentage(30), maxHeight: scaleHeight(300)}} resizeMode='contain'/>
        </View>

        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={{width: getWidthPercentage(85), backgroundColor: Colors.cardBackground, borderRadius: scaleBorderRadius(22), padding: scalePadding(16), alignItems: 'center', borderWidth: 1, borderColor: Colors.cardBorder, justifyContent: 'space-between', flexDirection: 'row', marginBottom: scaleMargin(12)}}>
            <Text style={{fontSize: moderateScale(16), fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textPrimary}}>Your streak</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: moderateScale(20), fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textPrimary, marginRight: scaleMargin(8)}}>{user.current_streak}</Text>
              {/* <FireSvg style={{marginTop: scaleMargin(-10)}}/> */}
              <LottieView
                source={require('../../assets/animations/Fire.json')}
                autoPlay
                loop
                speed={1}
                style={{ width: scaleSize(30), height: scaleSize(30) }}
              /> 
            </View>
          </View>
          {isEditing ? (
            <>
              <InputFieldChange
                label="Contact link"
                placeholder="Enter your contact link"
                value={editedUrl}
                onChangeText={setEditedUrl}
              />
              <View style={{  flexDirection: 'column', gap: scaleMargin(12), marginTop: scaleMargin(12), justifyContent: 'center', alignItems: 'center'}}>
                
                <View style={{}}>
                  <GradientButton
                    title={isSaving ? "Saving..." : "Save"}
                    onPress={handleSaveContact}
                    disabled={isSaving}
                  />
                </View>
                <HapticTouchableOpacity
                  onPress={handleCancelEdit}
                  style={styles.cancelButton}
                  disabled={isSaving}
                  hapticType="light"
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </HapticTouchableOpacity>
              </View>
            </>
          ) : (
            <>
            <View style={{width: getWidthPercentage(85), backgroundColor: Colors.cardBackground, borderRadius: scaleBorderRadius(22), padding: scalePadding(16), alignItems: 'center', borderWidth: 1, borderColor: Colors.cardBorder, justifyContent: 'space-between', flexDirection: 'row', marginBottom: scaleMargin(12)}}>
              <HapticTouchableOpacity 
                style={{flex: 1, marginRight: scaleMargin(8)}}
                onPress={()=>{Linking.openURL(user?.contacts && user.contacts.length > 0 ? user.contacts[0].url : '')}}
                activeOpacity={0.7}
                hapticType="light"
              >
                <Text numberOfLines={1} ellipsizeMode="tail" style={{fontSize: moderateScale(16), fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textPrimary, textDecorationLine: 'underline'}}>
                  {truncateText(user?.contacts && user.contacts.length > 0 ? user.contacts[0].url : 'No contact link', 30)}
                </Text>
              </HapticTouchableOpacity>
              <HapticTouchableOpacity 
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={handleEditContact}
                hapticType="light"
              >
                  <EditSvg style={{marginLeft: scaleMargin(8)}}/>
                </HapticTouchableOpacity>
              </View>
              <HapticTouchableOpacity 
              onPress={handleLogout}
              hapticType="medium"
            >
            <Text style={{alignSelf: "center", fontSize: moderateScale(14), fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textError,  marginTop: scaleMargin(10)}}>Logout</Text>
          </HapticTouchableOpacity>
          </>
          )}
        </View>
        
        {!isEditing  && (
            <HapticTouchableOpacity 
            onPress={handleDeleteAccount}
            disabled={isDeleting}
            hapticType="medium"
            >
              {isDeleting ? (
                <ActivityIndicator size="small" color={Colors.textError} />
              ) : (
                <Text style={{alignSelf: "center", fontSize: moderateScale(14), fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textError,  marginTop: scaleMargin(10)}}>Delete account</Text>
              )}
            </HapticTouchableOpacity>
          )
          }
      </ScrollView>
      
      <CountryPickerModal
        visible={isCountryPickerVisible}
        selectedCountry={selectedCountry}
        onSelect={setSelectedCountry}
        onClose={() => setIsCountryPickerVisible(false)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.backgroundSettings,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-around',
    padding: scalePadding(16), 
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
  cancelButton: {
    paddingVertical: scalePadding(16),
    paddingHorizontal: scalePadding(24),
    borderRadius: scaleBorderRadius(25),
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: scaleSize(100),
  },
  cancelButtonText: {
    fontSize: moderateScale(16),
    fontFamily: 'DynaPuff',
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  countrySelector: {
    width: getWidthPercentage(85),
    marginVertical: scaleMargin(10),
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
    backgroundColor: 'transparent',
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
});


