import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import {
  filterRecipes,
  generateRecipes,
  generateRecipeImageAPI,
} from "../services/api"; // Importar generateRecipeImageAPI
import { FontAwesome } from "@expo/vector-icons";
import { RecipeCard } from "./ui/RecipeCard";
import { Recipe } from "../types";
import { RecipeForm } from "./ui/RecipeForm";
import { RecipeModal } from "./ui/RecipeModal"; // Import RecipeModal from RecipeFor
import theme from "../styles/theme";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Home() {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={[theme.colors.secondary, "transparent"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.2 }}
      style={{
        height: "100%",
        flex: 1,
      }}
    >
      <ScrollView
        style={{
          backgroundColor: "transparent",
          paddingTop: insets.top + 16,
          paddingHorizontal: theme.spacing.md,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontSize: theme.typography.fontSizeTitle,
            fontWeight: theme.typography.fontWeightBold,
            textAlign: "center",
          }}
        >
          ¿Que vamos a hacer hoy?
        </Text>
        <View style={{ marginVertical: theme.spacing.md }}>
          <TouchableOpacity
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: 250,
              backgroundColor: theme.colors.backgroundLight,
              borderRadius: 10,
              position: "relative",
            }}
          >
            <Image
              source={require("../assets/images/createrecipeimage.png")}
              style={{
                width: 210,
                height: 210,
                alignSelf: "center",
              }}
            />
            <Text style={{ fontSize: 16 }}>Crear recetas</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: theme.spacing.md,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 8,
              backgroundColor: theme.colors.backgroundLight,
              borderRadius: 10,
            }}
          >
            <Image
              source={require("../assets/images/recipesimage.png")}
              style={{
                width: 150,
                height: 150,
                alignSelf: "center",
              }}
            />
            <Text style={{ fontSize: 16 }}>Buscar recetas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 8,
              backgroundColor: theme.colors.backgroundLight,
              borderRadius: 10,
            }}
          >
            <Image
              source={require("../assets/images/eventrecipeimage.png")}
              style={{
                width: 150,
                height: 150,
                alignSelf: "center",
              }}
            />
            <Text style={{ fontSize: 16 }}>Evento</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
