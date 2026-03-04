import { Nav } from "@/components/Nav/Nav";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "sobre mí — axel haciendo cosas",
  description: "Quién es Axel y qué hace.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen t-bg">
      <Nav />

      <main className="max-w-4xl mx-auto px-8 py-24">
        <h1 className="text-2xl mb-12 t-accent" style={{ fontWeight: 300, letterSpacing: "-0.01em" }}>Sobre mí</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-5 t-accent2" style={{ fontSize: "0.85rem", lineHeight: 1.8, fontWeight: 300 }}>
            <p>
              Me llamo Axel Marazzi. Vivo en Buenos Aires. Soy periodista y
              diseñador. Hoy trabajo para ueno bank, un banco paraguayo,
              diseñando experiencias con inteligencia artificial.{" "}
              Mi trabajo, me gusta pensar, siempre mezcló tecnología y palabras.
            </p>
            <p>
              Hace muchos años escribo{" "}
              <Link href="/observando" className="ff-link-yellow">
                observando
              </Link>
              , un newsletter que cambió muchísimo con los años. Hoy es una
              especie de diario personal abierto donde exploro mi escritura
              e intento contar cómo veo la vida.
            </p>
            <p>
              En mi tiempo libre vibecodeo pequeños proyectos que resuelven algunas de mis necesidades.
              {" "}Los hago por placer, sin presión, a ver qué sale. Son herramientas
              que necesito yo mismo y que tal vez te sirvan a vos también.
            </p>
            <p>Este sitio existe para juntar esas cosas.</p>
          </div>

          <div>
            <p className="mb-5 t-muted" style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>contacto</p>
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
        <Link href="/" className="ff-back">← volver</Link>
      </footer>
    </div>
  );
}
