import { projects, getProjectBySlug } from "@/data/projects";
import { Nav } from "@/components/Nav/Nav";
import { ContentBlock } from "@/types/project";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.name} — axel haciendo cosas`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const statusLabel: Record<typeof project.status, string> = {
    active: "activo",
    wip: "en progreso",
    archived: "archivado",
  };

  return (
    <div className="min-h-screen t-bg">
      <Nav />

      <main className="max-w-2xl mx-auto px-8 py-24">
        <p
          className="t-muted mb-6"
          style={{ fontSize: "0.65rem", letterSpacing: "0.1em" }}
        >
          {statusLabel[project.status]} · {project.year}
        </p>

        <div className="flex items-start justify-between gap-8 mb-12">
          <div className="flex-1 min-w-0">
            <h1
              className="t-accent mb-4"
              style={{ fontSize: "1.5rem", fontWeight: 300, lineHeight: 1.3, letterSpacing: "-0.01em" }}
            >
              {project.name}
            </h1>
            <p
              className="t-accent2"
              style={{ fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.7 }}
            >
              {project.tagline}
            </p>
          </div>
          {project.screenshotPath && (
            <div className="shrink-0 hidden sm:block">
              <Image
                src={project.screenshotPath}
                alt={`${project.name} screenshot`}
                width={160}
                height={178}
                className="object-cover"
                style={{ objectPosition: "center bottom", borderRadius: "12px", opacity: 1 }}
              />
            </div>
          )}
        </div>

        <div style={{ borderTop: "1px solid var(--theme-border)", marginBottom: "2.5rem" }} />

        {project.body ? (
          <div className="space-y-6">
            {project.body.map((block: ContentBlock, i: number) => {
              if (block.type === "paragraph") {
                return (
                  <p
                    key={i}
                    className="t-accent2"
                    style={{ fontSize: "0.85rem", fontWeight: 300, lineHeight: 1.8 }}
                  >
                    {block.text}
                  </p>
                );
              }
              if (block.type === "heading") {
                return (
                  <h2
                    key={i}
                    className="t-accent"
                    style={{ fontSize: "0.75rem", fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase", paddingTop: "1rem" }}
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "list") {
                return (
                  <ul key={i} className="space-y-2">
                    {block.items.map((item: string, j: number) => (
                      <li
                        key={j}
                        className="t-accent2 flex gap-3"
                        style={{ fontSize: "0.85rem", fontWeight: 300, lineHeight: 1.7 }}
                      >
                        <span className="t-muted shrink-0">*</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return null;
            })}
          </div>
        ) : (
          <p
            className="t-accent2"
            style={{ fontSize: "0.85rem", fontWeight: 300, lineHeight: 1.8 }}
          >
            {project.description}
          </p>
        )}

        <div
          className="mt-16"
          style={{ borderTop: "1px solid var(--theme-border)", paddingTop: "1.5rem" }}
        >
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
            <span className="t-muted" style={{ fontSize: "0.65rem", letterSpacing: "0.04em" }}>
              {project.techStack.join("  ·  ")}
            </span>
          </div>
        </div>
      </main>

      <footer
        className="max-w-2xl mx-auto px-8 py-8"
        style={{ borderTop: "1px solid var(--theme-border)" }}
      >
        <Link href="/projects" className="ff-back">
          ← proyectos
        </Link>
      </footer>
    </div>
  );
}
