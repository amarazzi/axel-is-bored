"use client";

import Image from "next/image";
import Link from "next/link";
import { books } from "@/data/books";
import { Book } from "@/types/book";
import { CurrentlyReading } from "@/lib/goodreads";
import { useLanguage } from "@/components/Language/LanguageProvider";

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ letterSpacing: "0.1em", fontSize: "0.7rem" }}>
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
          style={{ borderRadius: "6px", opacity: 0.92 }}
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-2 py-1">
        <div>
          <h2 className="t-accent" style={{ fontSize: "0.85rem", fontWeight: 400, lineHeight: 1.4 }}>
            {book.title}
          </h2>
          <p className="t-muted" style={{ fontSize: "0.65rem", letterSpacing: "0.04em", marginTop: "2px" }}>
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

export function RecomendacionesContent({ currentlyReading }: { currentlyReading: CurrentlyReading | null }) {
  const { locale, t } = useLanguage();

  return (
    <>
      <main className="ff-page max-w-2xl mx-auto px-8 py-16 sm:py-24">
        <h1
          className="text-2xl mb-2 t-accent"
          style={{ fontWeight: 300, letterSpacing: "-0.01em" }}
        >
          {t["recomendaciones.title"]}
        </h1>
        <p className="mb-14 t-muted" style={{ fontSize: "0.65rem", letterSpacing: "0.1em" }}>
          {t["recomendaciones.subtitle"]}
        </p>

        {currentlyReading && (
          <div className="mb-8">
            <p className="t-muted" style={{ fontSize: "0.65rem", letterSpacing: "0.04em" }}>
              {t["recomendaciones.currentlyReading"]}:{" "}
              <a
                href={currentlyReading.bookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="t-accent hover:opacity-70 transition-opacity duration-150"
              >
                {currentlyReading.title}
              </a>
              {" "}· {currentlyReading.author}
            </p>
            <div style={{ borderBottom: "1px solid var(--theme-border)", marginTop: "1.5rem" }} />
          </div>
        )}

        {books.length === 0 ? (
          <p className="t-muted" style={{ fontSize: "0.78rem" }}>
            {t["recomendaciones.empty"]}
          </p>
        ) : (() => {
          const years = [...new Set(books.map((b) => b.yearRead))].sort((a, b) => b - a);
          const multiYear = years.length > 1;
          return (
            <div className="flex flex-col gap-16">
              {years.map((year) => (
                <div key={year}>
                  {multiYear && (
                    <p
                      className="t-muted mb-8"
                      style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" }}
                    >
                      {year}
                    </p>
                  )}
                  <div className="flex flex-col gap-12">
                    {books
                      .filter((b) => b.yearRead === year)
                      .map((book) => (
                        <BookCard key={book.id} book={book} locale={locale} />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
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
