export interface Film {
  id: string;
  title: string;
  director: string;
  yearWatched: number;
  yearReleased: number;
  duration: number; // minutes
  rating: 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
  review: string;
  review_en?: string;
  posterPath?: string;
}
