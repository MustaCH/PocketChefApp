export interface Recipe {
  name: string;
  instructions: string;
  availableIngredientsUsed: string[];
  ingredientsRequired: string[];
  dificulty?: "easy" | "medium" | "advanced";
  estimatedTime?: number;
}
