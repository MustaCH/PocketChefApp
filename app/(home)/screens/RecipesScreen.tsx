import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import theme from "../../../styles/theme"; // Ajusta la ruta según tu estructura
import { getSpecificRecipe } from "../../../services/api"; // Ajusta la ruta según tu estructura
import { RecipeCard } from "../../../components/ui/RecipeCard"; // Ajusta la ruta según tu estructur

export default function Page() {
  const [recipeName, setRecipeName] = useState("");
  const [recipe, setRecipe] = useState<any>(null); // Considera usar un tipo más específico para la receta
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearchRecipe = async () => {
    if (!recipeName.trim()) {
      setError("Por favor, ingresa el nombre de una receta.");
      return;
    }
    setLoading(true);
    setError(null);
    setRecipe(null);
    try {
      const result = await getSpecificRecipe({ recipeName });
      setRecipe(result.recipe); // Asumiendo que la respuesta tiene una propiedad 'recipe'
    } catch (err: any) {
      setError(err.message || "Ocurrió un error al buscar la receta.");
    }
    setLoading(false);
  };

  return (
    <ScrollView
      style={styles.scrollViewContainer}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.title}>Buscar Receta Específica</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la receta"
        value={recipeName}
        onChangeText={setRecipeName}
        placeholderTextColor={theme.colors.textSecondary}
      />
      <Button
        title="Buscar Receta"
        onPress={handleSearchRecipe}
        color={theme.colors.primary}
      />

      {loading && (
        <ActivityIndicator
          size="large"
          color={theme.colors.primary}
          style={styles.loader}
        />
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {recipe && (
        <View style={styles.recipeContainer}>
          <Text style={styles.recipeTitle}>Receta Encontrada:</Text>
          {/* Asumiendo que RecipeCard puede manejar el formato de 'recipe' */}
          {/* Si 'recipe' es un string de la receta, necesitarás parsearlo o mostrarlo directamente */}
          {typeof recipe === "string" ? (
            <Text style={styles.recipeText}>{recipe}</Text>
          ) : (
            <RecipeCard
              name={recipe.name || recipeName}
              imageUrl={recipe.imageUrl || undefined} // O una imagen placeholder
              difficulty={recipe.difficulty || "Desconocida"} // Valor predeterminado
              time={recipe.time || "N/A"} // Valor predeterminado
              onPress={() => {
                /* Lógica al presionar la tarjeta si es necesario */
              }}
            />
          )}
        </View>
      )}
      {!loading && !recipe && !error && recipeName !== "" && (
        <Text style={styles.text}>Intenta buscar una receta.</Text>
      )}
      {!loading && !recipe && !error && recipeName === "" && (
        <Text style={styles.text}>
          Ingresa el nombre de una receta para comenzar.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: theme.colors.backgroundMedium,
  },
  container: {
    flexGrow: 1, // Permite que el contenido crezca y se desplace
    justifyContent: "flex-start", // Alinea el contenido al inicio
    alignItems: "center",
    backgroundColor: theme.colors.backgroundMedium,
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.fontSizeTitle,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  text: {
    fontSize: theme.typography.fontSizeBody,
    color: theme.colors.textSecondary,
    textAlign: "center",
    marginTop: theme.spacing.md,
  },
  input: {
    height: 50,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.typography.fontSizeBody,
    backgroundColor: theme.colors.backgroundLight,
    color: theme.colors.textPrimary,
    width: "90%", // Ocupa el 90% del ancho
  },
  loader: {
    marginTop: theme.spacing.lg,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.typography.fontSizeBody,
    marginTop: theme.spacing.md,
    textAlign: "center",
  },
  recipeContainer: {
    marginTop: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: theme.borderRadius.md,
    width: "90%", // Ocupa el 90% del ancho
    alignItems: "center",
  },
  recipeTitle: {
    fontSize: theme.typography.fontSizeCaption,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  recipeText: {
    fontSize: theme.typography.fontSizeBody,
    color: theme.colors.textSecondary,
    textAlign: "left",
  },
});
