import { Nav } from "@/components/Nav/Nav";
import { CositasContent } from "@/components/CositasContent";
import { fetchFeedItems } from "@/lib/feed";
import { fetchCurrentlyReading } from "@/lib/goodreads";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "axel hace cositas",
  description: "Frases, canciones, links y cosas que cruce por internet que me parecieron interesantes.",
};

export default async function CositasPage() {
  const [items, currentlyReading] = await Promise.all([fetchFeedItems(), fetchCurrentlyReading()]);

  return (
    <div className="min-h-screen t-bg">
      <Nav />
      <CositasContent items={items} currentlyReading={currentlyReading} />
    </div>
  );
}
