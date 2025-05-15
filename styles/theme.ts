export const colors = {
  primary: "#E67E22", // Orange
  backgroundDark: "#1E2A38", // Darkest blue-gray (form container)
  backgroundMedium: "#2C3E50", // Medium blue-gray (input, card container)
  backgroundLight: "#34495E", // Lighter blue-gray (card details, restriction buttons)
  textPrimary: "#FFFFFF", // White
  textSecondary: "#ECF0F1", // Light gray
  textTertiary: "#BDC3C7", // Lighter gray (subtitles, placeholder)
  textPlaceholder: "#7F8C8D",
  accent: "#FFD700", // Gold/Yellow for ratings
  tagBackground: "#4A6572",
  white: "#FFFFFF",
  black: "#000000",
  lightGray: "#e0e0e0", // For borders or subtle elements if needed
  error: "#E74C3C", // Red for errors
};

export const typography = {
  fontSizeTitle: 28,
  fontSizeHeadline: 22,
  fontSizeBody: 16,
  fontSizeSubtext: 14,
  fontSizeCaption: 12,
  fontWeightBold: "bold" as "bold",
  fontWeightSemiBold: "600" as "600",
  fontWeightNormal: "normal" as "normal",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 20,
};

const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
};

export default theme;
