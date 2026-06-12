const PHOTOS = [
  {
    src: "/photos/course-sportive-eleves.jpg",
    alt: "Élèves en tenue de sport courant ensemble dans la cour lors du cross de l'école",
    legende: "Cross du campus — le sport fait partie du quotidien",
    grande: true,
  },
  {
    src: "/photos/eleves-section-anglophone-drapeaux.jpg",
    alt: "Élèves de la section anglophone posant sous les drapeaux du campus",
    legende: "La section anglophone, fierté du bilinguisme MEKOUJA",
  },
  {
    src: "/photos/drapeaux-internationaux-campus.jpg",
    alt: "Drapeaux internationaux flottant au-dessus du campus arboré",
    legende: "Un campus arboré, ouvert sur le monde",
  },
  {
    src: "/photos/eleves-infirmiers-stage.jpg",
    alt: "Élèves en tenue blanche lors d'une sortie de découverte des métiers de la santé",
    legende: "Découverte des métiers : sortie pédagogique santé",
    grande: true,
  },
  {
    src: "/photos/equipe-sportive-college.jpg",
    alt: "Équipes sportives de l'école rassemblées pour la photo de groupe",
    legende: "Nos équipes défendent les couleurs de l'école",
  },
  {
    src: "/photos/visite-centre-sante-encadreurs.jpg",
    alt: "Élèves et encadreurs lors de la visite d'un centre de santé partenaire",
    legende: "Visite encadrée d'un centre de santé partenaire",
  },
];

export default function VieScolaire() {
  return (
    <section className="vie-scolaire" id="vie-scolaire">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-eyebrow">Vie scolaire</div>
          <h2>L&rsquo;école en images, comme si vous y étiez</h2>
          <p>
            Sport, sorties pédagogiques, vie de campus : à MEKOUJA, on apprend
            aussi en dehors de la salle de classe. Voici le quotidien que vivra
            votre enfant.
          </p>
        </div>
        <div className="galerie">
          {PHOTOS.map((photo) => (
            <figure
              key={photo.src}
              className={`galerie-item reveal ${photo.grande ? "galerie-grande" : ""}`}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <figcaption>{photo.legende}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}