import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { filterRecipes, generateRecipes } from "../services/api";
import { Button } from "./ui/Buttton";
import { RecipeCard } from "./ui/RecipeCard";
import { Recipe } from "../types";
import { RecipeForm } from "./RecipeForm";

export default function Home() {
  const insets = useSafeAreaInsets();
  const [ingredients, setIngredients] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setRecipes([]);
    try {
      const response = await generateRecipes({ ingredients });
      let finalRecipes = response.recipes || [];
      if (restrictions.trim()) {
        const filteredResponse = await filterRecipes({
          recipes: finalRecipes,
          restrictions,
        });
        finalRecipes = filteredResponse.recipes || [];
      }

      setRecipes(finalRecipes);
    } catch (err: any) {
      setError(err?.message || "Error al generar recetas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex" showsVerticalScrollIndicator={false}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
          shadowOffset: { width: 0, height: 2 },
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 10,
          borderColor: "gray",
          borderWidth: 0.5,
          borderRadius: 16,
          margin: 16,
          padding: 16,
        }}
      >
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
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              buttonStyle={{
                backgroundColor: "blue",
                padding: 16,
                borderRadius: 8,
                width: recipes.length > 0 ? "48%" : "100%",
              }}
              textStyle={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
              }}
              title={loading ? "Generando..." : "Regenerar"}
              onPress={handleSubmit}
              disabled={loading}
            />
            <Button
              buttonStyle={{
                backgroundColor: "red",
                padding: 16,
                borderRadius: 8,
                width: "48%",
              }}
              textStyle={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
              }}
              title="Borrar recetas"
              onPress={() => setRecipes([])}
            />
          </View>
        )}
      </View>
      {loading && <ActivityIndicator size="large" color="#2563eb" />}
      {error ? (
        <Text className="text-red-500 mt-4 text-center">{error}</Text>
      ) : null}
      {recipes.length > 0 && (
        <View
          style={{ paddingHorizontal: 16, marginBottom: insets.bottom + 60 }}
        >
          {recipes.map((item, index) => (
            <View key={index} style={{ marginBottom: 16 }}>
              <RecipeCard
                name={item.name || "Receta sin nombre"}
                instructions={item.instructions || ""}
                availableIngredientsUsed={item.availableIngredientsUsed || []}
                ingredientsRequired={item.ingredientsRequired || []}
              />
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
