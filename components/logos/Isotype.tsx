import React from "react";
import { Text, View, StyleSheet } from "react-native";
import theme from "../../styles/theme";

export default function Isotype() {
  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      <Text
        style={{
          fontWeight: theme.typography.fontWeightBold,
          color: theme.colors.textPrimary,
          fontSize: theme.typography.fontSizeHeadline,
        }}
      >
        Pocket
      </Text>
      <Text
        style={{
          fontWeight: theme.typography.fontWeightBold,
          color: theme.colors.primary,
          fontSize: theme.typography.fontSizeHeadline,
        }}
      >
        Chef
      </Text>
    </View>
  );
}
