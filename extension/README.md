# cositas — extensión de Chrome

Comparte frases, links, imágenes, videos de YouTube y pensamientos directo a
`axelmarazzi.com/cositas`.

## Setup (una sola vez)

1. **Generar un secret** (en la terminal): `openssl rand -hex 32`
2. **Crear una base de Upstash Redis** (free tier): https://console.upstash.com → "Create database" → copiar `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN`.
3. **Agregar las env vars en Vercel** (Project Settings → Environment Variables):
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
   - `COSITAS_API_SECRET` (el secret generado en el paso 1)
   - Redeployar para que tomen efecto.
4. **Cargar la extensión:**
   - Ir a `chrome://extensions`
   - Activar "Modo de desarrollador" (arriba a la derecha)
   - "Cargar descomprimida" → seleccionar esta carpeta (`extension/`)
5. **Configurar la extensión:**
   - Click en el ícono de la extensión → "configuración"
   - URL del sitio: `https://axelmarazzi.com/api/cositas`
   - Secret: el mismo valor de `COSITAS_API_SECRET`
   - Guardar

## Uso

- **Frase**: seleccioná texto en cualquier página → click derecho → "Compartir frase a cositas".
- **Link**: click derecho sobre un link → "Compartir este link a cositas". O abrí el popup y tocá "compartir esta pestaña como link" para compartir la página actual.
- **Imagen**: click derecho sobre una imagen → "Compartir esta imagen a cositas".
- **Video**: en una página de YouTube (watch o shorts), click derecho → "Compartir este video a cositas".
- **Pensamiento**: abrí el popup, escribilo en la cajita y tocá "compartir pensamiento".

Cada acción muestra una notificación del sistema confirmando si se compartió bien o si hubo un error.

## Notas

- El secret se guarda en `chrome.storage.local`, solo en tu máquina. Nunca lo subas a un repo.
- Para probar contra un entorno local, cambiá la URL del sitio a `http://localhost:3000/api/cositas` en la configuración de la extensión.
