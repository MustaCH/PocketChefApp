export interface Recipe {
  name: string;
  dificulty?: string;
  estimatedTime?: string;
  ingredientsRequired: string[];
  instructions: string;
  imageUrl?: string;
}
export interface availableIngredientsUsed {
  name: string;
  dificulty?: string;
  estimatedTime?: string;
  ingredientsRequired: string[];
  instructions: string;
  imageUrl?: string;
}

export interface EventRecipesInput {
  eventType: string;
  numberOfGuests: number;
  mealType: string;
  dietaryRestrictions?: string[];
}
