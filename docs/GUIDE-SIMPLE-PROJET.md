# 📚 GUIDE SIMPLE - COMPRENDRE BLABLABOOK

> Guide détaillé pour comprendre comment fonctionne votre projet
> Explications simples, étape par étape

---

## 🎯 QU'EST-CE QUE BLABLABOOK ?

Blablabook est comme **une bibliothèque personnelle sur internet**.

**Imaginez :**
- Vous avez des livres chez vous sur une étagère
- Blablabook fait la même chose, mais sur votre ordinateur
- Vous pouvez chercher des livres, les ajouter, dire si vous les avez lus, leur donner une note

**C'est comme :**
- 📱 Instagram, mais pour vos livres
- 📝 Une liste de courses, mais pour vos lectures
- 🗂️ Un classeur, mais pour organiser votre bibliothèque

---

## 🏗️ STRUCTURE DU PROJET - VUE D'ENSEMBLE

Votre projet a **2 parties principales** :

```
📁 blablabook-mvp/
   ├── 📁 backend/      ← Le CERVEAU (stocke les données, gère la sécurité)
   ├── 📁 frontend/     ← Le VISAGE (ce que vous voyez à l'écran)
   └── 📁 docs/         ← Les INSTRUCTIONS (documentation)
```

### 🧠 BACKEND = Le cerveau (côté serveur)

**Rôle :** Garder vos données en sécurité et les gérer

**C'est comme :**
- Le coffre-fort d'une banque
- Le cuisinier d'un restaurant (prépare les données)
- Le gardien d'une bibliothèque (vérifie qui peut entrer)

**Contient :**
- La base de données (vos livres, votre compte)
- Les règles de sécurité (qui peut faire quoi)
- La logique (comment ajouter un livre, comment se connecter)

---

### 👁️ FRONTEND = Le visage (côté client)

**Rôle :** Afficher joliment les informations et recevoir vos clics

**C'est comme :**
- La vitrine d'un magasin
- Le menu d'un restaurant
- L'écran de votre téléphone

**Contient :**
- Les pages web (accueil, connexion, liste de livres)
- Les boutons et formulaires
- Les jolies couleurs et le design

---

## 📂 STRUCTURE DÉTAILLÉE DU BACKEND

```
📁 backend/
   ├── 📁 src/                    ← Tout le code source
   │   ├── 📁 config/             ← Configuration
   │   │   └── database.js        ← Comment se connecter à la base de données
   │   │
   │   ├── 📁 models/             ← Les MODÈLES (définitions des données)
   │   │   ├── User.js            ← Définit ce qu'est un utilisateur
   │   │   ├── Book.js            ← Définit ce qu'est un livre
   │   │   ├── UserBook.js        ← Définit le lien entre un user et un livre
   │   │   └── index.js           ← Connecte tous les modèles ensemble
   │   │
   │   ├── 📁 controllers/        ← Les CONTRÔLEURS (la logique métier)
   │   │   ├── authController.js  ← Gère inscription/connexion
   │   │   ├── bookController.js  ← Gère la recherche de livres
   │   │   └── userBookController.js ← Gère votre bibliothèque perso
   │   │
   │   ├── 📁 middleware/         ← Les GARDIENS (vérifications)
   │   │   └── authMiddleware.js  ← Vérifie que vous êtes connecté
   │   │
   │   ├── 📁 routes/             ← Les ROUTES (chemins d'accès)
   │   │   ├── authRoutes.js      ← Chemins pour inscription/connexion
   │   │   ├── bookRoutes.js      ← Chemins pour chercher des livres
   │   │   ├── userBookRoutes.js  ← Chemins pour votre bibliothèque
   │   │   └── index.js           ← Rassemble toutes les routes
   │   │
   │   └── server.js              ← POINT DE DÉPART du backend
   │
   ├── .env.example               ← Exemple de configuration secrète
   └── package.json               ← Liste des outils nécessaires
```

---

## 🔍 EXPLICATION DU BACKEND - FICHIER PAR FICHIER

### 1️⃣ `server.js` - Le point de départ

**Rôle :** Démarre le serveur, comme allumer votre ordinateur

**Ligne par ligne :**

