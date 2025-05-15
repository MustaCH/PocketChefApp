import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { filterRecipes, generateRecipes } from "../services/api";
import { Button } from "./ui/Buttton";
import { RecipeCard } from "./ui/RecipeCard";
import { Recipe } from "../types";
import { RecipeForm } from "./RecipeForm";
import theme from "../styles/theme";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";

export default function Home() {
  const insets = useSafeAreaInsets();
  const [ingredients, setIngredients] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (ingredients.trim() === "") {
      setError("Por favor, ingresa al menos un ingrediente.");
      return;
    }
    setLoading(true);
    setError("");
    setRecipes([]);
    try {
      console.log("Generando recetas con ingredientes:", ingredients.trim());
      const response = await generateRecipes({
        ingredients: ingredients.trim(),
      });

      let finalRecipes: Recipe[] = response.recipes || [];
      console.log("Recetas generadas:", {
        count: finalRecipes.length,
        sample: finalRecipes.length > 0 ? finalRecipes[0] : null,
      });

      let dietaryRestrictionsForAPI = "";
      if (typeof restrictions === "string") {
        dietaryRestrictionsForAPI = restrictions
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0)
          .join(", ");
      }

      if (dietaryRestrictionsForAPI) {
        console.log("Aplicando filtros dietéticos:", dietaryRestrictionsForAPI);
        const recipeStrings = finalRecipes.map((recipe: Recipe) =>
          JSON.stringify(recipe)
        );
        console.log(
          "Recetas convertidas para filtrado (primeras 2):",
          recipeStrings.slice(0, 2)
        );

        const filteredResponse = await filterRecipes({
          recipes: recipeStrings,
          dietaryRestrictions: dietaryRestrictionsForAPI,
        });
        console.log("Respuesta filtrada recibida:", filteredResponse);

        // Solución: Mantener todas las propiedades de las recetas originales que pasaron el filtro
        if (
          filteredResponse.filteredRecipes &&
          filteredResponse.filteredRecipes.length > 0
        ) {
          // Crear un conjunto con los nombres de las recetas filtradas para búsqueda rápida
          const filteredNames = new Set(filteredResponse.filteredRecipes);

          // Filtrar las recetas originales completas basándonos en los nombres que pasaron el filtro
          finalRecipes = finalRecipes.filter((recipe) =>
            filteredNames.has(recipe.name)
          );

          console.log("Recetas después de filtrar:", {
            count: finalRecipes.length,
            sample: finalRecipes.length > 0 ? finalRecipes[0] : null,
          });
        } else {
          finalRecipes = [];
        }
      }

      setRecipes(finalRecipes);
    } catch (err: any) {
      console.error("Error en handleSubmit:", err);
      setError(err?.message || "Error al generar recetas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor: theme.colors.backgroundMedium,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        {recipes.length === 0 && (
          <RecipeForm
            ingredients={ingredients}
            setIngredients={setIngredients}
            restrictions={restrictions}
            setRestrictions={setRestrictions}
            onSubmit={handleSubmit}
            loading={loading}
            showInputs={recipes.length === 0}
          />
        )}
        {recipes.length > 0 && (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingHorizontal: 16,
              marginVertical: 16,
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.fontSizeTitle,
                fontWeight: theme.typography.fontWeightBold,
                color: theme.colors.textPrimary,
              }}
            >
              ¡Aquí tienes tus delicias!
            </Text>
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: theme.colors.primary,
                  padding: 16,
                  borderRadius: 8,
                }}
                onPress={() => setRecipes([])}
              >
                <Text>Volver a generar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      {loading && <ActivityIndicator size="large" color="#2563eb" />}
      {error ? (
        <Text style={{ color: theme.colors.error }}>{error}</Text>
      ) : null}
      {recipes.length > 0 && (
        <View
          style={{ paddingHorizontal: 16, marginBottom: insets.bottom + 60 }}
        >
          {recipes.map((item, index) => (
            <View key={index} style={{ marginBottom: 16 }}>
              <RecipeCard
                name={item.name}
                difficulty={item.dificulty || "Desconocida"}
                time={item.estimatedTime || "Desconocido"}
              />
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
