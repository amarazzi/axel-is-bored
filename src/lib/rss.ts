import { XMLParser } from "fast-xml-parser";

export interface RSSPost {
  title: string;
  subtitle: string;
  slug: string;
  url: string;
  date: string;
  content: string;
}

function decodeEntities(str: string): string {
  return str
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    )
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

function extractText(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "object" && value !== null) {
    const obj = value as Record<string, unknown>;
    if (typeof obj.__cdata === "string") return obj.__cdata.trim();
    if (typeof obj.__text === "string") return obj.__text.trim();
    if (typeof obj["#text"] === "string") return obj["#text"].trim();
  }
  return String(value ?? "").trim();
}

export async function fetchPosts(): Promise<RSSPost[]> {
  try {
    const res = await fetch("https://observando.substack.com/feed", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];

    const xml = await res.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      cdataPropName: "__cdata",
      textNodeName: "#text",
    });
    const parsed = parser.parse(xml);

    const channel = parsed?.rss?.channel;
    if (!channel) return [];

    const items: Record<string, unknown>[] = Array.isArray(channel.item)
      ? channel.item
      : channel.item
        ? [channel.item]
        : [];

    return items
      .map((item): RSSPost | null => {
        const url = extractText(item.link) || extractText(item.guid);
        const slug = extractSlug(url);
        if (!slug) return null;

        return {
          title: extractText(item.title),
          subtitle: stripHtml(extractText(item.description)),
          date: formatDate(extractText(item.pubDate)),
          slug,
          url,
          content: extractText(item["content:encoded"]),
        };
      })
      .filter((p): p is RSSPost => p !== null);
  } catch {
    return [];
  }
}

export async function fetchPostBySlug(
  slug: string
): Promise<RSSPost | null> {
  const posts = await fetchPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}
