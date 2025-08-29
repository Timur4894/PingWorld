import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DottedBackground from '../components/DottedBackground';
import Glass from '../components/Glass';
import { colors, typography } from '../utils/theme';

export default function SettingsScreen() {
  const [nickname, setNickname] = useState('');
  const [contact, setContact] = useState('');
  const [notifications, setNotifications] = useState(true);

  const onSave = () => {
    // persist settings placeholder
  };

  return (
    <DottedBackground>
      <Glass>
        <Text style={[styles.title, typography.title]}>Настройки</Text>
        <TextInput style={[styles.input, { color: colors.text, borderColor: 'rgba(255,255,255,0.12)' }]} value={nickname} onChangeText={setNickname} placeholder="Ник" />
        <TextInput style={[styles.input, { color: colors.text, borderColor: 'rgba(255,255,255,0.12)' }]} value={contact} onChangeText={setContact} placeholder="Контакт (Telegram/Instagram)" />
        <View style={styles.row}>
          <Text style={{ color: colors.text }}>Уведомления: {notifications ? 'Вкл' : 'Выкл'}</Text>
          <Button title={notifications ? 'Выключить' : 'Включить'} onPress={() => setNotifications(v => !v)} />
        </View>
        <Button title="Сохранить" onPress={onSave} />
      </Glass>
    </DottedBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  title: { fontSize: 22, fontWeight: '700' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 12 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
});


