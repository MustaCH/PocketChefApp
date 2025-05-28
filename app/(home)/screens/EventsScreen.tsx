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
import { RecipeCard } from "../../../components/ui/RecipeCard";
import DietaryRestrictionTag from "../../../components/ui/DietaryRestrictionTag";
import { LinearGradient } from "expo-linear-gradient";

const dietaryRestrictions = [
  { id: "vegan", label: "Vegano" },
  { id: "vegetarian", label: "Vegetariano" },
  { id: "gluten-free", label: "Libre de Gluten" },
  { id: "lactose-free", label: "Libre de Lactosa" },
  { id: "low-carb", label: "Bajo en Carbs" },
  { id: "keto", label: "Keto" },
  { id: "paleo", label: "Paleo" },
];

export default function EventsScreen() {
  const [eventType, setEventType] = useState("Cita romantica");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [mealType, setMealType] = useState("main course");
  const [loading, setLoading] = useState(false);
  const [generatedRecipes, setGeneratedRecipes] = useState<any[]>([]);

  const handleRestrictionToggle = (restrictionId: string) => {
    const currentRestrictions = restrictions
      .split(",")
      .map((r) => r.trim())
      .filter((r) => r);
    if (currentRestrictions.includes(restrictionId)) {
      setRestrictions(
        currentRestrictions.filter((r) => r !== restrictionId).join(", ")
      );
    } else {
      setRestrictions([...currentRestrictions, restrictionId].join(", "));
    }
  };

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
        "Por favor, ingresa un tipo de comida válido (Entrada, Plato principal, o Postre)."
      );
      return;
    }

    const restrictionsArray = restrictions
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

    setLoading(true);
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
    setLoading(false);
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.headerTitle}>¡Crea el menu de hoy!</Text>
        <Text style={styles.label}>¿Que tipo de evento es?</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={eventType}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setEventType(itemValue)}
            dropdownIconColor={theme.colors.textPrimary}
          >
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

        <Text style={styles.label}>Cantidad de invitados</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter number of guests"
          value={numberOfGuests}
          onChangeText={setNumberOfGuests}
          keyboardType="numeric"
          placeholderTextColor={theme.colors.textPlaceholder}
        />

        <Text style={styles.label}>Restricciones dietarias (opcional)</Text>
        <View style={styles.restrictionsContainer}>
          {dietaryRestrictions.map((restriction) => (
            <DietaryRestrictionTag
              key={restriction.id}
              label={restriction.label}
              selected={restrictions.includes(restriction.id)}
              onPress={() => handleRestrictionToggle(restriction.id)}
            />
          ))}
        </View>
        <Text style={styles.label}>Tipo de comida</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={mealType}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setMealType(itemValue)}
            dropdownIconColor={theme.colors.textPrimary}
          >
            <Picker.Item label="Entrada" value="starter" />
            <Picker.Item label="Plato principal" value="main course" />
            <Picker.Item label="Postre" value="dessert" />
          </Picker>
        </View>
        {loading ? (
          <ActivityIndicator color={theme.colors.textPrimary} />
        ) : (
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleGenerateMenu}
            disabled={loading}
          >
            <LinearGradient
              colors={[
                theme.colors.secondary,
                theme.colors.primary,
                theme.colors.secondary,
              ]}
              start={{ x: 1, y: 2 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <CreateRecipeIcon
                filled={true}
                color={theme.colors.white}
                width={20}
                height={20}
              />
              <Text style={styles.submitButtonText}>CREAR MENÚ</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
        {generatedRecipes.length > 0 && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>Generated Recipes:</Text>
            {generatedRecipes.map((recipe, index) => (
              <RecipeCard
                key={index}
                name={recipe.name}
                image={recipe.image}
                rating={recipe.rating}
                reviews={recipe.reviews}
                difficulty={recipe.difficulty}
                time={recipe.time}
              />
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
  },
  formContainer: {
    backgroundColor: theme.colors.backgroundDark,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    margin: theme.spacing.sm,
    gap: theme.spacing.sm, // 16px
  },
  headerTitle: {
    // Changed
    fontSize: theme.typography.fontSizeTitle,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg, // Changed from sm
    textAlign: "center", // Changed from alignSelf: "flex-start"
  },
  label: {
    fontSize: theme.typography.fontSizeBody,
    fontWeight: theme.typography.fontWeightSemiBold, // Added
    color: theme.colors.textSecondary,
  },
  input: {
    // Changed
    backgroundColor: theme.colors.backgroundMedium,
    color: theme.colors.textPrimary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md - 4, // Changed from theme.spacing.sm
    borderRadius: theme.borderRadius.sm,
    fontSize: theme.typography.fontSizeBody,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  pickerContainer: {
    backgroundColor: theme.colors.backgroundMedium,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    justifyContent: "center",
  },
  picker: {
    color: theme.colors.textPrimary,
    height: 52,
  },
  restrictionsContainer: {
    // Changed
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: theme.spacing.lg - 4, // Added from RecipeForm
    gap: theme.spacing.sm + 2, // 10
  },
  submitButton: {
    backgroundColor: "transparent",
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    overflow: "hidden",
  },
  gradientButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.sm,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
  },
  submitButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSizeBody + 2, // 18
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
});
