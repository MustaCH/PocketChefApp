import axios from "axios";

// Configuración de la URL base de la API
// Para desarrollo local:
// - Android Emulator: usar 10.0.2.2
// - iOS Simulator: usar localhost
// - Dispositivo físico: usar la IP de tu computadora
const API_URL = process.env.API_URL || "http://10.0.2.2:3001/api";

// Función para generar recetas basadas en ingredientes
export const generateRecipes = async (data: { ingredients: string }) => {
  try {
    console.log("Enviando solicitud a:", `${API_URL}/generate-recipes`);
    console.log("Datos enviados:", data);
    const response = await axios.post(`${API_URL}/generate-recipes`, data);
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
    console.log("Enviando solicitud a:", `${API_URL}/filter-recipes`);
    console.log("Datos enviados:", data);
    const response = await axios.post(`${API_URL}/filter-recipes`, data);
    console.log("Respuesta recibida:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al filtrar recetas:", error);
    throw new Error(
      "No se pudieron filtrar las recetas. Por favor, intenta de nuevo."
    );
  }
};
