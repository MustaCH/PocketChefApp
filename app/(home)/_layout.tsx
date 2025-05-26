import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import theme from "../../styles/theme";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerTitle: () => (
          <Image
            style={{ height: 36, width: 40, marginBottom: 10 }}
            source={require("../../assets/icon-white.png")}
          />
        ),
        headerBackground: () => (
          <LinearGradient
            colors={[
              theme.colors.primary,
              theme.colors.secondary,
              theme.colors.primary,
            ]} // Ajusta estos colores según tu diseño
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 16,
            }}
          />
        ),
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.backgroundDark,
          borderTopColor: theme.colors.backgroundDark,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          borderTopWidth: 0,
          shadowColor: "black",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
        headerStyle: {
          backgroundColor: "transparent", // Esencial para que el gradiente en headerBackground sea visible
        },
        headerTintColor: theme.colors.textPrimary, // Color del título y botones del header
        headerTitleStyle: {
          fontWeight: "bold",
        },
        // Mantener el título vacío o ajustarlo si es necesario, ya que el logo ocupa espacio
        // headerTitle: "", // Opcional: si quieres quitar el título por completo
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="leaf" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="screens/RecipesScreen"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="cutlery" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="screens/EventsScreen"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="glass" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="screens/ProfileScreen"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
