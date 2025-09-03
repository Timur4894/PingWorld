import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";

const GradientButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.container}>
      <LinearGradient
        colors={["#2a2a72", "#9f8be3"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text style={styles.text}>{title}</Text>
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
    borderColor: '#353476',
  },
  gradient: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontFamily: 'DynaPuff',
    paddingVertical: 17,
    fontSize: 18,
    fontWeight: "600",
  },
});
