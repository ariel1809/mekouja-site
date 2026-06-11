import express from "express";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const app = express();
app.use(express.json());

// Données importées directement — pas de lecture disque à chaque requête
const ecole = require("../server/data/ecole.json");
const classes = require("../server/data/classes.json");
const admission = require("../server/data/admission.json");

/* ---------- Contenu du site ---------- */
app.get("/api/ecole", (_req, res) => res.json(ecole));
app.get("/api/classes", (_req, res) => res.json(classes));
app.get("/api/admission", (_req, res) => res.json(admission));

/* ---------- Formulaire de contact ---------- */
app.post("/api/contact", async (req, res) => {
  const { nom, email, tel, objet, classe, message } = req.body || {};

  if (!nom?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ erreur: "Le nom, l'e-mail et le message sont obligatoires." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ erreur: "L'adresse e-mail n'est pas valide." });
  }

  const entry = { nom: nom.trim(), email: email.trim(), tel, objet, classe, message: message.trim(), date: new Date().toISOString() };

  // --- Envoi e-mail (optionnel) ---
  // Configurez ces variables dans Vercel > Settings > Environment Variables :
  //   GMAIL_USER  → votre adresse Gmail
  //   GMAIL_PASS  → mot de passe d'application Gmail (https://myaccount.google.com/apppasswords)
  if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
    try {
      const { default: nodemailer } = await import("nodemailer");
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS }
      });
      await transport.sendMail({
        from: `"Site MEKOUJA" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        replyTo: email.trim(),
        subject: `[MEKOUJA] ${objet || "Nouveau message"} — ${nom.trim()}`,
        text: [
          `Nom      : ${entry.nom}`,
          `E-mail   : ${entry.email}`,
          `Tél.     : ${entry.tel || "—"}`,
          `Objet    : ${entry.objet || "—"}`,
          `Classe   : ${entry.classe || "—"}`,
          ``,
          entry.message
        ].join("\n")
      });
    } catch (err) {
      // L'e-mail n'est pas critique — on continue quand même
      console.error("[MEKOUJA] Erreur envoi e-mail :", err.message);
    }
  } else {
    // Sans configuration SMTP, le message apparaît dans les logs Vercel
    console.log("[MEKOUJA] Nouveau message :", JSON.stringify(entry));
  }

  res.status(201).json({ ok: true });
});

// Export pour Vercel (serverless) — pas de app.listen()
export default app;