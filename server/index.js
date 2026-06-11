import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "data");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

/* ---------- Utilitaires ---------- */
async function lireJSON(fichier) {
  const contenu = await fs.readFile(path.join(DATA_DIR, fichier), "utf-8");
  return JSON.parse(contenu);
}

async function lireMessages() {
  try {
    return JSON.parse(await fs.readFile(MESSAGES_FILE, "utf-8"));
  } catch {
    return [];
  }
}

/* ---------- API : contenu du site ---------- */
// Le contenu est géré dans server/data/*.json :
// modifiez ces fichiers pour mettre à jour le site sans toucher au code React.

app.get("/api/ecole", async (_req, res) => {
  try {
    res.json(await lireJSON("ecole.json"));
  } catch (e) {
    res.status(500).json({ erreur: "Impossible de charger les informations de l'école." });
  }
});

app.get("/api/classes", async (_req, res) => {
  try {
    res.json(await lireJSON("classes.json"));
  } catch (e) {
    res.status(500).json({ erreur: "Impossible de charger les classes." });
  }
});

app.get("/api/admission", async (_req, res) => {
  try {
    res.json(await lireJSON("admission.json"));
  } catch (e) {
    res.status(500).json({ erreur: "Impossible de charger les informations d'admission." });
  }
});

/* ---------- API : messages de contact ---------- */

// Réception d'un message du formulaire
app.post("/api/contact", async (req, res) => {
  const { nom, email, tel, objet, classe, message } = req.body || {};

  if (!nom?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ erreur: "Le nom, l'e-mail et le message sont obligatoires." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ erreur: "L'adresse e-mail n'est pas valide." });
  }

  const messages = await lireMessages();
  const nouveau = {
    id: Date.now().toString(36),
    nom: nom.trim(),
    email: email.trim(),
    tel: (tel || "").trim(),
    objet: objet || "Autre question",
    classe: classe || "Non précisée",
    message: message.trim(),
    recuLe: new Date().toISOString(),
    lu: false
  };
  messages.unshift(nouveau);

  try {
    await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));
    res.status(201).json({ ok: true, id: nouveau.id });
  } catch {
    res.status(500).json({ erreur: "Le message n'a pas pu être enregistré. Réessayez." });
  }
});

// Liste des messages reçus (à protéger par une authentification avant mise en production)
app.get("/api/messages", async (_req, res) => {
  res.json(await lireMessages());
});

// Marquer un message comme lu
app.patch("/api/messages/:id/lu", async (req, res) => {
  const messages = await lireMessages();
  const msg = messages.find((m) => m.id === req.params.id);
  if (!msg) return res.status(404).json({ erreur: "Message introuvable." });
  msg.lu = true;
  await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));
  res.json({ ok: true });
});

/* ---------- Production : servir le build React ---------- */
if (process.env.NODE_ENV === "production") {
  const dist = path.join(__dirname, "..", "client", "dist");
  app.use(express.static(dist));
  app.get("*", (_req, res) => res.sendFile(path.join(dist, "index.html")));
}

app.listen(PORT, () => {
  console.log(`✓ Serveur démarré : http://localhost:${PORT}`);
});
