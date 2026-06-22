"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { QuoteItem, LinkItem, NoteItem, ImageItem, VideoItem, SongItem, AlbumItem, BookItem } from "@/types/stuff";
import { FeedItem, FilmFeedItem } from "@/types/feed";
import { useLanguage } from "@/components/Language/LanguageProvider";
import { ImageLightbox } from "@/components/ImageLightbox";
import type { Locale } from "@/lib/i18n";
import type { CurrentlyReading } from "@/lib/goodreads";

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
    <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ display: "block" }}>
      <div className="flex items-baseline gap-2">
        <p className="t-accent" style={{ fontSize: "0.95rem", fontWeight: 400, lineHeight: 1.4 }}>
          {item.title}
        </p>
        <span className="t-muted shrink-0" aria-hidden="true" style={{ fontSize: "var(--text-xs)" }}>
          ↗
        </span>
      </div>
      <p className="t-muted" style={{ fontSize: "var(--text-2xs)", letterSpacing: "0.06em", marginTop: "2px" }}>
        {domainOf(item.url)}
      </p>
      {description && (
        <p className="t-accent2 mt-2" style={{ fontSize: "var(--text-base)", fontWeight: 300, lineHeight: 1.7 }}>
          {description}
        </p>
      )}
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

function MusicCard({ item, locale }: { item: SongItem | AlbumItem; locale: Locale }) {
  const description = locale === "en" ? (item.description_en ?? item.description) : item.description;

  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="ff-link-card" style={{ display: "flex", gap: "1rem" }}>
      <div
        className="shrink-0"
        style={{ width: 72, height: 72, borderRadius: "var(--radius-md)", overflow: "hidden", position: "relative" }}
      >
        {item.albumImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- arte del álbum, host externo (Spotify) no whitelisteable de antemano
          <img src={item.albumImageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <div className="t-muted" style={{ width: "100%", height: "100%", backgroundColor: "var(--theme-btn-bg)" }} />
        )}
        <span
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", color: "#fff", backgroundColor: "rgba(0,0,0,0.28)" }}
        >
          ♪
        </span>
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-1" style={{ paddingTop: "2px" }}>
        {item.title && (
          <p className="t-accent" style={{ fontSize: "var(--text-base)", fontWeight: 400, lineHeight: 1.4 }}>
            {item.title}
          </p>
        )}
        {item.artist && (
          <p className="t-muted" style={{ fontSize: "var(--text-xs)", lineHeight: 1.5 }}>
            {item.artist}
          </p>
        )}
        {description && (
          <p className="t-muted" style={{ fontSize: "var(--text-xs)", lineHeight: 1.5 }}>
            {description}
          </p>
        )}
        <span className="t-muted" style={{ fontSize: "var(--text-2xs)", letterSpacing: "0.06em" }}>
          spotify
        </span>
      </div>
    </a>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span role="img" aria-label={`${rating} de 5 estrellas`} style={{ letterSpacing: "0.1em", fontSize: "var(--text-xs)" }}>
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

function BookCard({ item, locale }: { item: BookItem; locale: Locale }) {
  const review = locale === "en" ? (item.review_en ?? item.review) : item.review;
  const isLocal = item.coverImageUrl.startsWith("/");
  const meta = [item.author, item.yearPublished || null, item.pages ? `${item.pages}p` : null]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="flex gap-5">
      <div className="shrink-0">
        {isLocal ? (
          <Image
            src={item.coverImageUrl}
            alt={`${item.title} cover`}
            width={90}
            height={135}
            className="object-cover"
            style={{ borderRadius: "var(--radius-md)", opacity: 0.92 }}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element -- portada subida desde la extensión (data URL o URL externa), no se puede pasar por next/image
          <img
            src={item.coverImageUrl}
            alt={`${item.title} cover`}
            style={{ width: 90, height: 135, objectFit: "cover", borderRadius: "var(--radius-md)", opacity: 0.92, display: "block" }}
          />
        )}
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-2 py-1">
        <div>
          <h2 className="t-accent" style={{ fontSize: "var(--text-base)", fontWeight: 400, lineHeight: 1.4 }}>
            {item.title}
          </h2>
          <p className="t-muted" style={{ fontSize: "var(--text-xs)", letterSpacing: "0.04em", marginTop: "2px" }}>
            {meta}
          </p>
        </div>
        <Stars rating={item.rating} />
        {review && (
          <p className="t-accent2" style={{ fontSize: "0.78rem", fontWeight: 300, lineHeight: 1.7 }}>
            {review}
          </p>
        )}
      </div>
    </article>
  );
}

