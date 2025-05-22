import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import theme from "../../styles/theme";
import { useAuth } from "../../context/AuthContext"; // Ajusta la ruta si es necesario

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }
    setIsLoading(true);
    const success = await register(email, password);
    setIsLoading(false);
    if (success) {
      // Alert.alert('Éxito', '¡Cuenta creada! Por favor, inicia sesión.'); // Alert is handled by AuthService
      router.push("/(auth)/LoginScreen"); // Navigate to login after successful registration
    } else {
      // Error alert is handled by AuthService or AuthContext register method
      // Alert.alert('Error de registro', 'No se pudo crear la cuenta.');
    }
  };

  const navigateToLogin = () => {
    router.push("/(auth)/LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={theme.colors.textSecondary}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor={theme.colors.textSecondary}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        placeholderTextColor={theme.colors.textSecondary}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={theme.colors.textPrimary} />
        ) : (
          <Text style={styles.buttonText}>Registrarse</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToLogin}>
        <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.backgroundDark,
  },
  title: {
    fontSize: theme.typography.fontSizeHeadline,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xl,
  },
  input: {
    width: "100%",
    backgroundColor: theme.colors.backgroundMedium,
    color: theme.colors.textPrimary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    fontSize: theme.typography.fontSizeBody,
  },
  button: {
    width: "100%",
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
    marginBottom: theme.spacing.lg,
  },
  buttonText: {
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.fontSizeBody,
  },
  linkText: {
    color: theme.colors.accent,
    fontSize: theme.typography.fontSizeSubtext,
  },
});

export default RegisterScreen;
