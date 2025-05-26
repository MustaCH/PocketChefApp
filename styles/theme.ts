export const colors = {
  primary: "#ED8C29",
  secondary: "#F45014", // Orange (from image button, kept existing)
  backgroundDark: "#F4F4F4", // Very light gray for subtle background variations
  backgroundMedium: "#FFFFFF", // White (main content, cards, matching image)
  backgroundLight: "#EAEAEA", // Slightly off-white for subtle distinctions if needed
  textPrimary: "#212121", // Very dark gray/almost black (for text on white background)
  textSecondary: "#555555", // Dark gray (for secondary text)
  textTertiary: "#757575", // Medium gray (subtitles)
  textPlaceholder: "#A0A0A0", // Lighter gray (placeholders)
  accent: "#60A5A5", // Muted teal (from image chef background)
  white: "#FFFFFF",
  black: "#000000",
  lightGray: "#D3D3D3", // Standard light gray for borders/dividers
  error: "#E74C3C", // Red for errors (kept existing)
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
