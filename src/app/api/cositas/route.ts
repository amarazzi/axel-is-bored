import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { pushStuffItem, removeStuffItem } from "@/lib/cositas";
import { StuffItem } from "@/types/stuff";

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

  return null;
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

  const item = buildItem(body);
  if (!item) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400, headers: CORS_HEADERS });
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
