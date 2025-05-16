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
import { RecipeForm } from "./RecipeForm";
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

export default function Home() {
  const insets = useSafeAreaInsets();
  const [ingredients, setIngredients] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null); // Nuevo estado para la receta seleccionada

  const handleShowRecipeModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRecipe(null);
  };

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

      // Generar imágenes para cada receta
      const recipesWithImages = await Promise.all(
        finalRecipes.map(async (recipe) => {
          try {
            console.log(`Generando imagen para: ${recipe.name}`);
            const imageResponse = await generateRecipeImageAPI({
              recipeName: recipe.name,
            });
            console.log(
              `Imagen generada para ${recipe.name}: ${imageResponse.imageUrl}`
            );
            return { ...recipe, imageUrl: imageResponse.imageUrl };
          } catch (imgErr) {
            console.error(
              `Error generando imagen para ${recipe.name}:`,
              imgErr
            );
            return recipe; // Devolver la receta original sin imagen si hay error
          }
        })
      );

      setRecipes(recipesWithImages);
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
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
              >
                Recetas generadas: {recipes.length}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "transparent",
                  borderWidth: 1,
                  borderColor: theme.colors.primary,
                  padding: 12,
                  borderRadius: 8,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
                onPress={() => setRecipes([])}
              >
                <FontAwesome
                  name="refresh"
                  size={20}
                  color="white"
                  style={{ marginRight: 10 }}
                />
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                >
                  Volver a generar
                </Text>
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
                imageUrl={item.imageUrl}
                difficulty={item.dificulty || "Desconocida"}
                time={item.estimatedTime || "Desconocido"}
                onPress={() => handleShowRecipeModal(item)} // Modificado para pasar la receta
              />
            </View>
          ))}
        </View>
      )}
      {selectedRecipe && (
        <RecipeModal
          item={selectedRecipe}
          visible={showModal}
          showModal={() => setShowModal(true)} // showModal no se usa directamente aquí, pero se mantiene por consistencia si es necesario
          closeModal={handleCloseModal} // Modificado para usar la nueva función de cierre
        />
      )}
    </ScrollView>
  );
}
