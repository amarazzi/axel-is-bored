"use client";

import { projects } from "@/data/projects";
import { Project } from "@/types/project";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/Language/LanguageProvider";

export function ProjectsContent() {
  const { locale, t } = useLanguage();

  return (
    <>
      <main className="ff-page max-w-4xl mx-auto px-8 py-16 sm:py-24">
        <h1 className="text-2xl mb-2 t-accent" style={{ fontWeight: 300, letterSpacing: "-0.01em" }}>{t["projects.title"]}</h1>
        <p className="mb-1 t-muted" style={{ fontSize: "0.65rem", letterSpacing: "0.1em" }}>
          {t["projects.subtitle"]}
        </p>
        <p className="mb-14 t-muted" style={{ fontSize: "0.55rem", letterSpacing: "0.05em" }}>
          {t["projects.subtitle2"]}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} locale={locale} />
          ))}
        </div>
      </main>

      <footer
        className="max-w-4xl mx-auto px-8 py-8"
        style={{ borderTop: "1px solid var(--theme-border)" }}
      >
        <Link href="/" className="ff-back">{t["projects.back"]}</Link>
      </footer>
    </>
  );
}

function ProjectCard({ project, locale }: { project: Project; locale: "es" | "en" }) {
  const { t } = useLanguage();

  const statusLabel: Record<Project["status"], string> = {
    active: t["projects.status.active"],
    wip: t["projects.status.wip"],
    archived: t["projects.status.archived"],
  };

  const description = locale === "en" ? (project.description_en ?? project.description) : project.description;

  return (
    <article id={project.id}>
      <h2 className="mb-3 t-accent" style={{ fontSize: "0.9rem", fontWeight: 400 }}>
        <Link href={`/projects/${project.id}`} className="hover:opacity-60 transition-opacity duration-300">
          {project.name}
        </Link>
      </h2>

      <p className="leading-relaxed mb-5 t-accent2" style={{ fontSize: "0.82rem", fontWeight: 300 }}>{description}</p>

      {project.screenshotPath && (
        <Link href={`/projects/${project.id}`} tabIndex={-1}>
          <Image
            src={project.screenshotPath}
            alt={`${project.name} screenshot`}
            width={560}
            height={315}
            className="w-full h-auto mb-5 block"
            style={{ borderRadius: "12px", border: "none" }}
          />
        </Link>
      )}

      <p className="mb-6 t-muted" style={{ fontSize: "0.65rem", letterSpacing: "0.04em" }}>
        {project.techStack.join("  ·  ")}
      </p>

      <div className="flex flex-wrap items-center gap-6">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ff-link-muted"
          style={{ fontSize: "0.7rem" }}
        >
          {t["projects.code"]}
        </a>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ff-link-muted"
            style={{ fontSize: "0.7rem" }}
          >
            {t["projects.live"]}
          </a>
        )}
        <span className="t-muted" style={{ fontSize: "0.65rem", marginLeft: "0.5rem" }}>
          {statusLabel[project.status]} · {project.year}
        </span>
      </div>
    </article>
  );
}
