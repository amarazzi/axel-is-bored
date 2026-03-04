import { fetchPostBySlug, fetchPosts } from "@/lib/rss";
import { Nav } from "@/components/Nav/Nav";
import Link from "next/link";
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

  return (
    <div className="min-h-screen t-bg">
      <Nav />

      <main className="max-w-2xl mx-auto px-8 py-24">
        <p
          className="t-muted mb-6"
          style={{ fontSize: "0.65rem", letterSpacing: "0.1em" }}
        >
          {post.date}
        </p>

        <h1
          className="t-accent mb-4"
          style={{ fontSize: "1.5rem", fontWeight: 300, lineHeight: 1.3, letterSpacing: "-0.01em" }}
        >
          {post.title}
        </h1>

        <p
          className="t-accent2 mb-12"
          style={{ fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.7 }}
        >
          {post.subtitle}
        </p>

        <div style={{ borderTop: "1px solid var(--theme-border)", marginBottom: "2.5rem" }} />

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div
          className="mt-16"
          style={{ borderTop: "1px solid var(--theme-border)", paddingTop: "1.5rem" }}
        >
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ff-link-muted"
            style={{ fontSize: "0.7rem" }}
          >
            leer en substack ↗
          </a>
        </div>
      </main>

      <footer
        className="max-w-2xl mx-auto px-8 py-8"
        style={{ borderTop: "1px solid var(--theme-border)" }}
      >
        <Link href="/observando" className="ff-back">
          ← observando
        </Link>
      </footer>
    </div>
  );
}
