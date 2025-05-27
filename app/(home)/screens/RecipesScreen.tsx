import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import theme from "../../../styles/theme"; // Ajusta la ruta según tu estructura
import { getSpecificRecipe } from "../../../services/api"; // Ajusta la ruta según tu estructura
import { RecipeCard } from "../../../components/ui/RecipeCard"; // Ajusta la ruta según tu estructur
import { FontAwesome } from "@expo/vector-icons"; // Ajusta la ruta según tu estructura

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
      setRecipe(result); // La API devuelve directamente el objeto de la receta
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
      <Text style={styles.title}>¿Que receta buscas hoy?</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Nombre de la receta"
          value={recipeName}
          onChangeText={setRecipeName}
          placeholderTextColor={theme.colors.textSecondary}
          clearButtonMode="always"
        />
        <TouchableOpacity
          onPress={handleSearchRecipe}
          style={{
            backgroundColor: theme.colors.secondary,
            borderTopRightRadius: theme.borderRadius.md,
            borderBottomRightRadius: theme.borderRadius.md,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: theme.spacing.md,
            height: 50,
          }}
        >
          <Text style={{ color: theme.colors.white, fontWeight: "bold" }}>
            Buscar
          </Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <ActivityIndicator
          size="large"
          color={theme.colors.primary}
          style={styles.loader}
        />
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {recipe && (
        <View style={{ width: "100%", marginTop: theme.spacing.lg }}>
          {typeof recipe === "string" ? (
            <Text style={styles.recipeText}>{recipe}</Text>
          ) : (
            <RecipeCard
              name={recipe.name || recipeName}
              imageUrl={recipe.imageUrl || undefined} // O una imagen placeholder
              difficulty={recipe.difficulty} // Valor predeterminado
              time={recipe.time} // Valor predeterminado
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
        <Text style={styles.text}>Ingresa el nombre de una receta</Text>
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
    marginVertical: theme.spacing.lg,
  },
  text: {
    fontSize: theme.typography.fontSizeBody,
    color: theme.colors.textSecondary,
    textAlign: "center",
    marginTop: theme.spacing.md,
  },
  input: {
    height: 50,
    borderColor: theme.colors.secondary,
    borderWidth: 1,
    borderTopLeftRadius: theme.borderRadius.md,
    borderBottomLeftRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.typography.fontSizeBody,
    backgroundColor: theme.colors.backgroundLight,
    color: theme.colors.textPrimary,
    width: "80%", // Ocupa el 90% del ancho
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
