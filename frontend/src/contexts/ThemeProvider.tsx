// File: src/contexts/ThemeProvider.tsx

import { createContext, memo, type ReactNode, useContext, useMemo } from "react";
import { DEFAULT_THEME, THEME_STORAGE_KEY, type Theme } from "@/config/daisyui";
import { useLocalStorage } from "../hooks";

export type ThemeContextProps = {
  theme: Theme;
  isDarkMode: boolean;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export type ThemeProviderProps = {
  children: ReactNode;
};

const validThemes: Theme[] = ["bumblebee", "coffee"];
const darkThemes: Theme[] = ["coffee"];

export const ThemeProvider: React.FC<ThemeProviderProps> = memo(
  ({ children }) => {
    const [theme, changeTheme] = useLocalStorage<Theme>(
      THEME_STORAGE_KEY,
      DEFAULT_THEME,
    );

    const validatedTheme = useMemo(() => {
      if (validThemes.includes(theme)) {
        return theme;
      }
      changeTheme(DEFAULT_THEME);
      return DEFAULT_THEME;
    }, [theme, changeTheme]);

    const isDarkMode = useMemo(() => darkThemes.includes(validatedTheme), [validatedTheme]);

    return (
      <ThemeContext.Provider
        value={{ theme: validatedTheme, setTheme: changeTheme, isDarkMode }}
      >
        <div
          data-theme={validatedTheme}
          data-testid="theme-provider"
          className="min-w-full prose prose-sm md:prose-base bg-base-100"
        >
          {children}
        </div>
      </ThemeContext.Provider>
    );
  },
);