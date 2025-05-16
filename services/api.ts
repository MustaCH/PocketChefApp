import axios from "axios";
import { RAILWAY_API_URL } from "@env";

const API_URL = RAILWAY_API_URL;

export const generateRecipes = async (data: { ingredients: string }) => {
  try {
    const response = await axios.post(`${API_URL}/api/generate-recipes`, data);
    console.log(response.data); // Log the response data to the termina
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error response from server:", error.response.data);
      console.error("Error status from server:", error.response.status);
      // Intenta obtener un mensaje de error más específico si existe
      const errorMessage =
        typeof error.response.data === "string"
          ? error.response.data
          : error.response.data?.message ||
            JSON.stringify(error.response.data) ||
            "Error desconocido del servidor.";
      throw new Error(
        `Error del servidor (${error.response.status}): ${errorMessage}`
      );
    }
    console.error("Network or other error:", error);
    throw new Error(
      "No se pudieron generar las recetas. Problema de red o error inesperado. Por favor, intenta de nuevo."
    );
  }
};

export const filterRecipes = async (data: {
  recipes: string[];
  dietaryRestrictions: string;
}) => {
  try {
    console.log("Enviando datos para filtrar recetas:", {
      recipesCount: data.recipes.length,
      dietaryRestrictions: data.dietaryRestrictions,
      sampleRecipe:
        data.recipes.length > 0 ? data.recipes[0] : "No hay recetas",
    });

    const response = await axios.post(`${API_URL}/api/filter-recipes`, data);

    console.log("Respuesta de filtrado de recetas:", {
      filteredCount: response.data.filteredRecipes?.length || 0,
      sampleFiltered:
        response.data.filteredRecipes?.length > 0
          ? response.data.filteredRecipes[0]
          : "No hay recetas filtradas",
    });

    return response.data;
  } catch (error) {
    console.error("Error al filtrar recetas:", error);

    if (axios.isAxiosError(error) && error.response) {
      console.error("Detalles del error del servidor:", {
        status: error.response.status,
        data: error.response.data,
      });

      throw new Error(
        error.response.data.message ||
          "No se pudieron filtrar las recetas. Por favor, intenta de nuevo."
      );
    }

    throw new Error(
      "No se pudieron filtrar las recetas. Problema de red o error inesperado. Por favor, intenta de nuevo."
    );
  }
};

export const generateRecipeImageAPI = async (data: { recipeName: string }) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/generate-recipe-images`,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        "Error response from server (generateRecipeImageAPI):",
        error.response.data
      );
      console.error(
        "Error status from server (generateRecipeImageAPI):",
        error.response.status
      );
      const errorMessage =
        typeof error.response.data === "string"
          ? error.response.data
          : error.response.data?.message ||
            JSON.stringify(error.response.data) ||
            "Error desconocido del servidor.";
      throw new Error(
        `Error del servidor (${error.response.status}): ${errorMessage}`
      );
    }
    console.error("Network or other error (generateRecipeImageAPI):", error);
    throw new Error(
      "No se pudo generar la imagen de la receta. Problema de red o error inesperado. Por favor, intenta de nuevo."
    );
  }
};
