import { useState, useEffect } from "react";

const CLE = "cbem_annonce_v1";

export default function AnnonceBar({ ecole }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CLE)) setVisible(true);
  }, []);

  const fermer = () => {
    localStorage.setItem(CLE, "1");
    setVisible(false);
  };

  if (!visible) return null;

  const rentree = ecole.aRetenir[0];
  const concours = ecole.aRetenir[1];

  return (
    <div className="annonce-bar" role="banner" aria-label="Annonces importantes">
      <span className="annonce-dot" aria-hidden="true"></span>
      <p>
        <strong>{rentree.label}</strong> : {rentree.valeur}
        <span className="annonce-sep" aria-hidden="true">·</span>
        <strong>{concours.label}</strong> : {concours.valeur}
        <a href="#admission" className="annonce-lien" onClick={fermer}>S&rsquo;inscrire →</a>
      </p>
      <button className="annonce-fermer" onClick={fermer} aria-label="Fermer l'annonce">✕</button>
    </div>
  );
}