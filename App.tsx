/// <reference types="nativewind/types" />
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Home from "./components/Home";
import "./global.css";
import { View } from "react-native";

export default function App() {
  return (
    <SafeAreaProvider>
      <View>
        <StatusBar style="auto" />
        <Home />
      </View>
    </SafeAreaProvider>
  );
}
