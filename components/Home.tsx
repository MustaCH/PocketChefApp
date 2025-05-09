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

export default function Home() {
  const insets = useSafeAreaInsets();
  const [ingredients, setIngredients] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [recipes, setRecipes] = useState<any[]>([]);
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

  const renderRecipe = ({ item }: { item: any }) => (
    <RecipeCard
      name={item.name || "Receta sin nombre"}
      instructions={item.instructions || ""}
      availableIngredientsUsed={item.availableIngredientsUsed || []}
      ingredientsRequired={item.ingredientsRequired || []}
    />
  );

  return (
    <ScrollView
      className="flex"
      style={{
        paddingBottom: insets.bottom,
        paddingTop: insets.top + 16,
      }}
    >
      <View
        className="flex flex-col gap-2 m-4 border border-gray-200 rounded-lg p-4"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
          shadowOffset: { width: 0, height: 2 },
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 10,
        }}
      >
        {recipes.length === 0 && (
          <View className="flex flex-col gap-2">
            <Text className="text-2xl font-bold">
              ¿Qué ingredientes tienes?
            </Text>
            <Text className="text-sm text-gray-500">
              Ingresa los ingredientes que tienes en tu cocina y nosotros
              generaremos recetas deliciosas para ti!
            </Text>
          </View>
        )}
        {recipes.length === 0 ? (
          <View className="flex flex-col gap-4 mt-4">
            <View>
              <Text>Ingredientes</Text>
              <TextInput
                className="border border-gray-300 bg-gray-200 rounded-lg p-2 mt-2"
                placeholder="e., pollo, arroz, brocoli"
                placeholderTextColor="#888"
                value={ingredients}
                onChangeText={setIngredients}
              />
            </View>
            <View>
              <Text>Restricciones dietarias (Opcional)</Text>
              <TextInput
                className="border border-gray-300 bg-gray-200 rounded-lg p-2 mt-2"
                placeholder="e., vegano, libre de gluten"
                placeholderTextColor="#888"
                value={restrictions}
                onChangeText={setRestrictions}
              />
            </View>
          </View>
        ) : (
          <View className="flex flex-col gap-4 my-4">
            <Text className="text-xl font-bold">
              Recetacetas generadas con:
            </Text>
            <Text className="text-lg font-semibold">{ingredients}</Text>
            {restrictions && (
              <Text className="text-lg font-bold">{restrictions}</Text>
            )}
          </View>
        )}
        <View className="flex flex-row justify-between gap-2">
          <Button
            buttonStyle={`bg-blue-500 p-6 rounded-lg ${
              recipes.length > 0 ? "w-1/2" : "w-full"
            }`}
            textStyle="text-white text-lg font-semibold text-center"
            title={
              loading
                ? "Generando..."
                : recipes.length > 0
                ? "Regenerar"
                : "Generar recetas"
            }
            onPress={handleSubmit}
            disabled={loading}
          />
          {recipes.length > 0 && (
            <Button
              buttonStyle="bg-red-500 p-6 rounded-lg w-1/2"
              textStyle="text-white text-lg font-semibold text-center"
              title="Borrar recetas"
              onPress={() => setRecipes([])}
            />
          )}
        </View>
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
