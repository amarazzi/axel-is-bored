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

export interface AlbumItem {
  id: string;
  type: "album";
  date: string;
  url: string;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  description?: string;
  description_en?: string;
}

export interface BookItem {
  id: string;
  type: "book";
  // Fecha en la que se terminó de leer.
  date: string;
  title: string;
  author: string;
  yearPublished?: number;
  pages?: number;
  rating: 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
  review?: string;
  review_en?: string;
  // Path local (/covers/x.jpg) o URL externa/data URL subida desde la extensión.
  coverImageUrl: string;
}

export type StuffItem =
  | QuoteItem
  | LinkItem
  | NoteItem
  | ImageItem
  | VideoItem
  | SongItem
  | AlbumItem
  | BookItem;
