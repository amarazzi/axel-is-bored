import { Nav } from "@/components/Nav/Nav";
import { AboutContent } from "@/components/AboutContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "sobre axel",
  description: "Quién es Axel y qué hace.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen t-bg">
      <Nav />
      <AboutContent />
    </div>
  );
}
