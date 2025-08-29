import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, radii } from '../utils/theme';

type Props = { title: string; onPress: () => void; style?: ViewStyle };

export default function PillButton({ title, onPress, style }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.btn, style, pressed && { opacity: 0.9 }]} android_ripple={{ color: '#ffffff33' }}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 48,
    paddingHorizontal: 20,
    borderRadius: radii.full,
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { color: colors.text, fontWeight: '700' },
});


