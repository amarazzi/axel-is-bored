import { Nav } from "@/components/Nav/Nav";
import { fetchPosts } from "@/lib/rss";
import { posts as fallbackPosts } from "@/data/posts";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "observando — axel haciendo cosas",
  description: "Autoficción. Cuento mi vida ficcionada.",
};

export default async function ObservandoPage() {
  const rssPosts = await fetchPosts();
  const hasPosts = rssPosts.length > 0;

  return (
    <div className="min-h-screen t-bg">
      <Nav />

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
            substack ↗
          </a>
        </div>
        <p className="mb-14 t-muted" style={{ fontSize: "0.65rem", letterSpacing: "0.1em" }}>autoficción</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16" style={{ alignItems: "start" }}>
          {/* Columna izquierda */}
          <div className="flex flex-col" style={{ minHeight: "100%" }}>
            <div className="space-y-5 t-accent2 flex-1" style={{ fontSize: "0.85rem", lineHeight: 1.75, fontWeight: 300 }}>
              <p>
                Hace muchos años escribo observando, un newsletter que cambió
                muchísimo con los años. Empezó siendo una cosa y se fue
                convirtiendo en otra sin que yo lo planeara demasiado.
              </p>
              <p>
                Hoy es una especie de diario personal abierto donde exploro
                mi escritura e intento contar cómo veo la vida. Algunas cosas
                pasaron tal cual las cuento. Otras no.
              </p>
              <p>
                Cambio nombres, lugares, fechas, el orden de las cosas. La
                realidad me interesa como punto de partida, no como destino.
                Espero que algo de lo que escribo te resuene.
              </p>
            </div>
            <div className="mt-8">
              <a
                href="https://observando.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ff-link-muted"
                style={{ fontSize: "0.7rem" }}
              >
                suscribirse →
              </a>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="flex flex-col">
            <p className="mb-6 t-muted" style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              últimas entregas
            </p>
            <div className="flex-1">
              {hasPosts
                ? rssPosts.slice(0, 3).map((post, i) => (
                    <Link
                      key={post.slug}
                      href={`/observando/${post.slug}`}
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
                    </Link>
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
                leer ediciones anteriores →
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer
        className="max-w-4xl mx-auto px-8 py-8"
        style={{ borderTop: "1px solid var(--theme-border)" }}
      >
        <Link href="/" className="ff-back">← volver</Link>
      </footer>
    </div>
  );
}
