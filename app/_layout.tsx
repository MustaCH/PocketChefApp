import React from "react";
import { Stack, Slot } from "expo-router";
import { AuthProvider } from "../context/AuthContext"; // Ajusta la ruta si es necesario
import theme from "../styles/theme";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.backgroundMedium },
        }}
      >
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
