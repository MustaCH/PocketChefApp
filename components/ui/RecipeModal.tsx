import React from "react";
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
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
          backgroundColor: theme.colors.backgroundMedium,
          borderRadius: 16,
          marginVertical: theme.spacing.lg,
          marginHorizontal: theme.spacing.lg,
          padding: theme.spacing.md,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <TouchableOpacity
          onPress={closeModal}
          style={{
            alignSelf: "flex-end",
            padding: theme.spacing.sm,
          }}
        >
          <FontAwesome
            name="times"
            size={20}
            color="white"
            style={{ position: "absolute", top: 0, right: 0 }}
          />
        </TouchableOpacity>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginVertical: theme.spacing.md,
          }}
        >
          <TouchableOpacity
            onPress={() => {}}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FontAwesome
              name="heart-o"
              size={30}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: theme.typography.fontSizeHeadline,
              fontWeight: theme.typography.fontWeightBold,
              color: theme.colors.textPrimary,
            }}
          >
            {item.name}
          </Text>
        </View>
        <Image
          source={require("../../assets/images/placeholder-recipe.png")}
          style={{
            width: "100%",
            height: 200,
            resizeMode: "cover",
            borderRadius: 8,
            marginVertical: theme.spacing.md,
          }}
        />
        <View style={{ display: "flex", flexDirection: "row", gap: 16 }}>
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            padding: theme.spacing.md,
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing.md,
          }}
        >
          <View style={{ width: "100%", marginBottom: theme.spacing.md }}>
            <Text
              style={{
                fontSize: theme.typography.fontSizeHeadline,
                fontWeight: theme.typography.fontWeightSemiBold,
                color: theme.colors.textSecondary,
                marginBottom: theme.spacing.md,
              }}
            >
              Ingredientes:
            </Text>
            {item.ingredientsRequired.map((ingredient, index) => {
              return <IngredientListItem key={index} ingredient={ingredient} />;
            })}
          </View>
          <View style={{ flexDirection: "column", gap: theme.spacing.md }}>
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
                  color: theme.colors.textPrimary,
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
