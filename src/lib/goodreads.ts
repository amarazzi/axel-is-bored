import { XMLParser } from "fast-xml-parser";

export interface CurrentlyReading {
  title: string;
  author: string;
  coverUrl: string;
  bookUrl: string;
}

function extractText(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "object" && value !== null) {
    const obj = value as Record<string, unknown>;
    if (typeof obj.__cdata === "string") return obj.__cdata.trim();
    if (typeof obj["#text"] === "string") return obj["#text"].trim();
  }
  return String(value ?? "").trim();
}

export async function fetchCurrentlyReading(): Promise<CurrentlyReading | null> {
  try {
    const res = await fetch(
      "https://www.goodreads.com/review/list_rss/3807146?shelf=currently-reading",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;

    const xml = await res.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      cdataPropName: "__cdata",
      textNodeName: "#text",
    });
    const parsed = parser.parse(xml);

    const channel = parsed?.rss?.channel;
    if (!channel) return null;

    const item = Array.isArray(channel.item)
      ? channel.item[0]
      : channel.item ?? null;
    if (!item) return null;

    return {
      title: extractText(item.title),
      author: extractText(item.author_name),
      coverUrl: extractText(item.book_large_image_url),
      bookUrl: extractText(item.link),
    };
  } catch {
    return null;
  }
}
