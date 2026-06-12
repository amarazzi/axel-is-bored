"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { books } from "@/data/books";
import { Book } from "@/types/book";
import { LetterboxdFilm } from "@/lib/letterboxd";
import { CurrentlyReading } from "@/lib/goodreads";
import { useLanguage } from "@/components/Language/LanguageProvider";

type Tab = "books" | "films";

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
        return (
          <span key={i} style={{ color: full ? "var(--theme-accent)" : "var(--theme-border)" }}>★</span>
        );
      })}
    </span>
  );
}

function BookCard({ book, locale }: { book: Book; locale: "es" | "en" }) {
  const review = locale === "en" ? (book.review_en ?? book.review) : book.review;

  return (
    <article className="flex gap-5">
      <div className="shrink-0">
        <Image
          src={book.coverPath}
          alt={`${book.title} cover`}
          width={90}
          height={135}
          className="object-cover"
          style={{ borderRadius: "var(--radius-md)", opacity: 0.92 }}
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-2 py-1">
        <div>
          <h2 className="t-accent" style={{ fontSize: "var(--text-base)", fontWeight: 400, lineHeight: 1.4 }}>
            {book.title}
          </h2>
          <p className="t-muted" style={{ fontSize: "var(--text-xs)", letterSpacing: "0.04em", marginTop: "2px" }}>
            {book.author} · {book.yearPublished} · {book.pages}p
          </p>
        </div>
        <Stars rating={book.rating} />
        <p className="t-accent2" style={{ fontSize: "0.78rem", fontWeight: 300, lineHeight: 1.7 }}>
          {review}
        </p>
      </div>
    </article>
  );
}

function FilmCard({ film }: { film: LetterboxdFilm }) {
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

function TabToggle({ active, onChange, labelBooks, labelFilms }: {
  active: Tab;
  onChange: (tab: Tab) => void;
  labelBooks: string;
  labelFilms: string;
}) {
  return (
    <div className="flex gap-6 mb-14" role="tablist">
      {(["books", "films"] as Tab[]).map((tab) => {
        const label = tab === "books" ? labelBooks : labelFilms;
        const isActive = active === tab;
        return (
          <button
            key={tab}
            id={`tab-${tab}`}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab)}
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
            {label}
          </button>
        );
      })}
    </div>
  );
}

function BooksList({ locale }: { locale: "es" | "en" }) {
  if (books.length === 0) return null;
  const years = [...new Set(books.map((b) => b.yearRead))].sort((a, b) => b - a);
  const multiYear = years.length > 1;
  return (
    <div className="flex flex-col gap-16">
      {years.map((year) => (
        <div key={year}>
          {multiYear && (
            <p className="ff-section-label mb-8">{year}</p>
          )}
          <div className="flex flex-col gap-12">
            {books.filter((b) => b.yearRead === year).map((book) => (
              <BookCard key={book.id} book={book} locale={locale} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function FilmsList({ films, emptyLabel }: { films: LetterboxdFilm[]; emptyLabel: string }) {
  if (films.length === 0) {
    return <p className="t-muted" style={{ fontSize: "0.78rem" }}>{emptyLabel}</p>;
  }
  const years = [...new Set(films.map((f) => f.yearWatched))].sort((a, b) => b - a);
  const multiYear = years.length > 1;
  return (
    <div className="flex flex-col gap-16">
      {years.map((year) => (
        <div key={year}>
          {multiYear && (
            <p className="ff-section-label mb-8">{year}</p>
          )}
          <div className="flex flex-col gap-12">
            {films.filter((f) => f.yearWatched === year).map((film) => (
              <FilmCard key={film.id} film={film} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function RecomendacionesContent({
  currentlyReading,
  films,
}: {
  currentlyReading: CurrentlyReading | null;
  films: LetterboxdFilm[];
}) {
  const { locale, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>("books");

  return (
    <>
      <main id="main-content" className="ff-page max-w-2xl mx-auto px-8 py-16 sm:py-24">
        <h1
          className="text-2xl mb-2 t-accent"
          style={{ fontWeight: 300, letterSpacing: "-0.01em" }}
        >
          {t["recomendaciones.title"]}
        </h1>
        <p className="mb-8 t-muted" style={{ fontSize: "var(--text-xs)", letterSpacing: "0.1em" }}>
          {t["recomendaciones.subtitle"]}
        </p>

        <TabToggle
          active={activeTab}
          onChange={setActiveTab}
          labelBooks={t["recomendaciones.tab.books"]}
          labelFilms={t["recomendaciones.tab.films"]}
        />

        {activeTab === "books" && (
          <div role="tabpanel" aria-labelledby="tab-books">
            {currentlyReading && (
              <div className="mb-10" style={{ borderLeft: "2px solid var(--theme-muted)", paddingLeft: "1rem" }}>
                <div className="flex items-center gap-2 mb-2">
                  <p className="ff-section-label">{t["recomendaciones.currentlyReading"]}</p>
                  <img
                    src="/exlibris.png"
                    alt=""
                    aria-hidden="true"
                    style={{ width: 22, height: "auto", filter: "var(--exlibris-filter)" }}
                  />
                </div>
                <a
                  href={currentlyReading.bookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ff-touch ff-cr-link"
                >
                  {currentlyReading.title}
                  <span className="t-muted" style={{ fontWeight: 300 }}> · {currentlyReading.author}</span>
                </a>
              </div>
            )}
            {books.length === 0 ? (
              <p className="t-muted" style={{ fontSize: "0.78rem" }}>{t["recomendaciones.empty"]}</p>
            ) : (
              <BooksList locale={locale} />
            )}
          </div>
        )}

        {activeTab === "films" && (
          <div role="tabpanel" aria-labelledby="tab-films">
            <FilmsList films={films} emptyLabel={t["recomendaciones.films.empty"]} />
          </div>
        )}
      </main>

      <footer
        className="max-w-2xl mx-auto px-8 py-8"
        style={{ borderTop: "1px solid var(--theme-border)" }}
      >
        <Link href="/" className="ff-back">
          {t["recomendaciones.back"]}
        </Link>
      </footer>
    </>
  );
}
