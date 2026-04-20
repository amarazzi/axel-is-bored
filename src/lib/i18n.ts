export type Locale = "es" | "en";

export const DEFAULT_LOCALE: Locale = "es";
export const LOCALE_STORAGE_KEY = "axel-lang";

export interface Translations {
  // Nav
  "nav.about": string;
  "nav.observando": string;
  "nav.projects": string;
  "nav.skipLink": string;
  "nav.logo": string;
  "nav.primaryNav": string;

  // Language switcher
  "lang.label": string;

  // Meta titles
  "meta.title.home": string;
  "meta.title.about": string;
  "meta.title.projects": string;
  "meta.title.observando": string;

  // Theme
  "theme.light": string;
  "theme.dark": string;

  // Home
  "home.phrases": string[];
  "home.heroDesc1": string;
  "home.heroDesc2": string;
  "home.seeAll": string;
  "home.projects": string;
  "home.more": string;
  "home.footer": string;
  "home.footer.claude": string;

  // About
  "about.title": string;
  "about.subtitle": string;
  "about.p1": string;
  "about.p1b": string;
  "about.p2pre": string;
  "about.p2post": string;
  "about.p3pre": string;
  "about.p3post": string;
  "about.articles": string;
  "about.contact": string;
  "about.back": string;

  // Projects
  "projects.title": string;
  "projects.subtitle": string;
  "projects.subtitle2": string;
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
  "observando.p4": string;
  "observando.subscribe": string;
  "observando.latest": string;
  "observando.previous": string;
  "observando.back": string;

  // Observando post
  "observandoPost.readOnSubstack": string;
  "observandoPost.back": string;

  // Recomendaciones
  "nav.recomendaciones": string;
  "meta.title.recomendaciones": string;
  "recomendaciones.title": string;
  "recomendaciones.subtitle": string;
  "recomendaciones.empty": string;
  "recomendaciones.back": string;
  "recomendaciones.currentlyReading": string;
}

const es: Translations = {
  "nav.about": "sobre mí",
  "nav.observando": "mis textos",
  "nav.projects": "apps",
  "nav.skipLink": "Saltar al contenido",
  "nav.logo": "Inicio",
  "nav.primaryNav": "Navegación principal",

  "lang.label": "EN",

  "meta.title.home": "axel hace cosas",
  "meta.title.about": "sobre axel",
  "meta.title.projects": "axel hace apps",
  "meta.title.observando": "axel hace observando",

  "theme.light": "Modo claro",
  "theme.dark": "Modo oscuro",

  "home.phrases": ["hace cosas", "escribe", "vibecodea", "diseña", "lee", "corre"],
  "home.heroDesc1": "Escribo cómo veo la vida en",
  "home.heroDesc2": ", mi newsletter. Además, vibecodeo y diseño pequeñas apps.",
  "home.seeAll": "más entregas →",
  "home.projects": "Apps",
  "home.more": "más proyectos →",
  "home.footer": "axel hace cosas",
  "home.footer.claude": "* página vibecodeada con ayuda de",

  "about.title": "Sobre mí",
  "about.subtitle": "periodista y diseñador. Escribo.",
  "about.p1":
    "Me llamo Axel Marazzi. Soy periodista y UX Writer. Hoy trabajo para ueno bank, un banco paraguayo, diseñando experiencias con inteligencia artificial. Pero antes de eso pasé por varias redacciones analizando cómo la tecnología nos afectaba, tanto positivamente como negativamente. Publiqué algunos textos en ",
  "about.p1b": "Mi trabajo, me gusta pensar, siempre mezcló tecnología y palabras.",
  "about.p2pre": "Desde 2016 escribo ",
  "about.p2post":
    ", un newsletter que cambió un montón con el tiempo. Hoy es una especie de diario personal ficcionalizado donde exploro mi escritura y cuento cómo veo la vida.",
  "about.p3pre": "En mi tiempo libre ",
  "about.p3post": " pequeños proyectos que resuelven algunas de mis necesidades o que simplemente hago porque me pinta. Es totalmente por placer, sin presión, a ver qué sale.",
  "about.articles": "Algunos artículos periodísticos",
  "about.contact": "contacto",
  "about.back": "← volver",

  "projects.title": "Apps",
  "projects.subtitle": "Pequeñas aplicaciones que vibecodeo.",
  "projects.subtitle2": "* tienen muchos bugs jeje",
  "projects.code": "código ↗",
  "projects.live": "ver en vivo ↗",
  "projects.back": "← volver",
  "projects.status.active": "activo",
  "projects.status.wip": "en progreso",
  "projects.status.archived": "archivado",

  "projectDetail.backProjects": "← apps",

  "observando.subtitle": "Un poco de verdad un poco de ficción.",
  "observando.p1":
    "Desde 2016 escribo observando, un newsletter que cambió muchísimo con los años. Empezó siendo una cosa y se fue convirtiendo en otra sin que yo lo planeara demasiado.",
  "observando.p2":
    "Hoy es una especie de diario personal ficcionalizado donde exploro mi escritura e intento contar cómo veo la vida. Algunas situaciones pasaron tal cual las cuento. Otras nada que ver.",
  "observando.p3":
    "Cambio nombres, lugares, fechas, el orden. La realidad me interesa como punto de partida.",
  "observando.p4": "Espero que algo de lo que escribo te resuene.",
  "observando.subscribe": "suscribirse →",
  "observando.latest": "últimas entregas",
  "observando.previous": "leer ediciones anteriores →",
  "observando.back": "← volver",

  "observandoPost.readOnSubstack": "leer en substack ↗",
  "observandoPost.back": "← observando",

  "nav.recomendaciones": "recomendaciones",
  "meta.title.recomendaciones": "axel hace recomendaciones",
  "recomendaciones.title": "Recomendaciones",
  "recomendaciones.subtitle": "libros que leí.",
  "recomendaciones.empty": "Próximamente.",
  "recomendaciones.back": "← volver",
  "recomendaciones.currentlyReading": "Leyendo",
};

