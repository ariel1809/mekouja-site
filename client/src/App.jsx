import { useEffect, useState } from "react";
import { getJSON } from "./api.js";
import useReveal from "./hooks/useReveal.js";
import AnnonceBar from "./components/AnnonceBar.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Innovations from "./components/Innovations.jsx";
import APropos from "./components/APropos.jsx";
import Temoignages from "./components/Temoignages.jsx";
import Classes from "./components/Classes.jsx";
import Admission from "./components/Admission.jsx";
import FAQ from "./components/FAQ.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import WhatsApp from "./components/WhatsApp.jsx";

export default function App() {
  const [ecole, setEcole] = useState(null);
  const [classes, setClasses] = useState(null);
  const [admission, setAdmission] = useState(null);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    Promise.all([getJSON("/api/ecole"), getJSON("/api/classes"), getJSON("/api/admission")])
      .then(([e, c, a]) => {
        setEcole(e);
        setClasses(c);
        setAdmission(a);
      })
      .catch(() => setErreur("Le serveur ne répond pas. Vérifiez que le backend est démarré (npm run dev)."));
  }, []);

  const pret = ecole && classes && admission;
  useReveal([pret]);

  if (erreur) {
    return (
      <div className="erreur-api">
        <h2>Connexion au serveur impossible</h2>
        <p>{erreur}</p>
      </div>
    );
  }

  if (!pret) {
    return (
      <div className="chargement">
        <span className="craie-anim">Préparation du tableau…</span>
      </div>
    );
  }

  return (
    <>
      <AnnonceBar ecole={ecole} />
      <Navbar ecole={ecole} />
      <main>
        <Hero ecole={ecole} />
        <Innovations />
        <APropos ecole={ecole} />
        <Temoignages items={ecole.temoignages} />
        <Classes donnees={classes} />
        <Admission donnees={admission} />
        <FAQ items={ecole.faq} />
        <Contact ecole={ecole} />
      </main>
      <Footer ecole={ecole} />
      <WhatsApp tel={ecole.contact.telephones[0]} />
    </>
  );
}