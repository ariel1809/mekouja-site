const ITEMS = [
  {
    icone: "🗣️",
    theme: "bleu",
    sousTitre: "De la maternelle au CM2",
    titre: "Bilinguisme intégral",
    texte:
      "Toutes les matières sont enseignées en français et en anglais à parité, dès la petite section. Nos élèves maîtrisent les deux langues officielles avant même d'entrer au collège.",
  },
  {
    icone: "🔨",
    theme: "rouge",
    sousTitre: "Maçonnerie & Coupe-Couture",
    titre: "Filières techniques",
    texte:
      "Au collège, un vrai métier s'apprend en atelier. Chantiers-école, pratique hebdomadaire, préparation au CAP — nos élèves entrent dans le monde du travail avec des compétences concrètes.",
  },
  {
    icone: "💡",
    theme: "or",
    sousTitre: "Du collège à la Terminale",
    titre: "Entrepreneuriat",
    texte:
      "Des cours d'entrepreneuriat à chaque niveau : initiation au collège, création de projet au lycée. MEKOUJA forme des élèves capables d'inventer leur propre avenir.",
  },
];

export default function Innovations() {
  return (
    <section className="innovations" id="innovations">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-eyebrow">Nos innovations</div>
          <h2>Ce qui rend MEKOUJA différent</h2>
          <p>
            Trois piliers pédagogiques uniques qui font la réputation de
            l&rsquo;établissement depuis plus de 15 ans à Yaoundé.
          </p>
        </div>
        <div className="innov-grid">
          {ITEMS.map((item) => (
            <article
              key={item.titre}
              className={`innov-card innov-${item.theme} reveal`}
            >
              <div className="innov-ico" aria-hidden="true">
                {item.icone}
              </div>
              <div className="innov-sous-titre">{item.sousTitre}</div>
              <h3>{item.titre}</h3>
              <p>{item.texte}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}