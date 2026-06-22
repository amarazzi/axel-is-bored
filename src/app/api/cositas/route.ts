import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { pushStuffItem, removeStuffItem } from "@/lib/cositas";
import { StuffItem, SongItem, AlbumItem } from "@/types/stuff";

export const dynamic = "force-dynamic";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.COSITAS_API_SECRET;
  if (!secret) return false;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

function nonEmptyString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function toFiniteNumber(value: unknown): number | undefined {
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

const ALLOWED_RATINGS = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

function buildItem(body: Record<string, unknown>): StuffItem | null {
  const id = randomUUID();
  const date = new Date().toISOString();
  const type = body.type;

  if (type === "quote") {
    const text = nonEmptyString(body.text);
    if (!text) return null;
    return {
      id,
      type,
      date,
      text,
      author: nonEmptyString(body.author),
      source: nonEmptyString(body.source),
      sourceUrl: nonEmptyString(body.sourceUrl),
    };
  }

  if (type === "note") {
    const text = nonEmptyString(body.text);
    if (!text) return null;
    return { id, type, date, text };
  }

  if (type === "link") {
    const url = nonEmptyString(body.url);
    const title = nonEmptyString(body.title);
    if (!url || !title) return null;
    return { id, type, date, url, title, description: nonEmptyString(body.description) };
  }

  if (type === "video") {
    const url = nonEmptyString(body.url);
    if (!url) return null;
    return { id, type, date, url, title: nonEmptyString(body.title), description: nonEmptyString(body.description) };
  }

  if (type === "image") {
    const imageUrl = nonEmptyString(body.imageUrl);
    if (!imageUrl) return null;
    return { id, type, date, imageUrl, caption: nonEmptyString(body.caption), sourceUrl: nonEmptyString(body.sourceUrl) };
  }

  if (type === "song" || type === "album") {
    const url = nonEmptyString(body.url);
    if (!url) return null;
    return {
      id,
      type,
      date,
      url,
      title: nonEmptyString(body.title),
      artist: nonEmptyString(body.artist),
      albumImageUrl: nonEmptyString(body.albumImageUrl),
      description: nonEmptyString(body.description),
    };
  }

  if (type === "book") {
    const title = nonEmptyString(body.title);
    const author = nonEmptyString(body.author);
    const coverImageUrl = nonEmptyString(body.coverImageUrl);
    const rating = Number(body.rating);
    if (!title || !author || !coverImageUrl || !ALLOWED_RATINGS.includes(rating)) return null;
    return {
      id,
      type,
      date,
      title,
      author,
      coverImageUrl,
      rating: rating as 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5,
      yearPublished: toFiniteNumber(body.yearPublished),
      pages: toFiniteNumber(body.pages),
      review: nonEmptyString(body.review),
    };
  }

  return null;
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function matchMeta(html: string, property: string): string | undefined {
  const match = html.match(new RegExp(`<meta property="${property}" content="([^"]*)"`));
  return match ? decodeHtmlEntities(match[1]) : undefined;
}

// Spotify formatea el og:title de un álbum como
// "Nombre - Album by Artista | Spotify" — el de un track ya viene limpio.
function cleanAlbumTitle(title: string | undefined): string | undefined {
  if (!title) return undefined;
  return title.split(/\s*-\s*Album by /i)[0]?.trim() || undefined;
}

// Completa título/artista/arte del álbum desde los meta tags Open Graph
// de la página de Spotify — server-side, así no depende de que la
// extensión tenga permisos de fetch cross-origin contra Spotify.
async function enrichMusicItem<T extends SongItem | AlbumItem>(item: T): Promise<T> {
  if (item.title && item.artist && item.albumImageUrl) return item;

  try {
    const res = await fetch(item.url);
    const html = await res.text();
    const rawTitle = matchMeta(html, "og:title");
    const description = matchMeta(html, "og:description");
    const albumImageUrl = matchMeta(html, "og:image");
    const artist = description ? description.split(" · ")[0] : undefined;
    const title = item.type === "album" ? cleanAlbumTitle(rawTitle) : rawTitle;

    return {
      ...item,
      title: item.title || title,
      artist: item.artist || artist,
      albumImageUrl: item.albumImageUrl || albumImageUrl,
    };
  } catch {
    return item;
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401, headers: CORS_HEADERS });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400, headers: CORS_HEADERS });
  }

  let item = buildItem(body);
  if (!item) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400, headers: CORS_HEADERS });
  }

  if (item.type === "song" || item.type === "album") {
    item = await enrichMusicItem(item);
  }

  try {
    await pushStuffItem(item);
  } catch {
    return NextResponse.json({ error: "storage not configured" }, { status: 500, headers: CORS_HEADERS });
  }

  return NextResponse.json({ ok: true, item }, { status: 201, headers: CORS_HEADERS });
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401, headers: CORS_HEADERS });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "missing id" }, { status: 400, headers: CORS_HEADERS });
  }

  try {
    const removed = await removeStuffItem(id);
    if (!removed) {
      return NextResponse.json({ error: "not found" }, { status: 404, headers: CORS_HEADERS });
    }
    return NextResponse.json({ ok: true }, { headers: CORS_HEADERS });
  } catch {
    return NextResponse.json({ error: "storage not configured" }, { status: 500, headers: CORS_HEADERS });
  }
}
