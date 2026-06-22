"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/Language/LanguageProvider";

export function DynamicTitle() {
  const { t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      document.title = t["meta.title.home"];
    } else if (pathname === "/about") {
      document.title = t["meta.title.about"];
    } else if (pathname === "/projects") {
      document.title = t["meta.title.projects"];
    } else if (pathname === "/observando") {
      document.title = t["meta.title.observando"];
    } else if (pathname === "/cositas") {
      document.title = t["meta.title.cositas"];
    }
  }, [pathname, t]);

  return null;
}
