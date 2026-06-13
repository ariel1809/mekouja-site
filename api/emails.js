// Templates d'e-mails HTML aux couleurs du Collège Bilingue Entrepreneurial MEKOUJA.
// HTML "e-mail safe" : tables, styles inline, largeur max 600px.

const C = {
  bleu: "#142878",
  bleuDeep: "#07102A",
  rouge: "#C21E30",
  or: "#F59E0B",
  orPale: "#FFFBEB",
  gris: "#4C5472",
  grisClair: "#F0F4FA",
  bordure: "#DDE3F0",
  encre: "#0B1120"
};

const SITE = "https://mekouja-site.vercel.app";
const LOGO = `${SITE}/mekouja.jpg`;

const police = `font-family:'Segoe UI',Helvetica,Arial,sans-serif;`;

/* ---------- Blocs réutilisables ---------- */

function enveloppe(contenu) {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${C.grisClair};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.grisClair};padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(7,16,42,.12);">
        ${contenu}
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function enTete(badge) {
  return `
  <tr><td style="background:${C.bleu};background:linear-gradient(135deg,${C.bleu} 0%,${C.bleuDeep} 100%);padding:36px 40px 32px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
      <td width="64" valign="middle">
        <img src="${LOGO}" alt="CBEM" width="56" height="56" style="display:block;border-radius:50%;background:#ffffff;padding:2px;">
      </td>
      <td valign="middle" style="padding-left:16px;">
        <div style="${police}font-size:17px;font-weight:800;color:#ffffff;letter-spacing:-.01em;">Collège Bilingue Entrepreneurial MEKOUJA</div>
        <div style="${police}font-size:12px;color:rgba(255,255,255,.65);margin-top:3px;">Yaoundé · Nsazomo — Maternelle à Terminale</div>
      </td>
    </tr></table>
    <div style="margin-top:24px;">
      <span style="${police}display:inline-block;background:rgba(245,158,11,.15);border:1px solid rgba(245,158,11,.4);color:${C.or};font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:6px 14px;border-radius:99px;">${badge}</span>
    </div>
  </td></tr>`;
}

function bandeTricolore() {
  return `
  <tr><td>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
      <td width="34%" height="4" style="background:${C.bleu};font-size:0;line-height:0;">&nbsp;</td>
      <td width="33%" height="4" style="background:${C.rouge};font-size:0;line-height:0;">&nbsp;</td>
      <td width="33%" height="4" style="background:${C.or};font-size:0;line-height:0;">&nbsp;</td>
    </tr></table>
  </td></tr>`;
}

function piedDePage(note) {
  return `
  ${bandeTricolore()}
  <tr><td style="background:${C.bleuDeep};padding:24px 40px;">
    <div style="${police}font-size:12px;color:rgba(255,255,255,.55);line-height:1.7;">
      <strong style="color:rgba(255,255,255,.85);">Collège Bilingue Entrepreneurial MEKOUJA</strong><br>
      Quartier Nsazomo, Yaoundé VII — Cameroun<br>
      <a href="${SITE}" style="color:${C.or};text-decoration:none;">mekouja-site.vercel.app</a>
    </div>
    <div style="${police}font-size:11px;color:rgba(255,255,255,.35);margin-top:14px;line-height:1.6;">${note}</div>
  </td></tr>`;
}

function ligneInfo(label, valeur) {
  return `
  <tr>
    <td style="${police}padding:11px 0;border-bottom:1px solid ${C.bordure};font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${C.gris};width:130px;vertical-align:top;">${label}</td>
    <td style="${police}padding:11px 0 11px 16px;border-bottom:1px solid ${C.bordure};font-size:14px;color:${C.encre};font-weight:600;">${valeur}</td>
  </tr>`;
}

