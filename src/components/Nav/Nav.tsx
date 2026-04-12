"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { ThemeSwitcher } from "@/components/Theme/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/Language/LanguageSwitcher";
import { useLanguage } from "@/components/Language/LanguageProvider";

export function Nav() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const links = [
    { label: t["nav.about"], href: "/about" },
    { label: t["nav.observando"], href: "/observando" },
    { label: t["nav.projects"], href: "/projects" },
  ];

  function openMenu() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setClosing(false);
    setVisible(true);
  }

  function closeMenu() {
    setClosing(true);
    timerRef.current = setTimeout(() => {
      setVisible(false);
      setClosing(false);
    }, 200);
  }

  function toggle() {
    visible && !closing ? closeMenu() : openMenu();
  }

  const isOpen = visible && !closing;

  return (
    <nav style={{ borderBottom: "1px solid var(--theme-border)" }}>
      <style>{`
        @keyframes menuSlideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes menuSlideUp {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-6px); }
        }
      `}</style>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-5 flex items-center justify-between">
        {/* Left: logo + hamburger (mobile only) */}
        <div className="flex items-center gap-4">
          <Link href="/" className="ff-logo" aria-label="inicio" onClick={() => visible && closeMenu()}>
            <Image src="/logo.svg" alt="logo" width={20} height={20} style={{ filter: "var(--logo-filter)", opacity: 0.7 }} />
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className="sm:hidden"
            onClick={toggle}
            aria-label={isOpen ? "cerrar menu" : "abrir menu"}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", flexDirection: "column", gap: "5px" }}
          >
            <span style={{ display: "block", width: "18px", height: "1px", backgroundColor: "var(--theme-muted)", transition: "transform 0.2s ease, opacity 0.2s ease", transform: isOpen ? "translateY(6px) rotate(45deg)" : "none" }} />
            <span style={{ display: "block", width: "18px", height: "1px", backgroundColor: "var(--theme-muted)", transition: "opacity 0.2s ease", opacity: isOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: "18px", height: "1px", backgroundColor: "var(--theme-muted)", transition: "transform 0.2s ease, opacity 0.2s ease", transform: isOpen ? "translateY(-6px) rotate(-45deg)" : "none" }} />
          </button>
        </div>

        {/* Right: desktop links + theme + language */}
        <div className="flex items-center gap-4 sm:gap-8">
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
        </div>
      </div>

      {/* Mobile menu */}
      {visible && (
        <div
          className="sm:hidden"
          style={{
            borderTop: "1px solid var(--theme-border)",
            animation: `${closing ? "menuSlideUp" : "menuSlideDown"} 0.2s ease forwards`,
          }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="ff-nav-link"
              onClick={() => closeMenu()}
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
