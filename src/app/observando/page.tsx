import { Nav } from "@/components/Nav/Nav";
import { fetchPosts } from "@/lib/rss";
import { posts as fallbackPosts } from "@/data/posts";
import { ObservandoContent } from "@/components/ObservandoContent";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "axel hace observando",
  description: "Autoficción. Cuento mi vida ficcionada.",
};

export default async function ObservandoPage() {
  const rssPosts = await fetchPosts();

  return (
    <div className="min-h-screen t-bg">
      <Nav />
      <ObservandoContent rssPosts={rssPosts} fallbackPosts={fallbackPosts} />
    </div>
  );
}
