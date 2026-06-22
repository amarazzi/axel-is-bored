const MENU_QUOTE = "cositas-quote";
const MENU_LINK = "cositas-link";
const MENU_PAGE_LINK = "cositas-page-link";
const MENU_IMAGE = "cositas-image";
const MENU_VIDEO = "cositas-video";
const MENU_SONG = "cositas-song";
const MENU_ALBUM = "cositas-album";

const YOUTUBE_PATTERNS = ["*://*.youtube.com/watch*", "*://youtu.be/*", "*://*.youtube.com/shorts/*"];
const SPOTIFY_PATTERNS = ["*://open.spotify.com/*"];

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: MENU_QUOTE,
      title: "💬 Compartir frase a cositas",
      contexts: ["selection"],
    });
    chrome.contextMenus.create({
      id: MENU_IMAGE,
      title: "🖼 Compartir esta imagen a cositas",
      contexts: ["image"],
    });
    chrome.contextMenus.create({
      id: MENU_VIDEO,
      title: "▶ Compartir este video a cositas",
      contexts: ["page", "video"],
      documentUrlPatterns: YOUTUBE_PATTERNS,
    });
    chrome.contextMenus.create({
      id: MENU_SONG,
      title: "🎵 Compartir esta canción a cositas",
      contexts: ["link"],
      documentUrlPatterns: SPOTIFY_PATTERNS,
      targetUrlPatterns: ["*://open.spotify.com/track/*"],
    });
    chrome.contextMenus.create({
      id: MENU_ALBUM,
      title: "💿 Compartir este álbum a cositas",
      contexts: ["link"],
      documentUrlPatterns: SPOTIFY_PATTERNS,
      targetUrlPatterns: ["*://open.spotify.com/album/*"],
    });
    chrome.contextMenus.create({
      id: MENU_LINK,
      title: "🔗 Compartir este link a cositas",
      contexts: ["link"],
    });
    chrome.contextMenus.create({
      id: MENU_PAGE_LINK,
      title: "🔗 Compartir esta página como link",
      contexts: ["page"],
    });
  });
});

function cleanYoutubeTitle(title) {
  if (!title) return undefined;
  return title.replace(/\s*-\s*YouTube\s*$/i, "").trim() || undefined;
}

async function getSettings() {
  const { apiUrl, secret } = await chrome.storage.local.get(["apiUrl", "secret"]);
  return { apiUrl: apiUrl || "", secret: secret || "" };
}

function notify(message, success) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icons/icon128.png",
    title: success ? "cositas" : "cositas — error",
    message,
  });
}

async function sharePayload(payload) {
  const { apiUrl, secret } = await getSettings();
  if (!apiUrl || !secret) {
    notify("Configurá la URL del sitio y el secret en el popup de la extensión.", false);
    return { ok: false };
  }

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      notify(body.error || `Error al compartir (HTTP ${res.status}).`, false);
      return { ok: false };
    }

    notify("Compartido ✓", true);
    return { ok: true };
  } catch (err) {
    notify(`No se pudo conectar con el sitio: ${err.message}`, false);
    return { ok: false };
  }
}

// Abre una ventana chica para revisar/editar el payload antes de mandarlo
// (agregar caption a una imagen, editar el título de un link, etc.)
async function openConfirmWindow(payload) {
  await chrome.storage.session.set({ pendingShare: payload });
  chrome.windows.create({
    url: chrome.runtime.getURL("confirm.html"),
    type: "popup",
    width: 360,
    height: 480,
  });
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
  let payload = null;

  switch (info.menuItemId) {
    case MENU_QUOTE:
      if (!info.selectionText) return;
      payload = {
        type: "quote",
        text: info.selectionText,
        source: tab?.title,
        sourceUrl: tab?.url,
      };
      break;

    case MENU_LINK:
      if (!info.linkUrl) return;
      payload = {
        type: "link",
        url: info.linkUrl,
        title: info.linkUrl,
      };
      break;

    case MENU_PAGE_LINK:
      if (!tab?.url) return;
      payload = {
        type: "link",
        url: tab.url,
        title: tab.title || tab.url,
      };
      break;

    case MENU_IMAGE:
      if (!info.srcUrl) return;
      payload = {
        type: "image",
        imageUrl: info.srcUrl,
        sourceUrl: tab?.url,
      };
      break;

    case MENU_VIDEO: {
      if (!tab?.url) return;
      payload = {
        type: "video",
        url: tab.url,
        title: cleanYoutubeTitle(tab.title),
      };
      break;
    }

    case MENU_SONG:
      if (!info.linkUrl) return;
      payload = { type: "song", url: info.linkUrl };
      break;

    case MENU_ALBUM:
      if (!info.linkUrl) return;
      payload = { type: "album", url: info.linkUrl };
      break;

    default:
      return;
  }

  openConfirmWindow(payload);
});

// Usado por popup.js / confirm.js para mandar el payload final (ya editado).
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.action === "share") {
    sharePayload(message.payload).then((result) => sendResponse(result));
    return true;
  }
  return false;
});
