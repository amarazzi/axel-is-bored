import { Redis } from "@upstash/redis";
import { stuff as fallbackStuff } from "@/data/stuff";
import { StuffItem } from "@/types/stuff";

const REDIS_KEY = "cositas:items";

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function parseItem(entry: unknown): StuffItem | null {
  if (typeof entry === "string") {
    try {
      return JSON.parse(entry) as StuffItem;
    } catch {
      return null;
    }
  }
  if (entry && typeof entry === "object") return entry as StuffItem;
  return null;
}

// Lee los items compartidos desde la extensión. Si Redis no está
// configurado (o falla), cae al data file estático — mismo patrón que
// rss.ts/goodreads.ts con sus fallbacks.
export async function fetchStuffItems(): Promise<StuffItem[]> {
  const redis = getRedis();
  if (!redis) return fallbackStuff;

  try {
    const raw = await redis.lrange<unknown>(REDIS_KEY, 0, -1);
    const items = raw.map(parseItem).filter((item): item is StuffItem => item !== null);
    return items.length > 0 ? items : fallbackStuff;
  } catch {
    return fallbackStuff;
  }
}

export async function pushStuffItem(item: StuffItem): Promise<void> {
  const redis = getRedis();
  if (!redis) {
    throw new Error("Redis no está configurado (faltan UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN)");
  }
  await redis.lpush(REDIS_KEY, JSON.stringify(item));
}
