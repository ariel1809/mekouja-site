// Petit client API : tous les appels au backend passent par ici.
// En développement, Vite redirige /api vers http://localhost:5000 (voir vite.config.js).

export async function getJSON(chemin) {
  const reponse = await fetch(chemin);
  if (!reponse.ok) throw new Error(`Erreur API ${reponse.status} sur ${chemin}`);
  return reponse.json();
}

export async function postJSON(chemin, corps) {
  const reponse = await fetch(chemin, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(corps)
  });
  const donnees = await reponse.json().catch(() => ({}));
  if (!reponse.ok) throw new Error(donnees.erreur || "Une erreur est survenue.");
  return donnees;
}
