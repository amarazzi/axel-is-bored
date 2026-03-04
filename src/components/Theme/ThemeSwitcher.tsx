"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeSwitcher() {
  const { theme, setThemeById } = useTheme();
  const isDark = theme.id !== "light";

  return (
    <button
      onClick={() => setThemeById(isDark ? "light" : "standard")}
      title={isDark ? "Modo claro" : "Modo oscuro"}
      aria-label={isDark ? "Modo claro" : "Modo oscuro"}
      style={{
        width: 11,
        height: 11,
        borderRadius: "50%",
        backgroundColor: "var(--theme-fg)",
        border: "none",
        cursor: "pointer",
        transition: "background-color 0.3s ease, transform 0.15s ease",
        flexShrink: 0,
        outline: "none",
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1.4)";
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
      }}
    />
  );
}
