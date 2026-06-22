"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { Theme, themes } from "@/lib/themes";

interface ThemeContextValue {
  theme: Theme;
  setThemeById: (id: string) => void;
  allThemes: Theme[];
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}

const DEFAULT_THEME = themes.find((t) => t.id === "standard")!;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

  // Se lee localStorage/matchMedia en un efecto (no en el estado inicial)
  // a propósito: en el server no existen, así que el estado inicial debe
  // ser el mismo en server y cliente para evitar un hydration mismatch.
  useEffect(() => {
    const saved = localStorage.getItem("axel-theme");
    if (saved) {
      const found = themes.find((t) => t.id === saved);
      if (found) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- sincroniza el theme guardado client-side después del mount, no puede ir en el estado inicial (ver comentario arriba)
        setTheme(found);
        return;
      }
    }
    // Sin preferencia guardada → detectar preferencia del sistema
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      const lightTheme = themes.find((t) => t.id === "light");
      if (lightTheme) setTheme(lightTheme);
    }
  }, []);

  // Aplicar theme al DOM
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--theme-bg", theme.bg);
    root.style.setProperty("--theme-fg", theme.fg);
    root.style.setProperty("--theme-accent", theme.accent);
    root.style.setProperty("--theme-accent2", theme.accent2);
    root.style.setProperty("--theme-muted", theme.muted);
    root.style.setProperty("--theme-border", theme.border);
    root.style.setProperty("--theme-btn-bg", theme.btnBg);
    root.style.setProperty("--logo-filter", theme.logoFilter);
    root.style.setProperty("--exlibris-filter", theme.exlibrisFilter);
    document.body.style.backgroundColor = theme.bg;
    document.body.style.color = theme.fg;
  }, [theme]);

  const setThemeById = useCallback((id: string) => {
    const found = themes.find((t) => t.id === id);
    if (found) {
      setTheme(found);
      localStorage.setItem("axel-theme", id);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setThemeById, allThemes: themes }}>
      {children}
    </ThemeContext.Provider>
  );
}
