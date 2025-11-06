import React from "react";
import { TextInput, StyleSheet, View, Text, TextInputProps } from "react-native";
import { Colors } from "../constants/colors";

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
    marginVertical: 10,
    alignSelf: "center",
  },
  label: {
    fontFamily: 'DynaPuff',
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  input: {
    width: '85%', 
    color: Colors.textPrimary,
    fontFamily: 'DynaPuff',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: Colors.cardBackground, borderRadius: 22, padding: 22, alignItems: 'center', borderWidth: 1, borderColor: Colors.cardBorder, justifyContent: 'space-between', flexDirection: 'row', marginBottom: 12
  },
});

