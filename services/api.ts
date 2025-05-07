import axios from "axios";

// Cambia la IP si usas un emulador físico (por ejemplo, 10.0.2.2 para Android Studio)
const API_URL = "http://192.168.1.7:3001/api";

export const generateRecipes = async (data: any) => {
  const response = await axios.post(`${API_URL}/generate-recipes`, data);
  return response.data;
};

export const filterRecipes = async (data: any) => {
  const response = await axios.post(`${API_URL}/filter-recipes`, data);
  return response.data;
};