function FilmCard({ item }: { item: FilmFeedItem }) {
  const { film } = item;
  const meta = [film.director, film.yearReleased || null, film.runtime ? `${film.runtime} min` : null]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="flex gap-5">
      <div className="shrink-0">
        {film.posterUrl ? (
          <Image
            src={film.posterUrl}
            alt={`${film.title} poster`}
            width={90}
            height={135}
            className="object-cover"
            style={{ borderRadius: "var(--radius-md)", opacity: 0.92 }}
          />
        ) : (
          <div
            style={{
              width: 90,
              height: 135,
              borderRadius: "var(--radius-md)",
              border: "1px dashed var(--theme-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span className="t-muted" style={{ fontSize: "0.6rem", letterSpacing: "0.08em" }}>
              {film.yearReleased}
            </span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-2 py-1">
        <div>
          <h2 className="t-accent" style={{ fontSize: "var(--text-base)", fontWeight: 400, lineHeight: 1.4 }}>
            {film.title}
          </h2>
          <p className="t-muted" style={{ fontSize: "var(--text-xs)", letterSpacing: "0.04em", marginTop: "2px" }}>
            {meta}
          </p>
        </div>
        <Stars rating={film.rating} />
        {film.review && (
          <p className="t-accent2" style={{ fontSize: "0.78rem", fontWeight: 300, lineHeight: 1.7 }}>
            {film.review}
          </p>
        )}
      </div>
    </article>
  );
}

type Filter = "all" | "book" | "film" | "quote" | "music" | "note" | "link" | "image" | "video";

function matchesFilter(item: FeedItem, filter: Filter): boolean {
  if (filter === "all") return true;
  if (filter === "music") return item.type === "song" || item.type === "album";
  return item.type === filter;
}

function FilterChips({
  active,
  onChange,
  labels,
}: {
  active: Filter;
  onChange: (filter: Filter) => void;
  labels: Record<Filter, string>;
}) {
  const filters: Filter[] = ["all", "book", "film", "music", "quote", "link", "image", "video", "note"];

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-3 mb-14" role="tablist">
      {filters.map((filter) => {
        const isActive = active === filter;
        return (
          <button
            key={filter}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(filter)}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              fontSize: "0.78rem",
              letterSpacing: "0.08em",
              fontFamily: "inherit",
              color: isActive ? "var(--theme-accent)" : "var(--theme-muted)",
              borderBottom: isActive ? "1px solid var(--theme-accent)" : "1px solid transparent",
              paddingBottom: "2px",
              transition: "color 0.15s ease, border-color 0.15s ease",
            }}
          >
            {labels[filter]}
          </button>
        );
      })}
    </div>
  );
}

function StuffRow({ item, locale }: { item: FeedItem; locale: Locale }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="ff-section-label" style={{ fontSize: "0.6rem" }}>
        {formatDate(item.date, locale)}
      </p>
      {item.type === "quote" && <QuoteCard item={item} />}
      {item.type === "link" && <LinkCard item={item} locale={locale} />}
      {item.type === "note" && <NoteCard item={item} locale={locale} />}
      {item.type === "image" && <ImageCard item={item} locale={locale} />}
      {item.type === "video" && <VideoCard item={item} locale={locale} />}
      {(item.type === "song" || item.type === "album") && <MusicCard item={item} locale={locale} />}
      {item.type === "book" && <BookCard item={item} locale={locale} />}
      {item.type === "film" && <FilmCard item={item} />}
    </div>
  );
}

export function CositasContent({
  items: itemsProp,
  currentlyReading,
}: {
  items: FeedItem[];
  currentlyReading: CurrentlyReading | null;
}) {
  const { locale, t } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");
  const items = [...itemsProp].sort((a, b) => b.date.localeCompare(a.date));
  const filtered = items.filter((item) => matchesFilter(item, filter));
  const showCurrentlyReading = currentlyReading && (filter === "all" || filter === "book");

  const filterLabels: Record<Filter, string> = {
    all: t["cositas.filter.all"],
    book: t["cositas.filter.books"],
    film: t["cositas.filter.films"],
    quote: t["cositas.filter.quotes"],
    music: t["cositas.filter.music"],
    note: t["cositas.filter.notes"],
    link: t["cositas.filter.links"],
    image: t["cositas.filter.images"],
    video: t["cositas.filter.videos"],
  };

  return (
    <>
      <main id="main-content" className="ff-page max-w-4xl mx-auto px-8 py-16 sm:py-24">
        <h1 className="text-2xl mb-2 t-accent" style={{ fontWeight: 300, letterSpacing: "-0.01em" }}>
          {t["cositas.title"]}
        </h1>
        <p className="mb-8 t-muted" style={{ fontSize: "var(--text-xs)", letterSpacing: "0.1em" }}>
          {t["cositas.subtitle"]}
        </p>

        <FilterChips active={filter} onChange={setFilter} labels={filterLabels} />

        {showCurrentlyReading && (
          <div className="mb-12" style={{ borderLeft: "2px solid var(--theme-muted)", paddingLeft: "1rem" }}>
            <div className="flex items-center gap-2 mb-2">
              <p className="ff-section-label">{t["cositas.currentlyReading"]}</p>
              <img
                src="/exlibris.png"
                alt=""
                aria-hidden="true"
                style={{ width: 22, height: "auto", filter: "var(--exlibris-filter)" }}
              />
            </div>
            <a href={currentlyReading.bookUrl} target="_blank" rel="noopener noreferrer" className="ff-touch ff-cr-link">
              {currentlyReading.title}
              <span className="t-muted" style={{ fontWeight: 300 }}>
                {" "}
                · {currentlyReading.author}
              </span>
            </a>
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="t-muted" style={{ fontSize: "0.78rem" }}>
            {t["cositas.empty"]}
          </p>
        ) : (
          <div className="flex flex-col gap-12">
            {filtered.map((item) => (
              <StuffRow key={item.id} item={item} locale={locale} />
            ))}
          </div>
        )}
      </main>

      <footer className="max-w-4xl mx-auto px-8 py-8" style={{ borderTop: "1px solid var(--theme-border)" }}>
        <Link href="/" className="ff-back">
          {t["cositas.back"]}
        </Link>
      </footer>
    </>
  );
}
