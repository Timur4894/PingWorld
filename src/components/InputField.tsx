import React from "react";
import { TextInput, StyleSheet, View, Text, TextInputProps } from "react-native";
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
  input: {
    borderWidth: 2,
    borderColor: Colors.borderInput,
    borderRadius: scaleBorderRadius(20),
    fontFamily: 'DynaPuff',
    paddingVertical: scalePadding(20),
    paddingHorizontal: scalePadding(16),
    fontSize: moderateScale(16),
    color: Colors.textPrimary,
    backgroundColor: "transparent", // прозрачный фон
  },
});

