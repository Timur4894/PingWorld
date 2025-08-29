import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radii } from '../utils/theme';

type Props = { title?: string; left?: React.ReactNode; right?: React.ReactNode };

export default function GlassTopBar({ title, left, right }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <View style={styles.side}>{left}</View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.side}>{right}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 12,
    marginHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,255,255,0.12)',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: radii.full,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  side: { width: 60 },
  title: { color: colors.text, fontSize: 18, fontWeight: '800' },
});


