"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { themes } from "@/lib/themes";
import { ThemeSwitcher } from "@/components/Theme/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/Language/LanguageSwitcher";
import { useLanguage } from "@/components/Language/LanguageProvider";
import type { Locale } from "@/lib/i18n";

// ─── helpers ──────────────────────────────────────────────────────────────────

type Txt = { es: string; en: string };
function tx(t: Txt, locale: Locale): string {
  return locale === "en" ? t.en : t.es;
}

function Divider({ label }: { label: string }) {
  return (
    <div style={{ borderTop: "1px solid var(--theme-border)", paddingTop: "3rem", marginTop: "3rem" }}>
      <p className="ff-section-label mb-10">{label}</p>
    </div>
  );
}

// ─── 1. Tokens ────────────────────────────────────────────────────────────────

type ColorKey = "bg" | "fg" | "accent" | "accent2" | "muted" | "border" | "btnBg";

const colorTokens: { key: ColorKey; cssVar: string; label: string; usage: Txt }[] = [
  { key: "bg",      cssVar: "--theme-bg",     label: "bg",      usage: { es: "Fondo de página y elementos",      en: "Page and element background" } },
  { key: "fg",      cssVar: "--theme-fg",     label: "fg",      usage: { es: "Texto principal y énfasis máximo", en: "Primary text and maximum emphasis" } },
  { key: "accent",  cssVar: "--theme-accent",  label: "accent",  usage: { es: "Títulos, íconos activos",          en: "Headings, active icons" } },
  { key: "accent2", cssVar: "--theme-accent2", label: "accent2", usage: { es: "Texto corrido, links inline",      en: "Body text, inline links" } },
  { key: "muted",   cssVar: "--theme-muted",   label: "muted",   usage: { es: "Texto secundario, nav inactivo",   en: "Secondary text, inactive nav" } },
  { key: "border",  cssVar: "--theme-border",  label: "border",  usage: { es: "Divisores, bordes, separadores",   en: "Dividers, borders, separators" } },
  { key: "btnBg",   cssVar: "--theme-btn-bg",  label: "btnBg",   usage: { es: "Fondo de botones y chips",         en: "Button and chip background" } },
];

