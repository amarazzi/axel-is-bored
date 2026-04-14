"use client";

import { Project, ContentBlock } from "@/types/project";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/components/Language/LanguageProvider";
import { ImageLightbox } from "@/components/ImageLightbox";

export function ProjectDetailContent({ project }: { project: Project }) {
  const { locale, t } = useLanguage();
  const [lightbox, setLightbox] = useState(false);

  const statusLabel: Record<Project["status"], string> = {
    active: t["projects.status.active"],
    wip: t["projects.status.wip"],
    archived: t["projects.status.archived"],
  };

  const tagline = locale === "en" ? (project.tagline_en ?? project.tagline) : project.tagline;
  const description = locale === "en" ? (project.description_en ?? project.description) : project.description;
  const body = locale === "en" ? (project.body_en ?? project.body) : project.body;

  return (
    <>
      <main className="ff-page max-w-2xl mx-auto px-8 py-16 sm:py-24">
        <p
          className="t-muted mb-6"
          style={{ fontSize: "0.65rem", letterSpacing: "0.1em" }}
        >
          {statusLabel[project.status]} · {project.year}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 sm:gap-8 mb-12">
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
              {tagline}
            </p>
          </div>
          {project.screenshotPath && (
            <div className="shrink-0">
              <Image
                src={project.screenshotPath}
                alt={`${project.name} screenshot`}
                width={160}
                height={178}
                className="object-cover"
                style={{ objectPosition: "center bottom", borderRadius: "12px", opacity: 1, cursor: "zoom-in", width: "clamp(80px, 22vw, 160px)", height: "auto" }}
                onClick={() => setLightbox(true)}
              />
              {lightbox && (
                <ImageLightbox
                  src={project.screenshotPath}
                  alt={`${project.name} screenshot`}
                  onClose={() => setLightbox(false)}
                />
              )}
            </div>
          )}
        </div>

        <div style={{ borderTop: "1px solid var(--theme-border)", marginBottom: "2.5rem" }} />

        {body ? (
          <div className="space-y-6">
            {body.map((block: ContentBlock, i: number) => {
              if (block.type === "paragraph") {
                return (
                  <p
                    key={i}
                    className="t-accent2"
                    style={{ fontSize: "0.85rem", fontWeight: 300, lineHeight: 1.8 }}
                    dangerouslySetInnerHTML={{ __html: block.text }}
                  />
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
            {description}
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
          {t["projectDetail.backProjects"]}
        </Link>
      </footer>
    </>
  );
}
