# 📚 STRUCTURE DU PROJET BLABLABOOK

## Version facile à lire

---

## 🎯 C'EST QUOI BLABLABOOK ?

Une application web.

Elle sert à gérer vos livres.

Comme une bibliothèque personnelle.

Mais sur internet.

---

## 🏗️ LES 3 PARTIES DU PROJET

### 1. 🎨 FRONTEND

**C'est quoi ?**

La partie que vous voyez.

Les pages web.

Les boutons.

Les formulaires.

**Fait avec quoi ?**

- Svelte 5
- SvelteKit
- Tailwind CSS

**Où c'est ?**

📂 Dossier : `frontend/`

---

### 2. ⚙️ BACKEND

**C'est quoi ?**

La partie cachée.

Le serveur.

Il traite les demandes.

Il parle à la base de données.

**Fait avec quoi ?**

- Node.js
- Express.js
- Sequelize

**Où c'est ?**

📂 Dossier : `backend/`

---

### 3. 🗄️ BASE DE DONNÉES

**C'est quoi ?**

L'endroit où on stocke tout.

Les utilisateurs.

Les livres.

Les notes.

**Fait avec quoi ?**

PostgreSQL

---

## 📁 STRUCTURE DES DOSSIERS

```
blablabook-mvp/
│
├── backend/         ⚙️ Le serveur
│   └── src/
│       ├── config/      Configuration base de données
│       ├── controllers/ Logique métier
│       ├── middleware/  Vérification authentification
│       ├── models/      Structure des données
│       └── routes/      Chemins de l'API
│
├── frontend/        🎨 L'interface utilisateur
│   └── src/
│       ├── lib/          Composants réutilisables
│       └── routes/       Pages du site
│
└── docs/            📖 Documentation
```

---

## 🔑 FICHIERS IMPORTANTS DU BACKEND

### 1️⃣ server.js

**📍 Où ?** `backend/src/server.js`

**🎯 Rôle ?**

C'est le point de départ.

Il démarre le serveur.

**Ce qu'il fait :**

1. Charge la configuration
2. Configure Express
3. Se connecte à la base de données
4. Lance le serveur sur le port 3000

---

### 2️⃣ database.js

**📍 Où ?** `backend/src/config/database.js`

**🎯 Rôle ?**

Configure la connexion à PostgreSQL.

**Les infos importantes :**

- Nom : blablabook
- Utilisateur : student
- Port : 5432

---

### 3️⃣ User.js

**📍 Où ?** `backend/src/models/User.js`

**🎯 Rôle ?**

Définit un utilisateur.

**Les données stockées :**

