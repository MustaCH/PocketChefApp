import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../../../styles/theme"; // Ajusta la ruta según tu estructura

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Perfil</Text>
      <Text style={styles.text}>Aquí podrás ver y editar tu perfil.</Text>
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
