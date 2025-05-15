import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../../styles/theme";

interface IngredientListItemProps {
  ingredient: string;
}

export const IngredientListItem = ({ ingredient }: IngredientListItemProps) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: theme.spacing.sm,
        marginVertical: theme.spacing.xs,
      }}
    >
      <Text style={{ color: "white" }}>•</Text>
      <Text
        style={{
          fontSize: theme.typography.fontSizeSubtext,
          fontWeight: theme.typography.fontWeightSemiBold,
          color: theme.colors.textSecondary,
          flex: 1,
        }}
      >
        {ingredient}
      </Text>
    </View>
  );
};

export default IngredientListItem;
