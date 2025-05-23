import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../../../styles/theme"; // Ajusta la ruta según tu estructura

export default function Page() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Recetas</Text>
      <Text style={styles.text}>Aquí se mostrarán las recetas.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.backgroundMedium,
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.fontSizeTitle,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  text: {
    fontSize: theme.typography.fontSizeBody,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
});
