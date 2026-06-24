"use client";

import Link from "next/link";
import Image from "next/image";
import { TypewriterHeading } from "@/components/TypewriterHeading";
import { CurrentYear } from "@/components/ui/CurrentYear";
import { PostRow } from "@/components/ui/PostRow";
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

export function HomeContent({
  rssPosts,
  fallbackPosts,
}: {
  rssPosts: RssPost[];
  fallbackPosts: FallbackPost[];
}) {
  const { t } = useLanguage();
  const hasPosts = rssPosts.length > 0;
  const recentPosts = hasPosts ? rssPosts.slice(0, 3) : fallbackPosts.slice(0, 3);

  return (
    <div className="min-h-screen t-bg">
      <main id="main-content" className="ff-page max-w-4xl mx-auto px-8 py-16 sm:py-24">

        {/* Hero */}
        <section className="mb-28">
          <div className="flex items-start justify-between gap-16">
            <div className="flex-1 min-w-0">
              <TypewriterHeading />
              <p className="ff-body-text max-w-sm">
                {t["home.heroDesc1"]}{" "}
                <Link href="/observando" className="ff-link-yellow">
                  observando
                </Link>
                {t["home.heroDesc2"]}{" "}
                <Link href="/cositas" className="ff-link-yellow">
                  cositas
                </Link>
                {t["home.heroDesc3"]}{" "}
                <Link href="/projects" className="ff-link-yellow">
                  apps
                </Link>
                {t["home.heroDesc4"]}
              </p>
            </div>
            <div className="shrink-0 hidden sm:block">
              <Image
                src="/axel2.jpg"
                alt="Axel"
                width={120}
                height={120}
                className="object-cover grayscale-[20%]"
                style={{
                  objectPosition: "center 15%",
                  borderRadius: "var(--radius-lg)",
                  opacity: 0.85,
                }}
                priority
              />
            </div>
          </div>
        </section>

        {/* observando */}
        <section className="mb-28">
          <div className="flex items-baseline justify-between mb-10">
            <p className="ff-section-label">
              observando
            </p>
            <a
              href="https://observando.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ff-link-external"
            >
              suscribite ↗
            </a>
          </div>

          <div style={{ borderTop: "1px solid var(--theme-border)" }}>
            {recentPosts.map((post) => (
              <PostRow
                key={post.url}
                title={post.title}
                meta={post.date}
                description={post.subtitle}
                href={post.url}
                external
              />
            ))}
          </div>

          <div className="mt-6">
            <a href="https://observando.substack.com" target="_blank" rel="noopener noreferrer" className="ff-link-muted" style={{ fontSize: "var(--text-xs)" }}>
              {t["home.seeAll"]}
            </a>
          </div>
        </section>

        {/* Sobre mí */}
        <section>
          <p className="ff-section-label mb-10">
            {t["home.about"]}
          </p>

          <p className="ff-body-text">
            {t["about.p1"]}
            <a href="https://www.vice.com/es/contributor/axel-marazzi/" target="_blank" rel="noopener noreferrer" className="ff-link-yellow">VICE</a>
            {", "}
            <a href="https://www.revistaanfibia.com/autor/axel-marazzi/" target="_blank" rel="noopener noreferrer" className="ff-link-yellow">Anfibia</a>
            {", "}
            <a href="https://www.latercera.com/revista-que-pasa/yo_adicto_virtual/" target="_blank" rel="noopener noreferrer" className="ff-link-yellow">Qué Pasa</a>
            {" y "}
            <a href="https://www.lanacion.com.ar/autor/axel-marazzi-2361/" target="_blank" rel="noopener noreferrer" className="ff-link-yellow">La Nación</a>
            {"."}
          </p>

          <div className="mt-10">
            <Link href="/about" className="ff-link-muted" style={{ fontSize: "var(--text-xs)" }}>
              {t["home.aboutMore"]}
            </Link>
          </div>
        </section>

      </main>

      <footer
        className="max-w-4xl mx-auto px-8 py-8"
        style={{ borderTop: "1px solid var(--theme-border)" }}
      >
        <div className="flex justify-between items-center">
          <span className="t-muted" style={{ fontSize: "var(--text-xs)" }}>
            {t["home.footer"]} · <CurrentYear />
          </span>
          <a href="mailto:marazzi.axel@gmail.com" className="ff-back">
            marazzi.axel@gmail.com
          </a>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "4px", marginTop: "10px", fontSize: "0.55rem", color: "var(--theme-muted)" }}>
          {t["home.footer.claude"]}{" "}
          <a
            href="https://claude.ai"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center" }}
            title="Claude"
          >
            <Image
              src="/claude-icon.svg"
              alt="Claude"
              width={12}
              height={12}
              style={{ display: "block" }}
            />
          </a>
        </div>
      </footer>
    </div>
  );
}
