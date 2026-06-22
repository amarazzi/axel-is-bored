export interface QuoteItem {
  id: string;
  type: "quote";
  date: string;
  text: string;
  author?: string;
  source?: string;
  sourceUrl?: string;
}

export interface LinkItem {
  id: string;
  type: "link";
  date: string;
  url: string;
  title: string;
  description?: string;
  description_en?: string;
}

export interface NoteItem {
  id: string;
  type: "note";
  date: string;
  text: string;
  text_en?: string;
}

export interface ImageItem {
  id: string;
  type: "image";
  date: string;
  // Path local (/screenshots/x.png) o URL externa compartida desde la extensión.
  imageUrl: string;
  caption?: string;
  caption_en?: string;
  sourceUrl?: string;
}

export interface VideoItem {
  id: string;
  type: "video";
  date: string;
  url: string;
  title?: string;
  description?: string;
  description_en?: string;
}

export interface SongItem {
  id: string;
  type: "song";
  date: string;
  url: string;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  description?: string;
  description_en?: string;
}

export type StuffItem = QuoteItem | LinkItem | NoteItem | ImageItem | VideoItem | SongItem;
