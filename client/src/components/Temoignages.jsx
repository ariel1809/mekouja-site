export default function Temoignages({ items }) {
  return (
    <section className="temoignages" id="temoignages">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-eyebrow">Témoignages</div>
          <h2>Ce que disent les familles</h2>
          <p>
            Des parents qui ont choisi MEKOUJA pour leurs enfants partagent leur
            expérience.
          </p>
        </div>
        <div className="temoin-grid">
          {items.map((t) => (
            <article key={t.nom} className="temoin-carte reveal">
              <div className="guillemets" aria-hidden="true">"</div>
              <p className="temoin-texte">{t.texte}</p>
              <div className="temoin-auteur">
                <div
                  className="temoin-avatar"
                  style={{ background: t.couleur }}
                  aria-hidden="true"
                >
                  {t.initiales}
                </div>
                <div>
                  <div className="temoin-nom">{t.nom}</div>
                  <div className="temoin-role">{t.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}