```javascript
// Ligne 7 : Charge les variables secrètes (mots de passe, etc.)
require('dotenv').config();
// → Comme ouvrir un coffre avec une clé

// Ligne 8 : Importe Express (outil pour créer le serveur)
const express = require('express');
// → Express = la fondation de votre maison backend

// Ligne 18 : Crée l'application
const app = express();
// → Comme créer un nouveau restaurant vide

// Ligne 19 : Définit le port (numéro de porte)
const PORT = process.env.PORT || 3000;
// → Votre serveur "habite" au numéro 3000

// Plus loin : Démarre le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
// → Ouvre les portes du restaurant, prêt à recevoir des clients
```

---

### 2️⃣ `models/User.js` - Définition d'un utilisateur

**Rôle :** Décrit à quoi ressemble un utilisateur dans la base de données

**Analogie :** C'est comme une fiche d'inscription avec des cases à remplir

```javascript
// Ligne 20-26 : Le nom d'utilisateur
username: {
  type: DataTypes.STRING(50),    // ← Type texte, max 50 caractères
  allowNull: false,               // ← OBLIGATOIRE (ne peut pas être vide)
  unique: true,                   // ← UNIQUE (pas de doublon)
}
// → Comme votre pseudo sur un jeu vidéo : unique et obligatoire

// Ligne 38-51 : L'email
email: {
  type: DataTypes.STRING(255),
  allowNull: false,
  unique: true,
  validate: {
    isEmail: true                 // ← Doit être un vrai email
  }
}
// → Vérifie que c'est bien un email (avec @)

// Ligne 54-67 : Le mot de passe
password: {
  type: DataTypes.STRING(255),
  allowNull: false,
  validate: {
    len: [8, 255]                 // ← Minimum 8 caractères
  }
}
// → Le mot de passe est obligatoire et assez long

// Ligne 69-79 : Le prénom (OPTIONNEL)
first_name: {
  type: DataTypes.STRING(100),
  allowNull: true                 // ← Peut être vide
}
// → Vous pouvez le remplir ou pas, c'est optionnel
```

**Hook important (ligne 99-110) :**
```javascript
hooks: {
  beforeCreate: async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  }
}
// → AVANT de sauvegarder un nouveau user, crypte le mot de passe
// → C'est comme mettre le mot de passe dans un coffre-fort
// → Personne ne peut le lire, même en base de données !
```

---

### 3️⃣ `models/Book.js` - Définition d'un livre

**Rôle :** Décrit à quoi ressemble un livre

```javascript
// Ligne 22-33 : L'identifiant Open Library
open_library_id: {
  type: DataTypes.STRING(50),
  allowNull: false,               // ← OBLIGATOIRE
  unique: true                    // ← PAS DE DOUBLON
}
// → C'est comme le code-barre d'un livre
// → Chaque livre a un code unique

// Ligne 36-48 : Le titre
title: {
  type: DataTypes.STRING(500),
  allowNull: false,               // ← OBLIGATOIRE
  validate: {
    len: [1, 500]                 // ← Entre 1 et 500 caractères
  }
}
// → Le titre du livre, obligatoire

// Ligne 57-70 : L'année de publication
published_year: {
  type: DataTypes.INTEGER,        // ← UN NOMBRE ENTIER
  allowNull: true,                // ← Optionnel
  validate: {
    min: 1000,                    // ← Au minimum l'an 1000
    max: new Date().getFullYear() + 1  // ← Au max l'année prochaine
  }
}
// → L'année de publication (ex: 1997 pour Harry Potter)

// Ligne 96-105 : Le nombre de pages
page_count: {
  type: DataTypes.INTEGER,
  allowNull: true,
  validate: {
    min: 1                        // ← Au moins 1 page !
  }
}
// → Combien de pages a le livre
```

---

### 4️⃣ `models/UserBook.js` - Le lien entre vous et vos livres

**Rôle :** Connecte un utilisateur à un livre de sa bibliothèque

**Analogie :** C'est comme votre "fiche de lecture personnelle" pour chaque livre

