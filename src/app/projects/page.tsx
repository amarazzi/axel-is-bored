import { Nav } from "@/components/Nav/Nav";
import { ProjectsContent } from "@/components/ProjectsContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "proyectos — axel haciendo cosas",
  description: "Proyectos pequeños hechos por placer.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen t-bg">
      <Nav />
      <ProjectsContent />
    </div>
  );
}
