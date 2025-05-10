import React from "react";
import { Stack } from "expo-router";
import { Slot } from "expo-router";
import { View } from "react-native";
import Logo from "../components/Logo";
export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerLeft: () => <Logo />, title: "PocketChef" }}
      />
    </Stack>
  );
}
