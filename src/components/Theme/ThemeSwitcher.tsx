"use client";

import { useTheme } from "./ThemeProvider";
import { useLanguage } from "@/components/Language/LanguageProvider";

export function ThemeSwitcher() {
  const { theme, setThemeById } = useTheme();
  const { t } = useLanguage();
  const isDark = theme.id !== "light";

  return (
    <button
      onClick={() => setThemeById(isDark ? "light" : "standard")}
      title={isDark ? t["theme.light"] : t["theme.dark"]}
      aria-label={isDark ? t["theme.light"] : t["theme.dark"]}
      className="ff-theme-btn"
      style={{
        width: 11,
        height: 11,
        borderRadius: "50%",
        backgroundColor: "var(--theme-fg)",
        border: "none",
        cursor: "pointer",
        transition: "background-color 0.2s ease, transform 0.15s ease",
        flexShrink: 0,
      }}
    />
  );
}
