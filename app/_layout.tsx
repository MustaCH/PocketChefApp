import React from "react";
import { Stack, Slot } from "expo-router";
import { AuthProvider } from "../context/AuthContext"; // Ajusta la ruta si es necesario

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
        {/* Puedes añadir una pantalla de carga inicial aquí si es necesario */}
        {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
      </Stack>
    </AuthProvider>
  );
}
