export default function Admission({ donnees }) {
  const { voies, recapitulatif, frais } = donnees;

  return (
    <section className="admission" id="admission">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-eyebrow">Admission</div>
          <h2>Deux voies pour nous rejoindre</h2>
          <p>Selon la classe demandée, l'admission se fait sur concours d'entrée ou sur étude de dossier. Le tableau récapitulatif ci-dessous indique la voie applicable à chaque niveau.</p>
        </div>

        <div className="deux-voies">
          {voies.map((voie) => (
            <article className={`voie voie-${voie.id} reveal`} key={voie.id}>
              <span className="num">{voie.numero}</span>
              <h3>{voie.titre}</h3>
              <p>{voie.description}</p>
              <ol className="etapes">
                {voie.etapes.map((etape, i) => <li key={i}>{etape}</li>)}
              </ol>
              <p className="note">{voie.note}</p>
            </article>
          ))}
        </div>

        {frais && (
          <div className="frais-bloc reveal" id="frais">
            <div className="frais-head">
              <div>
                <div className="sec-eyebrow">Frais de scolarité</div>
                <h3>{frais.titre}</h3>
                <p>{frais.intro}</p>
              </div>
              <ul className="frais-calendrier" aria-label="Calendrier de paiement">
                {frais.calendrier.map((c) => (
                  <li key={c.tranche}>
                    <b>{c.tranche}</b>
                    <span>{c.date}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="frais-grilles">
              {frais.grilles.map((grille) => (
                <div className="frais-table" key={grille.cycle}>
                  <h4>{grille.cycle}</h4>
                  <table>
                    <thead>
                      <tr>
                        {frais.colonnes.map((col) => <th key={col}>{col}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {grille.lignes.map((l) => (
                        <tr key={l.classe}>
                          <td>{l.classe}</td>
                          <td>{l.t1}</td>
                          <td>{l.t2}</td>
                          <td>{l.t3}</td>
                          <td className="frais-total">{l.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>

            <div className="frais-annexes">
              <div className="frais-carte-dossier">
                <h4>{frais.etudeDossier.titre}</h4>
                <ul className="frais-inscription">
                  {frais.etudeDossier.lignes.map((l) => (
                    <li key={l.niveau}>
                      <span>{l.niveau}</span>
                      <b>{l.montant}</b>
                    </li>
                  ))}
                </ul>
                <p className="frais-pieces-titre">Pièces à fournir</p>
                <ul className="frais-pieces">
                  {frais.etudeDossier.pieces.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>

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
            </div>

            <div className="frais-table frais-examens">
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

            <p className="frais-pied">{frais.note}</p>
          </div>
        )}

        <div className="tableau-adm reveal">
          <div className="titre">
            <h3>{recapitulatif.titre}</h3>
            <span>{recapitulatif.sousTitre}</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Classe demandée</th>
                <th>Voie d'admission</th>
                <th>Pièces / épreuves principales</th>
                <th>Période</th>
              </tr>
            </thead>
            <tbody>
              {recapitulatif.lignes.map((ligne) => (
                <tr key={ligne.classe}>
                  <td>{ligne.classe}</td>
                  <td><span className={`pill badge-${ligne.type}`}>{ligne.voie}</span></td>
                  <td>{ligne.pieces}</td>
                  <td>{ligne.periode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
