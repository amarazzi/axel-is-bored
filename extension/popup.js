const DEFAULT_API_URL = "https://axelmarazzi.com/api/cositas";
const YOUTUBE_HOSTS = ["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be"];

const noteText = document.getElementById("note-text");
const shareNoteBtn = document.getElementById("share-note");
const sharePageBtn = document.getElementById("share-page");
const shareVideoBtn = document.getElementById("share-video");
const statusEl = document.getElementById("status");
const apiUrlInput = document.getElementById("api-url");
const secretInput = document.getElementById("secret");
const saveSettingsBtn = document.getElementById("save-settings");
const settingsStatusEl = document.getElementById("settings-status");

function showStatus(el, message, ok) {
  el.textContent = message;
  el.hidden = false;
  el.classList.toggle("ok", ok);
  el.classList.toggle("error", !ok);
}

function cleanYoutubeTitle(title) {
  if (!title) return undefined;
  return title.replace(/\s*-\s*YouTube\s*$/i, "").trim() || undefined;
}

function isYoutubeUrl(url) {
  try {
    return YOUTUBE_HOSTS.includes(new URL(url).hostname);
  } catch {
    return false;
  }
}

async function loadSettings() {
  const { apiUrl, secret } = await chrome.storage.local.get(["apiUrl", "secret"]);
  apiUrlInput.value = apiUrl || DEFAULT_API_URL;
  secretInput.value = secret || "";
}

async function openConfirmWindow(payload) {
  await chrome.storage.session.set({ pendingShare: payload });
  chrome.windows.create({
    url: chrome.runtime.getURL("confirm.html"),
    type: "popup",
    width: 360,
    height: 480,
  });
  window.close();
}

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

async function setupVideoButton() {
  const tab = await getActiveTab();
  if (tab?.url && isYoutubeUrl(tab.url)) {
    shareVideoBtn.hidden = false;
  }
}

shareNoteBtn.addEventListener("click", async () => {
  const text = noteText.value.trim();
  if (!text) {
    showStatus(statusEl, "Escribí algo primero.", false);
    return;
  }
  shareNoteBtn.disabled = true;
  const result = await chrome.runtime.sendMessage({ action: "share", payload: { type: "note", text } });
  shareNoteBtn.disabled = false;
  if (result?.ok) {
    showStatus(statusEl, "Compartido ✓", true);
    noteText.value = "";
  } else {
    showStatus(statusEl, "No se pudo compartir.", false);
  }
});

sharePageBtn.addEventListener("click", async () => {
  const tab = await getActiveTab();
  if (!tab?.url) {
    showStatus(statusEl, "No encontré la pestaña activa.", false);
    return;
  }
  await openConfirmWindow({ type: "link", url: tab.url, title: tab.title || tab.url });
});

shareVideoBtn.addEventListener("click", async () => {
  const tab = await getActiveTab();
  if (!tab?.url) {
    showStatus(statusEl, "No encontré la pestaña activa.", false);
    return;
  }
  await openConfirmWindow({ type: "video", url: tab.url, title: cleanYoutubeTitle(tab.title) });
});

saveSettingsBtn.addEventListener("click", async () => {
  const apiUrl = apiUrlInput.value.trim() || DEFAULT_API_URL;
  const secret = secretInput.value.trim();
  await chrome.storage.local.set({ apiUrl, secret });
  showStatus(settingsStatusEl, "Guardado.", true);
});

loadSettings();
setupVideoButton();
