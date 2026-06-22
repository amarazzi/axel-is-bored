const TYPE_LABELS = { quote: "frase", link: "link", image: "imagen", video: "video" };

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
