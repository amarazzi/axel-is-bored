import { XMLParser } from "fast-xml-parser";

export interface LetterboxdFilm {
  id: string;
  title: string;
  director: string | null;
  yearReleased: number;
  dateWatched: string;
  runtime: number | null;
  rating: number;
  review: string | null;
  posterUrl: string | null;
}

function extractText(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (value !== null && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if (typeof obj.__cdata === "string") return obj.__cdata.trim();
    if (typeof obj["#text"] === "string") return obj["#text"].trim();
  }
  return String(value ?? "").trim();
}

function parsePoster(html: string): string | null {
  const m = html.match(/<img src="([^"]+)"/);
  return m ? m[1] : null;
}

function parseReview(html: string): string | null {
  const clean = html
    .replace(/<p>\s*<img[^>]+\/?>\s*<\/p>/g, "")
    .replace(/<em>This review may contain spoilers\.<\/em>/g, "");

  const text = clean.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  if (!text || /^Watched on /i.test(text)) return null;
  return text;
}

async function fetchTMDBDetails(tmdbId: string): Promise<{ director: string | null; runtime: number | null }> {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey || !tmdbId) return { director: null, runtime: null };

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${apiKey}&append_to_response=credits`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return { director: null, runtime: null };

    const data = await res.json();
    const runtime: number | null = data.runtime || null;
    const director: string | null =
      data.credits?.crew?.find((p: { job: string; name: string }) => p.job === "Director")?.name ?? null;

    return { director, runtime };
  } catch {
    return { director: null, runtime: null };
  }
}

export async function fetchLetterboxdFilms(): Promise<LetterboxdFilm[]> {
  try {
    const res = await fetch("https://letterboxd.com/axelmarazzi/rss/", {
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

    const rawItems = Array.isArray(channel.item)
      ? channel.item
      : channel.item
      ? [channel.item]
      : [];

    const seen = new Set<string>();
    const entries: Array<{
      id: string;
      title: string;
      tmdbId: string;
      yearReleased: number;
      dateWatched: string;
      rating: number;
      review: string | null;
      posterUrl: string | null;
    }> = [];

    for (const item of rawItems) {
      const title = extractText(item["letterboxd:filmTitle"]);
      if (!title) continue;

      const rating = parseFloat(extractText(item["letterboxd:memberRating"]));
      if (!rating || isNaN(rating)) continue;

      const description = extractText(item.description);
      const review = parseReview(description);
      const posterUrl = parsePoster(description);
      const tmdbId = extractText(item["tmdb:movieId"]);

      const watchedStr = extractText(item["letterboxd:watchedDate"]);
      const dateWatched = watchedStr || new Date().toISOString().split("T")[0];

      const yearReleased = parseInt(extractText(item["letterboxd:filmYear"])) || 0;

      const letterboxdUrl = extractText(item.link);
      const urlMatch = letterboxdUrl.match(/\/film\/([^/]+)\//);
      const id = urlMatch
        ? urlMatch[1]
        : title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

      const key = title.toLowerCase();
      if (seen.has(key)) {
        const existing = entries.find((f) => f.title.toLowerCase() === key);
        if (existing && !existing.review && review) existing.review = review;
        continue;
      }
      seen.add(key);

      entries.push({ id, title, tmdbId, yearReleased, dateWatched, rating, review, posterUrl });
    }

    const tmdbDetails = await Promise.all(
      entries.map((e) => fetchTMDBDetails(e.tmdbId))
    );

    return entries.map((e, i) => ({
      id: e.id,
      title: e.title,
      director: tmdbDetails[i].director,
      yearReleased: e.yearReleased,
      dateWatched: e.dateWatched,
      runtime: tmdbDetails[i].runtime,
      rating: e.rating,
      review: e.review,
      posterUrl: e.posterUrl,
    }));
  } catch {
    return [];
  }
}