- id (numéro unique)
- username (nom d'utilisateur)
- email
- password (mot de passe crypté)
- first_name (prénom)
- last_name (nom)

**Sécurité :**

Le mot de passe est crypté automatiquement avec bcrypt.

Personne ne peut le lire.

---

### 4️⃣ Book.js

**📍 Où ?** `backend/src/models/Book.js`

**🎯 Rôle ?**

Définit un livre.

**Les données stockées :**

- id (numéro unique)
- open_library_id (identifiant Open Library)
- title (titre)
- author (auteur)
- published_year (année)
- isbn
- cover_url (image de couverture)
- description
- page_count (nombre de pages)

**Important :**

Un livre ne peut exister qu'une seule fois.

Grâce à open_library_id unique.

---

### 5️⃣ UserBook.js

**📍 Où ?** `backend/src/models/UserBook.js`

**🎯 Rôle ?**

Fait le lien entre un utilisateur et un livre.

**Les données stockées :**

- user_id (quel utilisateur ?)
- book_id (quel livre ?)
- status (statut : à lire, en cours, lu)
- rating (note de 1 à 5)
- review (avis personnel)

**Règle importante :**

Un utilisateur ne peut pas avoir 2 fois le même livre.

---

### 6️⃣ authController.js

**📍 Où ?** `backend/src/controllers/authController.js`

**🎯 Rôle ?**

Gère l'inscription et la connexion.

**2 fonctions principales :**

**register :**

1. Vérifie les données
2. Vérifie que le username n'existe pas déjà
3. Crée l'utilisateur
4. Crée un token JWT
5. Renvoie le token

**login :**

1. Vérifie les données
2. Cherche l'utilisateur
3. Vérifie le mot de passe
4. Crée un token JWT
5. Renvoie le token

**C'est quoi un token JWT ?**

Une clé d'accès.

Valable 7 jours.

Permet de prouver qu'on est connecté.

---

### 7️⃣ authMiddleware.js

**📍 Où ?** `backend/src/middleware/authMiddleware.js`

**🎯 Rôle ?**

Vérifie que l'utilisateur est connecté.

**Comment ça marche ?**

1. Récupère le token dans la requête
2. Vérifie que le token est valide
3. Cherche l'utilisateur correspondant
4. Si tout est ok : on continue
5. Sinon : erreur 401 (non autorisé)

---

### 8️⃣ bookController.js

**📍 Où ?** `backend/src/controllers/bookController.js`

**🎯 Rôle ?**

Permet de chercher des livres.

**Comment ça marche ?**

1. L'utilisateur tape un mot-clé
2. On appelle l'API Open Library
3. On récupère les résultats
4. On transforme les données
5. On renvoie la liste des livres

**Exemple :**

Recherche : "harry potter"

→ Renvoie 20 livres maximum

---

### 9️⃣ userBookController.js

**📍 Où ?** `backend/src/controllers/userBookController.js`

**🎯 Rôle ?**

Gère la bibliothèque personnelle.

**4 fonctions principales :**

**1. addBook**

Ajoute un livre à ma bibliothèque.

**2. getMyBooks**

Affiche tous mes livres.

**3. updateBook**

Modifie un livre (statut, note, avis).

**4. removeBook**

Supprime un livre de ma bibliothèque.

---

### 🔟 Les routes

**📍 Où ?** `backend/src/routes/`

**🎯 Rôle ?**

Définit les chemins de l'API.

**Chemins disponibles :**

**Authentification :**

- `POST /api/auth/register` → Inscription
- `POST /api/auth/login` → Connexion

**Livres (Open Library) :**

- `GET /api/books/search?q=...` → Recherche

**Ma bibliothèque :**

- `GET /api/user-books` → Voir mes livres
- `POST /api/user-books` → Ajouter un livre
- `PUT /api/user-books/:id` → Modifier un livre
- `DELETE /api/user-books/:id` → Supprimer un livre

---

## 🎨 FICHIERS IMPORTANTS DU FRONTEND

### 1️⃣ +layout.svelte

**📍 Où ?** `frontend/src/routes/+layout.svelte`

**🎯 Rôle ?**

Le template de base.

Affiché sur toutes les pages.

**Contient :**

- La barre de navigation (Navbar)
- Le contenu de la page
- Le pied de page (Footer)

---

### 2️⃣ +page.svelte (accueil)

**📍 Où ?** `frontend/src/routes/+page.svelte`

**🎯 Rôle ?**

La page d'accueil.

**2 versions :**

**Version visiteur (non connecté) :**

- Logo
- Titre "Blablabook"
- Bouton "S'inscrire"
- Bouton "Se connecter"
- 3 cartes de présentation

**Version utilisateur (connecté) :**

- Message "Bonjour [username] !"
- Statistiques (nombre de livres, à lire, en cours, lus)
- Bouton "Ma bibliothèque"
- Bouton "Rechercher"

---

### 3️⃣ login/+page.svelte

**📍 Où ?** `frontend/src/routes/login/+page.svelte`

**🎯 Rôle ?**

La page de connexion.

**Contient :**

- Formulaire avec 2 champs :
  - Nom d'utilisateur
  - Mot de passe
- Bouton "Se connecter"
- Lien vers l'inscription

**Ce qui se passe quand on clique :**

1. Envoie les données au backend
2. Reçoit le token
3. Sauvegarde le token
4. Redirige vers "Ma bibliothèque"

---

### 4️⃣ register/+page.svelte

**📍 Où ?** `frontend/src/routes/register/+page.svelte`

**🎯 Rôle ?**

La page d'inscription.

**Contient :**

- Formulaire avec 3 champs :
  - Nom d'utilisateur
  - Email
  - Mot de passe
- Bouton "S'inscrire"
- Lien vers la connexion

---

### 5️⃣ search/+page.svelte

**📍 Où ?** `frontend/src/routes/search/+page.svelte`

**🎯 Rôle ?**

La page de recherche.

**Contient :**

- Barre de recherche
- Liste des résultats
- Pour chaque livre :
  - Couverture
  - Titre
  - Auteur
  - Année
  - Bouton "Ajouter"

---

### 6️⃣ my-books/+page.svelte

**📍 Où ?** `frontend/src/routes/my-books/+page.svelte`

**🎯 Rôle ?**

Affiche ma bibliothèque.

**Contient :**

- Filtres par statut
- Grille de livres
- Pour chaque livre :
  - Couverture
  - Titre
  - Auteur
  - Statut
  - Boutons d'action

---

### 7️⃣ Navbar.svelte

**📍 Où ?** `frontend/src/lib/components/Navbar.svelte`

**🎯 Rôle ?**

La barre de navigation en haut.

**Contient :**

- Logo Blablabook
- Liens :
  - Accueil
  - Rechercher
  - Ma bibliothèque
  - Mon compte
- Bouton "Se déconnecter"

---

### 8️⃣ Footer.svelte

**📍 Où ?** `frontend/src/lib/components/Footer.svelte`

**🎯 Rôle ?**

Le pied de page en bas.

**Contient :**

- Mentions légales
- CGU
- Contact

---

## 🗄️ BASE DE DONNÉES

### Structure

**3 tables :**

---

### Table : users

**Stocke les utilisateurs.**

**Colonnes :**

- id
- username
- email
- password (crypté)
- first_name
- last_name
- created_at
- updated_at

---

### Table : books

**Stocke les livres.**

**Colonnes :**

- id
- open_library_id (unique)
- title
- author
- published_year
- isbn
- cover_url
- description
- page_count
- created_at
- updated_at

---

### Table : user_books

**Fait le lien entre users et books.**

**Colonnes :**

- id
- user_id
- book_id
- status (to_read, reading, read)
- rating (1 à 5)
- review (texte max 2000 caractères)
- created_at
- updated_at

**Règle :**

Un utilisateur + un livre = une seule ligne.

Pas de doublons.

---

## 🔐 SÉCURITÉ

### Comment le projet est sécurisé ?

**1. Mots de passe**

Cryptés avec bcrypt.

Impossible à décrypter.

**2. Tokens JWT**

Authentification sécurisée.

Expire après 7 jours.

**3. Helmet**

Protège les headers HTTP.

**4. CORS**

N'accepte que le frontend.

Bloque les autres sites.

**5. Validation**

Toutes les données sont vérifiées.

Avec Joi.

**6. Sequelize**

Protection contre les injections SQL.

---

## 🚀 COMMENT ÇA MARCHE ?

### Scénario 1 : Se connecter

1. Je vais sur /login
2. Je tape mon username
3. Je tape mon password
4. Je clique sur "Se connecter"
5. Le frontend envoie au backend
6. Le backend vérifie
7. Le backend crée un token
8. Le backend renvoie le token
9. Le frontend sauvegarde le token
10. Je suis redirigé vers ma bibliothèque

---

### Scénario 2 : Ajouter un livre

1. Je vais sur /search
2. Je tape "harry potter"
3. Le frontend appelle l'API Open Library
4. L'API renvoie des livres
5. Je vois la liste
6. Je clique sur "Ajouter"
7. Le frontend envoie au backend
8. Le backend vérifie mon token
9. Le backend ajoute le livre
10. Le livre apparaît dans ma bibliothèque

---

### Scénario 3 : Voir ma bibliothèque

1. Je vais sur /my-books
2. Le frontend demande mes livres
3. Le backend vérifie mon token
4. Le backend cherche mes livres
5. Le backend renvoie la liste
6. Je vois tous mes livres

---

## 📊 SCHÉMA SIMPLE

```
┌─────────┐         ┌────────────┐         ┌─────────┐
│  User   │◄───────►│  UserBook  │◄───────►│  Book   │
└─────────┘         └────────────┘         └─────────┘
    1:N                                         N:1

Un utilisateur peut avoir plusieurs livres.
Un livre peut appartenir à plusieurs utilisateurs.
```

---

## ✅ CE QUE L'APPLICATION FAIT

- ✅ Inscription
- ✅ Connexion
- ✅ Recherche de livres
- ✅ Ajout à ma bibliothèque
- ✅ Voir mes livres
- ✅ Filtrer par statut (à lire, en cours, lu)
- ✅ Noter un livre
- ✅ Écrire un avis
- ✅ Supprimer un livre
- ✅ Déconnexion

---

## 🛠️ TECHNOLOGIES UTILISÉES

### Frontend

- **Svelte 5** → Framework JavaScript moderne
- **SvelteKit** → Routing et SSR
- **Tailwind CSS** → Style responsive
- **Vite** → Build rapide

### Backend

- **Node.js** → Environnement JavaScript
- **Express** → Framework web
- **Sequelize** → ORM pour PostgreSQL
- **JWT** → Authentification
- **Bcrypt** → Cryptage des mots de passe
- **Joi** → Validation des données

### Base de données

- **PostgreSQL** → Base de données relationnelle

---

## 📝 RÉSUMÉ EN 3 POINTS

### 1️⃣ FRONTEND

Pages web que vous voyez.

Fait avec Svelte.

Dans le dossier `frontend/`.

### 2️⃣ BACKEND

Serveur qui traite les requêtes.

Fait avec Node.js.

Dans le dossier `backend/`.

### 3️⃣ BASE DE DONNÉES

Stocke tout (users, books).

PostgreSQL.

3 tables : users, books, user_books.

---

## 🎯 COMPÉTENCES DÉMONTRÉES

### Frontend

✅ Créer des pages web

✅ Design responsive

✅ Appels API

✅ Gestion d'état

✅ Authentification

### Backend

✅ API REST

✅ Base de données

✅ Sécurité

✅ Validation

✅ Architecture MVC

---

## 📞 BESOIN D'AIDE ?

**Documentation complète :**

→ Voir `STRUCTURE-PROJET.md`

**Questions fréquentes :**

- Comment lancer le projet ? → README.md
- Comment tester l'API ? → Utiliser Postman
- Où sont les captures d'écran ? → docs/blablabook-captures/

---

**Document créé le** : 2025-11-17

**Version** : Adaptée pour dyslexiques

**Basé sur** : STRUCTURE-PROJET.md
