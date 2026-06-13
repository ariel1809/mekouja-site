import { useState } from "react";

const TRANCHE_LABELS = ["1ʳᵉ tranche", "2ᵉ tranche", "3ᵉ tranche"];

// Section frais : sélecteur de cycle + cartes lisibles, frais annexes repliables.
export default function Frais({ frais }) {
  const [actif, setActif] = useState(0);
  const [detailsOuverts, setDetailsOuverts] = useState(false);

  if (!frais) return null;
  const grille = frais.grilles[actif] || frais.grilles[0];

  return (
    <div className="frais-bloc reveal" id="frais">
      <div className="frais-head">
        <div className="frais-head-txt">
          <div className="sec-eyebrow">Frais de scolarité</div>
          <h3>{frais.titre}</h3>
          <p>{frais.intro}</p>
        </div>
        <ol className="frais-calendrier" aria-label="Calendrier de paiement">
          {frais.calendrier.map((c, i) => (
            <li key={c.tranche}>
              <span className="frais-cal-num">{i + 1}</span>
              <span className="frais-cal-txt">
                <b>{c.tranche}</b>
                <span>{c.date}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="frais-tabs" role="tablist" aria-label="Cycles d'enseignement">
        {frais.grilles.map((g, i) => (
          <button
            key={g.cycle}
            role="tab"
            aria-selected={i === actif}
            className={`tab ${i === actif ? "active" : ""}`}
            onClick={() => setActif(i)}
          >
            {g.cycle}
          </button>
        ))}
      </div>

      <div className="frais-cartes" key={grille.cycle}>
        {grille.lignes.map((l) => {
          const tranches = [l.t1, l.t2, l.t3]
            .map((val, i) => ({ label: TRANCHE_LABELS[i], val }))
            .filter((t) => t.val && t.val !== "—");
          const paiementUnique = tranches.length <= 1;

          return (
            <article className="frais-carte" key={l.classe}>
              <h4>{l.classe}</h4>
              <div className="frais-carte-total">
                <span className="montant">{l.total}</span>
                <span className="devise">FCFA</span>
              </div>
              <span className="frais-carte-label">
                {paiementUnique ? "Paiement unique" : "Total annuel · payable en 3 fois"}
              </span>
              {!paiementUnique && (
                <ul className="frais-tranches">
                  {tranches.map((t) => (
                    <li key={t.label}>
                      <span>{t.label}</span>
                      <b>{t.val}</b>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          );
        })}
      </div>

      <div className="frais-inscription-bloc">
        <div className="frais-insc-cards">
          {frais.etudeDossier.lignes.map((l) => (
            <div className="frais-insc-card" key={l.niveau}>
              <span className="frais-insc-label">Frais d'inscription</span>
              <span className="frais-insc-niveau">{l.niveau}</span>
              <span className="frais-insc-montant">{l.montant}</span>
            </div>
          ))}
        </div>
        <div className="frais-pieces-bloc">
          <p className="frais-pieces-titre">Pièces à fournir</p>
          <ul className="frais-pieces">
            {frais.etudeDossier.pieces.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
      </div>

      <button
        type="button"
        className="frais-toggle"
        aria-expanded={detailsOuverts}
        onClick={() => setDetailsOuverts((v) => !v)}
      >
        {detailsOuverts ? "Masquer" : "Voir"} les frais annexes et d'examens officiels
        <span className={`frais-chevron ${detailsOuverts ? "ouvert" : ""}`} aria-hidden="true">⌄</span>
      </button>

      {detailsOuverts && (
        <div className="frais-details">
          <div className="frais-table">
            <h4>{frais.autresFrais.titre}</h4>
            <table>
              <thead>
                <tr>{frais.autresFrais.colonnes.map((c) => <th key={c}>{c}</th>)}</tr>
              </thead>
              <tbody>
                {frais.autresFrais.lignes.map((l) => (
                  <tr key={l.intitule}>
                    <td>{l.intitule}</td>
                    <td>{l.classes}</td>
                    <td className="frais-total">{l.montant}</td>
                    <td>{l.delai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="frais-table">
            <h4>{frais.fraisExamens.titre}</h4>
            <table>
              <thead>
                <tr>{frais.fraisExamens.colonnes.map((c) => <th key={c}>{c}</th>)}</tr>
              </thead>
              <tbody>
                {frais.fraisExamens.lignes.map((l) => (
                  <tr key={l.examen}>
                    <td>{l.examen}</td>
                    <td className="frais-total">{l.fixe}</td>
                    <td>{l.variable}</td>
                    <td>{l.delai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="frais-pied">{frais.note}</p>
    </div>
  );
}