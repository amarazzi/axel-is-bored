import { fetchStuffItems } from "@/lib/cositas";
import { fetchLetterboxdFilms } from "@/lib/letterboxd";
import { books } from "@/data/books";
import { FeedItem } from "@/types/feed";

// Junta los shares de la extensión (Redis) con libros y películas/series
// recomendadas en un único feed ordenado por fecha descendente.
export async function fetchFeedItems(): Promise<FeedItem[]> {
  const [stuffItems, films] = await Promise.all([fetchStuffItems(), fetchLetterboxdFilms()]);

  const bookItems: FeedItem[] = books.map((book) => ({
    id: `book-${book.id}`,
    type: "book",
    date: book.dateRead,
    book,
  }));

  const filmItems: FeedItem[] = films.map((film) => ({
    id: `film-${film.id}`,
    type: "film",
    date: film.dateWatched,
    film,
  }));

  return [...stuffItems, ...bookItems, ...filmItems].sort((a, b) => b.date.localeCompare(a.date));
}
