"use client";

import { useLanguage } from "./LanguageProvider";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <button
      onClick={() => setLocale(locale === "es" ? "en" : "es")}
      title={locale === "es" ? "Switch to English" : "Cambiar a español"}
      aria-label={locale === "es" ? "Switch to English" : "Cambiar a español"}
      className="ff-nav-link"
      style={{ fontSize: "0.7rem", letterSpacing: "0.05em", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-mono)" }}
    >
      {t["lang.label"]}
    </button>
  );
}
