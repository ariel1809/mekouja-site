import { useRef } from "react";

// Découpe une chaîne en mots animés individuellement (révélation en cascade).
function Mots({ texte, depart = 0 }) {
  return texte.split(" ").filter(Boolean).map((mot, i) => (
    <span className="mot-wrap" key={i}>
      <span className="mot" style={{ animationDelay: `${depart + i * 0.07}s` }}>
        {mot}&nbsp;
      </span>
    </span>
  ));
}

export default function Hero({ ecole }) {
  const [debut, avant, souligne] = ecole.slogan;
  const deco = useRef(null);

  // Légère parallaxe des bulles décoratives suivant la souris.
  const parallaxe = (e) => {
    if (!deco.current) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    deco.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  return (
    <section className="hero" id="accueil" onMouseMove={parallaxe}>
      <div className="hero-photo" aria-hidden="true">
        <img
          src="/photos/rassemblement-cour-ecole.jpg"
          alt=""
          fetchpriority="high"
        />
      </div>
      <div className="hero-deco" ref={deco} aria-hidden="true">
        <span className="deco-a"></span>
        <span className="deco-b"></span>
        <span className="deco-c"></span>
        <span className="deco-anneau"></span>
        <span className="deco-croix">+</span>
        <span className="deco-croix deco-croix-2">+</span>
      </div>

      <div className="wrap hero-inner">
        <div>
          <span className="eyebrow">
            <span className="eyebrow-pulse" aria-hidden="true"></span>
            {ecole.ville} · {ecole.niveaux}
          </span>
          <h1>
            <Mots texte={debut} depart={0.15} />
            <br />
            <Mots texte={avant} depart={0.45} />
            <span className="souligne">
              <span className="mot-wrap">
                <span className="mot" style={{ animationDelay: "0.7s" }}>{souligne}</span>
              </span>
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

      <a className="scroll-hint" href="#innovations" aria-label="Faire défiler vers le contenu">
        <span className="scroll-hint-roue" aria-hidden="true"></span>
      </a>
    </section>
  );
}