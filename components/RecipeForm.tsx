import React from "react";
import { View, Text, TextInput } from "react-native";
import { Button } from "./ui/Buttton";

interface RecipeFormProps {
  ingredients: string;
  setIngredients: (value: string) => void;
  restrictions: string;
  setRestrictions: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  showInputs: boolean;
}

export function RecipeForm({
  ingredients,
  setIngredients,
  restrictions,
  setRestrictions,
  onSubmit,
  loading,
  showInputs,
}: RecipeFormProps) {
  if (!showInputs) return null;
  return (
    <View style={{ gap: 16, marginTop: 16 }}>
      <View style={{ gap: 6 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          ¿Qué ingredientes tienes?
        </Text>
        <Text style={{ fontSize: 14, color: "gray" }}>
          Ingresa los ingredientes que tienes en tu cocina y nosotros
          generaremos recetas deliciosas para ti!
        </Text>
      </View>
      <View style={{ gap: 8 }}>
        <Text>Ingredientes</Text>
        <TextInput
          style={{
            borderWidth: 0.5,
            borderColor: "lightgray",
            backgroundColor: "lightgray",
            borderRadius: 8,
            padding: 16,
          }}
          placeholder="e., pollo, arroz, brocoli"
          placeholderTextColor="#888"
          value={ingredients}
          onChangeText={setIngredients}
        />
      </View>
      <View style={{ gap: 8 }}>
        <Text>Restricciones dietarias (Opcional)</Text>
        <TextInput
          style={{
            borderWidth: 0.5,
            borderColor: "lightgray",
            backgroundColor: "lightgray",
            borderRadius: 8,
            padding: 16,
          }}
          placeholder="e., vegano, libre de gluten"
          placeholderTextColor="#888"
          value={restrictions}
          onChangeText={setRestrictions}
        />
      </View>
      <Button
        buttonStyle={{
          backgroundColor: "blue",
          padding: 16,
          borderRadius: 8,
          width: "100%",
        }}
        textStyle={{
          color: "white",
          fontSize: 16,
          fontWeight: "bold",
          textAlign: "center",
        }}
        title={loading ? "Generando..." : "Generar recetas"}
        onPress={onSubmit}
        disabled={loading}
      />
    </View>
  );
}
