import { StuffItem } from "@/types/stuff";
import { LetterboxdFilm } from "@/lib/letterboxd";

export interface FilmFeedItem {
  id: string;
  type: "film";
  date: string;
  film: LetterboxdFilm;
}

export type FeedItem = StuffItem | FilmFeedItem;

export type FeedItemType = FeedItem["type"];
