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
import { Button } from "../components/atoms/button";

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
      const generated = await generateRecipes({ ingredients });
      let finalRecipes = generated;
      if (restrictions.trim()) {
        finalRecipes = await filterRecipes({
          recipes: generated,
          restrictions,
        });
      }
      setRecipes(finalRecipes);
    } catch (err: any) {
      setError(err?.message || "Error al generar recetas");
    } finally {
      setLoading(false);
    }
  };

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
      {loading && (
        <ActivityIndicator
          style={{ marginTop: 16 }}
          size="large"
          color="#2563eb"
        />
      )}
      {error ? <Text>{error}</Text> : null}
      {recipes.length > 0 && (
        <ScrollView>
          <Text>Recetas generadas:</Text>
          {recipes.map((recipe, idx) => (
            <View key={idx}>
              <Text>{recipe.name || `Receta ${idx + 1}`}</Text>
              {recipe.description && <Text>{recipe.description}</Text>}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
