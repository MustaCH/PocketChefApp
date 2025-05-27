import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import theme from "../../../styles/theme";
import { generateEventRecipes } from "../../../services/api"; // Ajusta la ruta si es necesario
import { CreateRecipeIcon } from "../../../components/icons/CreateRecipeIcon"; // Ajusta la ruta si es necesario
import { EventRecipesInput } from "../../../types";

export default function EventsScreen() {
  const [eventType, setEventType] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [mealType, setMealType] = useState(""); // e.g., "starter", "main course", "dessert"
  const [isLoading, setIsLoading] = useState(false);
  const [generatedRecipes, setGeneratedRecipes] = useState<any[]>([]); // Para almacenar las recetas generadas

  const handleGenerateMenu = async () => {
    if (!eventType.trim()) {
      Alert.alert("Error", "Por favor, ingresa el tipo de evento.");
      return;
    }
    const guests = parseInt(numberOfGuests, 10);
    if (isNaN(guests) || guests <= 0) {
      Alert.alert("Error", "Por favor, ingresa un número válido de invitados.");
      return;
    }
    if (
      !mealType.trim() ||
      !["starter", "main course", "dessert"].includes(mealType.toLowerCase())
    ) {
      Alert.alert(
        "Error",
        "Por favor, ingresa un tipo de comida válido (starter, main course, o dessert)."
      );
      return;
    }

    const restrictionsArray = dietaryRestrictions
      .split(",")
      .map((r) => r.trim())
      .filter((r) => r !== "");

    const input: EventRecipesInput = {
      eventType,
      numberOfGuests: guests,
      mealType: mealType.toLowerCase() as "starter" | "main course" | "dessert",
      dietaryRestrictions:
        restrictionsArray.length > 0 ? restrictionsArray : undefined,
    };

    setIsLoading(true);
    setGeneratedRecipes([]);
    try {
      const result = await generateEventRecipes(input);
      console.log("Generated Recipes:", JSON.stringify(result, null, 2));
      if (result && result.recipes) {
        setGeneratedRecipes(result.recipes);
        Alert.alert("Éxito", `Se generaron ${result.recipes.length} recetas.`);
      } else {
        Alert.alert("Respuesta inesperada", "La API no devolvió recetas.");
      }
    } catch (error: any) {
      console.error("Error generating menu:", error);
      Alert.alert(
        "Error",
        error.message || "No se pudieron generar las recetas. Intenta de nuevo."
      );
    }
    setIsLoading(false);
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.headerTitle}>Crear Menu</Text>
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Event Details</Text>

        <Text style={styles.label}>Event Type</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={eventType}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setEventType(itemValue)}
            dropdownIconColor={theme.colors.textPrimary} // Color del icono del desplegable
          >
            <Picker.Item label="Select Event Type" value="" />
            <Picker.Item label="Cita romantica" value="Cita romantica" />
            <Picker.Item
              label="Reunión con amigos"
              value="Reunión con amigos"
            />
            <Picker.Item label="Fiesta familiar" value="Fiesta familiar" />
            <Picker.Item
              label="Reunión de trabajo"
              value="Reunión de trabajo"
            />
          </Picker>
        </View>

        <Text style={styles.label}>Number of Guests</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter number of guests"
          value={numberOfGuests}
          onChangeText={setNumberOfGuests}
          keyboardType="numeric"
          placeholderTextColor={theme.colors.textPlaceholder}
        />

        <Text style={styles.label}>Dietary Restrictions</Text>
        <TextInput
          style={styles.input}
          placeholder="Select Restrictions (e.g., vegetarian, gluten-free)"
          value={dietaryRestrictions}
          onChangeText={setDietaryRestrictions}
          placeholderTextColor={theme.colors.textPlaceholder}
        />

        <Text style={styles.label}>Meal Type</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Meal Type (starter, main course, dessert)"
          value={mealType}
          onChangeText={setMealType}
          placeholderTextColor={theme.colors.textPlaceholder}
        />

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleGenerateMenu}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={theme.colors.textPrimary} />
          ) : (
            <>
              <CreateRecipeIcon color={theme.colors.white} filled={true} />
              <Text style={styles.buttonText}>Crear menú</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Aquí podrías mostrar las recetas generadas */}
        {generatedRecipes.length > 0 && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>Generated Recipes:</Text>
            {generatedRecipes.map((recipe, index) => (
              <View key={index} style={styles.recipeCard}>
                <Text style={styles.recipeName}>{recipe.name}</Text>
                <Text style={styles.recipeDescription}>
                  {recipe.description}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: theme.colors.backgroundMedium,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: theme.colors.backgroundMedium,
    padding: theme.spacing.lg, // Aumentado el padding general
    paddingTop: theme.spacing.xl, // Más padding arriba
  },
  formContainer: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: theme.colors.backgroundMedium,
  },
  headerTitle: {
    fontSize: theme.typography.fontSizeTitle, // Un poco más grande
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
    alignSelf: "flex-start", // Alineado a la izquierda como en la imagen
    paddingLeft: theme.spacing.sm, // Pequeño padding para que no esté pegado al borde
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizeSubtext,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg, // Más espacio debajo del título de la sección
  },
  label: {
    fontSize: theme.typography.fontSizeBody,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
    marginTop: theme.spacing.md,
  },
  input: {
    backgroundColor: theme.colors.backgroundMedium, // Color de fondo para inputs
    color: theme.colors.textPrimary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    fontSize: theme.typography.fontSizeBody,
    borderWidth: 1,
    borderColor: theme.colors.primary, // Corrected from theme.colors.border to theme.colors.primary to match original
    marginBottom: theme.spacing.md,
  },
  pickerContainer: {
    backgroundColor: theme.colors.backgroundMedium,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.primary, // Assuming border color should be consistent, changed from theme.colors.border
    marginBottom: theme.spacing.md,
    justifyContent: "center", // Centra el Picker verticalmente si es necesario
  },
  picker: {
    color: theme.colors.textPrimary,
    height: 50, // Ajusta la altura según sea necesario
    // El padding y otros estilos pueden necesitar ajustes específicos para Picker
  },
  button: {
    backgroundColor: theme.colors.secondary, // Color naranja como en la imagen
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: theme.spacing.sm,
    alignItems: "center",
    marginTop: theme.spacing.lg,
    elevation: 2,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.backgroundMedium,
  },
  buttonText: {
    color: theme.colors.white, // Texto oscuro sobre fondo naranja
    fontSize: 20,
    fontWeight: theme.typography.fontWeightBold,
  },
  resultsContainer: {
    marginTop: theme.spacing.lg,
    width: "100%",
  },
  resultsTitle: {
    fontSize: theme.typography.fontSizeTitle,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  recipeCard: {
    backgroundColor: theme.colors.backgroundMedium,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  recipeName: {
    fontSize: theme.typography.fontSizeTitle,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
  },
  recipeDescription: {
    fontSize: theme.typography.fontSizeBody,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
});

// Es posible que necesites definir GenerateEventRecipesInput en un archivo de tipos
// o importarlo desde donde esté definido si no es en api.ts
// export type GenerateEventRecipesInput = {
//   eventType: string;
//   numberOfGuests: number;
//   mealType: "starter" | "main course" | "dessert";
//   dietaryRestrictions?: string[];
// };
