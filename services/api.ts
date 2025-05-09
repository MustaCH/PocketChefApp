import axios from "axios";
import { RAILWAY_API_URL } from "@env";

const API_URL = RAILWAY_API_URL;
// Función para generar recetas basadas en ingredientes
export const generateRecipes = async (data: { ingredients: string }) => {
  try {
    console.log("Enviando solicitud a:", `${API_URL}/api/generate-recipes`);
    console.log("Datos enviados:", data);
    const response = await axios.post(`${API_URL}/api/generate-recipes`, data);
    console.log("Respuesta recibida:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al generar recetas:", error);
    throw new Error(
      "No se pudieron generar las recetas. Por favor, intenta de nuevo."
    );
  }
};

// Función para filtrar recetas según restricciones
export const filterRecipes = async (data: {
  recipes: any[];
  restrictions: string;
}) => {
  try {
    console.log("Enviando solicitud a:", `${API_URL}/api/filter-recipes`);
    console.log("Datos enviados:", data);
    const response = await axios.post(`${API_URL}/api/filter-recipes`, data);
    console.log("Respuesta recibida:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al filtrar recetas:", error);
    throw new Error(
      "No se pudieron filtrar las recetas. Por favor, intenta de nuevo."
    );
  }
};
