// File: src/config/daisyui.ts
// DaisyUI theme configuration

// Available DaisyUI themes
export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  CUPCAKE: "cupcake",
  BUMBLEBEE: "bumblebee",
  EMERALD: "emerald",
  CORPORATE: "corporate",
  SYNTHWAVE: "synthwave",
  RETRO: "retro",
  CYBERPUNK: "cyberpunk",
  VALENTINE: "valentine",
  HALLOWEEN: "halloween",
  GARDEN: "garden",
  FOREST: "forest",
  AQUA: "aqua",
  LOFI: "lofi",
  PASTEL: "pastel",
  FANTASY: "fantasy",
  WIREFRAME: "wireframe",
  BLACK: "black",
  LUXURY: "luxury",
  DRACULA: "dracula",
  CMYK: "cmyk",
  AUTUMN: "autumn",
  BUSINESS: "business",
  ACID: "acid",
  LEMONADE: "lemonade",
  NIGHT: "night",
  COFFEE: "coffee",
  WINTER: "winter",
} as const;

// Type for theme values
export type Theme = typeof THEMES[keyof typeof THEMES];

// Default theme
export const DEFAULT_THEME: Theme = THEMES.LIGHT;

// Storage key for theme preference
export const THEME_STORAGE_KEY = "app-theme";

// Get all available themes as an array
export const getAvailableThemes = (): Theme[] => {
  return Object.values(THEMES);
};

// Check if a theme is valid
export const isValidTheme = (theme: string): theme is Theme => {
  return Object.values(THEMES).includes(theme as Theme);
};