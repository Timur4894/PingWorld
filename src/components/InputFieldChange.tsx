import React from "react";
import { TextInput, StyleSheet, View, Text, TextInputProps } from "react-native";
import { Colors } from "../constants/colors";
import { moderateScale, scalePadding, scaleMargin, scaleBorderRadius, getWidthPercentage } from "../utils/scaling";

interface InputFieldProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
}

const InputFieldChange = ({ placeholder, secureTextEntry = false, value, onChangeText, ...props }: InputFieldProps) => {
  return (
    // <View style={{width: '85%', backgroundColor: Colors.cardBackground, borderRadius: 22, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: Colors.cardBorder, justifyContent: 'space-between', flexDirection: 'row', marginBottom: 12}}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="rgba(255,255,255,0.6)"
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    // </View>
  );
};

export default InputFieldChange;

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
    width: getWidthPercentage(85), 
    color: Colors.textPrimary,
    fontFamily: 'DynaPuff',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    backgroundColor: Colors.cardBackground, 
    borderRadius: scaleBorderRadius(22), 
    padding: scalePadding(22), 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: Colors.cardBorder, 
    justifyContent: 'space-between', 
    flexDirection: 'row', 
    marginBottom: scaleMargin(12)
  },
});

