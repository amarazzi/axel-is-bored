import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "spotty",
    name: "spotty",
    tagline: "Un cliente de Spotify que vive en tu terminal y es tan lindo que te va a hacer escuchar más música que nunca.",
    tagline_en: "A Spotify client that lives in your terminal and is so beautiful it'll make you listen to more music than ever.",
    description:
      "Un cliente de Spotify que vive en tu terminal y es tan lindo que te va a hacer escuchar más música que nunca.",
    description_en:
      "A Spotify client that lives in your terminal and is so beautiful it'll make you listen to more music than ever.",
    techStack: ["Python", "Textual", "Spotify Web API"],
    githubUrl: "https://github.com/amarazzi/spotty",
    screenshotPath: "/screenshots/spotty.png",
    status: "active",
    year: 2026,
    body: [
      {
        type: "paragraph",
        text: "Como quizás sepas, las apps en la terminal siempre me atrajeron. Como quizás también sepas, estoy todo el día escuchando música. Así es como decidí crear spotty, un pequeño cliente de Spotify que funciona completamente en la terminal.",
      },
      {
        type: "heading",
        text: "Cómo funciona",
      },
      {
        type: "paragraph",
        text: "Abrís spotty y tenés una interfaz TUI completa para controlar Spotify: ves lo que está sonando con la portada del álbum, barra de progreso en tiempo real y toda la info del track. Desde ahí podés buscar canciones y álbumes, navegar playlists, ver la letra del tema actual y revisar tu historial. Todo con el teclado.",
      },
      {
        type: "heading",
        text: "Sus features",
      },
      {
        type: "list",
        items: [
          "Now playing: portada del álbum (Sixel, Kitty o half-block según el terminal), info de la pista y barra de progreso en tiempo real.",
          "Búsqueda: / abre un overlay de búsqueda; Tab alterna entre canciones y álbumes.",
          "Navegación de álbumes: seleccioná un álbum para ver su tracklist y elegir desde dónde empezar.",
          "Playlists: o abre tus playlists; seleccioná una para reproducirla.",
          "Cola y recomendaciones: u muestra las próximas canciones; si la cola está vacía, sugiere artistas similares.",
          "Letras: l busca y muestra la letra de la canción actual, scrolleable con j/k.",
          "Historial: r muestra tus reproducciones recientes.",
          "Smart next: n salta a la siguiente; si no hay cola, reproduce algo similar automáticamente.",
          "Controles de reproducción: space para play/pause, n siguiente, p anterior, +/- para volumen.",
          "Activación automática de dispositivo: si no hay ninguno activo, spotty encuentra uno y transfiere la reproducción.",
          "Integración con spotifyd: daemon local opcional para que spotty funcione completamente standalone.",
        ],
      },
      {
        type: "heading",
        text: "Por qué existe",
      },
      {
        type: "paragraph",
        text: "Porque paso mucho tiempo en la terminal y escucho música todo el tiempo. Quería poder controlar Spotify sin cambiar de contexto, sin abrir una app aparte. Spotty resuelve exactamente eso.",
      },
    ],
    body_en: [
      {
        type: "paragraph",
        text: "As you may know, terminal apps have always appealed to me. As you may also know, I spend all day listening to music. That's how I decided to create spotty, a small Spotify client that runs entirely in the terminal.",
      },
      {
        type: "heading",
        text: "How it works",
      },
      {
        type: "paragraph",
        text: "You open spotty and get a full TUI to control Spotify: you see what's playing with the album art, a real-time progress bar and full track info. From there you can search for songs and albums, browse playlists, read the lyrics of the current track and check your listening history. All with the keyboard.",
      },
      {
        type: "heading",
        text: "Features",
      },
      {
        type: "list",
        items: [
          "Now playing: album art (Sixel, Kitty or half-block depending on the terminal), track info and a real-time progress bar.",
          "Search: / opens a search overlay; Tab toggles between tracks and albums.",
          "Album browsing: select an album to see its tracklist and choose where to start.",
          "Playlists: o opens your playlists; select one to start playing it.",
          "Queue & recommendations: u shows upcoming tracks; falls back to similar artists if the queue is empty.",
          "Lyrics: l fetches and displays lyrics for the current track, scrollable with j/k.",
          "Recently played: r shows your listening history.",
          "Smart next: n skips to the next track; if there is no queue, automatically plays something similar.",
          "Playback controls: space play/pause, n next, p previous, +/- volume.",
          "Auto device activation: if no device is active, spotty finds one and transfers playback automatically.",
          "spotifyd integration: optional local audio daemon so spotty works completely standalone.",
        ],
      },
      {
        type: "heading",
        text: "Why it exists",
      },
      {
        type: "paragraph",
        text: "Because I spend a lot of time in the terminal and listen to music all day. I wanted to control Spotify without switching context, without opening a separate app. Spotty solves exactly that.",
      },
    ],
  },
  {
    id: "torr",
    name: "torr",
    tagline: "Un Stremio para la terminal.",
    tagline_en: "A Stremio for the terminal.",
    description:
      "Un cliente de streaming, algo así como Stremio, para la terminal de macOS. Buscás, ves cuáles son las tendencias y reproducís películas y series directamente desde la línea de comandos.",
    description_en:
      "A terminal streaming client for macOS. Search, browse trending content and stream movies and TV shows directly from the command line, without opening a browser.",
    techStack: ["Go", "Bubbletea", "SQLite"],
    githubUrl: "https://github.com/amarazzi/torr",
    screenshotPath: "/screenshots/torr.png",
    status: "active",
    year: 2026,
    body: [
      {
        type: "paragraph",
        text: "Crecí con la película <em>Hackers</em> y cuando uso la línea de comandos me siento Trinity en <em>Matrix</em> usando <a href=\"https://nmap.org/\">nmap</a> para escanear los puertos de un servidor. Y como uso mucho Stremio y no encontré ninguna aplicación que hiciera eso mismo desde la terminal, le pedí al Claudito que me ayudara a hacerlo.",
      },
      {
        type: "paragraph",
        text: "Así es como nace torr, también uno de los nombres que me sugirió Claudio. Es un cliente de streaming para la terminal de macOS, hecho en Go con Bubbletea.",
      },
      {
        type: "heading",
        text: "Cómo funciona",
      },
      {
        type: "paragraph",
        text: "Abrís torr y tenés una interfaz interactiva en la terminal con lo que está trending en películas y series según TMDB. Podés buscar por título, filtrar por tipo de contenido, ver detalles, elegir calidad de stream y reproducir con VLC, IINA o QuickTime. Todo con el teclado, sin salir de la terminal.",
      },
      {
        type: "heading",
        text: "Sus features",
      },
      {
        type: "list",
        items: [
          "Trending: películas y series populares del momento vía TMDB.",
          "Búsqueda con filtro por tipo (películas, series o todo).",
          "Selección de calidad: 4K hasta 480p, ordenado por seeders y tamaño.",
          "Detección automática de reproductor: VLC, IINA o QuickTime.",
          "Watchlist y historial persistentes en SQLite.",
          "Continue watching: retomá donde lo dejaste.",
          "Subtítulos opcionales vía OpenSubtitles.",
          "Temas visuales: Nord, Dracula, Tokyo Night, Catppuccin y Matrix.",
        ],
      },
      {
        type: "heading",
        text: "Por qué existe",
      },
      {
        type: "paragraph",
        text: "Porque paso mucho tiempo en la terminal y quería encontrar contenidos para ver directamente desde ahí.",
      },
    ],
    body_en: [
      {
        type: "paragraph",
        text: "I grew up watching <em>Hackers</em> and when I use the command line I feel like Trinity in <em>The Matrix</em> scanning server ports with <a href=\"https://nmap.org/\">nmap</a>. Since I use Stremio a lot and couldn't find anything that did the same from the terminal, I asked Claudito to help me build it.",
      },
      {
        type: "paragraph",
        text: "That's how torr was born — also one of the names Claudio suggested. It's a terminal streaming client for macOS, built in Go with Bubbletea.",
      },
      {
        type: "heading",
        text: "How it works",
      },
      {
        type: "paragraph",
        text: "You open torr and get an interactive terminal UI with what's trending in movies and TV according to TMDB. You can search by title, filter by content type, view details, choose stream quality and play with VLC, IINA or QuickTime. All with the keyboard, without leaving the terminal.",
      },
      {
        type: "heading",
        text: "Features",
      },
      {
        type: "list",
        items: [
          "Trending: popular movies and TV shows via TMDB.",
          "Search with type filter (movies, series or both).",
          "Quality selection: 4K down to 480p, sorted by seeders and file size.",
          "Automatic player detection: VLC, IINA or QuickTime.",
          "Persistent watchlist and history in SQLite.",
          "Continue watching: pick up where you left off.",
          "Optional subtitles via OpenSubtitles.",
          "Visual themes: Nord, Dracula, Tokyo Night, Catppuccin and Matrix.",
        ],
      },
      {
        type: "heading",
        text: "Why it exists",
      },
      {
        type: "paragraph",
        text: "Because I spend a lot of time in the terminal and wanted to find content to watch directly from there.",
      },
    ],
  },
  {
    id: "1oo1",
    name: "1oo1",
    tagline: "Una película, un disco. Sin algoritmo, sin scroll.",
    tagline_en: "One movie, one album. No algorithm, no scroll.",
    description:
      "Una app para macOS que vive en el menú bar y te da una película y un disco de las listas canónicas \"1001 cosas que hay que ver/escuchar antes de morir\". Sin scroll infinito, sin sugerencias. Solo los clásicos, de a uno, con tiempo.",
    description_en:
      "A macOS app that lives in the menu bar and gives you a movie and an album from the canonical \"1001 things to see/listen to before you die\" lists. No infinite scroll, no suggestions. Just the classics, one at a time.",
    techStack: ["Swift", "SwiftUI", "macOS", "GRDB"],
    githubUrl: "https://github.com/amarazzi/1oo1",
    screenshotPath: "/screenshots/1oo1.png",
    status: "active",
    year: 2026,
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
    body_en: [
      {
        type: "paragraph",
        text: "There are two lists that have been around for a long time that I really want to tackle: 1001 movies you must see before you die and 1001 albums you must hear before you die.",
      },
      {
        type: "paragraph",
        text: "They're huge, a bit overwhelming, but I'm determined to watch and listen to every movie and album on those lists, so I started vibecoding what ended up becoming 1oo1, a small app that lives in the macOS menu bar that solves exactly that.",
      },
      {
        type: "paragraph",
        text: "When you open it, you'll see a movie and an album. Nothing else. No scroll, no algorithm. Just the classics, one at a time. Once you've consumed it, you can rate it, write a short review and move on to the next one.",
      },
      {
        type: "heading",
        text: "How it works",
      },
      {
        type: "paragraph",
        text: "The app lives in the menu bar. When you click it, a window appears with two cards: a film and an album. When you're done, you can mark them, leave a rating and a note. 1oo1 will show you the next one. If the one you got doesn't appeal to you that day, you can skip it — without losing it, it will come back randomly later.",
      },
      {
        type: "heading",
        text: "Features",
      },
      {
        type: "list",
        items: [
          "Persistent recommendations: the movie and album don't change on their own. They stay there until you decide what to do with them.",
          "Automatic poster and cover art: fetched via TMDB (for movies) and iTunes (for albums). Cached locally.",
          "TMDB rating next to the duration, for context before deciding.",
          "Direct trailer link to YouTube.",
          "Deep link to Spotify for albums.",
          "History with date, rating and notes for everything you've marked.",
          "Skip without penalty: skipping a movie or album doesn't remove it from the list, it just shows you another one.",
          "No account, no sync, no subscription. Everything local, everything yours.",
        ],
      },
      {
        type: "heading",
        text: "Why it exists",
      },
      {
        type: "paragraph",
        text: "I'm really tired of algorithms recommending things to me every day all the time depending on the industry's agenda. That's how 1oo1 was born.",
      },
    ],
  },
  {
    id: "minimal",
    name: "minimal",
    tagline: "Un editor de texto sin distracciones.",
    tagline_en: "A distraction-free text editor.",
    description:
      "Un editor de texto minimalista hecho con Electron. Inspirado en editores como uFocus y AI Writer, minimal saca todo lo que sobra y te deja enfocarte en escribir. Disponible para macOS, Windows y Linux.",
    description_en:
      "A minimalist text editor built with Electron. Inspired by editors like uFocus and AI Writer, minimal removes everything unnecessary and lets you focus on writing. Available for macOS, Windows and Linux.",
    techStack: ["Electron", "TypeScript", "CodeMirror"],
    githubUrl: "https://github.com/amarazzi/minimal",
    screenshotPath: "/screenshots/minimal.png",
    status: "active",
    year: 2026,
    body: [
      {
        type: "paragraph",
        text: "Quería un editor de texto que no me moleste. Sin barras laterales, sin menús infinitos, sin notificaciones. Solo una ventana, un cursor y las palabras. Así nace minimal.",
      },
      {
        type: "paragraph",
        text: "Está hecho con Electron y TypeScript, y la idea es que sea lo más limpio y directo posible. Abrís la app, escribís y listo. Funciona en macOS, Windows y Linux.",
      },
      {
        type: "heading",
        text: "Cómo funciona",
      },
      {
        type: "paragraph",
        text: "Abrís minimal y tenés un espacio en blanco para escribir. Podés trabajar con varias tabs y markdown se renderiza inline mientras escribís: negritas, itálicas, headings, código, links y listas, todo sin modo preview. Todo con atajos del teclado porque así me gusta trabajar a mí. Funciona en cualquier sistema operativo.",
      },
      {
        type: "heading",
        text: "Sus features",
      },
      {
        type: "list",
        items: [
          "Tabs: trabajá en múltiples documentos a la vez. Se auto-titulan desde la primera línea.",
          "Markdown inline: bold, italic, underline, headings, code, links y listas se renderizan mientras escribís.",
          "Auto-continue listas: al presionar Enter en un ítem de lista, se crea el siguiente automáticamente.",
          "Tipografía configurable: elegí entre Merriweather (serif) y JetBrains Mono (monospace). Ajustá el tamaño de 12pt a 28pt.",
          "Modo oscuro y claro: por defecto en dark mode, toggle instantáneo.",
          "Protección de guardado: cerrar un tab o la app con cambios sin guardar te avisa antes.",
          "Contador de palabras y caracteres siempre visible.",
          "Pantalla de bienvenida con todos los atajos de teclado.",
        ],
      },
      {
        type: "heading",
        text: "Por qué existe",
      },
      {
        type: "paragraph",
        text: "Porque los editores de texto tienen demasiadas cosas. Quería algo que se sienta como escribir en una hoja en blanco, pero en la compu. Sin distracciones, sin features que no uso. Solo escribir.",
      },
    ],
    body_en: [
      {
        type: "paragraph",
        text: "I wanted a text editor that doesn't bother me. No sidebars, no infinite menus, no notifications. Just a window, a cursor and the words. That's how minimal was born.",
      },
      {
        type: "paragraph",
        text: "It's built with Electron and TypeScript, and the idea is to be as clean and straightforward as possible. You open the app, you write, that's it. Works on macOS, Windows and Linux.",
      },
      {
        type: "heading",
        text: "How it works",
      },
      {
        type: "paragraph",
        text: "You open minimal and you have a blank space to write. You can work with multiple tabs and markdown renders inline as you type: bold, italics, headings, code, links and lists, all without preview mode. Everything with keyboard shortcuts because that's how I like to work. Works on any operating system.",
      },
      {
        type: "heading",
        text: "Features",
      },
      {
        type: "list",
        items: [
          "Tabs: work on multiple documents at once. They auto-title from the first line.",
          "Inline markdown: bold, italic, underline, headings, code, links and lists render as you type.",
          "Auto-continue lists: pressing Enter on a list item automatically creates the next one.",
          "Configurable typography: choose between Merriweather (serif) and JetBrains Mono (monospace). Adjust size from 12pt to 28pt.",
          "Dark and light mode: dark mode by default, instant toggle.",
          "Save protection: closing a tab or the app with unsaved changes warns you first.",
          "Word and character counter always visible.",
          "Welcome screen with all keyboard shortcuts.",
        ],
      },
      {
        type: "heading",
        text: "Why it exists",
      },
      {
        type: "paragraph",
        text: "Because text editors have too many things. I wanted something that feels like writing on a blank page, but on the computer. No distractions, no features I don't use. Just writing.",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.id === slug);
}
