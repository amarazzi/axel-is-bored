import { Nav } from "@/components/Nav/Nav";
import { CositasContent } from "@/components/CositasContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "axel hace cositas",
  description: "Frases, links y otras cosas que me parecieron interesantes.",
};

export default function CositasPage() {
  return (
    <div className="min-h-screen t-bg">
      <Nav />
      <CositasContent />
    </div>
  );
}
