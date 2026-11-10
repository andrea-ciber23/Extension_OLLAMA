
"use strict";

const OLLAMA_URL = "http://127.0.0.1:11434";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (sender.id !== chrome.runtime.id) return false;

  if (!message || !["chat", "tags"].includes(message.type)) {
    return false;
  }

  (async () => {
    try {

      let response;

      if (message.type === "tags") {

        response = await fetch(`${OLLAMA_URL}/api/tags`, {
          method: "GET",
          cache: "no-store"
        });

      } else {

        if (!message.payload || !message.payload.model ||
            !Array.isArray(message.payload.messages)) {
          throw new Error("Petición de Ollama incompleta.");
        }

        response = await fetch(`${OLLAMA_URL}/api/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(message.payload)
        });

      }

      const raw = await response.text();

      if (!response.ok) {
        throw new Error(
          `Ollama HTTP ${response.status}: ${raw || "Respuesta vacía"}`
        );
      }

      if (!raw.trim()) {
        throw new Error(
          "Ollama ha devuelto una respuesta vacía."
        );
      }

      let data;

      try {
        data = JSON.parse(raw);
      } catch {
        throw new Error(
          "Respuesta no válida de Ollama: " + raw.slice(0, 500)
        );
      }

      if (message.type === "chat" &&
          (!data.message || typeof data.message.content !== "string")) {
        throw new Error(
          "Ollama no ha devuelto el contenido esperado."
        );
      }

      sendResponse({
        success: true,
        data
      });

    } catch (error) {

      sendResponse({
        success: false,
        error: error.message
      });

    }

  })();

  return true;
});
