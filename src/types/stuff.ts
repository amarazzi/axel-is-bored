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
  imagePath: string;
  caption?: string;
  caption_en?: string;
  sourceUrl?: string;
}

export type StuffItem = QuoteItem | LinkItem | NoteItem | ImageItem;
