import { Nav } from "@/components/Nav/Nav";
import { HomeContent } from "@/components/HomeContent";
import { fetchPosts } from "@/lib/rss";
import { posts as fallbackPosts } from "@/data/posts";

export const revalidate = 3600;

export default async function HomePage() {
  const rssPosts = await fetchPosts();

  return (
    <div className="min-h-screen t-bg">
      <Nav />
      <HomeContent rssPosts={rssPosts} fallbackPosts={fallbackPosts} />
    </div>
  );
}
