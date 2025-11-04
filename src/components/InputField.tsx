import React from "react";
import { TextInput, StyleSheet, View, Text, TextInputProps } from "react-native";

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
    marginVertical: 10,
    alignSelf: "center",
  },
  label: {
    fontFamily: 'DynaPuff',
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  input: {
    borderWidth: 2,
    borderColor: "#1F43B7",
    borderRadius: 20,
    fontFamily: 'DynaPuff',
    paddingVertical: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#fff",
    backgroundColor: "transparent", // прозрачный фон
  },
});

