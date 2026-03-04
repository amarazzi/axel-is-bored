import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/Nav/Nav";
import { projects } from "@/data/projects";
import { posts } from "@/data/posts";
import { TypewriterHeading } from "@/components/TypewriterHeading";

export default function HomePage() {
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="min-h-screen t-bg">
      <Nav />

      <main className="max-w-4xl mx-auto px-8 py-24">

        {/* Hero */}
        <section className="mb-28">
          <div className="flex items-start justify-between gap-16">
            {/* Texto */}
            <div className="flex-1 min-w-0">
              <TypewriterHeading />
              <p className="text-sm leading-relaxed max-w-sm t-accent2" style={{ fontWeight: 300 }}>
                Escribo cómo veo la vida en{" "}
                <Link href="/observando" className="ff-link-yellow">
                  observando
                </Link>
                . Además, vibecodeo y diseño pequeñas apps.
              </p>
            </div>

            {/* Foto — sin marco, limpia */}
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
              substack ↗
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
            <Link href="/observando" className="ff-link-muted" style={{ fontSize: "0.7rem" }}>
              ver todos →
            </Link>
          </div>
        </section>

        {/* Proyectos */}
        <section>
          <p
            className="t-muted mb-10"
            style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" }}
          >
            Proyectos
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
            {projects.map((p) => (
              <div key={p.id} className="flex items-start gap-5">
                {/* Texto */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm mb-3 t-accent" style={{ fontWeight: 400 }}>
                    <Link href={`/projects/${p.id}`} className="hover:opacity-70 transition-opacity duration-150">
                      {p.name}
                    </Link>
                  </h3>
                  <p className="leading-relaxed mb-4 t-accent2" style={{ fontSize: "0.8rem", fontWeight: 300 }}>{p.tagline}</p>
                  <p className="mb-5 t-muted" style={{ fontSize: "0.65rem", letterSpacing: "0.04em" }}>{p.techStack.join("  ·  ")}</p>
                  <Link
                    href={`/projects/${p.id}`}
                    className="ff-link-muted"
                    style={{ fontSize: "0.7rem" }}
                  >
                    más →
                  </Link>
                </div>
                {/* Screenshot */}
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
                          opacity: 0.88,
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
              ver todos →
            </Link>
          </div>
        </section>

      </main>

      <footer
        className="max-w-4xl mx-auto px-8 py-8 flex justify-between items-center"
        style={{ borderTop: "1px solid var(--theme-border)" }}
      >
        <span style={{ fontSize: "0.65rem", color: "var(--theme-muted)" }}>
          axel haciendo cosas · {new Date().getFullYear()}
        </span>
        <a
          href="mailto:marazzi.axel@gmail.com"
          className="ff-back"
        >
          marazzi.axel@gmail.com
        </a>
      </footer>
    </div>
  );
}
