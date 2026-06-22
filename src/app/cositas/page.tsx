import { Nav } from "@/components/Nav/Nav";
import { CositasContent } from "@/components/CositasContent";
import { fetchStuffItems } from "@/lib/cositas";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "axel hace cositas",
  description: "Frases, links y otras cosas que me parecieron interesantes.",
};

export default async function CositasPage() {
  const items = await fetchStuffItems();

  return (
    <div className="min-h-screen t-bg">
      <Nav />
      <CositasContent items={items} />
    </div>
  );
}
