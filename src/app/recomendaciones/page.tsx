import { Nav } from "@/components/Nav/Nav";
import { RecomendacionesContent } from "@/components/RecomendacionesContent";
import { fetchCurrentlyReading } from "@/lib/goodreads";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "recomendaciones — axel haciendo cosas",
  description: "Libros que leí y recomiendo.",
};

export default async function RecomendacionesPage() {
  const currentlyReading = await fetchCurrentlyReading();

  return (
    <div className="min-h-screen t-bg">
      <Nav />
      <RecomendacionesContent currentlyReading={currentlyReading} />
    </div>
  );
}
