export default function Hero({ ecole }) {
  const [debut, avant, souligne] = ecole.slogan;

  return (
    <section className="hero" id="accueil">
      <div className="hero-deco" aria-hidden="true">
        <span className="deco-a"></span>
        <span className="deco-b"></span>
        <span className="deco-c"></span>
      </div>

      <div className="wrap hero-inner">
        <div>
          <span className="eyebrow">{ecole.ville} · {ecole.niveaux}</span>
          <h1>
            {debut}<br />
            {avant}
            <span className="souligne">
              {souligne}
              <svg viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true">
                <path d="M4 10 C 60 2, 150 14, 296 6" />
              </svg>
            </span>
          </h1>
          <p className="lead">{ecole.accroche}</p>
          <div className="hero-actions">
            <a className="btn btn-jaune" href="#admission">Comment nous rejoindre</a>
            <a className="btn btn-ghost" href="#classes">Découvrir les classes</a>
          </div>
        </div>

        <aside className="ardoise" aria-label="Informations clés de la rentrée">
          <span className="card-label">À retenir</span>
          <ul>
            {ecole.aRetenir.map((item) => (
              <li key={item.label}>
                <span className="tiret">→</span>
                <span>
                  <b>{item.label}</b>
                  {item.valeur}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}