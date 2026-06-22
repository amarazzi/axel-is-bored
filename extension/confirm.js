const TYPE_LABELS = { quote: "frase", link: "link", image: "imagen", video: "video", song: "canción", album: "álbum", book: "libro" };

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

function cleanAlbumTitle(title) {
  if (!title) return undefined;
  return title.split(/\s*-\s*Album by /i)[0]?.trim() || undefined;
}

async function fetchSpotifyMetadata(url, kind) {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const rawTitle = matchMeta(html, "og:title");
    const description = matchMeta(html, "og:description");
    const albumImageUrl = matchMeta(html, "og:image");
    const artist = description ? description.split(" · ")[0] : undefined;
    const title = kind === "album" ? cleanAlbumTitle(rawTitle) : rawTitle;
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

  if (payload.type === "song" || payload.type === "album") {
    renderMusicSection(payload, payload.type);
  }

  if (payload.type === "book") {
    document.getElementById("book-title").value = payload.title || "";
    document.getElementById("book-author").value = payload.author || "";
    document.getElementById("book-year").value = payload.yearPublished || "";
    document.getElementById("book-rating").value = payload.rating || "";
    document.getElementById("book-review").value = payload.review || "";
    if (payload.coverImageUrl) {
      const preview = document.getElementById("book-cover-preview");
      preview.src = payload.coverImageUrl;
      preview.hidden = false;
    }
    document.getElementById("book-title").focus();
  }
}

function resizeImageFile(file, maxDim, quality) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else if (height >= width && height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

document.getElementById("book-cover").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const dataUrl = await resizeImageFile(file, 480, 0.82);
  currentPayload.coverImageUrl = dataUrl;
  const preview = document.getElementById("book-cover-preview");
  preview.src = dataUrl;
  preview.hidden = false;
});

function renderMusicSection(payload, prefix) {
  const titleInput = document.getElementById(`${prefix}-title`);
  const artistInput = document.getElementById(`${prefix}-artist`);
  const artImg = document.getElementById(`${prefix}-art`);

  titleInput.value = payload.title || "";
  artistInput.value = payload.artist || "";
  if (payload.albumImageUrl) artImg.src = payload.albumImageUrl;
  titleInput.focus();

  if (!payload.title || !payload.albumImageUrl) {
    const btn = document.getElementById("btn-share");
    btn.disabled = true;
    fetchSpotifyMetadata(payload.url, prefix).then((meta) => {
      if (meta.title && !titleInput.value) titleInput.value = meta.title;
      if (meta.artist && !artistInput.value) artistInput.value = meta.artist;
      if (meta.albumImageUrl) {
        artImg.src = meta.albumImageUrl;
        currentPayload.albumImageUrl = meta.albumImageUrl;
      }
      btn.disabled = false;
    });
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

  if (payload.type === "song" || payload.type === "album") {
    const prefix = payload.type;
    payload.title = document.getElementById(`${prefix}-title`).value.trim() || undefined;
    payload.artist = document.getElementById(`${prefix}-artist`).value.trim() || undefined;
    payload.description = document.getElementById(`${prefix}-description`).value.trim() || undefined;
  }

  if (payload.type === "book") {
    payload.title = document.getElementById("book-title").value.trim();
    payload.author = document.getElementById("book-author").value.trim();
    const year = document.getElementById("book-year").value.trim();
    payload.yearPublished = year ? Number(year) : undefined;
    const rating = document.getElementById("book-rating").value;
    payload.rating = rating ? Number(rating) : undefined;
    payload.review = document.getElementById("book-review").value.trim() || undefined;
  }

  return payload;
}

function validatePayload(payload) {
  if (payload.type === "book") {
    if (!payload.title || !payload.author || !payload.rating || !payload.coverImageUrl) {
      return "Completá título, autor, rating y portada.";
    }
  }
  return null;
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
  const validationError = validatePayload(payload);
  if (validationError) {
    showStatus(validationError, false);
    return;
  }

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
