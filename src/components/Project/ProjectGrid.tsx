import { Project } from "@/types/project";
import { ProjectCard } from "./ProjectCard";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <section>
      {/* BBS menu header */}
      <div className="text-xs text-terminal-dim mb-6 space-y-0 font-mono overflow-hidden">
        <p className="text-terminal-border">{"┌─ AVAILABLE PROJECTS ──────────────────────────────────┐"}</p>
        <p className="text-terminal-border">
          {"│ "}
          <span className="text-terminal-dim">
            {`${projects.length} project(s) found. Select entry to view.`}
          </span>
          {"       │"}
        </p>
        <p className="text-terminal-border">{"└───────────────────────────────────────────────────────┘"}</p>
      </div>

      {/* Project list */}
      <div className="space-y-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
