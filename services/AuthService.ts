// services/AuthService.ts
import { Alert } from "react-native";

// Simulate a user type for now
interface User {
  id: string;
  email: string;
}

// Simulate a delay to mimic API calls
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Simulated user database (in a real app, this would be your backend)
const users: User[] = [];

export const AuthService = {
  login: async (email: string, password: string): Promise<User | null> => {
    console.log("AuthService: Attempting login for", email);
    await delay(1000); // Simulate network request

    // Basic validation (in a real app, your backend handles this)
    const user = users.find((u) => u.email === email);

    if (user) {
      // In a real app, you'd also verify the password (hashed) here
      console.log("AuthService: Login successful for", email);
      return user;
    } else {
      console.log("AuthService: Login failed for", email);
      Alert.alert(
        "Error de inicio de sesión",
        "Correo o contraseña incorrectos."
      );
      return null;
    }
  },

  register: async (email: string, password: string): Promise<User | null> => {
    console.log("AuthService: Attempting registration for", email);
    await delay(1500); // Simulate network request

    // Basic validation (in a real app, your backend handles this)
    if (users.find((u) => u.email === email)) {
      Alert.alert(
        "Error de registro",
        "Este correo electrónico ya está en uso."
      );
      console.log("AuthService: Registration failed, email exists", email);
      return null;
    }

    const newUser: User = {
      id: String(Date.now()), // Simple unique ID for simulation
      email,
    };
    users.push(newUser);
    console.log("AuthService: Registration successful for", email, newUser);
    Alert.alert(
      "Registro exitoso",
      "¡Tu cuenta ha sido creada! Por favor, inicia sesión."
    );
    return newUser;
  },

  logout: async (): Promise<void> => {
    console.log("AuthService: Logging out");
    await delay(500);
    // In a real app, you might invalidate a token on the server
    return;
  },

  getCurrentUser: async (): Promise<User | null> => {
    // This would typically involve checking a stored token or session
    // For now, we'll simulate no persistent session
    console.log("AuthService: getCurrentUser called (simulated, no session)");
    return null;
  },
};