function echapper(s) {
  return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/* ---------- 1. Notification envoyée au secrétariat ---------- */

export function emailNotification(entry) {
  const nom = echapper(entry.nom);
  const message = echapper(entry.message).replace(/\n/g, "<br>");
  const dateFr = new Date().toLocaleString("fr-FR", { dateStyle: "full", timeStyle: "short", timeZone: "Africa/Douala" });

  const html = enveloppe(`
    ${enTete("Nouveau message — Site web")}
    <tr><td style="padding:36px 40px 8px;">
      <h1 style="${police}margin:0 0 6px;font-size:21px;font-weight:800;color:${C.encre};letter-spacing:-.01em;">
        ${nom} vous a écrit
      </h1>
      <p style="${police}margin:0 0 26px;font-size:13px;color:${C.gris};">Reçu le ${dateFr} via le formulaire de contact du site.</p>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:26px;">
        ${ligneInfo("Nom complet", nom)}
        ${ligneInfo("E-mail", `<a href="mailto:${echapper(entry.email)}" style="color:${C.bleu};text-decoration:none;">${echapper(entry.email)}</a>`)}
        ${ligneInfo("Téléphone", entry.tel ? `<a href="tel:${echapper(entry.tel).replace(/\s/g, "")}" style="color:${C.bleu};text-decoration:none;">${echapper(entry.tel)}</a>` : "—")}
        ${ligneInfo("Objet", echapper(entry.objet) || "—")}
        ${ligneInfo("Classe", echapper(entry.classe) || "—")}
      </table>

      <div style="background:${C.grisClair};border-left:4px solid ${C.rouge};border-radius:0 10px 10px 0;padding:20px 22px;margin-bottom:30px;">
        <div style="${police}font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${C.rouge};margin-bottom:10px;">Message</div>
        <div style="${police}font-size:15px;color:${C.encre};line-height:1.75;">${message}</div>
      </div>

      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 36px;"><tr>
        <td style="border-radius:99px;background:${C.bleu};">
          <a href="mailto:${echapper(entry.email)}?subject=${encodeURIComponent(`Re: ${entry.objet || "Votre message"} — Collège MEKOUJA`)}"
             style="${police}display:inline-block;padding:14px 34px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:99px;">
            Répondre à ${nom.split(" ")[0]} &nbsp;→
          </a>
        </td>
      </tr></table>
    </td></tr>
    ${piedDePage("Notification automatique du formulaire de contact. Répondez directement à cet e-mail pour joindre l'expéditeur.")}
  `);

  const text = [
    `NOUVEAU MESSAGE — Site MEKOUJA`,
    ``,
    `Nom      : ${entry.nom}`,
    `E-mail   : ${entry.email}`,
    `Tél.     : ${entry.tel || "—"}`,
    `Objet    : ${entry.objet || "—"}`,
    `Classe   : ${entry.classe || "—"}`,
    ``,
    entry.message
  ].join("\n");

  return {
    subject: `📩 ${entry.objet || "Nouveau message"} — ${entry.nom} (${entry.classe || "classe non précisée"})`,
    html,
    text
  };
}

/* ---------- 2. Accusé de réception envoyé au visiteur ---------- */

export function emailConfirmation(entry) {
  const prenom = echapper(entry.nom.trim().split(/\s+/)[0]);

  const html = enveloppe(`
    ${enTete("Accusé de réception")}
    <tr><td style="padding:36px 40px 8px;">
      <h1 style="${police}margin:0 0 18px;font-size:22px;font-weight:800;color:${C.encre};letter-spacing:-.01em;">
        Bonjour ${prenom}, nous avons bien reçu votre message.
      </h1>
      <p style="${police}margin:0 0 14px;font-size:15px;color:${C.gris};line-height:1.75;">
        Merci de l'intérêt que vous portez au <strong style="color:${C.encre};">Collège Bilingue Entrepreneurial MEKOUJA</strong>.
        Votre demande concernant « <strong style="color:${C.bleu};">${echapper(entry.objet) || "votre question"}</strong> »
        a été transmise à notre secrétariat.
      </p>
      <p style="${police}margin:0 0 28px;font-size:15px;color:${C.gris};line-height:1.75;">
        Un membre de notre équipe vous répondra sous <strong style="color:${C.encre};">48 heures ouvrées</strong>.
      </p>

      <div style="background:${C.orPale};border:1px solid rgba(245,158,11,.3);border-radius:12px;padding:22px 24px;margin-bottom:28px;">
        <div style="${police}font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${C.or};margin-bottom:12px;">Pendant ce temps…</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="${police}padding:5px 0;font-size:14px;color:${C.encre};line-height:1.6;">
            🏫 &nbsp;<strong>Visitez l'école</strong> — chaque mercredi, 9 h – 12 h, sans rendez-vous
          </td></tr>
          <tr><td style="${police}padding:5px 0;font-size:14px;color:${C.encre};line-height:1.6;">
            📞 &nbsp;<strong>Besoin urgent ?</strong> Appelez-nous au +237 6 76 31 76 08
          </td></tr>
          <tr><td style="${police}padding:5px 0;font-size:14px;color:${C.encre};line-height:1.6;">
            🎓 &nbsp;<strong>Découvrez nos classes</strong> — <a href="${SITE}/#classes" style="color:${C.bleu};font-weight:700;text-decoration:none;">de la maternelle à la Terminale</a>
          </td></tr>
        </table>
      </div>

      <div style="${police}font-size:12px;color:${C.gris};border-left:3px solid ${C.bordure};padding:4px 0 4px 16px;margin-bottom:32px;line-height:1.7;">
        <strong style="color:${C.encre};">Rappel de votre message :</strong><br>
        ${echapper(entry.message).slice(0, 280).replace(/\n/g, "<br>")}${entry.message.length > 280 ? "…" : ""}
      </div>

      <p style="${police}margin:0 0 36px;font-size:14px;color:${C.gris};line-height:1.7;">
        Cordialement,<br>
        <strong style="color:${C.encre};">Le Secrétariat</strong><br>
        <span style="color:${C.bleu};font-weight:700;">Collège Bilingue Entrepreneurial MEKOUJA</span><br>
        <em style="font-size:12.5px;">Former le citoyen bilingue, préparer le professionnel de demain.</em>
      </p>
    </td></tr>
    ${piedDePage("Cet accusé de réception est envoyé automatiquement — merci de ne pas y répondre directement. Pour toute précision, utilisez nos coordonnées ci-dessus.")}
  `);

  const text = [
    `Bonjour ${entry.nom.trim().split(/\s+/)[0]},`,
    ``,
    `Nous avons bien reçu votre message concernant « ${entry.objet || "votre question"} ».`,
    `Notre secrétariat vous répondra sous 48 heures ouvrées.`,
    ``,
    `En attendant :`,
    `- Visites de l'école : chaque mercredi, 9 h – 12 h, sans rendez-vous`,
    `- Téléphone / WhatsApp : +237 6 76 31 76 08`,
    `- Site web : ${SITE}`,
    ``,
    `Cordialement,`,
    `Le Secrétariat — Collège Bilingue Entrepreneurial MEKOUJA`,
    `Former le citoyen bilingue, préparer le professionnel de demain.`
  ].join("\n");

  return {
    subject: `Votre message a bien été reçu — Collège MEKOUJA`,
    html,
    text
  };
}