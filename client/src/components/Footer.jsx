export default function Footer({ ecole }) {
  const { contact } = ecole;
  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <a className="logo" href="#accueil" aria-label={`Accueil — ${ecole.nom}`}>
              <span className="logo-badge">
                <img src="/mekouja.jpg" alt="" aria-hidden="true" />
              </span>
              {ecole.nom}
            </a>
            <p>{ecole.ville} · {ecole.niveaux}</p>
          </div>

          <div className="footer-col">
            <h4>Navigation</h4>
            <ul>
              <li><a href="#apropos">À propos</a></li>
              <li><a href="#innovations">Nos innovations</a></li>
              <li><a href="#classes">Nos classes</a></li>
              <li><a href="#admission">Admission</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              {contact.telephones.map((tel) => (
                <li key={tel}>
                  <a href={`tel:${tel.replace(/\s/g, "")}`}>{tel}</a>
                </li>
              ))}
              {contact.emails.map((mail) => (
                <li key={mail}>
                  <a href={`mailto:${mail}`}>{mail}</a>
                </li>
              ))}
              <li><span>{contact.adresse.join(" · ")}</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Collège Bilingue Entrepreneurial {ecole.nom}. Tous droits réservés.</span>
          <nav aria-label="Liens de bas de page">
            <a href="#apropos">À propos</a>
            <a href="#classes">Classes</a>
            <a href="#admission">Admission</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}