import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
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

export default function SettingsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList, 'SettingsScreen'>>();
  const { showModal } = useModal();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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

      // Обновляем user в контексте
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
  
  if (loading) {
    return <SettingsSkeleton />;
  }

  return (
    <View style={styles.container}>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '95%', marginTop: 20}}>
        <TouchableOpacity onPress={()=>{navigation.goBack()}}>
          <BackSvg />
        </TouchableOpacity>
       
      </View>

      <View style={{alignItems: 'center', marginBottom: 10}}>
        <Text style={{fontSize: 42, fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textPrimary, textAlign: 'center'}}>
          My avatar
        </Text>
        <TouchableOpacity 
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}} 
          onPress={()=>{setIsCountryPickerVisible(true)}}
        >
          {user?.country ? (
            <>
              {getCountryFlag(user.country) && (
                <Text style={{fontSize: 20, marginRight: 8}}>{getCountryFlag(user.country)}</Text>
              )}
              {getCountryName(user.country) && (
                <Text style={{fontSize: 20, fontFamily: 'DynaPuff', color: Colors.textSecondary}}>
                  {getCountryName(user.country)}
                </Text>
              )}
              <EditSvg color={Colors.textPrimary} style={{marginLeft: 8}}/>
            </>
          ) : (
            <>
              <Text style={{fontSize: 20, fontFamily: 'DynaPuff', color: Colors.textSecondary}}>
                Select country
              </Text>
              <EditSvg color={Colors.textPrimary} style={{marginLeft: 8}}/>
            </>
          )}
        </TouchableOpacity>
      </View>

      {selectedCountry && selectedCountry.code !== user?.country && (
        <View style={{width: '85%', marginBottom: 12}}>
          <GradientButton
            title={isSavingCountry ? "Saving..." : "Save Country"}
            onPress={handleSaveCountry}
            disabled={isSavingCountry}
          />
        </View>
      )}
        



      <View style={{backgroundColor: Colors.cardBackground, borderRadius: 25, padding: 16, width: '85%', alignItems: 'center'}}>
        <Image source={require('../../assets/img/PurpleShadow.png')} style={styles.backgroundImage} resizeMode='stretch'/>

        <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start'}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textPrimary}}>{user.avatar.rarity}</Text>
          {user.avatar.rarity === 'legendary' && <Image source={require('../../assets/img/stars/Legendary.png')}/>}
          {user.avatar.rarity === 'rare' && <Image source={require('../../assets/img/stars/Rare.png')}/>}
          {user.avatar.rarity === 'common' && <Image source={require('../../assets/img/stars/Common.png')}/>}
        </View>

        
        <Image source={{uri: user.avatar.url}} style={{width: '100%', height: 300}} resizeMode='contain'/>
      </View>

      <View style={{width: '100%', alignItems: 'center'}}>
        <View style={{width: '85%', backgroundColor: Colors.cardBackground, borderRadius: 22, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: Colors.cardBorder, justifyContent: 'space-between', flexDirection: 'row', marginBottom: 12}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textPrimary}}>Your streak</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textPrimary, marginRight: 8, }}>{user.current_streak}</Text>
            <FireSvg />
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
            <View style={{flexDirection: 'column', width: '85%', gap: 12, marginTop: 12, justifyContent: 'center', alignItems: 'center'}}>
              
              <View style={{width: '90%'}}>
                <GradientButton
                  title={isSaving ? "Saving..." : "Save"}
                  onPress={handleSaveContact}
                  disabled={isSaving}
                />
              </View>
              <TouchableOpacity
                onPress={handleCancelEdit}
                style={styles.cancelButton}
                disabled={isSaving}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
          <View style={{width: '85%', backgroundColor: Colors.cardBackground, borderRadius: 22, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: Colors.cardBorder, justifyContent: 'space-between', flexDirection: 'row', marginBottom: 12}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textPrimary, textDecorationLine: 'underline'}}>{user?.contacts && user.contacts.length > 0 ? user.contacts[0].url : ''}</Text>
            <TouchableOpacity 
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={handleEditContact}
            >
              <EditSvg style={{marginLeft: 8}}/>
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
          onPress={handleLogout}
        >
          <Text style={{alignSelf: "center", fontSize: 14, fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textError,  marginTop: 10}}>Logout</Text>
        </TouchableOpacity>

         
        </>
        )}

        
      </View>
      
      {!isEditing  && (
          <TouchableOpacity 
          onPress={handleDeleteAccount}
          disabled={isDeleting}
          >
            {isDeleting ? (
              <ActivityIndicator size="small" color={Colors.textError} />
            ) : (
              <Text style={{alignSelf: "center", fontSize: 14, fontWeight: 'bold', fontFamily: 'DynaPuff', color: Colors.textError,  marginTop: 10}}>Delete account</Text>
            )}
          </TouchableOpacity>
        )
        }
      
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
    justifyContent: 'space-around',
    padding: 16, 
    alignItems: 'center',
    backgroundColor: Colors.backgroundSettings,
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
  cancelButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100,
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'DynaPuff',
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  countrySelector: {
    width: '85%',
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


