"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { stuff as stuffData } from "@/data/stuff";
import { StuffItem, QuoteItem, LinkItem, NoteItem, ImageItem } from "@/types/stuff";
import { useLanguage } from "@/components/Language/LanguageProvider";
import { ImageLightbox } from "@/components/ImageLightbox";
import type { Locale } from "@/lib/i18n";

function formatDate(date: string, locale: Locale): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString(locale === "en" ? "en-US" : "es-AR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function domainOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function QuoteCard({ item }: { item: QuoteItem }) {
  return (
    <article className="flex gap-4">
      <span
        aria-hidden="true"
        className="t-muted shrink-0"
        style={{ fontSize: "1.8rem", lineHeight: 1, fontWeight: 300 }}
      >
        “
      </span>
      <div className="min-w-0">
        <p className="t-accent" style={{ fontSize: "var(--text-md)", fontWeight: 300, lineHeight: 1.75 }}>
          {item.text}
        </p>
        {(item.author || item.source) && (
          <p className="t-muted mt-2" style={{ fontSize: "var(--text-xs)", letterSpacing: "0.04em" }}>
            {item.author}
            {item.author && item.source ? " · " : ""}
            {item.source}
          </p>
        )}
      </div>
    </article>
  );
}

function LinkCard({ item, locale }: { item: LinkItem; locale: Locale }) {
  const description = locale === "en" ? (item.description_en ?? item.description) : item.description;
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="ff-link-card">
      <div className="flex items-baseline justify-between gap-4">
        <p className="t-accent2" style={{ fontSize: "var(--text-base)", fontWeight: 400, lineHeight: 1.4 }}>
          {item.title}
        </p>
        <span className="t-muted shrink-0" aria-hidden="true" style={{ fontSize: "var(--text-xs)" }}>
          ↗
        </span>
      </div>
      {description && (
        <p className="t-muted mt-1" style={{ fontSize: "var(--text-xs)", lineHeight: 1.6 }}>
          {description}
        </p>
      )}
      <p className="t-muted mt-2" style={{ fontSize: "var(--text-2xs)", letterSpacing: "0.06em" }}>
        {domainOf(item.url)}
      </p>
    </a>
  );
}

function NoteCard({ item, locale }: { item: NoteItem; locale: Locale }) {
  const text = locale === "en" ? (item.text_en ?? item.text) : item.text;
  return (
    <article className="flex gap-3">
      <span className="t-muted shrink-0" aria-hidden="true">
        ·
      </span>
      <p className="t-accent2" style={{ fontSize: "var(--text-base)", fontWeight: 300, lineHeight: 1.75 }}>
        {text}
      </p>
    </article>
  );
}

function ImageCard({ item, locale }: { item: ImageItem; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const caption = locale === "en" ? (item.caption_en ?? item.caption) : item.caption;
  return (
    <figure>
      <Image
        src={item.imagePath}
        alt={caption ?? ""}
        width={640}
        height={400}
        className="ff-img-link"
        style={{ borderRadius: "var(--radius-md)", width: "100%", height: "auto" }}
        onClick={() => setOpen(true)}
      />
      {open && <ImageLightbox src={item.imagePath} alt={caption ?? ""} onClose={() => setOpen(false)} />}
      {caption && (
        <figcaption className="t-muted mt-2" style={{ fontSize: "var(--text-xs)", lineHeight: 1.6 }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function StuffRow({ item, locale }: { item: StuffItem; locale: Locale }) {
  return (
    <div className="flex flex-col gap-3">
      {item.type === "quote" && <QuoteCard item={item} />}
      {item.type === "link" && <LinkCard item={item} locale={locale} />}
      {item.type === "note" && <NoteCard item={item} locale={locale} />}
      {item.type === "image" && <ImageCard item={item} locale={locale} />}
      <p className="ff-section-label">{formatDate(item.date, locale)}</p>
    </div>
  );
}

export function CositasContent() {
  const { locale, t } = useLanguage();
  const items = [...stuffData].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <main id="main-content" className="ff-page max-w-2xl mx-auto px-8 py-16 sm:py-24">
        <h1 className="text-2xl mb-2 t-accent" style={{ fontWeight: 300, letterSpacing: "-0.01em" }}>
          {t["cositas.title"]}
        </h1>
        <p className="mb-14 t-muted" style={{ fontSize: "var(--text-xs)", letterSpacing: "0.1em" }}>
          {t["cositas.subtitle"]}
        </p>

        {items.length === 0 ? (
          <p className="t-muted" style={{ fontSize: "0.78rem" }}>
            {t["cositas.empty"]}
          </p>
        ) : (
          <div className="flex flex-col gap-12">
            {items.map((item) => (
              <StuffRow key={item.id} item={item} locale={locale} />
            ))}
          </div>
        )}
      </main>

      <footer className="max-w-2xl mx-auto px-8 py-8" style={{ borderTop: "1px solid var(--theme-border)" }}>
        <Link href="/" className="ff-back">
          {t["cositas.back"]}
        </Link>
      </footer>
    </>
  );
}
