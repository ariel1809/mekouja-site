import { useState } from "react";

// Photo d'ambiance associée à chaque cycle.
const PHOTOS_CYCLES = {
  maternelle: {
    src: "/photos/espace-jeux-maternelle.jpg",
    alt: "Enfants de maternelle jouant sur les structures gonflables de l'espace de jeux",
  },
  primaire: {
    src: "/photos/eleves-souriants-pouces-leves.jpg",
    alt: "Élèves du primaire souriants, pouces levés, dans la cour de l'école",
  },
  "premier-cycle": {
    src: "/photos/eleves-pouces-leves-batiment.jpg",
    alt: "Collégiens en uniforme devant le bâtiment principal du campus",
  },
  techniques: {
    src: "/photos/projet-scientifique-eleves.jpg",
    alt: "Élèves des filières techniques présentant une maquette réalisée en atelier",
  },
  "second-cycle": {
    src: "/photos/remise-diplomes-graduation.jpg",
    alt: "Lauréats en toge lors de la cérémonie de remise des diplômes",
  },
};

export default function Classes({ donnees }) {
  const cycles = donnees.cycles;
  const [actif, setActif] = useState(cycles[0]?.id);
  const cycle = cycles.find((c) => c.id === actif) || cycles[0];

  return (
    <section className="classes" id="classes">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-eyebrow">Nos classes</div>
          <h2>De la maternelle à la Terminale, un parcours complet</h2>
          <p>Choisissez un cycle pour découvrir les classes ouvertes, leurs modalités d'organisation et la voie d'admission correspondante.</p>
        </div>

        <div className="cycles-tabs reveal" role="tablist" aria-label="Cycles d'enseignement">
          {cycles.map((c) => (
            <button
              key={c.id}
              role="tab"
              className={`tab ${c.id === actif ? "active" : ""}`}
              aria-selected={c.id === actif}
              onClick={() => setActif(c.id)}
            >
              {c.onglet}
            </button>
          ))}
        </div>

        <div className="cycle-panel" key={cycle.id}>
          <div className="cycle-intro">
            {PHOTOS_CYCLES[cycle.id] && (
              <img
                className="cycle-photo"
                src={PHOTOS_CYCLES[cycle.id].src}
                alt={PHOTOS_CYCLES[cycle.id].alt}
                loading="lazy"
              />
            )}
            <div className="cycle-intro-texte">
              <h3>{cycle.titre}</h3>
              <p>{cycle.description}</p>
              <span className={`badge-adm badge-${cycle.badge.type}`}>{cycle.badge.texte}</span>
            </div>
          </div>
          <div className="grille-classes">
            {cycle.classes.map((cl) => (
              <div className="carte-classe" key={cl.nom}>
                <h4>{cl.nom} <small>{cl.detail}</small></h4>
                <ul>
                  {cl.modalites.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
