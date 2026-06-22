import { StuffItem } from "@/types/stuff";
import { Book } from "@/types/book";
import { LetterboxdFilm } from "@/lib/letterboxd";

export interface BookFeedItem {
  id: string;
  type: "book";
  date: string;
  book: Book;
}

export interface FilmFeedItem {
  id: string;
  type: "film";
  date: string;
  film: LetterboxdFilm;
}

export type FeedItem = StuffItem | BookFeedItem | FilmFeedItem;

export type FeedItemType = FeedItem["type"];