const en: Translations = {
  "nav.about": "about me",
  "nav.observando": "my writing",
  "nav.projects": "apps",
  "nav.skipLink": "Skip to content",
  "nav.logo": "Home",
  "nav.primaryNav": "Primary navigation",

  "lang.label": "ES",

  "meta.title.home": "axel does things",
  "meta.title.about": "about axel",
  "meta.title.projects": "axel makes apps",
  "meta.title.observando": "axel does observando",

  "theme.light": "Light mode",
  "theme.dark": "Dark mode",

  "home.phrases": ["does things", "writes", "vibecodes", "designs", "reads", "runs"],
  "home.heroDesc1": "I write about how I see life in",
  "home.heroDesc2": ", my newsletter. I also vibecode and design small apps.",
  "home.seeAll": "see more →",
  "home.projects": "Apps",
  "home.more": "more projects →",
  "home.footer": "axel doing things",
  "home.footer.claude": "* vibecoded with help from",

  "about.title": "About me",
  "about.subtitle": "journalist and designer. I write.",
  "about.p1":
    "My name is Axel Marazzi. I'm a journalist and designer. I currently work for ueno bank, a Paraguayan bank, designing experiences with artificial intelligence. But before that I worked in several newsrooms analyzing how technology affected us, both positively and negatively. I published some pieces in ",
  "about.p1b": "My work, I like to think, has always mixed technology and words.",
  "about.p2pre": "Since 2016 I've been writing ",
  "about.p2post":
    " for many years, a newsletter that has changed a lot over time. Today it's a kind of fictionalized personal diary where I explore my writing and tell how I see life.",
  "about.p3pre": "In my free time I ",
  "about.p3post": " small projects that solve some of my needs or that I simply do because I feel like it. It's totally for pleasure, no pressure, just to see what comes out.",
  "about.articles": "Some journalism pieces",
  "about.contact": "contact",
  "about.back": "← back",

  "projects.title": "Apps",
  "projects.subtitle": "Small applications I vibecode.",
  "projects.subtitle2": "* they have lots of bugs lol",
  "projects.code": "code ↗",
  "projects.live": "see live ↗",
  "projects.back": "← back",
  "projects.status.active": "active",
  "projects.status.wip": "in progress",
  "projects.status.archived": "archived",

  "projectDetail.backProjects": "← apps",

  "observando.subtitle": "autofiction",
  "observando.p1":
    "Since 2016 I've been writing observando, a newsletter that has changed a lot over time. It started as one thing and gradually became something else without me planning it too much.",
  "observando.p2":
    "Today it's a kind of fictionalized personal diary where I explore my writing and try to tell how I see life. Some situations happened exactly as I tell them. Others not at all.",
  "observando.p3":
    "I change names, places, dates, the order. Reality interests me as a starting point.",
  "observando.p4": "I hope something I write resonates with you.",
  "observando.subscribe": "subscribe →",
  "observando.latest": "latest entries",
  "observando.previous": "read previous editions →",
  "observando.back": "← back",

  "observandoPost.readOnSubstack": "read on substack ↗",
  "observandoPost.back": "← observando",

  "nav.recomendaciones": "recommendations",
  "meta.title.recomendaciones": "axel makes recommendations",
  "recomendaciones.title": "Recommendations",
  "recomendaciones.subtitle": "books I read.",
  "recomendaciones.empty": "Coming soon.",
  "recomendaciones.back": "← back",
  "recomendaciones.currentlyReading": "Reading",
};

export const translations: Record<Locale, Translations> = { es, en };