```javascript
// Ligne 21-30 : Référence à l'utilisateur
user_id: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: {
    model: 'users',               // ← Pointe vers la table users
    key: 'id'
  },
  onDelete: 'CASCADE'             // ← Si on supprime le user, supprime ça aussi
}
// → Indique QUEL utilisateur possède ce livre

// Ligne 33-42 : Référence au livre
book_id: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: {
    model: 'books',               // ← Pointe vers la table books
    key: 'id'
  },
  onDelete: 'CASCADE'
}
// → Indique QUEL livre est concerné

// Ligne 48-58 : Le statut de lecture
status: {
  type: DataTypes.ENUM('to_read', 'reading', 'read'),  // ← 3 choix possibles
  allowNull: true,
  defaultValue: 'to_read',        // ← Par défaut "à lire"
}
// → Est-ce que vous l'avez lu ?
// → "to_read" = à lire, "reading" = en cours, "read" = déjà lu

// Ligne 62-75 : La note (1 à 5 étoiles)
rating: {
  type: DataTypes.FLOAT,          // ← Nombre avec virgule (4.5 possible)
  allowNull: true,                // ← Optionnel
  validate: {
    min: 1,                       // ← Minimum 1
    max: 5                        // ← Maximum 5
  }
}
// → Votre note pour ce livre (comme sur Amazon)

// Ligne 78-87 : Votre avis personnel
review: {
  type: DataTypes.TEXT,           // ← Texte long
  allowNull: true,
  validate: {
    len: [0, 2000]                // ← Maximum 2000 caractères
  }
}
// → Ce que vous pensez du livre, votre critique
```

**Index important (ligne 95-102) :**
```javascript
indexes: [
  {
    unique: true,
    fields: ['user_id', 'book_id'],  // ← Ces 2 ensemble doivent être uniques
    name: 'unique_user_book'
  }
]
// → Empêche d'ajouter 2 fois le même livre dans votre bibliothèque
// → Vous ne pouvez pas avoir "Harry Potter" en double !
```

---

### 5️⃣ `controllers/authController.js` - Gestion de l'inscription/connexion

**Rôle :** Gère quand vous créez un compte ou vous connectez

#### FONCTION REGISTER (créer un compte)

```javascript
// Ligne 13-39 : Validation des données
const schema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

const { error } = schema.validate(req.body);
// → Vérifie que vous avez bien rempli tous les champs
// → Comme un professeur qui corrige votre copie

// Ligne 50-55 : Vérifier si l'email existe déjà
const existingUser = await User.findOne({
  where: {
    [Op.or]: [{ email }, { username }]
  }
});
// → Regarde dans la base de données si quelqu'un utilise déjà cet email/username
// → Comme vérifier si un pseudo est déjà pris sur un jeu

// Ligne 63-68 : Créer le nouvel utilisateur
const newUser = await User.create({
  username,
  email,
  password  // ← Sera automatiquement crypté par le "hook"
});
// → Crée une nouvelle ligne dans la table "users"
// → Comme inscrire un nouveau membre dans un club

// Ligne 71-76 : Créer le token JWT (jeton de connexion)
const token = jwt.sign(
  { userId: newUser.id, username: newUser.username, email: newUser.email },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }  // ← Valable 7 jours
);
// → Donne un "badge" à l'utilisateur
// → Ce badge prouve qu'il est connecté
// → Le badge expire au bout de 7 jours
```

#### FONCTION LOGIN (se connecter)

```javascript
// Ligne 103-113 : Validation
const schema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});
// → Vérifie que username et password sont remplis

// Ligne 123-125 : Chercher l'utilisateur
const user = await User.findOne({ where: { username } });
if (!user) {
  return res.status(401).json({ ... });
}
// → Regarde si cet utilisateur existe dans la base
// → Si non → erreur "identifiants invalides"

// Ligne 129-133 : Vérifier le mot de passe
const isPasswordValid = await bcrypt.compare(password, user.password);
if (!isPasswordValid) {
  return res.status(401).json({ ... });
}
// → Compare le mot de passe tapé avec celui (crypté) en base
// → Si différent → erreur

// Ligne 136-141 : Créer le token
const token = jwt.sign(...);
// → Donne le "badge" de connexion
```

---

### 6️⃣ `controllers/userBookController.js` - Gestion de votre bibliothèque

#### FONCTION ADDBOOK (ajouter un livre)

```javascript
// Ligne 20-37 : Validation des données
const schema = Joi.object({
  open_library_id: Joi.string().required(),
  title: Joi.string().min(1).max(500).required(),
  author: Joi.string().max(300).allow(null, ''),
  // ... autres champs
});
// → Vérifie que les infos du livre sont correctes

// Ligne 48-58 : Chercher ou créer le livre
const [book, createdBook] = await Book.findOrCreate({
  where: { open_library_id },
  defaults: { title, author, ... }
});
// → "findOrCreate" = Cherche le livre dans la base
// → Si trouvé → utilise celui-là
// → Si pas trouvé → le crée
// → Comme vérifier si un livre existe déjà en bibliothèque avant de l'acheter

// Ligne 61-66 : Vérifier si vous avez déjà ce livre
const existing = await UserBook.findOne({
  where: { user_id: req.user.id, book_id: book.id }
});
if (existing) {
  return res.status(409).json({ message: 'Livre déjà dans votre bibliothèque' });
}
// → Empêche d'ajouter 2 fois le même livre
// → Comme empêcher d'acheter 2 fois le même jeu

// Ligne 69-76 : Créer le lien user-livre
const userBook = await UserBook.create({
  user_id: req.user.id,
  book_id: book.id,
  status: status || 'to_read'
});
// → Ajoute le livre à VOTRE bibliothèque personnelle
// → Par défaut, statut = "à lire"
```

