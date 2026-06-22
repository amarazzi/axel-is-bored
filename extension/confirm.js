const TYPE_LABELS = { quote: "frase", link: "link", image: "imagen", video: "video", song: "canción" };

function youtubeId(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1) || null;
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname === "/watch") return u.searchParams.get("v");
      const shortsMatch = u.pathname.match(/^\/shorts\/([^/]+)/);
      if (shortsMatch) return shortsMatch[1];
    }
    return null;
  } catch {
    return null;
  }
}

function decodeEntities(str) {
  const el = document.createElement("textarea");
  el.innerHTML = str;
  return el.value;
}

function matchMeta(html, property) {
  const re = new RegExp(`<meta property="${property}" content="([^"]*)"`);
  const match = html.match(re);
  return match ? decodeEntities(match[1]) : undefined;
}

async function fetchSpotifyMetadata(url) {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const title = matchMeta(html, "og:title");
    const description = matchMeta(html, "og:description");
    const albumImageUrl = matchMeta(html, "og:image");
    const artist = description ? description.split(" · ")[0] : undefined;
    return { title, artist, albumImageUrl };
  } catch {
    return {};
  }
}

function showStatus(message, ok) {
  const el = document.getElementById("status");
  el.textContent = message;
  el.hidden = false;
  el.classList.toggle("ok", ok);
  el.classList.toggle("error", !ok);
}

let currentPayload = null;

function render(payload) {
  currentPayload = payload;
  document.getElementById("type-label").textContent = TYPE_LABELS[payload.type] || payload.type;
  document.getElementById(`section-${payload.type}`).hidden = false;

  if (payload.type === "quote") {
    document.getElementById("quote-text").value = payload.text || "";
    document.getElementById("quote-author").value = payload.source || "";
    document.getElementById("quote-text").focus();
  }

  if (payload.type === "link") {
    document.getElementById("link-title").value = payload.title || "";
    document.getElementById("link-description").value = payload.description || "";
    document.getElementById("link-url").textContent = payload.url || "";
    document.getElementById("link-title").focus();
  }

  if (payload.type === "image") {
    document.getElementById("image-preview").src = payload.imageUrl;
    document.getElementById("image-caption").focus();
  }

  if (payload.type === "video") {
    const id = youtubeId(payload.url);
    const thumb = document.getElementById("video-thumb");
    if (id) {
      thumb.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    } else {
      thumb.remove();
    }
    document.getElementById("video-title").value = payload.title || "";
    document.getElementById("video-title").focus();
  }

  if (payload.type === "song") {
    document.getElementById("song-title").value = payload.title || "";
    document.getElementById("song-artist").value = payload.artist || "";
    if (payload.albumImageUrl) document.getElementById("song-art").src = payload.albumImageUrl;
    document.getElementById("song-title").focus();

    if (!payload.title || !payload.albumImageUrl) {
      const btn = document.getElementById("btn-share");
      btn.disabled = true;
      fetchSpotifyMetadata(payload.url).then((meta) => {
        const titleInput = document.getElementById("song-title");
        const artistInput = document.getElementById("song-artist");
        if (meta.title && !titleInput.value) titleInput.value = meta.title;
        if (meta.artist && !artistInput.value) artistInput.value = meta.artist;
        if (meta.albumImageUrl) {
          document.getElementById("song-art").src = meta.albumImageUrl;
          currentPayload.albumImageUrl = meta.albumImageUrl;
        }
        btn.disabled = false;
      });
    }
  }
}

function buildFinalPayload() {
  const payload = { ...currentPayload };

  if (payload.type === "quote") {
    payload.text = document.getElementById("quote-text").value.trim();
    payload.source = document.getElementById("quote-author").value.trim() || undefined;
  }

  if (payload.type === "link") {
    payload.title = document.getElementById("link-title").value.trim();
    payload.description = document.getElementById("link-description").value.trim() || undefined;
  }

  if (payload.type === "image") {
    payload.caption = document.getElementById("image-caption").value.trim() || undefined;
  }

  if (payload.type === "video") {
    payload.title = document.getElementById("video-title").value.trim() || undefined;
    payload.description = document.getElementById("video-description").value.trim() || undefined;
  }

  if (payload.type === "song") {
    payload.title = document.getElementById("song-title").value.trim() || undefined;
    payload.artist = document.getElementById("song-artist").value.trim() || undefined;
    payload.description = document.getElementById("song-description").value.trim() || undefined;
  }

  return payload;
}

async function init() {
  const { pendingShare } = await chrome.storage.session.get("pendingShare");
  if (!pendingShare) {
    document.body.innerHTML = '<p class="status error">No hay nada para compartir. Cerrá esta ventana.</p>';
    return;
  }
  render(pendingShare);
}

document.getElementById("btn-cancel").addEventListener("click", async () => {
  await chrome.storage.session.remove("pendingShare");
  window.close();
});

document.getElementById("btn-share").addEventListener("click", async () => {
  const payload = buildFinalPayload();
  const btn = document.getElementById("btn-share");
  btn.disabled = true;

  const result = await chrome.runtime.sendMessage({ action: "share", payload });
  await chrome.storage.session.remove("pendingShare");

  if (result?.ok) {
    showStatus("Compartido ✓", true);
    setTimeout(() => window.close(), 600);
  } else {
    showStatus("No se pudo compartir. Mirá la notificación para el detalle.", false);
    btn.disabled = false;
  }
});

init();
