import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";
import { Colors } from "../constants/colors";

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const GradientButton = ({ title, onPress, disabled = false }: GradientButtonProps) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={onPress} 
      style={[styles.container, disabled && styles.disabled]}
      disabled={disabled}
    >
      <LinearGradient
        colors={disabled ? [Colors.disabledLight, Colors.disabledDark] : [Colors.gradientStart, Colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text style={[styles.text, disabled && styles.disabledText]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;

const styles = StyleSheet.create({
  container: {
    width: "80%", // можно подстраивать
    borderRadius: 25,
    overflow: "hidden",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: Colors.borderButton,
  },
  gradient: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Colors.textPrimary,
    fontFamily: 'DynaPuff',
    paddingVertical: 17,
    fontSize: 18,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.6,
  },
  disabledText: {
    color: "#ccc",
  },
});
