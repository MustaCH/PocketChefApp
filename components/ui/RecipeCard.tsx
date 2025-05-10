import React from "react";
import { View, Text } from "react-native";

interface RecipeCardProps {
  name: string;
  instructions: string;
  availableIngredientsUsed?: string[];
  ingredientsRequired?: string[];
}

export const RecipeCard = ({
  name,
  instructions,
  availableIngredientsUsed,
  ingredientsRequired,
}: RecipeCardProps) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 0, height: 2 },
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        {name}
      </Text>

      {availableIngredientsUsed && availableIngredientsUsed.length > 0 && (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: 16,
            gap: 8,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Ingredientes disponibles:
          </Text>
          <Text style={{ fontSize: 14, color: "gray" }}>
            {availableIngredientsUsed.join(", ")}
          </Text>
        </View>
      )}

      {ingredientsRequired && ingredientsRequired.length > 0 && (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: 16,
            gap: 8,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Ingredientes requeridos:
          </Text>
          <Text style={{ fontSize: 14, color: "gray" }}>
            {ingredientsRequired.join(", ")}
          </Text>
        </View>
      )}

      <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Instrucciones:</Text>
        <Text style={{ fontSize: 14, color: "gray" }}>{instructions}</Text>
      </View>
    </View>
  );
};
