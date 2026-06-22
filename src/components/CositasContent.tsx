"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { StuffItem, QuoteItem, LinkItem, NoteItem, ImageItem, VideoItem } from "@/types/stuff";
import { useLanguage } from "@/components/Language/LanguageProvider";
import { ImageLightbox } from "@/components/ImageLightbox";
import type { Locale } from "@/lib/i18n";

function formatDate(date: string, locale: Locale): string {
  const parsed = date.includes("T") ? new Date(date) : new Date(`${date}T00:00:00`);
  return parsed.toLocaleDateString(locale === "en" ? "en-US" : "es-AR", {
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

function youtubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1) || null;
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname === "/watch") return u.searchParams.get("v");
      const shortsMatch = u.pathname.match(/^\/shorts\/([^/]+)/);
      if (shortsMatch) return shortsMatch[1];
    }
    return null;
  } catch {
    return null;
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
  const isLocal = item.imageUrl.startsWith("/");
  const imgStyle: CSSProperties = { borderRadius: "var(--radius-md)", width: "100%", height: "auto", display: "block" };

  return (
    <figure>
      {isLocal ? (
        <Image
          src={item.imageUrl}
          alt={caption ?? ""}
          width={640}
          height={400}
          className="ff-img-link"
          style={imgStyle}
          onClick={() => setOpen(true)}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- URL externa compartida desde la extensión, no se puede pasar por next/image
        <img src={item.imageUrl} alt={caption ?? ""} className="ff-img-link" style={imgStyle} onClick={() => setOpen(true)} />
      )}
      {open && <ImageLightbox src={item.imageUrl} alt={caption ?? ""} onClose={() => setOpen(false)} />}
      {caption && (
        <figcaption className="t-muted mt-2" style={{ fontSize: "var(--text-xs)", lineHeight: 1.6 }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function VideoCard({ item, locale }: { item: VideoItem; locale: Locale }) {
  const description = locale === "en" ? (item.description_en ?? item.description) : item.description;
  const videoId = youtubeId(item.url);
  const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;

  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="ff-link-card" style={{ display: "flex", gap: "1rem" }}>
      <div
        className="shrink-0"
        style={{ width: 72, height: 72, borderRadius: "var(--radius-md)", overflow: "hidden", position: "relative" }}
      >
        {thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element -- thumbnail de YouTube, host externo no whitelisteable de antemano
          <img src={thumbnail} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <div className="t-muted" style={{ width: "100%", height: "100%", backgroundColor: "var(--theme-btn-bg)" }} />
        )}
        <span
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", color: "#fff", backgroundColor: "rgba(0,0,0,0.28)" }}
        >
          ▶
        </span>
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-1" style={{ paddingTop: "2px" }}>
        {item.title && (
          <p className="t-accent" style={{ fontSize: "var(--text-base)", fontWeight: 400, lineHeight: 1.4 }}>
            {item.title}
          </p>
        )}
        {description && (
          <p className="t-muted" style={{ fontSize: "var(--text-xs)", lineHeight: 1.5 }}>
            {description}
          </p>
        )}
        <span className="t-muted" style={{ fontSize: "var(--text-2xs)", letterSpacing: "0.06em" }}>
          youtube
        </span>
      </div>
    </a>
  );
}

function StuffRow({ item, locale }: { item: StuffItem; locale: Locale }) {
  return (
    <div className="flex flex-col gap-3">
      {item.type === "quote" && <QuoteCard item={item} />}
      {item.type === "link" && <LinkCard item={item} locale={locale} />}
      {item.type === "note" && <NoteCard item={item} locale={locale} />}
      {item.type === "image" && <ImageCard item={item} locale={locale} />}
      {item.type === "video" && <VideoCard item={item} locale={locale} />}
      <p className="ff-section-label">{formatDate(item.date, locale)}</p>
    </div>
  );
}

export function CositasContent({ items: itemsProp }: { items: StuffItem[] }) {
  const { locale, t } = useLanguage();
  const items = [...itemsProp].sort((a, b) => b.date.localeCompare(a.date));

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
