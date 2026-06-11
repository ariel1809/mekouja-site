import { useState } from "react";

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
            <div>
              <h3>{cycle.titre}</h3>
              <p>{cycle.description}</p>
            </div>
            <span className={`badge-adm badge-${cycle.badge.type}`}>{cycle.badge.texte}</span>
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
