export const colors = {
  background: '#0B0B0F',
  card: 'rgba(255,255,255,0.06)',
  border: 'rgba(255,255,255,0.12)',
  text: '#F2F2F3',
  textMuted: '#A6A7AB',
  accent: '#FF4D97',
  accent2: '#7C5CFF',
};

export const radii = {
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  full: 999,
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
};

import type { TextStyle } from 'react-native';

export const typography: { title: TextStyle; subtitle: TextStyle; body: TextStyle } = {
  title: { fontSize: 28, fontWeight: '800' as TextStyle['fontWeight'], color: colors.text },
  subtitle: { fontSize: 16, color: colors.textMuted },
  body: { fontSize: 16, color: colors.text },
};


