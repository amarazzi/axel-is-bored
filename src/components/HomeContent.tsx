"use client";

import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { TypewriterHeading } from "@/components/TypewriterHeading";
import { CurrentYear } from "@/components/ui/CurrentYear";
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
  const { locale, t } = useLanguage();
  const hasPosts = rssPosts.length > 0;
  const recentPosts = hasPosts ? rssPosts.slice(0, 3) : fallbackPosts.slice(0, 3);

  return (
    <div className="min-h-screen t-bg">
      <main className="max-w-4xl mx-auto px-8 py-24">

        {/* Hero */}
        <section className="mb-28">
          <div className="flex items-start justify-between gap-16">
            <div className="flex-1 min-w-0">
              <TypewriterHeading />
              <p className="text-sm leading-relaxed max-w-sm t-accent2" style={{ fontWeight: 300 }}>
                {t["home.heroDesc1"]}{" "}
                <Link href="/observando" className="ff-link-yellow">
                  observando
                </Link>
                {t["home.heroDesc2"]}
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
                  borderRadius: "12px",
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
            <p
              className="t-muted"
              style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" }}
            >
              observando
            </p>
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

          <div>
            {recentPosts.map((post, i) => (
              <a
                key={post.url}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block py-5"
                style={{
                  borderBottom: "1px solid var(--theme-border)",
                  borderTop: i === 0 ? "1px solid var(--theme-border)" : undefined,
                }}
              >
                <div className="flex items-baseline justify-between gap-8">
                  <div className="min-w-0">
                    <p className="text-sm mb-1 post-title" style={{ fontWeight: 400 }}>
                      {post.title}
                    </p>
                    <p className="t-muted" style={{ fontSize: "0.72rem" }}>{post.subtitle}</p>
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
            <a href="https://observando.substack.com" target="_blank" rel="noopener noreferrer" className="ff-link-muted" style={{ fontSize: "0.7rem" }}>
              {t["home.seeAll"]}
            </a>
          </div>
        </section>

        {/* Proyectos */}
        <section>
          <p
            className="t-muted mb-10"
            style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" }}
          >
            {t["home.projects"]}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
            {projects.map((p) => (
              <div key={p.id} className="flex items-start gap-5">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm mb-3 t-accent" style={{ fontWeight: 400 }}>
                    <Link href={`/projects/${p.id}`} className="hover:opacity-70 transition-opacity duration-150">
                      {p.name}
                    </Link>
                  </h3>
                  <p className="leading-relaxed mb-4 t-accent2" style={{ fontSize: "0.8rem", fontWeight: 300 }}>
                    {locale === "en" ? (p.tagline_en ?? p.tagline) : p.tagline}
                  </p>
                  <p className="mb-5 t-muted" style={{ fontSize: "0.65rem", letterSpacing: "0.04em" }}>{p.techStack.join("  ·  ")}</p>
                  <Link
                    href={`/projects/${p.id}`}
                    className="ff-link-muted"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {t["home.more"]}
                  </Link>
                </div>
                {p.screenshotPath && (
                  <div className="shrink-0">
                    <Link href={`/projects/${p.id}`} tabIndex={-1}>
                      <Image
                        src={p.screenshotPath}
                        alt={`${p.name} screenshot`}
                        width={110}
                        height={122}
                        className="object-cover"
                        style={{
                          objectPosition: "center bottom",
                          borderRadius: "10px",
                          opacity: 1,
                        }}
                      />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link href="/projects" className="ff-link-muted" style={{ fontSize: "0.7rem" }}>
              {t["home.seeAll"]}
            </Link>
          </div>
        </section>

      </main>

      <footer
        className="max-w-4xl mx-auto px-8 py-8"
        style={{ borderTop: "1px solid var(--theme-border)" }}
      >
        <div className="flex justify-between items-center">
          <span style={{ fontSize: "0.65rem", color: "var(--theme-muted)" }}>
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
            <img
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
