import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, radii } from '../utils/theme';

type Props = { items: string[]; value: string; onChange: (v: string) => void };

export default function SegmentedChips({ items, value, onChange }: Props) {
  return (
    <View style={styles.row}>
      {items.map((label) => {
        const active = value === label;
        return (
          <Pressable key={label} onPress={() => onChange(label)} style={[styles.chip, active && styles.active]}> 
            <Text style={[styles.text, active && styles.textActive]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8 },
  chip: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: radii.full,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,255,255,0.12)',
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: { backgroundColor: 'rgba(255,255,255,0.14)' },
  text: { color: '#A6A7AB', fontWeight: '700' },
  textActive: { color: colors.text },
});


