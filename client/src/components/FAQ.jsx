import { useState } from "react";

function Item({ question, reponse }) {
  const [ouvert, setOuvert] = useState(false);

  return (
    <div className={`faq-item${ouvert ? " open" : ""}`}>
      <button
        className="faq-question"
        onClick={() => setOuvert(!ouvert)}
        aria-expanded={ouvert}
      >
        <span>{question}</span>
        <span className="faq-chevron" aria-hidden="true">▾</span>
      </button>
      <div className="faq-reponse" aria-hidden={!ouvert}>
        <div className="faq-reponse-inner">
          <p>{reponse}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ({ items }) {
  return (
    <section className="faq" id="faq">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-eyebrow">FAQ</div>
          <h2>Questions fréquentes</h2>
          <p>
            Tout ce que les familles nous demandent avant de s&rsquo;inscrire.
            Une autre question ?{" "}
            <a href="#contact" style={{ color: "var(--bleu-mid)", fontWeight: 700 }}>
              Contactez-nous directement.
            </a>
          </p>
        </div>
        <div className="faq-liste reveal">
          {items.map((item) => (
            <Item key={item.q} question={item.q} reponse={item.r} />
          ))}
        </div>
      </div>
    </section>
  );
}