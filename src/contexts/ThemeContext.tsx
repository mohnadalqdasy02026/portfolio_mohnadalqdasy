"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";
type ColorTheme =
  | "aurora"
  | "ocean"
  | "sunset"
  | "forest"
  | "rose"
  | "midnight"
  | "emerald"
  | "amber"
  | "cyan"
  | "violet";

interface ThemeContextType {
  theme: Theme;
  colorTheme: ColorTheme;
  setTheme: (theme: Theme) => void;
  setColorTheme: (colorTheme: ColorTheme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [colorTheme, setColorThemeState] = useState<ColorTheme>("aurora");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem("theme") as Theme;
    const savedColorTheme = localStorage.getItem("colorTheme") as ColorTheme;

    if (savedTheme) setThemeState(savedTheme);
    if (savedColorTheme) setColorThemeState(savedColorTheme);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("theme", theme);
      localStorage.setItem("colorTheme", colorTheme);

      const root = document.documentElement;

      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }

      root.className = root.className
        .split(" ")
        .filter((c) => !c.startsWith("theme-"))
        .join(" ");

      root.classList.add(`theme-${colorTheme}`);
    }
  }, [theme, colorTheme, isMounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const setColorTheme = (newColorTheme: ColorTheme) => {
    setColorThemeState(newColorTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colorTheme,
        setTheme,
        setColorTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
