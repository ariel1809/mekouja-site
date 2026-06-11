import { useState } from "react";
import { postJSON } from "../api.js";

const FORMULAIRE_VIDE = {
  nom: "",
  tel: "",
  email: "",
  objet: "Demande d'admission",
  classe: "Maternelle",
  message: ""
};

export default function Contact({ ecole }) {
  const [form, setForm] = useState(FORMULAIRE_VIDE);
  const [envoi, setEnvoi] = useState(false);
  const [retour, setRetour] = useState(null); // { type: "ok" | "ko", texte }
  const [invalides, setInvalides] = useState([]);

  const maj = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setInvalides(invalides.filter((champ) => champ !== e.target.name));
  };

  const envoyer = async (e) => {
    e.preventDefault();
    const manquants = ["nom", "email", "message"].filter((champ) => !form[champ].trim());
    if (manquants.length) {
      setInvalides(manquants);
      setRetour({ type: "ko", texte: "Merci de remplir les champs obligatoires." });
      return;
    }

    setEnvoi(true);
    setRetour(null);
    try {
      await postJSON("/api/contact", form);
      setRetour({ type: "ok", texte: "Message envoyé. Le secrétariat vous recontacte sous 48 h ouvrées." });
      setForm(FORMULAIRE_VIDE);
    } catch (erreur) {
      setRetour({ type: "ko", texte: erreur.message });
    } finally {
      setEnvoi(false);
    }
  };

  const { contact } = ecole;

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-eyebrow">Contact</div>
          <h2>Parlons de la scolarité de votre enfant</h2>
          <p>Une question sur une classe, le concours ou un dossier en cours ? Notre secrétariat vous répond du lundi au vendredi.</p>
        </div>
        <div className="contact-grid">
          <div className="infos reveal">
            <div className="info">
              <span className="ico">📍</span>
              <div>
                <b>Adresse</b>
                <p>{contact.adresse[0]}<br />{contact.adresse[1]}</p>
              </div>
            </div>
            <div className="info">
              <span className="ico">📞</span>
              <div>
                <b>Téléphone / WhatsApp</b>
                <p>
                  {contact.telephones.map((tel, i) => (
                    <span key={tel}>
                      <a href={`tel:${tel.replace(/\s/g, "")}`}>{tel}</a>
                      {i < contact.telephones.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <div className="info">
              <span className="ico">✉️</span>
              <div>
                <b>E-mail</b>
                <p>
                  {contact.emails.map((mail, i) => (
                    <span key={mail}>
                      <a href={`mailto:${mail}`}>{mail}</a>
                      {i < contact.emails.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <div className="info">
              <span className="ico">🕗</span>
              <div>
                <b>Horaires du secrétariat</b>
                <p>{contact.horaires[0]}<br />{contact.horaires[1]}</p>
              </div>
            </div>
            <div className="maps-embed">
              <iframe
                title="Localisation CBEM MEKOUJA — Nsazomo, Yaoundé"
                src="https://maps.google.com/maps?cid=15464742400807477020&output=embed&z=17"
                width="100%"
                height="220"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <form className="formulaire reveal" onSubmit={envoyer} noValidate>
            <h3>Écrivez-nous</h3>
            <p>Nous vous répondons sous 48 h ouvrées.</p>
            <div className="deux-cols">
              <div className="champ">
                <label htmlFor="nom">Nom complet</label>
                <input
                  id="nom" name="nom" type="text" autoComplete="name"
                  value={form.nom} onChange={maj}
                  className={invalides.includes("nom") ? "invalide" : ""}
                  required
                />
              </div>
              <div className="champ">
                <label htmlFor="tel">Téléphone</label>
                <input id="tel" name="tel" type="tel" autoComplete="tel" placeholder="+237 …" value={form.tel} onChange={maj} />
              </div>
            </div>
            <div className="champ">
              <label htmlFor="email">E-mail</label>
              <input
                id="email" name="email" type="email" autoComplete="email"
                value={form.email} onChange={maj}
                className={invalides.includes("email") ? "invalide" : ""}
                required
              />
            </div>
            <div className="deux-cols">
              <div className="champ">
                <label htmlFor="objet">Objet</label>
                <select id="objet" name="objet" value={form.objet} onChange={maj}>
                  <option>Demande d'admission</option>
                  <option>Concours d'entrée</option>
                  <option>Visite de l'école</option>
                  <option>Frais de scolarité</option>
                  <option>Autre question</option>
                </select>
              </div>
              <div className="champ">
                <label htmlFor="classe">Classe concernée</label>
                <select id="classe" name="classe" value={form.classe} onChange={maj}>
                  <option>Maternelle</option>
                  <option>Primaire</option>
                  <option>6e / Form 1</option>
                  <option>5e – 3e / Form 2 – 5</option>
                  <option>2nde</option>
                  <option>1re</option>
                  <option>Terminale</option>
                </select>
              </div>
            </div>
            <div className="champ">
              <label htmlFor="message">Votre message</label>
              <textarea
                id="message" name="message" rows="4"
                value={form.message} onChange={maj}
                className={invalides.includes("message") ? "invalide" : ""}
                required
              />
            </div>
            <button type="submit" className="btn btn-vert" disabled={envoi}>
              {envoi ? "Envoi en cours…" : "Envoyer le message"}
            </button>
            {retour && <div className={`form-retour ${retour.type}`}>{retour.texte}</div>}
          </form>
        </div>
      </div>
    </section>
  );
}