#### FONCTION GETMYBOOKS (voir vos livres)

```javascript
// Ligne 105-115 : Récupérer tous vos livres
const userBooks = await UserBook.findAll({
  where: { user_id: req.user.id },  // ← Seulement VOS livres
  include: [{
    model: Book,                     // ← Inclut les infos complètes du livre
    attributes: [...]                // ← Quels champs du livre récupérer
  }],
  order: [['created_at', 'DESC']]    // ← Du plus récent au plus ancien
});
// → Va chercher tous les livres que VOUS avez ajoutés
// → Les trie par date (les plus récents en premier)
```

#### FONCTION UPDATEBOOK (modifier un livre)

```javascript
// Ligne 146-165 : Validation
const schema = Joi.object({
  status: Joi.string().valid('to_read', 'reading', 'read'),
  rating: Joi.number().min(1).max(5),
  review: Joi.string().max(2000).allow(null, '')
}).min(1);  // ← Au moins 1 champ doit être rempli
// → Vérifie que les nouvelles valeurs sont correctes

// Ligne 177-182 : Vérifier que c'est bien VOTRE livre
const userBook = await UserBook.findOne({
  where: { id: userBookId, user_id: req.user.id }
});
if (!userBook) {
  return res.status(404).json({ ... });
}
// → Empêche de modifier les livres des autres utilisateurs !
// → Sécurité importante

// Ligne 185-193 : Mettre à jour
await userBook.update({ status, rating, review });
// → Change les valeurs (statut, note, avis)
```

---

### 7️⃣ `middleware/authMiddleware.js` - Le gardien

**Rôle :** Vérifie que vous êtes bien connecté avant d'accéder à certaines pages

```javascript
// Ligne 12-17 : Récupérer le token
const authHeader = req.headers.authorization;
if (!authHeader || !authHeader.startsWith('Bearer ')) {
  return res.status(401).json({ message: 'Token manquant' });
}
const token = authHeader.substring(7);
// → Récupère votre "badge" de connexion
// → Si pas de badge → accès refusé

// Ligne 21-25 : Vérifier le token
const decoded = jwt.verify(token, process.env.JWT_SECRET);
// → Vérifie que le badge est authentique
// → Vérifie qu'il n'est pas expiré (7 jours max)
// → Comme scanner un QR code à l'entrée d'un concert

// Ligne 28-32 : Récupérer l'utilisateur
const user = await User.findByPk(decoded.userId);
if (!user) {
  return res.status(401).json({ message: 'Utilisateur non trouvé' });
}
// → Va chercher vos informations dans la base
// → Si vous n'existez plus → refusé

// Ligne 35 : Attacher l'utilisateur à la requête
req.user = user;
// → Met vos infos dans "req.user"
// → Comme ça, les autres fonctions savent QUI vous êtes
```

---

### 8️⃣ `routes/index.js` - Le tableau des chemins

**Rôle :** Décide quelle route mène où

```javascript
// Ligne 16 : Route pour votre bibliothèque
router.use('/user-books', userBookRoutes);
// → Toutes les routes qui commencent par /api/user-books
// → Vont vers userBookRoutes
// → Comme une pancarte "Bibliothèque → par là"

// Ligne 19 : Route pour l'authentification
router.use('/auth', authRoutes);
// → /api/auth/register → inscription
// → /api/auth/login → connexion

// Ligne 22 : Route pour chercher des livres
router.use('/books', bookRoutes);
// → /api/books/search → rechercher un livre
```

---

## 📂 STRUCTURE DÉTAILLÉE DU FRONTEND

