import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import theme from "../../styles/theme";
import Isotype from "../../components/logos/Isotype";

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitle: "",
        headerLeft: () => <Isotype />,
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
          backgroundColor: theme.colors.backgroundDark,
        },
        headerTintColor: theme.colors.textPrimary,
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
