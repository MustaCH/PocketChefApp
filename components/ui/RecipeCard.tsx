import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Assuming you're using Expo for icons
import theme from "../../styles/theme";

interface RecipeCardProps {
  name: string;
  imageUrl: string | undefined;
  difficulty: string; // Added difficulty from the image
  time: string | number; // Added time from the image
  onPress?: () => void;
}

export const RecipeCard = ({
  name,
  difficulty,
  time,
  imageUrl,
  onPress,
}: RecipeCardProps) => {
  const [savedRecipe, setSavedRecipe] = useState(false); // State to track if the recipe is saved
  const image = require("../../assets/images/placeholder-recipe.png"); // Fallback image

  const handleSaveRecipe = () => {
    if (savedRecipe) {
      setSavedRecipe(false); // Set the recipe as saved
    } else {
      setSavedRecipe(true); // Set the recipe as unsaved
    }
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        onPress={handleSaveRecipe}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          maxWidth: "20%",
          position: "absolute",
          top: 5,
          right: 10,
          padding: 8,
          zIndex: 1,
        }}
      >
        <FontAwesome
          name={savedRecipe ? "heart" : "heart-o"}
          size={30}
          color={theme.colors.primary}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <ImageBackground
          source={imageUrl ? { uri: imageUrl } : image}
          style={styles.imageBackground}
          imageStyle={{ borderTopRightRadius: 12, borderTopLeftRadius: 12 }}
        >
          <View style={styles.overlay}>
            <Text style={styles.recipeName}>{name}</Text>
            {/* <Text style={styles.recipeDescription}>{description}</Text> */}
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <View style={styles.tagsContainer}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{difficulty}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{time} min</Text>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          {/* <FontAwesome name="star" size={16} color="#FFD700" />
          {/* <Text style={styles.ratingText}>
            {rating.toFixed(1)} ({reviews} reviews)
          </Text> */}
        </View>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <FontAwesome
            name={"eye"}
            size={20}
            color={theme.colors.textPrimary}
          />
          <Text style={styles.buttonText}>VER RECETA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#2C3E50", // Dark blue-gray background for the whole card
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 5, // For Android shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    position: "relative",
  },
  imageBackground: {
    width: "100%",
    height: 200, // Adjust as needed
    justifyContent: "flex-end",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for text readability
    padding: 16,
  },
  recipeName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  recipeDescription: {
    fontSize: 14,
    color: "white",
    marginBottom: 8,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: "#34495E", // Slightly lighter dark blue-gray for details section
  },
  tagsContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  tag: {
    backgroundColor: "#4A6572", // Darker tag background
    borderRadius: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  tagText: {
    color: "white",
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  ratingText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#F1C40F", // Gold color for rating text
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#E67E22", // Orange button
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
