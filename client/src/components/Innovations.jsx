const ITEMS = [
  {
    icone: "🗣️",
    theme: "bleu",
    sousTitre: "De la maternelle au CM2",
    titre: "Bilinguisme intégral",
    photo: "/photos/eleves-lecture-anglais.jpg",
    alt: "Élèves de MEKOUJA lisant un manuel d'anglais dans la cour, sous les drapeaux du campus",
    texte:
      "Toutes les matières sont enseignées en français et en anglais à parité, dès la petite section. Nos élèves maîtrisent les deux langues officielles avant même d'entrer au collège.",
  },
  {
    icone: "🔨",
    theme: "rouge",
    sousTitre: "Maçonnerie & Coupe-Couture",
    titre: "Filières techniques",
    photo: "/photos/projet-scientifique-eleves.jpg",
    alt: "Élèves présentant une maquette réalisée en atelier lors d'une exposition de projets",
    texte:
      "Au collège, un vrai métier s'apprend en atelier. Chantiers-école, pratique hebdomadaire, préparation au CAP — nos élèves entrent dans le monde du travail avec des compétences concrètes.",
  },
  {
    icone: "💡",
    theme: "or",
    sousTitre: "Du collège à la Terminale",
    titre: "Entrepreneuriat",
    photo: "/photos/eleve-filiere-sante-stethoscope.jpg",
    alt: "Élève en blouse blanche avec un stéthoscope, déjà tournée vers son métier de demain",
    texte:
      "Des cours d'entrepreneuriat à chaque niveau : initiation au collège, création de projet au lycée. MEKOUJA forme des élèves capables d'inventer leur propre avenir.",
  },
];

// Le halo lumineux suit la position du curseur sur la carte.
function spotlight(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--sx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--sy", `${e.clientY - r.top}px`);
}

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
              onMouseMove={spotlight}
            >
              <div className="innov-photo">
                <img src={item.photo} alt={item.alt} loading="lazy" />
              </div>
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