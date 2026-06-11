const MOTS = [
  "Bilinguisme intégral",
  "Maternelle → Terminale",
  "Filière Maçonnerie",
  "Filière Coupe-Couture",
  "Entrepreneuriat",
  "94 % de réussite",
  "Yaoundé · Nsazomo",
  "30 élèves max. par classe",
];

export default function Marquee() {
  // Contenu dupliqué pour une boucle infinie sans rupture visuelle.
  const piste = [...MOTS, ...MOTS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-piste">
        {piste.map((mot, i) => (
          <span className="marquee-item" key={i}>
            {mot}
            <span className="marquee-etoile">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}