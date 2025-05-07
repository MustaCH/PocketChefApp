import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  FlatList,
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
    <View style={{ padding: 16, paddingTop: insets.top + 16 }}>
      <View className="flex flex-col gap-2 m-2">
        <View className="flex flex-col gap-2">
          <Text className="text-2xl font-bold">¿Qué ingredientes tienes?</Text>
          <Text className="text-sm text-gray-500">
            Ingresa los ingredientes que tienes en tu cocina y nosotros
            generaremos recetas deliciosas para ti!
          </Text>
        </View>
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
          <View>
            <Button
              buttonStyle="bg-blue-500 p-6 rounded-lg"
              textStyle="text-white text-lg font-semibold text-center"
              title={loading ? "Generando..." : "Generar recetas"}
              onPress={handleSubmit}
              disabled={loading}
            />
          </View>
        </View>
      </View>
      {loading && <ActivityIndicator size="large" color="#2563eb" />}
      {error ? (
        <Text className="text-red-500 mt-4 text-center">{error}</Text>
      ) : null}
      {recipes.length > 0 && (
        <View className="mt-4 flex-1">
          <Text className="text-xl font-bold mb-4">Recetas generadas:</Text>
          <FlatList
            data={recipes}
            renderItem={renderRecipe}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
}
