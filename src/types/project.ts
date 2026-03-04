export type TechTag =
  | "React"
  | "Next.js"
  | "TypeScript"
  | "Node.js"
  | "PostgreSQL"
  | "Tailwind CSS"
  | "Expo"
  | "React Native"
  | "Supabase"
  | "Prisma"
  | "Vite"
  | "SQLite"
  | string;

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  techStack: TechTag[];
  githubUrl: string;
  liveUrl?: string;
  screenshotPath?: string;
  status: "active" | "wip" | "archived";
  year: number;
  body?: ContentBlock[];
}
