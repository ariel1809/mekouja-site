const ICONES = ["🌱", "📚", "🤝", "🎯", "✨", "🏫"];

export default function APropos({ ecole }) {
  return (
    <section className="apropos" id="apropos">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-eyebrow">À propos</div>
          <h2>Une école à taille humaine, exigeante et bienveillante</h2>
        </div>
        <div className="apropos-grid">
          <div className="apropos-texte reveal">
            {ecole.aPropos.map((paragraphe, i) => (
              <p key={i}>{paragraphe}</p>
            ))}
            <div className="valeurs">
              {ecole.valeurs.map((v, i) => (
                <div className="valeur" key={v.titre}>
                  <div className="valeur-ico" aria-hidden="true">{ICONES[i % ICONES.length]}</div>
                  <div className="valeur-content">
                    <h3>{v.titre}</h3>
                    <p>{v.texte}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="chiffres reveal" aria-label="L'école en chiffres">
            <h3>L'école en chiffres</h3>
            <div className="chiffres-grid">
              {ecole.chiffres.map((c) => (
                <div className="chiffre" key={c.label}>
                  <b>{c.valeur}</b>
                  <span>{c.label}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}