import { Project } from "@/types/project";
import { TerminalWindow } from "@/components/Terminal/TerminalWindow";
import {
  ProjectScreenshot,
  ProjectScreenshotPlaceholder,
} from "./ProjectScreenshot";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const STATUS_LABELS: Record<Project["status"], string> = {
  active:   "[  ACTIVE  ]",
  wip:      "[  W.I.P.  ]",
  archived: "[ ARCHIVED ]",
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const menuNumber = String(index + 1).padStart(2, "0");

  return (
    <TerminalWindow
      title={`${menuNumber}. ${project.name.toUpperCase()}`}
      titleExtra={STATUS_LABELS[project.status]}
    >
      <div className="space-y-4">

        {/* Tagline */}
        <p className="text-terminal-dim text-sm">
          <span className="text-terminal-border">// </span>
          {project.tagline}
        </p>

        {/* Screenshot */}
        {project.screenshotPath ? (
          <ProjectScreenshot
            src={project.screenshotPath}
            alt={`${project.name} screenshot`}
            projectName={project.name}
          />
        ) : (
          <ProjectScreenshotPlaceholder projectName={project.name} />
        )}

        {/* Description */}
        <p className="text-sm leading-relaxed text-terminal-fg">
          {project.description}
        </p>

        {/* Separator */}
        <div className="text-terminal-border text-xs overflow-hidden whitespace-nowrap">
          {"┄".repeat(60)}
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-terminal-dim">STACK:</span>
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="border border-terminal-border px-1.5 py-0.5 text-terminal-dim hover:text-terminal-fg hover:border-terminal-fg transition-colors duration-100 cursor-default"
            >
              [{tech}]
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 text-xs pt-1">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-terminal-dim hover:text-terminal-fg transition-colors duration-100 flex items-center gap-1"
          >
            <span className="text-terminal-border">├─</span>
            <span>[GITHUB]</span>
          </a>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-dim hover:text-terminal-fg transition-colors duration-100 flex items-center gap-1"
            >
              <span className="text-terminal-border">└─</span>
              <span>[LIVE DEMO]</span>
            </a>
          ) : (
            <span className="text-terminal-border flex items-center gap-1">
              <span>└─</span>
              <span>[NO LIVE URL YET]</span>
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="text-terminal-border text-xs pt-1">
          {`INIT: ${project.year} // ID: ${project.id.toUpperCase()}`}
        </div>
      </div>
    </TerminalWindow>
  );
}
