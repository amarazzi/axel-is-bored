import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "1oo1",
    name: "1oo1",
    tagline: "Una película, un disco. Sin algoritmo, sin scroll.",
    description:
      "Una app para macOS que vive en el menú bar y te da una película y un disco de las listas canónicas \"1001 cosas que hay que ver/escuchar antes de morir\". Sin scroll infinito, sin sugerencias. Solo los clásicos, de a uno, con tiempo.",
    techStack: ["Swift", "SwiftUI", "macOS", "GRDB"],
    githubUrl: "https://github.com/amarazzi/1oo1",
    screenshotPath: "/screenshots/1oo1.png",
    status: "active",
    year: 2025,
    body: [
      {
        type: "paragraph",
        text: "Hay dos listas que existen desde hace un montón a las que les tengo muchas ganas: 1001 películas que hay que ver antes de morir y 1001 discos que hay que escuchar antes de morir.",
      },
      {
        type: "paragraph",
        text: "Son enormes, un tanto abrumadoras, pero estoy empecinado en que quiero ver y escuchar todas las películas y álbumes de esa lista, así que me puse a vibecodear lo que terminó convirtiéndose en 1oo1, una pequeña app que vive en el menú bar de macOS que resuelve justamente eso.",
      },
      {
        type: "paragraph",
        text: "Cuando la abras, vas a ver una película y un disco. Nada más. Sin scroll, sin algoritmo. Solo los clásicos, de a uno. Una vez que lo consumas vas a poder puntuarlo, poner una breve reseña e ir por otro.",
      },
      {
        type: "heading",
        text: "Cómo funciona",
      },
      {
        type: "paragraph",
        text: "La app vive en la barra del menú. Cuando la tocás aparece una ventana con dos cards: un film y un disco. Cuando los termines vas a poder marcarlo, dejarles un puntaje y una nota. 1001 te mostrará el próximo. Si el que te tocó no te llama la atención ese día, podés saltearlo —sin perderlo, más adelante volverá a aparecer de manera aleatoria–.",
      },
      {
        type: "heading",
        text: "Sus features",
      },
      {
        type: "list",
        items: [
          "Recomendaciones persistentes: la película y el disco no cambian solos. Se quedan ahí hasta que vos decidís qué hacer con ellos.",
          "Poster y cover art automáticos: los busca vía TMDB (para películas) e iTunes (para discos). Los cachea localmente.",
          "Puntaje TMDB al lado de la duración, para tener contexto antes de decidir.",
          "Link al trailer directo a YouTube.",
          "Deep link a Spotify para los álbumes.",
          "Historial con fecha, puntaje y notas de todo lo que marcaste.",
          "Skip sin penalidad: saltar una película o disco no la elimina de la lista, solo te muestra otra.",
          "Sin cuenta, sin sync, sin suscripción. Todo local, todo tuyo.",
        ],
      },
      {
        type: "heading",
        text: "Por qué existe",
      },
      {
        type: "paragraph",
        text: "Estoy muy cansado de los algoritmos recomendándome cosas todos los días todo el tiempo dependiendo de la agenda de la industria. Así nace 1oo1.",
      },
    ],
  },
  {
    id: "listapp",
    name: "ListApp",
    tagline: "Listas de todo lo que querés hacer, ver o consumir.",
    description:
      "Una app para hacer listas de cualquier cosa: discos que querés escuchar, " +
      "películas pendientes, libros, restaurantes, lo que sea. Sin algoritmo, " +
      "sin recomendaciones. Solo vos y tus listas. Rápida, limpia, para uso personal.",
    techStack: ["React", "TypeScript", "Node.js"],
    githubUrl: "https://github.com/amarazzi/listapp",
    screenshotPath: "/screenshots/listapp.png",
    status: "active",
    year: 2025,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.id === slug);
}
