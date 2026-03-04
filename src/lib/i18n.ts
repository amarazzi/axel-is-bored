export type Locale = "es" | "en";

export const DEFAULT_LOCALE: Locale = "es";
export const LOCALE_STORAGE_KEY = "axel-lang";

export interface Translations {
  // Nav
  "nav.about": string;
  "nav.observando": string;
  "nav.projects": string;

  // Language switcher
  "lang.label": string;

  // Home
  "home.phrases": string[];
  "home.heroPrefix": string;
  "home.heroDesc1": string;
  "home.heroDesc2": string;
  "home.seeAll": string;
  "home.projects": string;
  "home.more": string;
  "home.footer": string;

  // About
  "about.title": string;
  "about.p1": string;
  "about.p2pre": string;
  "about.p2post": string;
  "about.p3": string;
  "about.p4": string;
  "about.contact": string;
  "about.back": string;

  // Projects
  "projects.title": string;
  "projects.subtitle": string;
  "projects.code": string;
  "projects.live": string;
  "projects.back": string;
  "projects.status.active": string;
  "projects.status.wip": string;
  "projects.status.archived": string;

  // Project detail
  "projectDetail.backProjects": string;

  // Observando
  "observando.subtitle": string;
  "observando.p1": string;
  "observando.p2": string;
  "observando.p3": string;
  "observando.subscribe": string;
  "observando.latest": string;
  "observando.previous": string;
  "observando.back": string;

  // Observando post
  "observandoPost.readOnSubstack": string;
  "observandoPost.back": string;
}

const es: Translations = {
  "nav.about": "sobre mí",
  "nav.observando": "observando",
  "nav.projects": "proyectos",

  "lang.label": "EN",

  "home.phrases": ["hace cosas", "escribe", "vibecodea", "diseña", "lee", "corre"],
  "home.heroPrefix": "axel",
  "home.heroDesc1": "Escribo cómo veo la vida en",
  "home.heroDesc2": ". Además, vibecodeo y diseño pequeñas apps.",
  "home.seeAll": "ver todos →",
  "home.projects": "Proyectos",
  "home.more": "más →",
  "home.footer": "axel haciendo cosas",

  "about.title": "Sobre mí",
  "about.p1":
    "Me llamo Axel Marazzi. Vivo en Buenos Aires. Soy periodista y diseñador. Hoy trabajo para ueno bank, un banco paraguayo, diseñando experiencias con inteligencia artificial. Mi trabajo, me gusta pensar, siempre mezcló tecnología y palabras.",
  "about.p2pre": "Hace muchos años escribo ",
  "about.p2post":
    ", un newsletter que cambió muchísimo con los años. Hoy es una especie de diario personal abierto donde exploro mi escritura e intento contar cómo veo la vida.",
  "about.p3":
    "En mi tiempo libre vibecodeo pequeños proyectos que resuelven algunas de mis necesidades. Los hago por placer, sin presión, a ver qué sale. Son herramientas que necesito yo mismo y que tal vez te sirvan a vos también.",
  "about.p4": "Este sitio existe para juntar esas cosas.",
  "about.contact": "contacto",
  "about.back": "← volver",

  "projects.title": "Proyectos",
  "projects.subtitle": "Pequeñas apps que necesito y resuelvo vibecodeando.",
  "projects.code": "código ↗",
  "projects.live": "ver en vivo ↗",
  "projects.back": "← volver",
  "projects.status.active": "activo",
  "projects.status.wip": "en progreso",
  "projects.status.archived": "archivado",

  "projectDetail.backProjects": "← proyectos",

  "observando.subtitle": "autoficción",
  "observando.p1":
    "Hace muchos años escribo observando, un newsletter que cambió muchísimo con los años. Empezó siendo una cosa y se fue convirtiendo en otra sin que yo lo planeara demasiado.",
  "observando.p2":
    "Hoy es una especie de diario personal abierto donde exploro mi escritura e intento contar cómo veo la vida. Algunas cosas pasaron tal cual las cuento. Otras no.",
  "observando.p3":
    "Cambio nombres, lugares, fechas, el orden de las cosas. La realidad me interesa como punto de partida, no como destino. Espero que algo de lo que escribo te resuene.",
  "observando.subscribe": "suscribirse →",
  "observando.latest": "últimas entregas",
  "observando.previous": "leer ediciones anteriores →",
  "observando.back": "← volver",

  "observandoPost.readOnSubstack": "leer en substack ↗",
  "observandoPost.back": "← observando",
};

const en: Translations = {
  "nav.about": "about me",
  "nav.observando": "observando",
  "nav.projects": "projects",

  "lang.label": "ES",

  "home.phrases": ["does things", "writes", "vibecodes", "designs", "reads", "runs"],
  "home.heroPrefix": "axel",
  "home.heroDesc1": "I write about how I see life in",
  "home.heroDesc2": ". I also vibecode and design small apps.",
  "home.seeAll": "see all →",
  "home.projects": "Projects",
  "home.more": "more →",
  "home.footer": "axel doing things",

  "about.title": "About me",
  "about.p1":
    "My name is Axel Marazzi. I live in Buenos Aires. I'm a journalist and designer. I currently work for ueno bank, a Paraguayan bank, designing experiences with artificial intelligence. My work, I like to think, has always mixed technology and words.",
  "about.p2pre": "I've been writing ",
  "about.p2post":
    " for many years, a newsletter that has changed a lot over time. Today it's a kind of open personal diary where I explore my writing and try to tell how I see life.",
  "about.p3":
    "In my free time I vibecode small projects that solve some of my needs. I do them for pleasure, no pressure, just to see what comes out. They're tools I need myself and that might be useful to you too.",
  "about.p4": "This site exists to bring those things together.",
  "about.contact": "contact",
  "about.back": "← back",

  "projects.title": "Projects",
  "projects.subtitle": "Small apps I need and solve by vibecoding.",
  "projects.code": "code ↗",
  "projects.live": "see live ↗",
  "projects.back": "← back",
  "projects.status.active": "active",
  "projects.status.wip": "in progress",
  "projects.status.archived": "archived",

  "projectDetail.backProjects": "← projects",

  "observando.subtitle": "autofiction",
  "observando.p1":
    "I've been writing observando for many years, a newsletter that has changed a lot over time. It started as one thing and gradually became something else without me planning it too much.",
  "observando.p2":
    "Today it's a kind of open personal diary where I explore my writing and try to tell how I see life. Some things happened exactly as I tell them. Others didn't.",
  "observando.p3":
    "I change names, places, dates, the order of things. Reality interests me as a starting point, not a destination. I hope something I write resonates with you.",
  "observando.subscribe": "subscribe →",
  "observando.latest": "latest entries",
  "observando.previous": "read previous editions →",
  "observando.back": "← back",

  "observandoPost.readOnSubstack": "read on substack ↗",
  "observandoPost.back": "← observando",
};

export const translations: Record<Locale, Translations> = { es, en };
