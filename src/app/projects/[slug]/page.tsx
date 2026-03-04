import { projects, getProjectBySlug } from "@/data/projects";
import { Nav } from "@/components/Nav/Nav";
import { ProjectDetailContent } from "@/components/ProjectDetailContent";
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

  return (
    <div className="min-h-screen t-bg">
      <Nav />
      <ProjectDetailContent project={project} />
    </div>
  );
}
