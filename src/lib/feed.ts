import { fetchStuffItems } from "@/lib/cositas";
import { fetchLetterboxdFilms } from "@/lib/letterboxd";
import { FeedItem } from "@/types/feed";

// Junta los shares de la extensión (Redis, incluye libros) con las
// películas/series de Letterboxd en un único feed ordenado por fecha descendente.
export async function fetchFeedItems(): Promise<FeedItem[]> {
  const [stuffItems, films] = await Promise.all([fetchStuffItems(), fetchLetterboxdFilms()]);

  const filmItems: FeedItem[] = films.map((film) => ({
    id: `film-${film.id}`,
    type: "film",
    date: film.dateWatched,
    film,
  }));

  return [...stuffItems, ...filmItems].sort((a, b) => b.date.localeCompare(a.date));
}
