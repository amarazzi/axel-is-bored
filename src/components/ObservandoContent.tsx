"use client";

import Link from "next/link";
import { useLanguage } from "@/components/Language/LanguageProvider";

interface RssPost {
  title: string;
  subtitle: string;
  date: string;
  slug: string;
  url: string;
  content: string;
}

interface FallbackPost {
  title: string;
  subtitle: string;
  date: string;
  url: string;
}

export function ObservandoContent({
  rssPosts,
  fallbackPosts,
}: {
  rssPosts: RssPost[];
  fallbackPosts: FallbackPost[];
}) {
  const { t } = useLanguage();
  const hasPosts = rssPosts.length > 0;

  return (
    <>
      <main className="max-w-4xl mx-auto px-8 py-24">
        <div className="flex items-baseline justify-between mb-2">
          <h1 className="text-2xl t-accent" style={{ fontWeight: 300, letterSpacing: "-0.01em" }}>observando</h1>
          <a
            href="https://observando.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ff-link-muted"
            style={{ fontSize: "0.65rem", letterSpacing: "0.04em" }}
          >
            newsletter ↗
          </a>
        </div>
        <p className="mb-14 t-muted" style={{ fontSize: "0.65rem", letterSpacing: "0.1em" }}>{t["observando.subtitle"]}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16" style={{ alignItems: "start" }}>
          {/* Columna izquierda */}
          <div className="flex flex-col" style={{ minHeight: "100%" }}>
            <div className="space-y-5 t-accent2 flex-1" style={{ fontSize: "0.85rem", lineHeight: 1.75, fontWeight: 300 }}>
              <p>{t["observando.p1"]}</p>
              <p>{t["observando.p2"]}</p>
              <p>{t["observando.p3"]}</p>
            </div>
            <div className="mt-8">
              <a
                href="https://observando.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ff-link-muted"
                style={{ fontSize: "0.7rem" }}
              >
                {t["observando.subscribe"]}
              </a>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="flex flex-col">
            <p className="mb-6 t-muted" style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              {t["observando.latest"]}
            </p>
            <div className="flex-1">
              {hasPosts
                ? rssPosts.slice(0, 3).map((post, i) => (
                    <a
                      key={post.slug}
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block py-4"
                      style={{
                        borderBottom: "1px solid var(--theme-border)",
                        borderTop: i === 0 ? "1px solid var(--theme-border)" : undefined,
                      }}
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <div className="min-w-0">
                          <p className="mb-1 post-title" style={{ fontSize: "0.82rem", fontWeight: 400 }}>
                            {post.title}
                          </p>
                          <p className="t-muted" style={{ fontSize: "0.7rem", fontWeight: 300 }}>{post.subtitle}</p>
                        </div>
                        <span
                          className="shrink-0"
                          style={{ fontSize: "0.65rem", color: "var(--theme-muted)", whiteSpace: "nowrap" }}
                        >
                          {post.date}
                        </span>
                      </div>
                    </a>
                  ))
                : fallbackPosts.slice(0, 3).map((post, i) => (
                    <a
                      key={post.url}
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block py-4"
                      style={{
                        borderBottom: "1px solid var(--theme-border)",
                        borderTop: i === 0 ? "1px solid var(--theme-border)" : undefined,
                      }}
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <div className="min-w-0">
                          <p className="mb-1 post-title" style={{ fontSize: "0.82rem", fontWeight: 400 }}>
                            {post.title}
                          </p>
                          <p className="t-muted" style={{ fontSize: "0.7rem", fontWeight: 300 }}>{post.subtitle}</p>
                        </div>
                        <span
                          className="shrink-0"
                          style={{ fontSize: "0.65rem", color: "var(--theme-muted)", whiteSpace: "nowrap" }}
                        >
                          {post.date}
                        </span>
                      </div>
                    </a>
                  ))}
            </div>
            <div className="mt-6">
              <a
                href="https://observando.substack.com/archive"
                target="_blank"
                rel="noopener noreferrer"
                className="ff-link-muted"
                style={{ fontSize: "0.7rem" }}
              >
                {t["observando.previous"]}
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer
        className="max-w-4xl mx-auto px-8 py-8"
        style={{ borderTop: "1px solid var(--theme-border)" }}
      >
        <Link href="/" className="ff-back">{t["observando.back"]}</Link>
      </footer>
    </>
  );
}
