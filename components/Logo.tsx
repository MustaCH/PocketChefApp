import React from "react";
import { Image, View, StyleSheet } from "react-native";

export default function Logo({ size = 50 }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
