import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { moderateScale, scalePadding, scaleBorderRadius, getWidthPercentage } from "../utils/scaling";
import { Colors } from "../constants/colors";

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const GradientButton = ({ title, onPress, disabled = false, styleBtn }: GradientButtonProps) => {
  return (
    <LinearGradient
      colors={['#1F43B7', '#FBF3F3', '#1A3AB5']}
      locations={[0.25, 0.52, 0.97]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.gradientBorder, styleBtn]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={styles.innerContainer}
      >
        <LinearGradient
          colors={['#1F43B7', '#9D8DEB']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.buttonBackground}
        >
          <Text style={styles.text}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default GradientButton;

const styles = StyleSheet.create({
  gradientBorder: {
    width: getWidthPercentage(80),
    padding: 1.5,
    borderRadius: scaleBorderRadius(40),
  },
  innerContainer: {
    borderRadius: scaleBorderRadius(40),
    overflow: "hidden",
    backgroundColor: Colors.cardBackground,
  },
  buttonBackground: {
    borderRadius: scaleBorderRadius(40),
    justifyContent: "center",
    alignItems: "center",
   
  },
  text: {
    color: "#FFF",
    fontFamily: 'DynaPuff',
    paddingVertical: scalePadding(17),
    fontSize: moderateScale(18),
    fontWeight: "600",
  },
});
