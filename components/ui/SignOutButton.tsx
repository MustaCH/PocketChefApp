import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../../context/AuthContext"; // Ajusta la ruta si es necesario
import theme from "../../styles/theme"; // Ajusta la ruta si es necesario

export const SignOutButton = () => {
  const { logout, isLoading } = useAuth();

  const handleSignOut = async () => {
    await logout();
    // La navegación se maneja dentro del método logout del AuthContext
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handleSignOut}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color={theme.colors.textPrimary} />
      ) : (
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.accent, // O un color que prefieras para logout
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 120, // Para darle un tamaño mínimo
  },
  buttonText: {
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.fontSizeBody,
  },
});
