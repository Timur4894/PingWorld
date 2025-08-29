import React from 'react';
import { View, Text, Button, Image, StyleSheet, Linking } from 'react-native';
import DottedBackground from '../../components/DottedBackground';
import Glass from '../../components/Glass';

export default function ReceiveHelloScreen() {
  const openContact = () => {
    Linking.openURL('https://t.me/your_contact');
  };

  const replyHello = () => {
    // placeholder for reply flow
  };

  return (
    <DottedBackground>
      <Glass>
        <View style={styles.card}>
          <Image style={styles.avatar} source={{ uri: 'https://placekitten.com/200/200' }} />
          <Text style={styles.nickname}>@sender_nick</Text>
          <View style={styles.row}>
            <Button title="Посмотреть контакт" onPress={openContact} />
            <Button title="Ответить Привет" onPress={replyHello} />
          </View>
        </View>
      </Glass>
    </DottedBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  card: { alignItems: 'center', gap: 12 },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  nickname: { fontSize: 20, fontWeight: '600' },
  row: { flexDirection: 'row', gap: 12, marginTop: 8 },
});


