"use client";

import Link from "next/link";
import { useLanguage } from "@/components/Language/LanguageProvider";

interface PostData {
  title: string;
  subtitle: string;
  date: string;
  url: string;
  content: string;
}

export function ObservandoPostContent({ post, sanitizedContent }: { post: PostData; sanitizedContent: string }) {
  const { t } = useLanguage();

  return (
    <>
      <main id="main-content" className="max-w-2xl mx-auto px-8 py-24">
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
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
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
            {t["observandoPost.readOnSubstack"]}
          </a>
        </div>
      </main>

      <footer
        className="max-w-2xl mx-auto px-8 py-8"
        style={{ borderTop: "1px solid var(--theme-border)" }}
      >
        <Link href="/observando" className="ff-back">
          {t["observandoPost.back"]}
        </Link>
      </footer>
    </>
  );
}