```
📁 frontend/
   ├── 📁 src/
   │   ├── 📁 lib/
   │   │   ├── 📁 components/        ← Morceaux réutilisables
   │   │   │   ├── Navbar.svelte     ← Barre de navigation en haut
   │   │   │   └── Footer.svelte     ← Pied de page en bas
   │   │   └── config.js             ← Configuration (URL de l'API)
   │   │
   │   ├── 📁 routes/                ← Les PAGES de votre site
   │   │   ├── +layout.svelte        ← Structure commune à toutes les pages
   │   │   ├── +page.svelte          ← Page d'ACCUEIL (/)
   │   │   ├── login/
   │   │   │   └── +page.svelte      ← Page de CONNEXION
   │   │   ├── register/
   │   │   │   └── +page.svelte      ← Page d'INSCRIPTION
   │   │   ├── search/
   │   │   │   └── +page.svelte      ← Page de RECHERCHE de livres
   │   │   ├── my-books/
   │   │   │   └── +page.svelte      ← Page MA BIBLIOTHÈQUE
   │   │   └── book/[id]/
   │   │       └── +page.svelte      ← Page DÉTAIL d'un livre
   │   │
   │   ├── app.html                  ← Template HTML de base
   │   └── app.css                   ← Styles globaux
   │
   ├── .env.example                  ← Exemple de config
   ├── package.json                  ← Liste des outils
   ├── svelte.config.js              ← Config SvelteKit
   ├── tailwind.config.js            ← Config Tailwind CSS
   └── vite.config.js                ← Config Vite (outil de build)
```

---

## 🔍 EXPLICATION DU FRONTEND - FICHIER PAR FICHIER

### 1️⃣ `lib/config.js` - Configuration de l'API

**Rôle :** Centralise l'URL de votre backend

```javascript
// Ligne 8 : L'URL du backend
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
// → Récupère l'URL depuis le fichier .env
// → Si pas définie → utilise http://localhost:3000
// → Comme avoir l'adresse du restaurant dans votre GPS

// Ligne 11-15 : Fonction helper
export const getApiUrl = (endpoint) => {
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_URL}${normalizedEndpoint}`;
};
// → Construit l'URL complète
// → getApiUrl('/api/user-books') → http://localhost:3000/api/user-books
// → Comme ajouter le nom de la rue après l'adresse
```

---

### 2️⃣ `routes/+page.svelte` - Page d'accueil

**Structure d'un fichier Svelte :**
```svelte
<script>
  // JAVASCRIPT - Le cerveau de la page
</script>

<!-- HTML - La structure de la page -->

<style>
  /* CSS - Le design de la page */
</style>
```

**Ligne par ligne :**

```javascript
// Ligne 2-4 : Imports
import { goto } from '$app/navigation';     // ← Outil pour changer de page
import { onMount } from 'svelte';           // ← Fonction qui s'exécute au démarrage
import { getApiUrl } from '$lib/config';    // ← Notre fonction pour l'URL API

// Ligne 7-10 : Variables d'état
let isLoggedIn = $state(false);             // ← Est-ce qu'on est connecté ?
let user = $state(null);                    // ← Infos de l'utilisateur
let stats = $state(null);                   // ← Statistiques de lecture
let loading = $state(true);                 // ← Est-ce qu'on charge les données ?

// Ligne 12-22 : Au démarrage de la page
onMount(async () => {
  const token = localStorage.getItem('token');      // ← Récupère le token
  const userData = localStorage.getItem('user');    // ← Récupère les infos user

  if (token && userData) {           // ← Si on a un token ET des infos user
    isLoggedIn = true;               // → On est connecté !
    user = JSON.parse(userData);     // → Récupère les infos user
    await loadUserData();            // → Charge les statistiques
  } else {
    loading = false;                 // → Pas connecté, arrête de charger
  }
});

