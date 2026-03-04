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
  | (string & {});

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export interface Project {
  id: string;
  name: string;
  tagline: string;
  tagline_en?: string;
  description: string;
  description_en?: string;
  techStack: TechTag[];
  githubUrl: string;
  liveUrl?: string;
  screenshotPath?: string;
  status: "active" | "wip" | "archived";
  year: number;
  body?: ContentBlock[];
  body_en?: ContentBlock[];
}
