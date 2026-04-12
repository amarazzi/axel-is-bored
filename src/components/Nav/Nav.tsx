"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ThemeSwitcher } from "@/components/Theme/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/Language/LanguageSwitcher";
import { useLanguage } from "@/components/Language/LanguageProvider";

export function Nav() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const links = [
    { label: t["nav.about"], href: "/about" },
    { label: t["nav.observando"], href: "/observando" },
    { label: t["nav.projects"], href: "/projects" },
  ];

  return (
    <nav style={{ borderBottom: "1px solid var(--theme-border)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-5 flex items-center justify-between">
        <Link href="/" className="ff-logo" aria-label="inicio" onClick={() => setOpen(false)}>
          <Image src="/logo.svg" alt="logo" width={20} height={20} style={{ filter: "var(--logo-filter)", opacity: 0.7 }} />
        </Link>

        <div className="flex items-center gap-4 sm:gap-8">
          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-8">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="ff-nav-link whitespace-nowrap">
                {link.label}
              </Link>
            ))}
            <span style={{ color: "var(--theme-border)", fontSize: "0.7rem" }}>|</span>
          </div>

          <ThemeSwitcher />
          <LanguageSwitcher />

          {/* Hamburger — mobile only */}
          <button
            className="sm:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "cerrar menu" : "abrir menu"}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", flexDirection: "column", gap: "5px" }}
          >
            <span style={{ display: "block", width: "18px", height: "1px", backgroundColor: "var(--theme-muted)", transition: "transform 0.2s ease, opacity 0.2s ease", transform: open ? "translateY(6px) rotate(45deg)" : "none" }} />
            <span style={{ display: "block", width: "18px", height: "1px", backgroundColor: "var(--theme-muted)", transition: "opacity 0.2s ease", opacity: open ? 0 : 1 }} />
            <span style={{ display: "block", width: "18px", height: "1px", backgroundColor: "var(--theme-muted)", transition: "transform 0.2s ease, opacity 0.2s ease", transform: open ? "translateY(-6px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="sm:hidden"
          style={{ borderTop: "1px solid var(--theme-border)" }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="ff-nav-link"
              onClick={() => setOpen(false)}
              style={{ display: "block", padding: "0.85rem 1.5rem", borderBottom: "1px solid var(--theme-border)" }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
