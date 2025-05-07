import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";
import { generateRecipes, filterRecipes } from "../services/api";

export const RecipeForm = () => {
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
    <View style={styles.container}>
      <Text style={styles.title}>¿Qué ingredientes tienes?</Text>
      <Text style={styles.subtitle}>
        Ingresa los ingredientes que tienes en tu cocina y nosotros generaremos
        recetas deliciosas para ti!
      </Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Ingredientes</Text>
        <TextInput
          style={styles.input}
          placeholder="e., pollo, arroz, brocoli"
          placeholderTextColor="#888"
          value={ingredients}
          onChangeText={setIngredients}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Restricciones dietarias (Opcional)</Text>
        <TextInput
          style={styles.input}
          placeholder="e., vegano, libre de gluten"
          placeholderTextColor="#888"
          value={restrictions}
          onChangeText={setRestrictions}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={loading ? "Generando..." : "Generar recetas"}
          onPress={handleSubmit}
          color="#2563eb"
          disabled={loading}
        />
      </View>
      {loading && (
        <ActivityIndicator
          style={{ marginTop: 16 }}
          size="large"
          color="#2563eb"
        />
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {recipes.length > 0 && (
        <ScrollView style={styles.results}>
          <Text style={styles.resultsTitle}>Recetas generadas:</Text>
          {recipes.map((recipe, idx) => (
            <View key={idx} style={styles.recipeCard}>
              <Text style={styles.recipeName}>
                {recipe.name || `Receta ${idx + 1}`}
              </Text>
              {recipe.description && (
                <Text style={styles.recipeDescription}>
                  {recipe.description}
                </Text>
              )}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
    margin: 24,
    borderRadius: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    width: "100%",
    textAlign: "left",
    paddingLeft: 8,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 16,
    width: "100%",
    textAlign: "left",
    paddingLeft: 8,
    color: "#333",
  },
  formGroup: {
    width: "100%",
    marginBottom: 12,
  },
  label: {
    fontSize: 15,
    marginBottom: 4,
    color: "#222",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: 10,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    fontSize: 15,
    color: "#222",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
  error: {
    color: "#dc2626",
    marginTop: 16,
    fontSize: 15,
    textAlign: "center",
  },
  results: {
    width: "100%",
    marginTop: 24,
    maxHeight: 320,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  recipeCard: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
  },
  recipeName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  recipeDescription: {
    color: "#444",
    fontSize: 14,
  },
});
