"use client";

import { useLanguage } from "@/components/Language/LanguageProvider";

export function SkipLink() {
  const { t } = useLanguage();
  return (
    <a href="#main-content" className="skip-link">
      {t["nav.skipLink"]}
    </a>
  );
}
