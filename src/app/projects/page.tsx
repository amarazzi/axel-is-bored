import { Nav } from "@/components/Nav/Nav";
import { projects } from "@/data/projects";
import { Project } from "@/types/project";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "proyectos — axel haciendo cosas",
  description: "Proyectos pequeños hechos por placer.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen t-bg">
      <Nav />

      <main className="max-w-4xl mx-auto px-8 py-24">
        <h1 className="text-2xl mb-3 t-accent" style={{ fontWeight: 300, letterSpacing: "-0.01em" }}>Proyectos</h1>
        <p className="mb-16 t-muted" style={{ fontSize: "0.75rem", fontWeight: 300 }}>
          Pequeñas apps que necesito y resuelvo vibecodeando.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
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

function ProjectCard({ project }: { project: Project }) {
  const statusLabel: Record<Project["status"], string> = {
    active: "activo",
    wip: "en progreso",
    archived: "archivado",
  };

  return (
    <article id={project.id}>
      <h2 className="mb-3 t-accent" style={{ fontSize: "0.9rem", fontWeight: 400 }}>
        <Link href={`/projects/${project.id}`} className="hover:opacity-70 transition-opacity duration-150">
          {project.name}
        </Link>
      </h2>

      <p className="leading-relaxed mb-5 t-accent2" style={{ fontSize: "0.82rem", fontWeight: 300 }}>{project.description}</p>

      {project.screenshotPath && (
        <Image
          src={project.screenshotPath}
          alt={`${project.name} screenshot`}
          width={560}
          height={315}
          className="w-full h-auto mb-5 block"
          style={{ borderRadius: "12px", border: "none" }}
        />
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
          código ↗
        </a>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ff-link-muted"
            style={{ fontSize: "0.7rem" }}
          >
            ver en vivo ↗
          </a>
        )}
        <span className="t-muted" style={{ fontSize: "0.65rem", marginLeft: "0.5rem" }}>
          {statusLabel[project.status]} · {project.year}
        </span>
      </div>
    </article>
  );
}
