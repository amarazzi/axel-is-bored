import { StuffItem } from "@/types/stuff";

// Ejemplos de cada tipo de item. Más adelante se van a cargar desde una
// extensión de Chrome (seleccionar texto / link / imagen y compartir).
export const stuff: StuffItem[] = [
  {
    id: "nota-1",
    type: "note",
    date: "2026-06-21",
    text: "Solo un pensamiento de prueba para testear la sección de cositas.",
    text_en: "Just a test thought to try out the cositas section.",
  },
  {
    id: "quote-borges-tiempo",
    type: "quote",
    date: "2026-06-20",
    text: "El tiempo es la sustancia de que estoy hecho.",
    author: "Jorge Luis Borges",
    source: "Nueva refutación del tiempo",
  },
  {
    id: "link-bubbletea",
    type: "link",
    date: "2026-06-19",
    url: "https://github.com/charmbracelet/bubbletea",
    title: "Bubbletea",
    description: "El framework de Go que usé para hacer torr. TUIs como si fueran apps de verdad.",
    description_en: "The Go framework I used to build torr. TUIs that feel like real apps.",
  },
  {
    id: "imagen-spotty-now-playing",
    type: "image",
    date: "2026-06-15",
    imageUrl: "/screenshots/spotty.png",
    caption: "La pantalla de now playing de spotty con el album art renderizado en Sixel.",
    caption_en: "spotty's now playing screen with the album art rendered in Sixel.",
  },
  {
    id: "video-de-prueba",
    type: "video",
    date: "2026-06-14",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    title: "Video de prueba para testear la tarjeta de video.",
  },
  {
    id: "song-de-prueba",
    type: "song",
    date: "2026-06-13",
    url: "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT",
    title: "Never Gonna Give You Up",
    artist: "Rick Astley",
    albumImageUrl: "https://i.scdn.co/image/ab67616d0000b273baf89eb11ec7c657805d2da0",
    description: "Canción de prueba para testear la tarjeta de Spotify.",
  },
];

export function sortedStuff(): StuffItem[] {
  return [...stuff].sort((a, b) => b.date.localeCompare(a.date));
}
