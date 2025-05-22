import React from "react";
import { Stack } from "expo-router";
import Isotype from "../../components/logos/Isotype";
import { SignOutButton } from "../../components/ui/SignOutButton"; // Ajusta la ruta si es necesario
import theme from "../../styles/theme"; // Ajusta la ruta si es necesario

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerLeft: () => <Isotype />,
        headerTitle: "",
        headerStyle: {
          backgroundColor: theme.colors.backgroundDark, // Usar color del tema
        },
        headerTintColor: theme.colors.textPrimary, // Color para el título y botones del header
        headerRight: () => <SignOutButton />,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Inicio" }} />
      {/* Aquí puedes añadir más pantallas dentro del grupo (home) si es necesario */}
    </Stack>
  );
}
