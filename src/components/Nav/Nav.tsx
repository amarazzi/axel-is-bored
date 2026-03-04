"use client";

import Link from "next/link";
import Image from "next/image";
import { ThemeSwitcher } from "@/components/Theme/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/Language/LanguageSwitcher";
import { useLanguage } from "@/components/Language/LanguageProvider";

export function Nav() {
  const { t } = useLanguage();

  const links = [
    { label: t["nav.about"], href: "/about" },
    { label: t["nav.observando"], href: "/observando" },
    { label: t["nav.projects"], href: "/projects" },
  ];

  return (
    <nav
      style={{ borderBottom: "1px solid var(--theme-border)" }}
    >
      <div className="max-w-4xl mx-auto px-8 py-5 flex items-center justify-between">
        <Link href="/" className="ff-logo" aria-label="inicio">
          <Image src="/logo.svg" alt="logo" width={20} height={20} style={{ filter: "var(--logo-filter)", opacity: 0.7 }} />
        </Link>

        <div className="flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="ff-nav-link">
              {link.label}
            </Link>
          ))}
          <span style={{ color: "var(--theme-border)", fontSize: "0.7rem" }}>|</span>
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
