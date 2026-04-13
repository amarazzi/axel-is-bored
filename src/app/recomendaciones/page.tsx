import { Nav } from "@/components/Nav/Nav";
import { RecomendacionesContent } from "@/components/RecomendacionesContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "recomendaciones — axel haciendo cosas",
  description: "Libros que leí y recomiendo.",
};

export default function RecomendacionesPage() {
  return (
    <div className="min-h-screen t-bg">
      <Nav />
      <RecomendacionesContent />
    </div>
  );
}
