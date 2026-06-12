import { Nav } from "@/components/Nav/Nav";
import { DesignSystemContent } from "@/components/DesignSystemContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "design system — axel is bored",
  description: "Tokens, tipografía, componentes y estilos del sitio.",
};

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen t-bg">
      <Nav />
      <DesignSystemContent />
    </div>
  );
}
