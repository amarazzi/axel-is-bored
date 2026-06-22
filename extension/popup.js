const DEFAULT_API_URL = "https://axelmarazzi.com/api/cositas";

const noteText = document.getElementById("note-text");
const shareNoteBtn = document.getElementById("share-note");
const sharePageBtn = document.getElementById("share-page");
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

async function loadSettings() {
  const { apiUrl, secret } = await chrome.storage.local.get(["apiUrl", "secret"]);
  apiUrlInput.value = apiUrl || DEFAULT_API_URL;
  secretInput.value = secret || "";
}

async function share(payload, button) {
  button.disabled = true;
  try {
    const response = await chrome.runtime.sendMessage({ action: "share", payload });
    if (response?.ok) {
      showStatus(statusEl, "Compartido ✓", true);
    } else {
      showStatus(statusEl, "No se pudo compartir. Revisá la consola del background.", false);
    }
  } finally {
    button.disabled = false;
  }
}

shareNoteBtn.addEventListener("click", async () => {
  const text = noteText.value.trim();
  if (!text) {
    showStatus(statusEl, "Escribí algo primero.", false);
    return;
  }
  await share({ type: "note", text }, shareNoteBtn);
  noteText.value = "";
});

sharePageBtn.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.url) {
    showStatus(statusEl, "No encontré la pestaña activa.", false);
    return;
  }
  await share({ type: "link", url: tab.url, title: tab.title || tab.url }, sharePageBtn);
});

saveSettingsBtn.addEventListener("click", async () => {
  const apiUrl = apiUrlInput.value.trim() || DEFAULT_API_URL;
  const secret = secretInput.value.trim();
  await chrome.storage.local.set({ apiUrl, secret });
  showStatus(settingsStatusEl, "Guardado.", true);
});

loadSettings();