function ColorTokens({ locale }: { locale: Locale }) {
  const dark  = themes.find((t) => t.id === "standard")!;
  const light = themes.find((t) => t.id === "light")!;
  const col = { token: locale === "en" ? "token / usage" : "token / uso" };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 140px 140px", gap: "1rem", paddingBottom: "0.5rem", borderBottom: "1px solid var(--theme-border)" }}>
        <span className="ff-section-label">{col.token}</span>
        <span className="ff-section-label">standard</span>
        <span className="ff-section-label">light</span>
      </div>

      {colorTokens.map((t, i) => (
        <div
          key={t.key}
          style={{ display: "grid", gridTemplateColumns: "1fr 140px 140px", gap: "1rem", padding: "0.85rem 0", borderBottom: i < colorTokens.length - 1 ? "1px solid var(--theme-border)" : "none", alignItems: "center" }}
        >
          <div>
            <span style={{ fontSize: "0.8rem", color: "var(--theme-fg)", fontWeight: 400 }}>{t.label}</span>
            <br />
            <code style={{ fontSize: "0.65rem", color: "var(--theme-muted)" }}>{t.cssVar}</code>
            <br />
            <span style={{ fontSize: "0.68rem", color: "var(--theme-muted)" }}>{tx(t.usage, locale)}</span>
          </div>
          {[dark[t.key] as string, light[t.key] as string].map((hex, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div style={{ width: "28px", height: "28px", backgroundColor: hex, border: "1px solid rgba(128,128,128,0.2)", borderRadius: "4px", flexShrink: 0 }} />
              <code style={{ fontSize: "0.65rem", color: "var(--theme-muted)" }}>{hex}</code>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── 1b. Radius tokens ────────────────────────────────────────────────────────

const radiusTokens = [
  { token: "--radius-sm", value: "2px",  usage: { es: "Focus ring, skip link, badges, chips",      en: "Focus ring, skip link, badges, chips" } },
  { token: "--radius-md", value: "6px",  usage: { es: "Portadas de libros y películas, code, pre", en: "Book/film covers, code, pre" } },
  { token: "--radius-lg", value: "12px", usage: { es: "Fotos de perfil, screenshots de proyectos", en: "Profile photos, project screenshots" } },
];

function RadiusTokens({ locale }: { locale: Locale }) {
  return (
    <div style={{ borderTop: "1px solid var(--theme-border)" }}>
      {radiusTokens.map((r, i) => (
        <div
          key={r.token}
          style={{ display: "grid", gridTemplateColumns: "1fr 60px 1fr", gap: "1rem", padding: "0.85rem 0", borderBottom: i < radiusTokens.length - 1 ? "1px solid var(--theme-border)" : "none", alignItems: "center" }}
        >
          <div>
            <code style={{ fontSize: "0.65rem", color: "var(--theme-muted)" }}>{r.token}</code>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div style={{ width: "28px", height: "28px", backgroundColor: "var(--theme-btn-bg)", border: "1px solid var(--theme-border)", borderRadius: r.value, flexShrink: 0 }} />
            <code style={{ fontSize: "0.65rem", color: "var(--theme-muted)" }}>{r.value}</code>
          </div>
          <span style={{ fontSize: "0.72rem", color: "var(--theme-muted)", lineHeight: 1.5 }}>{tx(r.usage, locale)}</span>
        </div>
      ))}
    </div>
  );
}

// ─── 2. Espaciado ────────────────────────────────────────────────────────────

const spacingScale: { token: string; px: number; rem: string; classes: string; usage: Txt }[] = [
  { token: "1",  px: 4,   rem: "0.25rem", classes: "p-1 · gap-1",               usage: { es: "Padding mínimo en badges y chips",              en: "Minimum padding on badges and chips" } },
  { token: "2",  px: 8,   rem: "0.5rem",  classes: "gap-2 · mb-2 · mt-2",       usage: { es: "Separación entre elementos inline",             en: "Gap between inline elements" } },
  { token: "3",  px: 12,  rem: "0.75rem", classes: "gap-3 · mb-3",               usage: { es: "Gap entre icono y texto, items de nav",         en: "Icon-to-text gap, nav items" } },
  { token: "4",  px: 16,  rem: "1rem",    classes: "p-4 · gap-4 · mb-4",         usage: { es: "Gap base, padding de contenedores pequeños",    en: "Base gap, small container padding" } },
  { token: "5",  px: 20,  rem: "1.25rem", classes: "gap-5 · py-5 · mb-5",        usage: { es: "Gap entre tarjetas de libro, padding del nav",  en: "Book card gap, nav padding" } },
  { token: "6",  px: 24,  rem: "1.5rem",  classes: "gap-6 · mb-6 · mt-6",        usage: { es: "Margin inferior de section labels",             en: "Bottom margin below section labels" } },
  { token: "8",  px: 32,  rem: "2rem",    classes: "px-8 · py-8 · gap-8 · mb-8", usage: { es: "Padding horizontal de página (base)",           en: "Page horizontal padding (base)" } },
  { token: "10", px: 40,  rem: "2.5rem",  classes: "mb-10 · mt-10",              usage: { es: "Margin debajo de section headers",              en: "Margin below section headers" } },
  { token: "12", px: 48,  rem: "3rem",    classes: "space-y-12 · gap-12",        usage: { es: "Separación entre bloques de contenido",         en: "Gap between content blocks" } },
  { token: "14", px: 56,  rem: "3.5rem",  classes: "mb-14",                      usage: { es: "Margin debajo del subtítulo en páginas internas", en: "Margin below subtitle on inner pages" } },
  { token: "16", px: 64,  rem: "4rem",    classes: "py-16 · gap-16 · mt-16",     usage: { es: "Padding vertical (mobile), gap de columnas grandes", en: "Vertical padding (mobile), large column gap" } },
  { token: "24", px: 96,  rem: "6rem",    classes: "py-24 · mt-24",              usage: { es: "Padding vertical (desktop sm:), secciones hero", en: "Vertical padding (desktop sm:), hero sections" } },
  { token: "28", px: 112, rem: "7rem",    classes: "mb-28",                      usage: { es: "Margin inferior en HomeContent",                en: "Bottom margin in HomeContent" } },
];

const MAX_PX = 112;
const MAX_BAR = 180;

function Spacing({ locale }: { locale: Locale }) {
  const labels = {
    token: "token",
    pxRem: "px / rem",
    classes: locale === "en" ? "classes" : "clases",
    usage:   locale === "en" ? "usage"   : "uso",
  };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "48px 80px 100px 1fr", gap: "1rem", paddingBottom: "0.5rem", borderBottom: "1px solid var(--theme-border)" }}>
        <span className="ff-section-label">{labels.token}</span>
        <span className="ff-section-label">{labels.pxRem}</span>
        <span className="ff-section-label">{labels.classes}</span>
        <span className="ff-section-label">{labels.usage}</span>
      </div>

      {spacingScale.map((s, i) => (
        <div
          key={s.token}
          style={{ display: "grid", gridTemplateColumns: "48px 80px 100px 1fr", gap: "1rem", padding: "0.75rem 0", borderBottom: i < spacingScale.length - 1 ? "1px solid var(--theme-border)" : "none", alignItems: "center" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <code style={{ fontSize: "0.65rem", color: "var(--theme-muted)" }}>{s.token}</code>
            <div style={{ height: "4px", width: `${Math.round((s.px / MAX_PX) * MAX_BAR)}px`, maxWidth: "48px", backgroundColor: "var(--theme-accent2)", borderRadius: "2px", opacity: 0.5 }} />
          </div>
          <div>
            <span style={{ fontSize: "0.72rem", color: "var(--theme-fg)", fontWeight: 400 }}>{s.px}px</span>
            <br />
            <code style={{ fontSize: "0.62rem", color: "var(--theme-muted)" }}>{s.rem}</code>
          </div>
          <code style={{ fontSize: "0.62rem", color: "var(--theme-muted)", lineHeight: 1.7 }}>
            {s.classes.split(" · ").map((cls, j) => <span key={j} style={{ display: "block" }}>{cls}</span>)}
          </code>
          <span style={{ fontSize: "0.72rem", color: "var(--theme-muted)", lineHeight: 1.5 }}>{tx(s.usage, locale)}</span>
        </div>
      ))}
    </div>
  );
}

// ─── 3. Tipografía ────────────────────────────────────────────────────────────

const typeWeights = [
  { weight: 300, label: "Light — 300" },
  { weight: 400, label: "Regular — 400" },
  { weight: 500, label: "Medium — 500" },
];

const typeScale: { name: string; size: string; tracking: string; weight: number; transform: "uppercase" | "none"; sample: Txt }[] = [
  { name: "ff-section-label", size: "0.65rem",     tracking: "0.18em",   weight: 400, transform: "uppercase", sample: { es: "SECCIÓN / CATEGORÍA",                             en: "SECTION / CATEGORY" } },
  { name: "ff-back / meta",   size: "0.70–0.75rem", tracking: "0.10em",  weight: 300, transform: "none",      sample: { es: "← volver · subtítulo de página",                  en: "← back · page subtitle" } },
  { name: "ff-nav-link",      size: "0.80rem",      tracking: "0.02em",  weight: 400, transform: "none",      sample: { es: "sobre mí · mis textos · apps",                    en: "about me · my writing · apps" } },
  { name: "ff-body-text",     size: "0.85rem",      tracking: "normal",  weight: 300, transform: "none",      sample: { es: "Texto corrido estándar para cuerpos de sección.",  en: "Standard body text for page sections." } },
  { name: "post-content",     size: "0.88rem",      tracking: "normal",  weight: 300, transform: "none",      sample: { es: "Contenido de posts. La realidad me interesa como punto de partida.", en: "Post content. Reality interests me as a starting point." } },
  { name: "base",             size: "1rem (15px)",  tracking: "normal",  weight: 300, transform: "none",      sample: { es: "Tamaño base del documento HTML.",                  en: "Base document size." } },
  { name: "h1 / título",      size: "1.5rem",       tracking: "-0.01em", weight: 300, transform: "none",      sample: { es: "Design System",                                   en: "Design System" } },
];

function Typography({ locale }: { locale: Locale }) {
  const pangramSample = locale === "en"
    ? "The quick brown fox jumps over the lazy dog."
    : "El veloz murciélago hindú comía feliz cardillo y kiwi.";

  const labels = {
    weights:  locale === "en" ? "weights — IBM Plex Mono" : "pesos — IBM Plex Mono",
    scale:    locale === "en" ? "type scale"              : "escala tipográfica",
  };

  return (
    <div className="space-y-12">
      <div>
        <p className="ff-section-label mb-6">{labels.weights}</p>
        <div className="space-y-6">
          {typeWeights.map((w) => (
            <div key={w.weight}>
              <span className="ff-section-label" style={{ marginBottom: "0.4rem", display: "block" }}>{w.label}</span>
              <p style={{ fontSize: "1rem", fontWeight: w.weight, color: "var(--theme-accent2)", lineHeight: 1.5 }}>
                {pangramSample}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="ff-section-label mb-6">{labels.scale}</p>
        <div style={{ borderTop: "1px solid var(--theme-border)" }}>
          {typeScale.map((s, i) => (
            <div
              key={s.name}
              style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "1.5rem", padding: "0.9rem 0", borderBottom: i < typeScale.length - 1 ? "1px solid var(--theme-border)" : "none", alignItems: "center" }}
            >
              <div>
                <code style={{ fontSize: "0.65rem", color: "var(--theme-muted)" }}>{s.name}</code>
                <br />
                <span style={{ fontSize: "0.62rem", color: "var(--theme-muted)" }}>{s.size}</span>
              </div>
              <span style={{ fontSize: s.size.includes("1.5") ? "1.5rem" : s.size.includes("base") ? "1rem" : s.size.split("–")[0], fontWeight: s.weight, letterSpacing: s.tracking, textTransform: s.transform, color: "var(--theme-accent2)" }}>
                {tx(s.sample, locale)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 4. Clases .ff-* ──────────────────────────────────────────────────────────

function Classes({ locale }: { locale: Locale }) {
  const ffClasses = [
    {
      name: ".ff-nav-link",
      description: { es: "Links del nav. Muted por defecto, fg en hover.", en: "Nav links. Muted by default, fg on hover." },
      demo: <a href="#" className="ff-nav-link" onClick={(e) => e.preventDefault()}>{locale === "en" ? "about me" : "sobre mí"}</a>,
    },
    {
      name: ".ff-back",
      description: { es: "Links de retroceso / navegación secundaria.", en: "Back links / secondary navigation." },
      demo: <a href="#" className="ff-back" onClick={(e) => e.preventDefault()}>{locale === "en" ? "← back" : "← volver"}</a>,
    },
    {
      name: ".ff-link-muted",
      description: { es: "Links en contextos de poca jerarquía.", en: "Low-hierarchy context links." },
      demo: <a href="#" className="ff-link-muted" style={{ fontSize: "0.78rem" }} onClick={(e) => e.preventDefault()}>{locale === "en" ? "contact ↗" : "contacto ↗"}</a>,
    },
    {
      name: ".ff-link-yellow",
      description: { es: "Links inline en texto corrido. Accent2, fg en hover.", en: "Inline links within body text. Accent2, fg on hover." },
      demo: (
        <span className="ff-body-text">
          {locale === "en" ? <>Since 2016 I&apos;ve been writing{" "}<a href="#" className="ff-link-yellow" onClick={(e) => e.preventDefault()}>observando</a>, a newsletter.</> : <>Desde 2016 escribo{" "}<a href="#" className="ff-link-yellow" onClick={(e) => e.preventDefault()}>observando</a>, un newsletter.</>}
        </span>
      ),
    },
    {
      name: ".ff-section-label",
      description: { es: "Etiquetas de sección. Uppercase, tracking amplio, muted.", en: "Section labels. Uppercase, wide tracking, muted." },
      demo: <span className="ff-section-label">{locale === "en" ? "latest entries" : "últimas entregas"}</span>,
    },
    {
      name: ".ff-body-text",
      description: { es: "Texto corrido estándar. 0.85rem, weight 300, accent2.", en: "Standard body text. 0.85rem, weight 300, accent2." },
      demo: <p className="ff-body-text">{locale === "en" ? "Reality interests me as a starting point." : "La realidad me interesa como punto de partida."}</p>,
    },
    {
      name: ".ff-divider",
      description: { es: "Borde de separación usando --theme-border.", en: "Separator border using --theme-border." },
      demo: <hr className="ff-divider" style={{ border: "none", borderTop: "1px solid var(--theme-border)", width: "100%" }} />,
    },
    {
      name: ".ff-link-card",
      description: { es: "Tarjeta de link clickeable (cositas). Borde sutil, se oscurece en hover.", en: "Clickable link card (stuff). Subtle border, darkens on hover." },
      demo: (
        <a href="#" className="ff-link-card" style={{ fontSize: "0.72rem" }} onClick={(e) => e.preventDefault()}>
          <div className="flex items-baseline justify-between gap-4">
            <span className="t-accent2" style={{ fontWeight: 400 }}>{locale === "en" ? "link title" : "título del link"}</span>
            <span className="t-muted" style={{ fontSize: "0.65rem" }}>↗</span>
          </div>
        </a>
      ),
    },
    {
      name: ".t-bg / .t-fg / .t-accent / .t-accent2 / .t-muted",
      description: { es: "Utilidades de color temático. Usan las CSS vars activas.", en: "Thematic color utilities. Use the active CSS vars." },
      demo: (
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.75rem" }}>
          <span className="t-fg">t-fg</span>
          <span className="t-accent">t-accent</span>
          <span className="t-accent2">t-accent2</span>
          <span className="t-muted">t-muted</span>
        </div>
      ),
    },
  ];

  return (
    <div style={{ borderTop: "1px solid var(--theme-border)" }}>
      {ffClasses.map((c, i) => (
        <div
          key={c.name}
          style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr", gap: "1.5rem", padding: "1rem 0", borderBottom: i < ffClasses.length - 1 ? "1px solid var(--theme-border)" : "none", alignItems: "center" }}
        >
          <code style={{ fontSize: "0.68rem", color: "var(--theme-muted)" }}>{c.name}</code>
          <span style={{ fontSize: "0.72rem", color: "var(--theme-muted)", lineHeight: 1.5 }}>{tx(c.description, locale)}</span>
          <div>{c.demo}</div>
        </div>
      ))}
    </div>
  );
}

// ─── 5. Componentes ───────────────────────────────────────────────────────────

function ProjectCardDemo({ locale }: { locale: Locale }) {
  return (
    <article style={{ borderBottom: "1px solid var(--theme-border)", padding: "1.25rem 0" }}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="t-accent" style={{ fontSize: "0.88rem", fontWeight: 400 }}>{locale === "en" ? "project name" : "nombre del proyecto"}</h3>
            <span style={{ fontSize: "0.6rem", letterSpacing: "0.1em", color: "var(--theme-muted)", border: "1px solid var(--theme-border)", padding: "1px 6px", borderRadius: "2px" }}>{locale === "en" ? "active" : "activo"}</span>
          </div>
          <p className="t-accent2" style={{ fontSize: "0.78rem", fontWeight: 300, lineHeight: 1.6 }}>
            {locale === "en" ? "One line describing what the project does and why it exists." : "Una línea que describe qué hace el proyecto y por qué existe."}
          </p>
          <div className="flex gap-4 mt-2" style={{ fontSize: "0.65rem", color: "var(--theme-muted)", letterSpacing: "0.05em" }}>
            <span>React · TypeScript · Next.js</span>
          </div>
        </div>
        <span className="t-muted" style={{ fontSize: "0.68rem", flexShrink: 0 }}>2025</span>
      </div>
    </article>
  );
}

function PostRowDemo({ locale }: { locale: Locale }) {
  return (
    <div style={{ borderTop: "1px solid var(--theme-border)" }}>
      <a href="#" className="group" style={{ display: "block", borderBottom: "1px solid var(--theme-border)", padding: "1rem 0" }} onClick={(e) => e.preventDefault()}>
        <div className="flex items-baseline justify-between gap-8">
          <p className="post-title" style={{ fontSize: "0.85rem", fontWeight: 300 }}>
            {locale === "en" ? "observando entry title" : "título de entrega de observando"}
          </p>
          <span className="shrink-0 t-muted" style={{ fontSize: "0.7rem", whiteSpace: "nowrap" }}>jun 2025</span>
        </div>
        <p className="t-muted" style={{ fontSize: "0.72rem", lineHeight: 1.6, fontWeight: 300, marginTop: "4px" }}>
          {locale === "en" ? "A brief excerpt from the post body that gives the reader context." : "Un extracto breve del cuerpo del post que da contexto al lector."}
        </p>
      </a>
    </div>
  );
}

function TabToggleDemo({ locale }: { locale: Locale }) {
  const [active, setActive] = useState<"a" | "b">("a");
  const labelA = locale === "en" ? "books" : "libros";
  const labelB = locale === "en" ? "films" : "películas";
  return (
    <div className="flex gap-6" role="tablist">
      {(["a", "b"] as const).map((tab) => {
        const isActive = active === tab;
        const label = tab === "a" ? labelA : labelB;
        return (
          <button
            key={tab}
            id={`ds-tab-${tab}`}
            role="tab"
            aria-selected={isActive}
            onClick={() => setActive(tab)}
            style={{
              background: "none", border: "none", padding: 0, cursor: "pointer",
              fontSize: "0.78rem", letterSpacing: "0.08em", fontFamily: "inherit",
              color: isActive ? "var(--theme-accent)" : "var(--theme-muted)",
              borderBottom: isActive ? "1px solid var(--theme-accent)" : "1px solid transparent",
              paddingBottom: "2px", transition: "color 0.15s ease, border-color 0.15s ease",
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

function StarsDemo() {
  const rating = 4.5;
  return (
    <span role="img" aria-label={`${rating} out of 5 stars`} style={{ letterSpacing: "0.1em", fontSize: "0.75rem" }}>
      {Array.from({ length: 5 }, (_, i) => {
        const full = i + 1 <= Math.floor(rating);
        const half = !full && i < rating;
        if (half) {
          return (
            <span key={i} style={{ position: "relative", display: "inline-block" }}>
              <span style={{ color: "var(--theme-border)" }}>★</span>
              <span style={{ position: "absolute", left: 0, top: 0, width: "50%", overflow: "hidden", color: "var(--theme-accent)" }}>★</span>
            </span>
          );
        }
        return <span key={i} style={{ color: full ? "var(--theme-accent)" : "var(--theme-border)" }}>★</span>;
      })}
    </span>
  );
}

function StuffCardDemo({ locale }: { locale: Locale }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3">
        <span className="t-muted shrink-0" aria-hidden="true" style={{ fontSize: "1.1rem", lineHeight: 1 }}>“</span>
        <p className="t-accent" style={{ fontSize: "0.78rem", fontWeight: 300, lineHeight: 1.6 }}>
          {locale === "en" ? "Quote — set apart by the opening mark, no border." : "Quote — distinguida por la comilla de apertura, sin borde."}
        </p>
      </div>
      <a href="#" className="ff-link-card" style={{ fontSize: "0.72rem" }} onClick={(e) => e.preventDefault()}>
        <div className="flex items-baseline justify-between gap-4">
          <span className="t-accent2" style={{ fontWeight: 400 }}>{locale === "en" ? "Link — bordered card, ↗ affordance" : "Link — tarjeta con borde, affordance ↗"}</span>
          <span className="t-muted" style={{ fontSize: "0.65rem" }}>↗</span>
        </div>
      </a>
      <div className="flex gap-3">
        <span className="t-muted shrink-0" aria-hidden="true">·</span>
        <p className="t-accent2" style={{ fontSize: "0.78rem", fontWeight: 300, lineHeight: 1.6 }}>
          {locale === "en" ? "Note — loose thought, dot marker, no border or quote mark." : "Note — pensamiento suelto, marca de punto, sin borde ni comilla."}
        </p>
      </div>
      <a href="#" className="ff-link-card" style={{ display: "flex", gap: "1rem" }} onClick={(e) => e.preventDefault()}>
        <div
          className="shrink-0"
          style={{ width: 56, height: 56, borderRadius: "var(--radius-md)", backgroundColor: "var(--theme-btn-bg)", position: "relative" }}
        >
          <span
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", color: "var(--theme-fg)" }}
          >
            ▶
          </span>
        </div>
        <p className="t-accent2" style={{ fontSize: "0.72rem", fontWeight: 300, lineHeight: 1.6, alignSelf: "center" }}>
          {locale === "en" ? "Video — same bordered card as link, with a square thumbnail + play icon." : "Video — misma tarjeta con borde que el link, con thumbnail cuadrado + ícono de play."}
        </p>
      </a>
    </div>
  );
}

function Components({ locale }: { locale: Locale }) {
  const rows = [
    {
      name: "ThemeSwitcher",
      description: { es: "Alterna entre Standard y Light. Hit area expandida con ::before.", en: "Toggles between Standard and Light. Hit area expanded with ::before." },
      demo: <ThemeSwitcher />,
    },
    {
      name: "LanguageSwitcher",
      description: { es: "Toggle ES / EN. Guarda preferencia en localStorage.", en: "ES / EN toggle. Saves preference to localStorage." },
      demo: <LanguageSwitcher />,
    },
    {
      name: "ProjectCard",
      description: { es: "Tarjeta de proyecto con nombre, status badge, tagline y stack.", en: "Project card with name, status badge, tagline and stack." },
      demo: <ProjectCardDemo locale={locale} />,
    },
    {
      name: "PostRow",
      description: { es: "Fila de entrega de Observando con título, fecha y extracto.", en: "Observando entry row with title, date and excerpt." },
      demo: <PostRowDemo locale={locale} />,
    },
    {
      name: "Stars",
      description: { es: "Rating de 1 a 5 con soporte de medias estrellas.", en: "1 to 5 rating with half-star support." },
      demo: <StarsDemo />,
    },
    {
      name: "TabToggle",
      description: { es: "Toggle de pestañas con roles ARIA (tablist/tab/tabpanel). Activo: accent + underline. Inactivo: muted.", en: "Tab toggle with ARIA roles (tablist/tab/tabpanel). Active: accent + underline. Inactive: muted." },
      demo: <TabToggleDemo locale={locale} />,
    },
    {
      name: "StuffCard",
      description: { es: "Variantes de cositas (quote / link / note / image). Cada tipo se distingue por estructura, no por color: comilla decorativa, tarjeta con borde, marca de punto, imagen con caption.", en: "Stuff item variants (quote / link / note / image). Each type is distinguished by structure, not color: decorative quote mark, bordered card, dot marker, image with caption." },
      demo: <StuffCardDemo locale={locale} />,
    },
  ];

  return (
    <div style={{ borderTop: "1px solid var(--theme-border)" }}>
      {rows.map((c, i) => (
        <div
          key={c.name}
          style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "2rem", padding: "1.25rem 0", borderBottom: i < rows.length - 1 ? "1px solid var(--theme-border)" : "none", alignItems: "start" }}
        >
          <div>
            <code style={{ fontSize: "0.68rem", color: "var(--theme-fg)", fontWeight: 400 }}>{c.name}</code>
            <p style={{ fontSize: "0.65rem", color: "var(--theme-muted)", marginTop: "4px", lineHeight: 1.5 }}>{tx(c.description, locale)}</p>
          </div>
          <div>{c.demo}</div>
        </div>
      ))}
    </div>
  );
}

// ─── 6. Animaciones ───────────────────────────────────────────────────────────

function AnimationDemo({ name, description, style, children }: { name: string; description: string; style?: React.CSSProperties; children?: React.ReactNode }) {
  const [key, setKey] = useState(0);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "180px 1fr 120px", gap: "1.5rem", padding: "1rem 0", borderBottom: "1px solid var(--theme-border)", alignItems: "center" }}>
      <div>
        <code style={{ fontSize: "0.68rem", color: "var(--theme-muted)" }}>{name}</code>
        <p style={{ fontSize: "0.68rem", color: "var(--theme-muted)", marginTop: "4px", lineHeight: 1.5 }}>{description}</p>
      </div>
      <div style={{ minHeight: "2rem", display: "flex", alignItems: "center" }}>
        <div key={key} style={style}>
          {children ?? <span className="t-accent2" style={{ fontSize: "0.8rem" }}>axel {name}</span>}
        </div>
      </div>
      <button
        onClick={() => setKey((k) => k + 1)}
        style={{ fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--theme-muted)", background: "none", border: "1px solid var(--theme-border)", padding: "4px 10px", cursor: "pointer", fontFamily: "var(--font-mono)", borderRadius: "2px", transition: "color 0.15s ease, border-color 0.15s ease" }}
        onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.color = "var(--theme-fg)"; (e.target as HTMLButtonElement).style.borderColor = "var(--theme-muted)"; }}
        onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.color = "var(--theme-muted)"; (e.target as HTMLButtonElement).style.borderColor = "var(--theme-border)"; }}
      >
        replay
      </button>
    </div>
  );
}

function Animations({ locale }: { locale: Locale }) {
  const desc = {
    page:     { es: "Entrada de página al navegar. Solo opacity.",               en: "Page entry on navigation. Opacity only." },
    cursor:   { es: "Cursor del typewriter. Parpadeo step-end infinito.",         en: "Typewriter cursor. Infinite step-end blink." },
    slide:    { es: "Entrada del menú mobile. Opacity + translateY.",             en: "Mobile menu entry. Opacity + translateY." },
    fadeIn:   { es: "Overlay del lightbox. Opacity puro.",                        en: "Lightbox overlay. Pure opacity." },
    scaleIn:  { es: "Imagen del lightbox. Opacity + scale(0.96→1).",              en: "Lightbox image. Opacity + scale(0.96→1)." },
  };

  const navItem = locale === "en" ? "about me" : "sobre mí";
  const overlay = locale === "en" ? "overlay" : "overlay";
  const image   = locale === "en" ? "image"   : "imagen";
  const sample  = locale === "en" ? "axel does things" : "axel hace cosas";

  return (
    <div style={{ borderTop: "1px solid var(--theme-border)" }}>
      <AnimationDemo name="ff-page" description={tx(desc.page, locale)}>
        <span className="ff-page" style={{ fontSize: "0.8rem", color: "var(--theme-accent2)" }}>{sample}</span>
      </AnimationDemo>

      <AnimationDemo name="tw-cursor" description={tx(desc.cursor, locale)}>
        <span style={{ fontSize: "0.9rem", color: "var(--theme-accent2)" }}>
          axel<span className="tw-cursor" />
        </span>
      </AnimationDemo>

      <AnimationDemo name="menuSlideDown" description={tx(desc.slide, locale)}>
        <span style={{ animation: "menuSlideDown 0.3s ease forwards", display: "inline-block", fontSize: "0.8rem", color: "var(--theme-muted)" }}>{navItem}</span>
      </AnimationDemo>

      <AnimationDemo
        name="fadeIn"
        description={tx(desc.fadeIn, locale)}
        style={{ animation: "fadeIn 0.4s ease forwards", padding: "0.4rem 0.8rem", background: "var(--theme-btn-bg)", border: "1px solid var(--theme-border)", borderRadius: "4px", fontSize: "0.75rem" }}
      >
        <span style={{ color: "var(--theme-muted)" }}>{overlay}</span>
      </AnimationDemo>

      <AnimationDemo
        name="scaleIn"
        description={tx(desc.scaleIn, locale)}
        style={{ animation: "scaleIn 0.3s ease forwards", padding: "0.4rem 0.8rem", background: "var(--theme-btn-bg)", border: "1px solid var(--theme-border)", borderRadius: "4px", fontSize: "0.75rem" }}
      >
        <span style={{ color: "var(--theme-muted)" }}>{image}</span>
      </AnimationDemo>
    </div>
  );
}

// ─── 7. Iconografía ───────────────────────────────────────────────────────────

const typographicIcons: { char: string; usage: Txt }[] = [
  { char: "→", usage: { es: "home.seeAll, home.more, links de sección",          en: "home.seeAll, home.more, section links" } },
  { char: "←", usage: { es: "ff-back, links de retroceso",                       en: "ff-back, back links" } },
  { char: "↗", usage: { es: "Links externos (substack, github, cv)",              en: "External links (substack, github, cv)" } },
  { char: "|", usage: { es: "Separador en nav desktop",                           en: "Desktop nav separator" } },
  { char: "★", usage: { es: "Rating de libros (Stars)",                           en: "Book ratings (Stars)" } },
  { char: "·", usage: { es: "Separador de metadata (autor · año · páginas)",      en: "Metadata separator (author · year · pages)" } },
];

function Iconography({ locale }: { locale: Locale }) {
  const labels = {
    assets:   "assets",
    chars:    locale === "en" ? "typographic characters as icons" : "caracteres tipográficos como íconos",
  };

  return (
    <div className="space-y-12">
      <div>
        <p className="ff-section-label mb-6">{labels.assets}</p>
        <div style={{ display: "flex", gap: "3rem", alignItems: "flex-start" }}>
          <div>
            <p style={{ fontSize: "0.65rem", color: "var(--theme-muted)", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>logo.svg</p>
            <Image src="/logo.svg" alt="logo" width={32} height={32} style={{ filter: "var(--logo-filter)", opacity: 0.7 }} />
          </div>
          <div>
            <p style={{ fontSize: "0.65rem", color: "var(--theme-muted)", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>exlibris.png</p>
            <Image src="/exlibris.png" alt="exlibris" width={40} height={40} style={{ filter: "var(--exlibris-filter)" }} />
          </div>
        </div>
      </div>

      <div>
        <p className="ff-section-label mb-6">{labels.chars}</p>
        <div style={{ borderTop: "1px solid var(--theme-border)" }}>
          {typographicIcons.map((icon, i) => (
            <div
              key={icon.char}
              style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: "1.5rem", padding: "0.85rem 0", borderBottom: i < typographicIcons.length - 1 ? "1px solid var(--theme-border)" : "none", alignItems: "center" }}
            >
              <span style={{ fontSize: "1.1rem", fontWeight: 300, color: "var(--theme-fg)" }}>{icon.char}</span>
              <span style={{ fontSize: "0.72rem", color: "var(--theme-muted)" }}>{tx(icon.usage, locale)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function DesignSystemContent() {
  const { locale } = useLanguage();

  const labels = {
    subtitle: locale === "en" ? "IBM Plex Mono · Tailwind v4 · CSS Custom Properties" : "IBM Plex Mono · Tailwind v4 · CSS Custom Properties",
    desc:     locale === "en" ? "axel is bored — tokens, spacing, typography, classes, components, animations, iconography" : "axel is bored — tokens, espaciado, tipografía, clases, componentes, animaciones, iconografía",
    sections: {
      colors:    locale === "en" ? "TOKENS — COLORS"       : "TOKENS — COLORES",
      radius:    locale === "en" ? "TOKENS — RADIUS"       : "TOKENS — RADIO",
      spacing:   locale === "en" ? "SPACING"               : "ESPACIADO",
      typo:      locale === "en" ? "TYPOGRAPHY"            : "TIPOGRAFÍA",
      classes:   locale === "en" ? "UTILITY CLASSES"       : "CLASES UTILITARIAS",
      components:locale === "en" ? "COMPONENTS"            : "COMPONENTES",
      animations:locale === "en" ? "ANIMATIONS"            : "ANIMACIONES",
      iconography:locale === "en"? "ICONOGRAPHY"           : "ICONOGRAFÍA",
    },
    back: locale === "en" ? "← back" : "← volver",
  };

  return (
    <>
      <main id="main-content" className="ff-page max-w-4xl mx-auto px-8 py-16 sm:py-24">
        <h1 className="t-accent" style={{ fontSize: "1.5rem", fontWeight: 300, letterSpacing: "-0.01em" }}>
          Design System
        </h1>
        <p className="t-muted mt-2 mb-2" style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}>
          {labels.subtitle}
        </p>
        <p className="t-muted" style={{ fontSize: "0.68rem" }}>
          {labels.desc}
        </p>

        <Divider label={labels.sections.colors} />
        <ColorTokens locale={locale} />

        <Divider label={labels.sections.radius} />
        <RadiusTokens locale={locale} />

        <Divider label={labels.sections.spacing} />
        <Spacing locale={locale} />

        <Divider label={labels.sections.typo} />
        <Typography locale={locale} />

        <Divider label={labels.sections.classes} />
        <Classes locale={locale} />

        <Divider label={labels.sections.components} />
        <Components locale={locale} />

        <Divider label={labels.sections.animations} />
        <Animations locale={locale} />

        <Divider label={labels.sections.iconography} />
        <Iconography locale={locale} />
      </main>

      <footer className="max-w-4xl mx-auto px-8 py-8" style={{ borderTop: "1px solid var(--theme-border)" }}>
        <Link href="/" className="ff-back">{labels.back}</Link>
      </footer>
    </>
  );
}
