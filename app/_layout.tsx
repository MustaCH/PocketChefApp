import React from "react";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack } from "expo-router";
import Constants from "expo-constants";

export default function RootLayout() {
  const publishableKey =
    process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ||
    Constants.expoConfig?.extra?.clerkPublishableKey;

  if (!publishableKey) {
    console.error("Missing Clerk publishable key");
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
