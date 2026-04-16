"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/Language/LanguageProvider";

const articles = [
  {
    title: "Cinco horas diarias mirando el teléfono",
    publication: "Revista Qué Pasa",
    description: "Cómo las empresas tecnológicas diseñan a propósito la adicción al celular.",
    url: "https://www.revistaanfibia.com/cinco-horas-diarias-mirando-telefono/",
  },
  {
    title: "Matar con onda",
    publication: "Revista Anfibia",
    description: "Muchos padres no permiten a sus hijos instalar juegos de guerra con sangre, pero prestan la tarjeta para comprar skins en Fortnite.",
    url: "https://www.revistaanfibia.com/matar-con-onda/",
  },
  {
    title: "Dark web: ¿un refugio o un supermercado de violencia?",
    publication: "Revista Anfibia",
    description: "Ser invisible o anónimo es uno de los grandes desafíos en estos tiempos de algoritmos.",
    url: "https://www.revistaanfibia.com/dark-web/",
  },
  {
    title: "¿Te jubilarías a los 30?",
    publication: "Revista Anfibia",
    description: "Axel Marazzi sueña con jubilarse a los 35. ¿Es un delirante? Sí, pero hay gente que lo logra.",
    url: "https://www.revistaanfibia.com/te-jubilarias-los-30/",
  },
  {
    title: "Internet se rompió",
    publication: "Revista Anfibia",
    description: "El discurso de Silicon Valley parece estar cambiando. Hace tiempo sus cabezas reconocieron que Internet se les fue de las manos.",
    url: "https://www.revistaanfibia.com/internet-se-rompio/",
  },
  {
    title: "¿Por qué hackean los hackers?",
    publication: "La Nación",
    description: "Quiénes son, qué los mueve y por qué hacen lo que hacen.",
    url: "https://www.lanacion.com.ar/tecnologia/por-que-hackean-los-hackers-nid1458150/",
  },
  {
    title: "Videojuegos indie en Argentina: arcades, fichines y cerveza",
    publication: "Vice",
    description: "La escena de videojuegos independientes en Buenos Aires vista desde adentro.",
    url: "https://www.vice.com/es/article/videojuegos-indie-en-argentina-arcades-fichines-y-cerveza/",
  },
];

export function AboutContent() {
  const { t } = useLanguage();

  return (
    <>
      <main className="ff-page max-w-4xl mx-auto px-8 py-16 sm:py-24">
        <h1 className="text-2xl mb-2 t-accent" style={{ fontWeight: 300, letterSpacing: "-0.01em" }}>{t["about.title"]}</h1>
        <p className="mb-14 t-muted" style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}>{t["about.subtitle"]}</p>

        {/* Foto — solo mobile, arriba del bio */}
        <div className="mb-8 md:hidden">
          <Image
            src="/axel2.jpg"
            alt="Axel"
            width={160}
            height={160}
            className="object-cover grayscale-[20%]"
            style={{
              objectPosition: "center 15%",
              borderRadius: "12px",
              opacity: 0.85,
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-5 ff-body-text">
            <p>{t["about.p1"]}</p>
            <p>{t["about.p1b"]}</p>
            <p>
              {t["about.p2pre"]}
              <Link href="/observando" className="ff-link-yellow">
                observando
              </Link>
              {t["about.p2post"]}
            </p>
            <p>{t["about.p3"]}</p>
          </div>

          <div className="space-y-8">
            {/* Foto — solo desktop, en columna derecha */}
            <div className="hidden md:block">
              <Image
                src="/axel2.jpg"
                alt="Axel"
                width={160}
                height={160}
                className="object-cover grayscale-[20%]"
                style={{
                  objectPosition: "center 15%",
                  borderRadius: "12px",
                  opacity: 0.85,
                }}
              />
            </div>
            <div>
              <a
                href="mailto:marazzi.axel@gmail.com"
                className="ff-link-muted"
                style={{ fontSize: "0.72rem", letterSpacing: "0.15em" }}
              >
                {t["about.contact"]} ↗
              </a>
            </div>
            <div>
              <a
                href="https://axelmarazzi.notion.site/Axel-Marazzi-9f827fe896524669a3ffc670a18460d3"
                target="_blank"
                rel="noopener noreferrer"
                className="ff-link-muted"
                style={{ fontSize: "0.72rem", letterSpacing: "0.15em" }}
              >
                cv ↗
              </a>
            </div>
            <div>
              <a
                href="https://observando.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ff-link-muted"
                style={{ fontSize: "0.72rem", letterSpacing: "0.15em" }}
              >
                observando ↗
              </a>
            </div>
          </div>
        </div>

        {/* Artículos */}
        <div className="mt-24">
          <p className="ff-section-label mb-8">
            {t["about.articles"]}
          </p>
          <div style={{ borderTop: "1px solid var(--theme-border)" }}>
            {articles.map((article) => (
              <a
                key={article.url}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                style={{ display: "block", padding: "1.1rem 0", borderBottom: "1px solid var(--theme-border)" }}
              >
                <div className="flex items-baseline justify-between gap-8">
                  <span className="post-title" style={{ fontSize: "0.85rem", fontWeight: 300 }}>
                    {article.title}
                  </span>
                  <span className="t-muted shrink-0" style={{ fontSize: "0.7rem" }}>
                    {article.publication}
                  </span>
                </div>
                <p className="t-muted mt-1" style={{ fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.6 }}>
                  {article.description}
                </p>
              </a>
            ))}
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
