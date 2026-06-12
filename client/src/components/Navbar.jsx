import { useState, useEffect } from "react";

export default function Navbar({ ecole }) {
  const [ouvert, setOuvert] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const fermer = () => setOuvert(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <div className="wrap nav">
        <a className="logo" href="#accueil" aria-label={`Accueil — ${ecole.nom}`}>
          <span className="logo-badge">
            <img src="/mekouja.jpg" alt="" aria-hidden="true" />
          </span>
          {ecole.nom}
        </a>
        <button
          className={`burger ${ouvert ? "open" : ""}`}
          aria-label="Ouvrir le menu"
          aria-expanded={ouvert}
          onClick={() => setOuvert(!ouvert)}
        >
          <span></span><span></span><span></span>
        </button>
        <ul className={`nav-links ${ouvert ? "open" : ""}`}>
          <li><a href="#apropos" onClick={fermer}>À propos</a></li>
          <li><a href="#vie-scolaire" onClick={fermer}>Vie scolaire</a></li>
          <li><a href="#classes" onClick={fermer}>Nos classes</a></li>
          <li><a href="#admission" onClick={fermer}>Admission</a></li>
          <li><a href="#contact" className="cta" onClick={fermer}>Contact</a></li>
        </ul>
      </div>
    </header>
  );
}