import { fetchPostBySlug, fetchPosts } from "@/lib/rss";
import { sanitizeHtml } from "@/lib/sanitize";
import { Nav } from "@/components/Nav/Nav";
import { ObservandoPostContent } from "@/components/ObservandoPostContent";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await fetchPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — observando`,
    description: post.subtitle,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) notFound();

  const sanitizedContent = sanitizeHtml(post.content);

  return (
    <div className="min-h-screen t-bg">
      <Nav />
      <ObservandoPostContent post={post} sanitizedContent={sanitizedContent} />
    </div>
  );
}
