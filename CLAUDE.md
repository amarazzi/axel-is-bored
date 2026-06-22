# axel is bored — CLAUDE.md

## Stack
- **Next.js 16** con App Router, **React 19**, **TypeScript 5**, **Tailwind CSS v4**
- Tipografía única: IBM Plex Mono (300, 400, 500)
- **isomorphic-dompurify** para sanitizar HTML del RSS de Substack
- **fast-xml-parser** para parsear el feed RSS

## Cómo hacer push
Git usa HTTPS. El keychain de macOS interfiere con credenciales, así que siempre pushear así:

```bash
TOKEN=$(gh auth token)
git push https://$TOKEN@github.com/amarazzi/axel-is-bored.git main
```

El remote está configurado en `origin` pero no funciona directamente sin el token.

## Estructura clave
```
src/app/          → rutas (page.tsx son mínimos, delegan a componentes)
src/components/   → toda la lógica de UI
src/lib/
  i18n.ts         → todas las traducciones ES/EN
  themes.ts       → definición de temas (standard/light)
  rss.ts          → fetching del feed de Substack
  goodreads.ts    → fetching del libro que se está leyendo (currently-reading shelf)
  letterboxd.ts   → fetching de películas/series vistas desde el RSS de Letterboxd
  cositas.ts      → fetching/push/remove de items de cositas (Redis)
  feed.ts         → agrega cositas + libros + películas/series en un solo FeedItem[] (ver src/types/feed.ts)
src/data/
  projects.ts     → datos de proyectos (agregar proyectos acá)
  books.ts        → datos de libros recomendados (agregar libros acá)
  posts.ts        → posts de fallback si falla el RSS
  stuff.ts        → cositas de fallback si Redis no está configurado o falla
public/
  covers/         → portadas de libros
  screenshots/    → capturas de proyectos
extension/        → extensión de Chrome (MV3) para compartir cositas (ver extension/README.md)
```

## Convenciones

### i18n
- Toda string visible al usuario va en `src/lib/i18n.ts`
- Siempre agregar la key en ES **y** EN
- Agregar el tipo en la interface `Translations` antes de usarla
- Hook: `const { t, locale } = useLanguage()`

### Temas
- Los colores van en `src/lib/themes.ts` como propiedades del objeto `Theme`
- Se aplican como CSS custom properties (`--theme-bg`, `--theme-fg`, etc.)
- Usar las clases `.t-bg`, `.t-fg`, `.t-accent`, `.t-accent2`, `.t-muted` en el JSX
- Para inline styles usar `var(--theme-border)`, etc.
- **No hardcodear colores** — todo pasa por el sistema de temas

### Libros (dentro del feed de cositas)
- Agregar en `src/data/books.ts` siguiendo la estructura existente
- Portadas en `public/covers/`
- `dateRead` (`YYYY-MM-DD`) es la fecha real (o, si no hay fecha exacta recordada, una fecha sintética que preserva el orden real de lectura) usada para ordenar el libro dentro del feed — los libros se publican en el array en el orden en que se leyeron
- No existe más `/recomendaciones`: la ruta redirige a `/cositas`, donde libros y películas/series se ven completos (review + rating) mezclados con el resto de las cositas

### Proyectos
- Agregar en `src/data/projects.ts` siguiendo la estructura existente
- Campos requeridos: `id`, `name`, `tagline`, `tagline_en`, `description`, `description_en`, `techStack`, `githubUrl`, `status`, `year`, `body`, `body_en`
- `screenshotPath` opcional → poner la imagen en `public/screenshots/`
- Los párrafos del `body` soportan HTML básico (`<em>`, `<strong>`) gracias a `dangerouslySetInnerHTML`

### Design System
- Antes de crear un nuevo componente o clase utilitaria, revisá `/design-system` (ruta en el sitio) o `src/components/DesignSystemContent.tsx`
- Reutilizá las clases `.ff-*` existentes para tipografía y links antes de escribir estilos ad hoc
- Usá siempre los tokens de color (`--theme-*`), radius (`--radius-*`) y los valores de spacing documentados
- Si necesitás una variante nueva (componente, clase, token), agregala primero al design system antes de usarla en producción

### Componentes
- Páginas en `app/` son thin wrappers — importan Nav + ContentComponent
- Lógica y UI van en `src/components/`
- Todos los componentes que usan hooks son `"use client"`

### Cositas
- `/cositas` es el feed único del sitio: junta los shares de la extensión (Redis) con los libros (`src/data/books.ts`) y las películas/series de Letterboxd, ordenados por fecha descendente
- Tipos de share (extensión) en `src/types/stuff.ts`: `quote` / `link` / `note` / `image` / `video` / `song` / `album`. Tipo unificado del feed en `src/types/feed.ts` (`FeedItem` = `StuffItem` | `BookFeedItem` | `FilmFeedItem`, agrega también `book` y `film`)
- `src/lib/feed.ts` (`fetchFeedItems`) hace el `Promise.all` de `fetchStuffItems` + `fetchLetterboxdFilms` + `books` y devuelve el array ya ordenado — es lo único que debe llamar `app/cositas/page.tsx`
- `src/lib/cositas.ts` lee de Upstash Redis (`fetchStuffItems`) y cae a `src/data/stuff.ts` si no hay env vars o falla — mismo patrón que el RSS/Goodreads
- La extensión de Chrome en `extension/` escribe vía `POST /api/cositas` (`src/app/api/cositas/route.ts`), autenticado con header `Authorization: Bearer <COSITAS_API_SECRET>`
- Los chips de filtro en `CositasContent.tsx` son single-select (mismo mecanismo ARIA tablist/tab que el viejo `TabToggle` de Recomendaciones), nunca multi-select
- `/cositas` es `dynamic = "force-dynamic"` para reflejar lo compartido al instante, sin redeploy
- Env vars necesarias en Vercel: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `COSITAS_API_SECRET` — setup completo en `extension/README.md`

## Cosas que NO tocar sin entender por qué

### Inline script en `src/app/layout.tsx`
Previene el FOUC (flash of unstyled content) aplicando el tema y el idioma guardados en localStorage **antes del primer paint**. Si se modifica, hay que actualizar también `src/lib/themes.ts` para mantenerlos sincronizados.

### `suppressHydrationWarning` en el html
Necesario porque el inline script modifica `lang` del HTML antes de que React hidrate.

### ThemeProvider useEffect
El tema se carga en `useEffect` (no en el estado inicial) para evitar hydration mismatch entre servidor y cliente.

### ImageLightbox usa React Portal
Renderiza via `createPortal(…, document.body)` para que `position: fixed` cubra toda la pantalla en iOS. Si se mueve el lightbox dentro del árbol de componentes normales, vuelve a romperse en Safari/Chrome iOS.

### Animación `.ff-page` solo usa opacity
La animación de entrada de página usa únicamente `opacity` (sin `transform`). Agregar `transform` crea un containing block que rompe `position: fixed` en iOS, haciendo que el lightbox no cubra la nav.

## Flujo de trabajo
1. Hacer los cambios en local
2. **Esperar confirmación del usuario** antes de hacer push — el usuario revisa primero en local que todo funcione y le guste
3. Solo pushear cuando el usuario lo pida explícitamente

## Git
- **Email:** marazzi.axel@gmail.com
- **Nombre:** Axel Marazzi
- **Branch principal:** `main`
- Vercel deployea automáticamente con cada push a `main`