// Ligne 24-51 : Charger les données de l'utilisateur
async function loadUserData() {
  try {
    const token = localStorage.getItem('token');

    // Ligne 28-32 : Appel API
    const response = await fetch(getApiUrl('/api/user-books'), {
      headers: {
        'Authorization': `Bearer ${token}`  // ← Envoie le token pour s'authentifier
      }
    });
    // → Va chercher tous VOS livres sur le serveur
    // → Comme demander "montre-moi ma bibliothèque"

    // Ligne 34-43 : Calcul des statistiques
    if (response.ok) {
      const data = await response.json();
      const books = data.data.books || [];

      stats = {
        total: books.length,                                        // ← Nombre total
        to_read: books.filter(b => b.status === 'to_read').length, // ← À lire
        reading: books.filter(b => b.status === 'reading').length, // ← En cours
        read: books.filter(b => b.status === 'read').length        // ← Lus
      };
    }
    // → Compte combien de livres dans chaque catégorie
    // → Comme trier vos livres par étagère
  }
}
```

**HTML (ligne 61-196) :**

```svelte
<!-- Si PAS connecté -->
{#if !isLoggedIn}
  <!-- Affiche la page d'accueil pour visiteurs -->
  <div>
    <h1>Blablabook</h1>
    <p>Votre bibliothèque personnelle en ligne</p>

    <!-- Boutons -->
    <button on:click={() => goto('/register')}>
      Commencer gratuitement
    </button>
    <button on:click={() => goto('/login')}>
      Se connecter
    </button>
  </div>

<!-- Si CONNECTÉ -->
{:else}
  <!-- Affiche les statistiques -->
  <h1>Bonjour {user?.username} !</h1>

  {#if stats}
    <!-- Affiche : Total, À lire, En cours, Lus -->
    <div>Total : {stats.total}</div>
    <div>À lire : {stats.to_read}</div>
    <!-- etc. -->
  {/if}
{/if}
```

---

### 3️⃣ `routes/login/+page.svelte` - Page de connexion

```javascript
// Ligne 5-8 : Variables du formulaire
let username = '';        // ← Ce que vous tapez dans "Nom d'utilisateur"
let password = '';        // ← Ce que vous tapez dans "Mot de passe"
let error = '';           // ← Message d'erreur éventuel
let loading = false;      // ← Est-ce qu'on est en train de se connecter ?

// Ligne 10-45 : Fonction de connexion
async function handleLogin(e) {
  e.preventDefault();     // ← Empêche le rechargement de la page

  // Ligne 13-16 : Vérification basique
  if (!username || !password) {
    error = 'Veuillez remplir tous les champs';
    return;
  }
  // → Si un champ est vide → affiche une erreur

  loading = true;         // ← Affiche un loader
  error = '';             // ← Efface les anciennes erreurs

  try {
    // Ligne 22-28 : Appel API
    const response = await fetch(getApiUrl('/api/auth/login'), {
      method: 'POST',                           // ← Type de requête
      headers: {
        'Content-Type': 'application/json',     // ← Format JSON
      },
      body: JSON.stringify({ username, password })  // ← Envoie username + password
    });
    // → Envoie vos identifiants au serveur
    // → Comme donner votre carte d'identité à la réception

    const data = await response.json();       // ← Récupère la réponse

    // Ligne 32-35 : Si succès
    if (response.ok) {
      localStorage.setItem('token', data.data.token);         // ← Sauvegarde le token
      localStorage.setItem('user', JSON.stringify(data.data.user));  // ← Sauvegarde les infos user
      window.location.href = '/my-books';                     // ← Redirige vers la bibliothèque
    }
    // → Garde le token en mémoire
    // → Vous redirige vers votre bibliothèque

    // Ligne 36-38 : Si erreur
    else {
      error = data.message || 'Erreur de connexion';
    }
    // → Affiche le message d'erreur
  } catch (err) {
    error = 'Erreur de connexion au serveur';
  } finally {
    loading = false;      // ← Enlève le loader
  }
}
```

---

### 4️⃣ `routes/my-books/+page.svelte` - Votre bibliothèque

```javascript
// Ligne 7-10 : Variables
let books = $state([]);              // ← Liste de vos livres
let loading = $state(true);          // ← Chargement en cours ?
let error = $state('');              // ← Message d'erreur
let currentFilter = $state('all');   // ← Filtre actuel (all/to_read/reading/read)

// Ligne 12-18 : Au chargement de la page
onMount(async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    goto('/login');        // ← Si pas de token → redirige vers login
    return;
  }
  await loadBooks();       // ← Charge les livres
});

// Ligne 20-42 : Charger les livres
async function loadBooks() {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(getApiUrl('/api/user-books'), {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    // → Va chercher TOUS vos livres

    if (response.ok) {
      const data = await response.json();
      books = data.data.books || [];    // ← Sauvegarde la liste
    }
  } catch (err) {
    error = 'Erreur lors du chargement';
  } finally {
    loading = false;
  }
}

// Ligne 78-107 : Changer le statut d'un livre
async function updateStatus(userBookId, newStatus) {
  const response = await fetch(getApiUrl(`/api/user-books/${userBookId}`), {
    method: 'PUT',                    // ← Requête de mise à jour
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ status: newStatus })  // ← Nouveau statut
  });
  // → Change le statut du livre (to_read → reading → read)

  if (response.ok) {
    await loadBooks();                // ← Recharge la liste
  }
}

