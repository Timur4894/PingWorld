import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../utils/theme';

type Props = { children: React.ReactNode };

export default function DottedBackground({ children }: Props) {
  const dots: JSX.Element[] = [];
  const size = 14;
  const radius = 1.2;
  for (let y = 0; y < 80; y++) {
    for (let x = 0; x < 24; x++) {
      dots.push(
        <Circle key={`${x}-${y}`} cx={x * size + size / 2} cy={y * size + size / 2} r={radius} fill="#2A2A31" />
      );
    }
  }

  return (
    <View style={styles.container}>
      <Svg pointerEvents="none" width="100%" height="100%" style={StyleSheet.absoluteFill}>
        {dots}
      </Svg>
      <View style={styles.overlay} />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.15)' },
  content: { flex: 1 },
});


