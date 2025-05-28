import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"; // Asegúrate de importar los componentes necesarios de React Native, como View y Text, según tu estructura de proyecto y configuración de compilad
import theme from "../../styles/theme";

interface DietaryRestrictionTagProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export const DietaryRestrictionTag = ({
  label,
  selected,
  onPress,
}: DietaryRestrictionTagProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.restrictionButton,
        selected && styles.restrictionButtonSelected,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.restrictionButtonText,
          selected && styles.restrictionButtonTextSelected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  restrictionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: theme.spacing.lg - 4,
    gap: theme.spacing.sm + 2,
  },
  restrictionButton: {
    backgroundColor: theme.colors.backgroundLight,
    paddingVertical: theme.spacing.sm + 2,
    paddingHorizontal: theme.spacing.md - 1,
    borderRadius: theme.borderRadius.pill,
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  restrictionButtonSelected: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  restrictionButtonText: {
    color: theme.colors.textTertiary,
    fontSize: theme.typography.fontSizeSubtext,
  },
  restrictionButtonTextSelected: {
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeightBold,
  },
});

export default DietaryRestrictionTag;
