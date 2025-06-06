import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { DietaryRestrictionTag } from "./DietaryRestrictionTag";
import { CreateRecipeIcon } from "../icons/CreateRecipeIcon";
import theme from "../../styles/theme";

interface RecipeFormProps {
  ingredients: string;
  setIngredients: (value: string) => void;
  restrictions: string;
  setRestrictions: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  showInputs: boolean;
}

const dietaryRestrictions = [
  { id: "vegan", label: "Vegano" },
  { id: "vegetarian", label: "Vegetariano" },
  { id: "gluten-free", label: "Libre de Gluten" },
  { id: "lactose-free", label: "Libre de Lactosa" },
  { id: "low-carb", label: "Bajo en Carbs" },
  { id: "keto", label: "Keto" },
  { id: "paleo", label: "Paleo" },
];

export function RecipeForm({
  ingredients,
  setIngredients,
  restrictions,
  setRestrictions,
  onSubmit,
  loading,
  showInputs,
}: RecipeFormProps) {
  const [currentIngredient, setCurrentIngredient] = useState("");

  if (!showInputs) return null;

  const handleAddIngredient = () => {
    if (currentIngredient.trim() === "") return;
    const existingIngredients = ingredients
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i);
    if (!existingIngredients.includes(currentIngredient.trim())) {
      setIngredients(
        [...existingIngredients, currentIngredient.trim()].join(", ")
      );
    }
    setCurrentIngredient("");
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    const updatedIngredients = ingredients
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i && i !== ingredientToRemove)
      .join(", ");
    setIngredients(updatedIngredients);
  };

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

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>¿Qué tienes hoy en tu cocina?</Text>
      <View>
        <Text style={styles.label}>Ingredientes Principales</Text>
        <Text style={styles.subtitle}>
          Ingresa tus ingredientes y presiona "Añadir".
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ej: pollo, tomate, queso..."
            placeholderTextColor="#7F8C8D"
            value={currentIngredient} // Use currentIngredient state
            onChangeText={setCurrentIngredient} // Update currentIngredient state
            onSubmitEditing={handleAddIngredient} // Call handleAddIngredient
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddIngredient}
          >
            {" "}
            <Text style={styles.addButtonText}>+ Añadir</Text>
          </TouchableOpacity>
        </View>

        {ingredients.trim() !== "" && (
          <View style={styles.ingredientsChipContainer}>
            {ingredients
              .split(",")
              .map((ing) => ing.trim())
              .filter((ing) => ing)
              .map((ingredient, index) => (
                <View key={index} style={styles.ingredientChip}>
                  <Text style={styles.ingredientChipText}>{ingredient}</Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveIngredient(ingredient)}
                    style={styles.removeIngredientButton}
                  >
                    <Text>
                      <FontAwesome
                        name="times"
                        size={12}
                        color={theme.colors.textTertiary}
                      />
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        )}
      </View>
      <View>
        <Text style={styles.label}>Restricciones Dietarias (Opcional)</Text>
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
      </View>
      {/* <View style={styles.rowContainer}>
        <View style={styles.columnContainer}>
          <Text style={styles.label}>Tipo de Comida</Text>
          <View style={styles.selectContainer}>
            <Text style={styles.selectText}>Cualquiera</Text>
            <FontAwesome name="angle-down" size={20} color="#BDC3C7" />
          </View>
        </View>
        <View style={styles.columnContainer}>
          <Text style={styles.label}>Tiempo de Cocción</Text>
          <View style={styles.selectContainer}>
            <Text style={styles.selectText}>Sin límite</Text>
            <FontAwesome name="angle-down" size={20} color="#BDC3C7" />
          </View>
        </View>
      </View> */}
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <TouchableOpacity
          style={styles.submitButton}
          onPress={onSubmit}
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
            <Text style={styles.submitButtonText}>CREAR RECETAS</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: theme.colors.backgroundDark,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    margin: theme.spacing.sm,
    gap: theme.spacing.md, // 16px
  },
  title: {
    fontSize: theme.typography.fontSizeTitle,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
    textAlign: "center",
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: theme.typography.fontSizeBody,
    fontWeight: theme.typography.fontWeightSemiBold,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.fontSizeSubtext - 1, // Adjusted to 13px as per original image
    color: theme.colors.textTertiary,
    marginBottom: theme.spacing.md - 4, // Adjusted to 12px
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: theme.colors.backgroundMedium,
    borderRadius: theme.borderRadius.sm,
    // marginBottom: theme.spacing.lg - 4, // Adjusted to 20px - Will be managed by chip container if chips exist
    alignItems: "center",
  },
  input: {
    flex: 1,
    paddingVertical: theme.spacing.md - 4, // 12
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.typography.fontSizeBody,
    color: theme.colors.textPrimary,
  },
  addButton: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: theme.spacing.md - 4, // 12
    paddingHorizontal: theme.spacing.lg - 4, // 20
    borderTopRightRadius: theme.borderRadius.sm,
    borderBottomRightRadius: theme.borderRadius.sm,
  },
  addButtonText: {
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.fontSizeBody,
  },
  ingredientsChipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: theme.spacing.sm, // Space above chips
    marginBottom: theme.spacing.lg - 4, // Space below chips before next section
    gap: theme.spacing.sm, // Gap between chips
  },
  ingredientChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.backgroundLight,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.pill,
    // marginRight: theme.spacing.sm, // Replaced by gap
    // marginBottom: theme.spacing.sm, // Replaced by gap
  },
  ingredientChipText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizeSubtext,
    marginRight: theme.spacing.xs,
  },
  removeIngredientButton: {
    padding: theme.spacing.xs / 2, // Make the touchable area slightly larger
  },
  restrictionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: theme.spacing.lg - 4, // 20
    gap: theme.spacing.sm + 2, // 10
  },
  restrictionButton: {
    backgroundColor: theme.colors.backgroundLight,
    paddingVertical: theme.spacing.sm + 2, // 10
    paddingHorizontal: theme.spacing.md - 1, // 15
    borderRadius: theme.borderRadius.pill,
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  restrictionButtonSelected: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  restrictionButtonText: {
    color: theme.colors.textTertiary,
    fontSize: theme.typography.fontSizeSubtext,
  },
  restrictionButtonTextSelected: {
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeightBold,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  columnContainer: {
    flex: 1,
  },
  selectContainer: {
    backgroundColor: theme.colors.backgroundMedium,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: theme.spacing.md - 4, // 12
    paddingHorizontal: theme.spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizeBody,
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
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    gap: theme.spacing.sm,
  },
  submitButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSizeBody + 2, // 18
    fontWeight: theme.typography.fontWeightBold,
  },
});
