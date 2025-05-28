import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import theme from "../../styles/theme";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CreateRecipeIcon } from "../../components/icons/CreateRecipeIcon";
import { EventRecipeIcon } from "../../components/icons/EventRecipeIcon";

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
            ]}
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
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.backgroundDark,
          borderTopColor: theme.colors.backgroundDark,
          borderTopWidth: 0,
          shadowColor: "black",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerTintColor: theme.colors.textPrimary,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="screens/RecipesScreen"
        options={{
          title: "Buscar",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="screens/CreateScreen"
        options={{
          title: "Crear",
          tabBarIcon: ({ color, size }) => (
            <CreateRecipeIcon
              filled={true}
              color={color}
              width={30}
              height={30}
            />
          ),
          tabBarItemStyle: {
            marginRight: 30,
          },
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={theme.colors.white} />
          ),
          tabBarItemStyle: {
            backgroundColor: theme.colors.secondary,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: theme.colors.primary,
            position: "absolute",
            padding: 10,
            top: -20,
            left: "50%",
            transform: [{ translateX: -31 }], // Ajusta el valor según tus preferencia
          },
        }}
      />
      <Tabs.Screen
        name="screens/EventsScreen"
        options={{
          title: "Eventos",
          tabBarIcon: ({ color, size }) => <EventRecipeIcon color={color} />,
          tabBarItemStyle: {
            marginLeft: 30,
          },
        }}
      />
      <Tabs.Screen
        name="screens/ProfileScreen"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
