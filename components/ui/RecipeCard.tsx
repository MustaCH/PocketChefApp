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
      className="bg-white p-4 rounded-lg border border-gray-200"
      style={{
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 0, height: 2 },
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
      }}
    >
      <Text className="text-2xl font-bold mb-2">{name}</Text>

      {availableIngredientsUsed && availableIngredientsUsed.length > 0 && (
        <View className="flex flex-col mb-4">
          <Text className="text-lg font-bold">Ingredientes disponibles:</Text>
          <Text className="text-sm text-gray-500">
            {availableIngredientsUsed.join(", ")}
          </Text>
        </View>
      )}

      {ingredientsRequired && ingredientsRequired.length > 0 && (
        <View className="flex flex-col mb-4">
          <Text className="text-lg font-bold">Ingredientes requeridos:</Text>
          <Text className="text-sm text-gray-500">
            {ingredientsRequired.join(", ")}
          </Text>
        </View>
      )}

      <View className="flex flex-col">
        <Text className="text-lg font-bold">Instrucciones:</Text>
        <Text className="text-sm text-gray-500">{instructions}</Text>
      </View>
    </View>
  );
};
