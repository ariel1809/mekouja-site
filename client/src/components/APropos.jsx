import { useState, useEffect, useRef } from "react";

const ICONES = ["🌱", "📚", "🤝", "🎯", "✨", "🏫"];

function ChiffreAnimé({ valeur, label }) {
  const ref = useRef(null);
  const [affiche, setAffiche] = useState("0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();

      const num = valeur.match(/\d+/);
      if (!num) { setAffiche(valeur); return; }

      const cible = parseInt(num[0]);
      const suffixe = valeur.slice(valeur.indexOf(num[0]) + num[0].length);
      const duree = 1400, pas = 36;
      let i = 0;
      const id = setInterval(() => {
        i++;
        const t = i / pas;
        const eased = 1 - Math.pow(1 - t, 3);
        setAffiche(`${Math.round(eased * cible)}${suffixe}`);
        if (i >= pas) clearInterval(id);
      }, duree / pas);
    }, { threshold: 0.6 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [valeur]);

  return (
    <div className="chiffre" ref={ref}>
      <b>{affiche}</b>
      <span>{label}</span>
    </div>
  );
}

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
                <ChiffreAnimé key={c.label} valeur={c.valeur} label={c.label} />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}