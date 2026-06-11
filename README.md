# Collège Bilingue La Sève — Site web full-stack

Site web d'établissement scolaire construit avec **React (Vite)** côté frontend et **Express (Node.js)** côté backend, dans un seul projet.

## Structure du projet

```
college-la-seve/
├── package.json          → scripts globaux (dev, build, start)
├── server/
│   ├── index.js          → serveur Express : API + service du build en production
│   └── data/
│       ├── ecole.json    → infos générales, à propos, chiffres, contact, dates clés
│       ├── classes.json  → cycles, classes et modalités
│       ├── admission.json→ voies d'admission (concours / dossier) + tableau récapitulatif
│       └── messages.json → messages reçus via le formulaire (créé automatiquement)
└── client/               → application React (Vite)
    └── src/
        ├── App.jsx       → chargement des données et assemblage
        ├── api.js        → appels au backend
        └── components/   → Navbar, Hero, APropos, Classes, Admission, Contact, Footer
```

## Démarrage

```bash
# 1. Installer toutes les dépendances (racine + client)
npm run install:all

# 2. Lancer le projet en développement
npm run dev
```

- Frontend : http://localhost:5173 (les appels `/api` sont redirigés vers le backend)
- Backend : http://localhost:5000

## API du backend

| Méthode | Route                    | Description                                   |
|---------|--------------------------|-----------------------------------------------|
| GET     | `/api/ecole`             | Informations générales de l'école              |
| GET     | `/api/classes`           | Cycles, classes et modalités                   |
| GET     | `/api/admission`         | Voies d'admission et tableau récapitulatif     |
| POST    | `/api/contact`           | Enregistre un message du formulaire de contact |
| GET     | `/api/messages`          | Liste les messages reçus (à protéger !)        |
| PATCH   | `/api/messages/:id/lu`   | Marque un message comme lu                     |

## Gérer le contenu du site

Tout le contenu (textes, classes, dates, contacts) est dans `server/data/*.json`.
Modifiez ces fichiers puis rechargez la page : aucun code React à toucher.

## Messages du formulaire

Les messages envoyés via la section Contact sont enregistrés dans `server/data/messages.json`.
Consultez-les via `GET http://localhost:5000/api/messages`.

⚠️ Avant une mise en production, protégez `/api/messages` par une authentification
(ex. middleware avec un jeton, ou session admin).

## Production

```bash
npm run build   # construit le frontend dans client/dist
npm start       # Express sert l'API ET le site construit sur le port 5000
```

## Pour aller plus loin

- Remplacer `messages.json` par une vraie base de données (MongoDB, PostgreSQL, SQLite).
- Ajouter un envoi d'e-mail à la réception d'un message (Nodemailer).
- Créer une page d'administration React pour gérer le contenu et lire les messages.
