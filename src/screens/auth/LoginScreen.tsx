import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import DottedBackground from '../../components/DottedBackground';
import Glass from '../../components/Glass';
import PillButton from '../../components/PillButton';
import { colors, typography } from '../../utils/theme';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [nickname, setNickname] = useState('');
  const [avatarUri, setAvatarUri] = useState<string | undefined>(undefined);
  const [country, setCountry] = useState('');

  const onPickAvatar = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 });
    const asset = result.assets && result.assets[0];
    if (asset && asset.uri) setAvatarUri(asset.uri);
  };

  const onLogin = () => {
    if (!nickname.trim()) return;
    navigation.replace('SendHello');
  };

  return (
    <DottedBackground>
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={[styles.heroTitle]}>Now you can ping{"\n"}WHOLE WORLD</Text>
        </View>
        <Glass>
          <TextInput
            value={nickname}
            onChangeText={setNickname}
            placeholder="Никнейм (обязательно)"
            placeholderTextColor="#A6A7AB"
            style={[styles.input, { color: colors.text, borderColor: 'rgba(255,255,255,0.12)' }]}
          />
          <View style={styles.avatarRow}>
            {avatarUri ? <Image source={{ uri: avatarUri }} style={styles.avatar} /> : <View style={[styles.avatar, styles.avatarPlaceholder]} />}
            <Button title="Выбрать аватар" onPress={onPickAvatar} />
          </View>
          <TextInput
            value={country}
            onChangeText={setCountry}
            placeholder="Страна"
            placeholderTextColor="#A6A7AB"
            style={[styles.input, { color: colors.text, borderColor: 'rgba(255,255,255,0.12)' }]}
          />
        </Glass>
        <View style={{ height: 16 }} />
        <PillButton title="Get Started" onPress={onLogin} />
      </View>
    </DottedBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 28, fontWeight: '800', textAlign: 'center' },
  heroTitle: { fontSize: 44, fontFamily: 'DynaPuff', fontWeight: '800', color: colors.text, lineHeight: 40, textAlign: 'center' },
  subtitle: { color: '#A6A7AB', marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 12 },
  avatarRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#eee' },
  avatarPlaceholder: { alignItems: 'center', justifyContent: 'center' },
});