// Ligne 132-159 : Supprimer un livre
async function removeBook(userBookId) {
  const response = await fetch(getApiUrl(`/api/user-books/${userBookId}`), {
    method: 'DELETE',                 // ← Requête de suppression
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  // → Supprime le livre de VOTRE bibliothèque
  // → Le livre reste dans la base pour les autres users

  if (response.ok) {
    books = books.filter(b => b.id !== userBookId);  // ← Enlève de la liste
  }
}
```

---

## 🔄 FLUX D'EXÉCUTION - EXEMPLE CONCRET

### Exemple : Vous voulez ajouter un livre

**Étape 1 : Vous cliquez sur "Ajouter à ma bibliothèque"**

```
FRONTEND (votre navigateur)
   ↓
JavaScript détecte le clic
   ↓
Fonction addToLibrary() s'exécute
   ↓
Prépare les données du livre (titre, auteur, etc.)
```

**Étape 2 : Envoi de la requête au serveur**

```
FRONTEND
   ↓
fetch(getApiUrl('/api/user-books'), { method: 'POST', ... })
   ↓
INTERNET
   ↓
BACKEND (votre serveur sur le port 3000)
```

**Étape 3 : Le serveur traite la requête**

```
BACKEND
   ↓
1. authMiddleware vérifie votre token JWT
   ├─ Si invalide → STOP, erreur 401
   └─ Si valide → Continue
   ↓
2. Route /api/user-books → userBookController.addBook()
   ↓
3. Validation Joi : vérifie les données
   ├─ Si invalides → STOP, erreur 400
   └─ Si valides → Continue
   ↓
4. Book.findOrCreate() : cherche ou crée le livre
   ↓
5. UserBook.findOne() : vérifie que vous ne l'avez pas déjà
   ├─ Si déjà présent → STOP, erreur 409
   └─ Si absent → Continue
   ↓
6. UserBook.create() : ajoute à votre bibliothèque
   ↓
7. Envoie la réponse JSON
```

**Étape 4 : Le frontend reçoit la réponse**

```
BACKEND
   ↓
Réponse JSON avec le livre ajouté
   ↓
INTERNET
   ↓
FRONTEND
   ↓
JavaScript traite la réponse
   ↓
Met à jour l'affichage
   ↓
Vous voyez le livre dans votre liste !
```

---

## 🗄️ BASE DE DONNÉES - EXPLICATION SIMPLE

Votre base de données a **3 tables** :

### Table 1 : USERS (les utilisateurs)

```
┌────┬──────────┬────────────────┬──────────┬────────────┬───────────┐
│ id │ username │ email          │ password │ first_name │ last_name │
├────┼──────────┼────────────────┼──────────┼────────────┼───────────┤
│ 1  │ marie    │ marie@mail.com │ $2b$10.. │ Marie      │ Dupont    │
│ 2  │ paul     │ paul@mail.com  │ $2b$10.. │ Paul       │ Martin    │
└────┴──────────┴────────────────┴──────────┴────────────┴───────────┘
```

### Table 2 : BOOKS (les livres)

```
┌────┬─────────────────┬────────────────────┬─────────────┬────────────────┐
│ id │ open_library_id │ title              │ author      │ published_year │
├────┼─────────────────┼────────────────────┼─────────────┼────────────────┤
│ 1  │ OL123456W       │ Harry Potter       │ J.K. Rowling│ 1997           │
│ 2  │ OL789012W       │ Le Seigneur...     │ Tolkien     │ 1954           │
└────┴─────────────────┴────────────────────┴─────────────┴────────────────┘
```

### Table 3 : USER_BOOKS (qui a quoi)

```
┌────┬─────────┬─────────┬─────────┬────────┬────────────────────┐
│ id │ user_id │ book_id │ status  │ rating │ review             │
├────┼─────────┼─────────┼─────────┼────────┼────────────────────┤
│ 1  │ 1       │ 1       │ read    │ 5.0    │ Génial !           │
│ 2  │ 1       │ 2       │ reading │ null   │ null               │
│ 3  │ 2       │ 1       │ to_read │ null   │ null               │
└────┴─────────┴─────────┴─────────┴────────┴────────────────────┘
```

**Explication :**
- user_id = 1 → Marie
- book_id = 1 → Harry Potter
- Ligne 1 : Marie a lu Harry Potter et l'a noté 5/5
- Ligne 2 : Marie est en train de lire Le Seigneur des Anneaux
- Ligne 3 : Paul veut lire Harry Potter

---

## 🔐 SÉCURITÉ - COMMENT ÇA FONCTIONNE

### 1. Cryptage du mot de passe (bcrypt)

**AVANT (dans votre formulaire) :**
```
password = "monmotdepasse123"
```

**APRÈS (dans la base de données) :**
```
password = "$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"
```

**Pourquoi ?**
- Si quelqu'un vole la base de données, il ne peut pas lire les mots de passe
- C'est impossible de "décrypter" (c'est à sens unique)
- Même vous ne pouvez pas voir le vrai mot de passe

**Comment on vérifie alors ?**
```javascript
bcrypt.compare("monmotdepasse123", "$2b$10$N9q...")  → true
bcrypt.compare("mauvaisMDP", "$2b$10$N9q...")       → false
```

### 2. Token JWT (JSON Web Token)

**Quand vous vous connectez :**
```
Serveur crée un token :
{
  userId: 1,
  username: "marie",
  email: "marie@mail.com"
}
↓
Signé avec une clé secrète
↓
Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Le token est stocké dans votre navigateur :**
```javascript
localStorage.setItem('token', token);
```

**À chaque requête, vous envoyez le token :**
```javascript
headers: {
  'Authorization': 'Bearer eyJhbGciOiJIUzI1...'
}
```

**Le serveur vérifie le token :**
```javascript
jwt.verify(token, secret)  // ← Vérifie qu'il n'a pas été modifié
```

---

## 💡 CONCEPTS CLÉS

### 1. API REST

**C'est quoi ?**
- Une façon de communiquer entre le frontend et le backend
- Utilise HTTP (comme les sites web)

**Les méthodes HTTP :**
- **GET** = Récupérer des données ("montre-moi mes livres")
- **POST** = Créer quelque chose ("ajoute ce livre")
- **PUT** = Modifier quelque chose ("change le statut en 'lu'")
- **DELETE** = Supprimer quelque chose ("enlève ce livre")

### 2. JSON (JavaScript Object Notation)

**C'est quoi ?**
- Un format pour échanger des données
- Ressemble à du JavaScript

**Exemple :**
```json
{
  "title": "Harry Potter",
  "author": "J.K. Rowling",
  "year": 1997
}
```

### 3. Asynchrone (async/await)

**C'est quoi ?**
- Du code qui ne bloque pas le reste
- Utilisé pour les requêtes réseau (qui prennent du temps)

**Exemple :**
```javascript
// SANS async (MAUVAIS - bloque tout)
const data = fetch(...);  // ← Attend la réponse, tout est bloqué

// AVEC async (BON - ne bloque pas)
const data = await fetch(...);  // ← Attend SANS bloquer le reste
```

---

## 📚 RÉCAPITULATIF

**Backend = Le cerveau**
- Gère les données
- Vérifie la sécurité
- Fait les calculs

**Frontend = Le visage**
- Affiche joliment
- Réagit aux clics
- Envoie les requêtes au backend

**Base de données = La mémoire**
- Stocke les utilisateurs
- Stocke les livres
- Stocke les liens entre les deux

**Communication = API REST**
- Frontend → Backend : "Ajoute ce livre"
- Backend → Base de données : "INSERT INTO..."
- Backend → Frontend : "C'est fait !"
- Frontend : Affiche le nouveau livre

---

## ❓ QUESTIONS FRÉQUENTES

**Q : Pourquoi 2 parties (backend + frontend) ?**
R : Pour séparer les responsabilités. Le frontend s'occupe du joli, le backend de la sécurité et des données.

**Q : Pourquoi on crypte les mots de passe ?**
R : Pour que même si quelqu'un vole la base, il ne puisse pas les lire.

**Q : C'est quoi un token JWT ?**
R : C'est comme un badge de sécurité qui prouve que vous êtes connecté.

**Q : Pourquoi on valide les données avec Joi ?**
R : Pour éviter que quelqu'un envoie n'importe quoi et casse l'application.

**Q : findOrCreate(), c'est quoi ?**
R : Une fonction qui cherche quelque chose, et si ça n'existe pas, le crée automatiquement.

---

**Vous avez maintenant une vision complète et simple de votre projet ! 🎉**

