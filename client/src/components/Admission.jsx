export default function Admission({ donnees }) {
  const { voies, recapitulatif } = donnees;

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

        <div className="frais-note reveal">
          <div className="frais-ico" aria-hidden="true">💬</div>
          <div>
            <h4>Frais de scolarité</h4>
            <p>Les frais varient selon le cycle et la classe. Pour connaître les tarifs actualisés, contactez notre secrétariat ou venez nous rendre visite.</p>
            <a href="#contact" className="btn-or">Nous contacter →</a>
          </div>
        </div>

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
