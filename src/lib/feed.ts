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

  return [...stuffItems, ...filmItems].sort((a, b) => sortKey(b.date) - sortKey(a.date));
}

// Letterboxd solo da la fecha sin hora ("2026-06-23", día calendario en
// hora argentina), mientras que las cositas guardan timestamp completo en
// UTC ("2026-06-23T18:45:00.000Z"). Como Argentina es UTC-3, todo lo
// compartido después de las 21:00 ya cae en el día siguiente en UTC, así
// que comparar como string (o anclar la peli a las 23:59:59 UTC) hacía
// que esas cositas le ganaran a una peli vista esa misma noche aunque
// ambas se muestren como el mismo día (la UI convierte a hora local).
// Anclamos el día de la peli al final del día en hora argentina y
// comparamos por timestamp real, no por string.
const ARGENTINA_OFFSET = "-03:00";

function sortKey(date: string): number {
  if (date.length === 10) return new Date(`${date}T23:59:59.999${ARGENTINA_OFFSET}`).getTime();
  return new Date(date).getTime();
}
