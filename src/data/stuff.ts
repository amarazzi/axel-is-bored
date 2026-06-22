import { StuffItem } from "@/types/stuff";

// Ejemplos de cada tipo de item. Más adelante se van a cargar desde una
// extensión de Chrome (seleccionar texto / link / imagen y compartir).
export const stuff: StuffItem[] = [
  {
    id: "nota-1",
    type: "note",
    date: "2026-06-21",
    text: "A veces programar de noche se parece más a no querer dormir que a tener ganas de programar.",
    text_en: "Sometimes coding at night is less about wanting to code and more about not wanting to sleep.",
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
    imagePath: "/screenshots/spotty.png",
    caption: "La pantalla de now playing de spotty con el album art renderizado en Sixel.",
    caption_en: "spotty's now playing screen with the album art rendered in Sixel.",
  },
];

export function sortedStuff(): StuffItem[] {
  return [...stuff].sort((a, b) => b.date.localeCompare(a.date));
}
