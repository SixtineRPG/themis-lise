
/* ==========================================================
   THEMIS — FORUM API
   Communication avec le relais Forumactif
   ========================================================== */

const RELAY_URL =
  "https://war-of-the-gods.forumactif.com/h14-themis-relais-general";

const RELAY_ORIGIN =
  "https://war-of-the-gods.forumactif.com";

let relayWindow = null;
let requestId = 0;
const pendingRequests = new Map();

// ==========================================================
// CONNEXION
// ==========================================================

function connect() {
  relayWindow = window.open(
    RELAY_URL,
    "themisRelay",
    "width=500,height=400"
  );

  if (!relayWindow) {
    console.error("[THEMIS API] Fenêtre bloquée.");
    return Promise.reject(new Error("popup_blocked"));
  }

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      window.removeEventListener("message", onReady);
      reject(new Error("relay_timeout"));
    }, 15000);

    function onReady(event) {
      if (event.origin !== RELAY_ORIGIN) return;
      if (event.source !== relayWindow) return;
      if (event.data?.type !== "THEMIS_RELAY_READY") return;

      clearTimeout(timeout);
      window.removeEventListener("message", onReady);

      resolve(true);
      console.info("[THEMIS API] Relais connecté.");
    }

    window.addEventListener("message", onReady);
  });
}

// ==========================================================
// REQUÊTES
// ==========================================================

function request(action, payload = {}) {
  if (!relayWindow || relayWindow.closed) {
    return Promise.reject(new Error("relay_not_connected"));
  }

  const id = ++requestId;

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      pendingRequests.delete(id);
      reject(new Error("request_timeout"));
    }, 10000);

    pendingRequests.set(id, { resolve, reject, timeout });

    relayWindow.postMessage({
      type: "THEMIS_REQUEST",
      requestId: id,
      action,
      payload
    }, RELAY_ORIGIN);
  });
}

// ==========================================================
// REPONSES
// ==========================================================

window.addEventListener("message", (event) => {
  if (event.origin !== RELAY_ORIGIN) return;
  if (event.source !== relayWindow) return;
  if (event.data?.type !== "THEMIS_RESPONSE") return;

  const pending = pendingRequests.get(event.data.requestId);

  if (!pending) return;

  clearTimeout(pending.timeout);
  pendingRequests.delete(event.data.requestId);

  if (event.data.success) {
    pending.resolve(event.data);
  } else {
    pending.reject(new Error(event.data.error));
  }
});

// ==========================================================
// API PUBLIQUE
// ==========================================================

export const ForumAPI = {
  connect,

  ping() {
    return request("relay.ping");
  }
};
