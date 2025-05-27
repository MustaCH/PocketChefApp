import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import theme from "../../styles/theme";
import { Recipe } from "../../types";
import { FontAwesome } from "@expo/vector-icons";
import { IngredientListItem } from "./IngredientListItem";

interface RecipeModalProps {
  item: Recipe;
  visible: boolean;
  showModal: () => void;
  closeModal: () => void;
}

export const RecipeModal = ({
  item,
  visible,
  showModal,
  closeModal,
}: RecipeModalProps) => {
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
    <Modal visible={visible} transparent={true} animationType="slide">
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
          backgroundColor: theme.colors.backgroundMedium,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingTop: 55,
            paddingBottom: theme.spacing.md,
            paddingHorizontal: theme.spacing.md,
            backgroundColor: theme.colors.secondary,
            position: "relative",
          }}
        >
          <TouchableOpacity
            onPress={closeModal}
            style={{
              alignSelf: "flex-end",
              padding: theme.spacing.sm,
              position: "absolute",
              top: 10,
              right: 20,
              zIndex: 1, // Asegura que el botón esté por encima del contenid
            }}
          >
            <FontAwesome
              name="close"
              size={30}
              color={theme.colors.white}
              style={{ position: "absolute", top: 0, right: 0 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSaveRecipe}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              maxWidth: "20%",
            }}
          >
            <FontAwesome
              name={savedRecipe ? "heart" : "heart-o"}
              size={30}
              color={theme.colors.white}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: theme.typography.fontSizeHeadline,
              fontWeight: theme.typography.fontWeightBold,
              color: theme.colors.textPrimary,
              maxWidth: "80%",
            }}
          >
            {item.name}
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing.md,
          }}
        >
          <Image
            source={
              item.imageUrl
                ? { uri: item.imageUrl }
                : require("../../assets/images/placeholder-recipe.png")
            }
            style={{
              width: "100%",
              height: 200,
              resizeMode: "cover",
              marginBottom: theme.spacing.md,
            }}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              paddingBottom: theme.spacing.md,
              paddingHorizontal: theme.spacing.md,
              gap: 16,
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.fontSizeSubtext,
                fontWeight: theme.typography.fontWeightSemiBold,
                color: theme.colors.textSecondary,
              }}
            >
              Tiempo estimado:{" "}
              <Text style={{ color: theme.colors.accent }}>
                {item.estimatedTime}
              </Text>{" "}
              minutos
            </Text>
            <Text
              style={{
                fontSize: theme.typography.fontSizeSubtext,
                fontWeight: theme.typography.fontWeightSemiBold,
                color: theme.colors.textSecondary,
              }}
            >
              Dificultad: {item.dificulty}
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              marginBottom: theme.spacing.md,
              paddingHorizontal: theme.spacing.md,
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.fontSizeHeadline,
                fontWeight: theme.typography.fontWeightSemiBold,
                color: theme.colors.black,
                marginBottom: theme.spacing.md,
              }}
            >
              Ingredientes:
            </Text>
            {item.ingredientsRequired.map((ingredient, index) => {
              return <IngredientListItem key={index} ingredient={ingredient} />;
            })}
          </View>
          <View
            style={{
              flexDirection: "column",
              gap: theme.spacing.md,
              paddingHorizontal: theme.spacing.md,
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.fontSizeHeadline,
                color: theme.colors.textPrimary,
                fontWeight: theme.typography.fontWeightSemiBold,
              }}
            >
              Preparación:
            </Text>
            <Text
              style={{
                fontSize: theme.typography.fontSizeBody,
                color: theme.colors.textPrimary,
              }}
            >
              {item.instructions}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginVertical: theme.spacing.lg,
            }}
          >
            <TouchableOpacity
              onPress={() => {}}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: theme.spacing.md,
              }}
            >
              <FontAwesome
                name="share-alt"
                size={25}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={showModal}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: theme.spacing.md,
                borderRadius: 8,
                backgroundColor: theme.colors.primary,
              }}
            >
              <FontAwesome
                name="check"
                size={20}
                color="white"
                style={{ marginRight: 10 }}
              />
              <Text
                style={{
                  fontWeight: theme.typography.fontWeightBold,
                  color: theme.colors.white,
                }}
              >
                Marcar cómo cocinado
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};
