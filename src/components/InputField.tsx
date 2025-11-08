import React from "react";
import { TextInput, StyleSheet, View, Text, TextInputProps } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "../constants/colors";
import { moderateScale, scalePadding, scaleMargin, scaleBorderRadius } from "../utils/scaling";

interface InputFieldProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
}

const InputField = ({ label, placeholder, secureTextEntry = false, value, onChangeText, ...props }: InputFieldProps) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <LinearGradient
        colors={['#1F43B7', '#FBF3F3', '#1A3AB5']}
        locations={[0.25, 0.52, 0.97]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBorder}
      >
        <View style={styles.innerContainer}>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="rgba(255,255,255,0.6)"
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
            {...props}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: scaleMargin(10),
    alignSelf: "center",
  },
  label: {
    fontFamily: 'DynaPuff',
    color: Colors.textPrimary,
    fontSize: moderateScale(16),
    fontWeight: "600",
    marginBottom: scaleMargin(12),
  },
  gradientBorder: {
    padding: 1.5,
    borderRadius: scaleBorderRadius(20),
  },
  innerContainer: {
    borderRadius: scaleBorderRadius(20),
    backgroundColor: 'transparent',
  },
  input: {
    borderRadius: scaleBorderRadius(20),
    fontFamily: 'DynaPuff',
    paddingVertical: scalePadding(20),
    paddingHorizontal: scalePadding(16),
    fontSize: moderateScale(16),
    color: Colors.textPrimary,
    overflow: "hidden",
    backgroundColor: Colors.cardBackground,
  },
});

