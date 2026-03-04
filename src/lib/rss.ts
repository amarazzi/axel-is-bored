export interface RSSPost {
  title: string;
  subtitle: string;
  slug: string;
  url: string;
  date: string;
  content: string;
}

function extractField(xml: string, tag: string): string {
  // CDATA
  const cdataRe = new RegExp(
    `<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`,
    "i"
  );
  const cdataMatch = xml.match(cdataRe);
  if (cdataMatch) return cdataMatch[1].trim();

  // plain text
  const plainRe = new RegExp(`<${tag}[^>]*>([^<]*)<\\/${tag}>`, "i");
  const plainMatch = xml.match(plainRe);
  return plainMatch ? plainMatch[1].trim() : "";
}

function decodeEntities(str: string): string {
  return str
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function stripHtml(html: string): string {
  return decodeEntities(html.replace(/<[^>]*>/g, "")).trim();
}

function extractSlug(url: string): string {
  const match = url.match(/\/p\/([^/?#]+)/);
  return match ? match[1] : "";
}

function formatDate(pubDate: string): string {
  try {
    const date = new Date(pubDate);
    return date.toLocaleDateString("es-AR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return pubDate;
  }
}

export async function fetchPosts(): Promise<RSSPost[]> {
  try {
    const res = await fetch("https://observando.substack.com/feed", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];

    const xml = await res.text();
    const itemBlocks = xml
      .split("<item>")
      .slice(1)
      .map((b) => b.split("</item>")[0]);

    return itemBlocks
      .map((item): RSSPost | null => {
        const url =
          extractField(item, "link") ||
          extractField(item, "guid") ||
          "";
        const slug = extractSlug(url);
        if (!slug) return null;

        return {
          title: extractField(item, "title"),
          subtitle: stripHtml(extractField(item, "description")),
          date: formatDate(extractField(item, "pubDate")),
          slug,
          url,
          content: extractField(item, "content:encoded"),
        };
      })
      .filter((p): p is RSSPost => p !== null);
  } catch {
    return [];
  }
}

export async function fetchPostBySlug(slug: string): Promise<RSSPost | null> {
  const posts = await fetchPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}
