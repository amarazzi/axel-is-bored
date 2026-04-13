export interface Book {
  id: string;
  title: string;
  author: string;
  yearRead: number;
  yearPublished: number;
  pages: number;
  rating: 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
  review: string;
  review_en?: string;
  coverPath: string;
}
