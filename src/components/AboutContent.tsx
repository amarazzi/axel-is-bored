"use client";

import Link from "next/link";
import { useLanguage } from "@/components/Language/LanguageProvider";

export function AboutContent() {
  const { t } = useLanguage();

  return (
    <>
      <main className="max-w-4xl mx-auto px-8 py-24">
        <h1 className="text-2xl mb-12 t-accent" style={{ fontWeight: 300, letterSpacing: "-0.01em" }}>{t["about.title"]}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-5 t-accent2" style={{ fontSize: "0.85rem", lineHeight: 1.8, fontWeight: 300 }}>
            <p>{t["about.p1"]}</p>
            <p>
              {t["about.p2pre"]}
              <Link href="/observando" className="ff-link-yellow">
                observando
              </Link>
              {t["about.p2post"]}
            </p>
            <p>{t["about.p3"]}</p>
            <p>{t["about.p4"]}</p>
          </div>

          <div>
            <p className="mb-5 t-muted" style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>{t["about.contact"]}</p>
            <a
              href="mailto:marazzi.axel@gmail.com"
              className="ff-link-muted"
              style={{ fontSize: "0.82rem" }}
            >
              marazzi.axel@gmail.com
            </a>
          </div>
        </div>
      </main>

      <footer
        className="max-w-4xl mx-auto px-8 py-8"
        style={{ borderTop: "1px solid var(--theme-border)" }}
      >
        <Link href="/" className="ff-back">{t["about.back"]}</Link>
      </footer>
    </>
  );
}
