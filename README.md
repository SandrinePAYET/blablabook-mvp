# 📚 BLABLABOOK - Bibliothèque Personnelle

> Application web de gestion de bibliothèque personnelle
> Projet individuel réalisé dans le cadre du Titre Professionnel DWWM

---

## 🎯 Présentation

Blablabook est une application web permettant de gérer sa bibliothèque personnelle avec recherche de livres, ajout à sa collection, suivi de lecture et notation.

Les utilisateurs peuvent :
- Rechercher des livres via l'API Open Library
- Ajouter des livres à leur bibliothèque personnelle
- Suivre l'état de lecture (à lire, en cours, lu)
- Noter et laisser des avis sur les livres
- Organiser et consulter leur collection

---

## ✨ Fonctionnalités principales

### 👤 Authentification
- Inscription et connexion sécurisées
- Authentification par JWT (tokens valides 7 jours)
- Protection des routes privées
- Gestion de session côté client

### 🔍 Recherche de livres
- Recherche via API Open Library (base de données de millions de livres)
- Affichage des résultats avec couvertures et métadonnées
- Détails complets : titre, auteur, année, ISBN, nombre de pages, description

### 📚 Gestion de bibliothèque personnelle
- Ajout de livres à ma collection
- Statut de lecture : "à lire", "en cours de lecture", "lu"
- Notation (1 à 5 étoiles)
- Avis personnel (jusqu'à 2000 caractères)
- Consultation et filtrage de ma bibliothèque
- Suppression de livres

### 🎨 Interface utilisateur
- Design responsive (mobile, tablette, desktop)
- Interface moderne avec Tailwind CSS et Flowbite
- Thème chaleureux inspiré du bois et des bibliothèques
- Navigation fluide avec SvelteKit

---

## 🛠️ Stack Technique

### Frontend
- **Framework :** Svelte 5 + SvelteKit 2
- **CSS :** Tailwind CSS 4 + Flowbite
- **Build :** Vite 7
- **Linting :** ESLint + Prettier

### Backend
- **Runtime :** Node.js
- **Framework :** Express 5
- **ORM :** Sequelize 6
- **Validation :** Joi
- **Sécurité :** JWT, bcrypt, Helmet, CORS

### Base de données
- **SGBD :** PostgreSQL
- **Modèle :** 3 tables (users, books, user_books)
- **Relations :** Many-to-many avec métadonnées

### API Externe
- **Open Library API** pour la recherche de livres

---

## 📁 Structure du projet

```
blablabook-mvp/
├── backend/                # API REST Node.js + Express
│   ├── src/
│   │   ├── config/         # Configuration (database)
│   │   ├── models/         # Modèles Sequelize (User, Book, UserBook)
│   │   ├── controllers/    # Logique métier
│   │   ├── routes/         # Routes API
│   │   ├── middleware/     # Middlewares (auth)
│   │   └── server.js       # Point d'entrée
│   ├── .env.example        # Template variables d'environnement
│   └── package.json
│
├── frontend/               # SPA Svelte + SvelteKit
│   ├── src/
│   │   ├── lib/
│   │   │   ├── components/ # Composants réutilisables
│   │   │   └── config.js   # Configuration API
│   │   └── routes/         # Pages (routing SvelteKit)
│   ├── .env.example        # Template variables d'environnement
│   └── package.json
│
└── docs/                   # Documentation complète
    ├── 01-conception/      # Cahier des charges, wireframes
    └── 02-technique/       # MCD, MLD, dictionnaire de données, API
```

---

## 🚀 Installation et démarrage

### Prérequis

- Node.js 18+ et npm
- PostgreSQL 14+

### 1. Cloner le projet

```bash
git clone https://github.com/SandrinePAYET/blablabook-mvp.git
cd blablabook-mvp
```

### 2. Configuration Backend

```bash
cd backend

# Installer les dépendances
npm install

# Créer le fichier .env depuis l'exemple
cp .env.example .env

# Éditer .env avec vos valeurs
# DB_NAME, DB_USER, DB_PASSWORD, JWT_SECRET, etc.
nano .env
```

**Variables d'environnement requises :**
```env
DB_NAME=blablabook
DB_USER=student
DB_PASSWORD=blablabook2025
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=votre_secret_jwt_super_securise
PORT=3000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### 3. Configuration Frontend

```bash
cd ../frontend

# Installer les dépendances
npm install

# Créer le fichier .env depuis l'exemple
cp .env.example .env

# Éditer si nécessaire (par défaut : http://localhost:3000)
nano .env
```

**Variables d'environnement :**
```env
VITE_API_URL=http://localhost:3000
```

### 4. Créer la base de données

```bash
# Se connecter à PostgreSQL
psql -U postgres

# Créer la base de données
CREATE DATABASE blablabook;

# Créer l'utilisateur (optionnel)
CREATE USER student WITH PASSWORD 'blablabook2025';
GRANT ALL PRIVILEGES ON DATABASE blablabook TO student;
```

### 5. Démarrer l'application

**Terminal 1 - Backend :**
```bash
cd backend
npm run dev
# Serveur démarré sur http://localhost:3000
```

**Terminal 2 - Frontend :**
```bash
cd frontend
npm run dev
# Application disponible sur http://localhost:5173
```

### 6. Accéder à l'application

Ouvrez votre navigateur et accédez à : **http://localhost:5173**

---

## 📖 Documentation

### Documentation Technique

- [📊 MCD - Modèle Conceptuel de Données](docs/02-technique/database/mcd.md)
- [🗄️ MLD - Modèle Logique de Données](docs/02-technique/database/mld.md)
- [📖 Dictionnaire de Données](docs/02-technique/database/dictionnaire-donnees.md)
- [🔌 Documentation API](docs/02-technique/api-endpoints.md)

### Documentation Projet

- [📝 Cahier des Charges](docs/01-conception/cahier-des-charges.md)
- [🎨 Wireframes](docs/01-conception/wireframes/)

### Documentation Screenshots

- [📸 Captures d'écran complètes](docs/blablabook-captures/)
- [💻 Captures de code](docs/code-captures/)

---

## 🎓 Compétences démontrées (TP DWWM)

Ce projet couvre les 8 compétences du référentiel DWWM :

### CCP 1 - Front-end

- ✅ **C1 :** Environnement de travail (Svelte 5, SvelteKit, Vite, Tailwind)
- ✅ **C2 :** Maquettage des interfaces (Wireframes, charte graphique)
- ✅ **C3 :** Interfaces statiques (Composants Svelte, HTML/CSS)
- ✅ **C4 :** Interfaces dynamiques (Gestion d'état, appels API, routing)

### CCP 2 - Back-end

- ✅ **C5 :** Base de données relationnelle (PostgreSQL, Sequelize, MCD/MLD)
- ✅ **C6 :** Composants d'accès aux données (Modèles, Migrations, ORM)
- ✅ **C7 :** Composants métier serveur (API REST, JWT, validation)
- ✅ **C8 :** Documentation et déploiement (Documentation complète, README)

---

## 🔒 Sécurité

- Mots de passe hachés avec bcrypt (10 rounds)
- Authentification JWT avec expiration
- Validation des entrées avec Joi
- Protection CORS configurée
- Headers HTTP sécurisés avec Helmet
- Pas de données sensibles dans les réponses

---

## 📊 Statut du projet

- [x] 📋 Cahier des charges complet
- [x] 🎨 Wireframes et design
- [x] 🗃️ Base de données implémentée
- [x] ⚙️ API Backend complète
- [x] 🎨 Interface Frontend responsive
- [x] 🔐 Authentification JWT
- [x] 📚 Gestion de bibliothèque
- [x] 📝 Documentation technique
- [ ] 🚀 Déploiement en production

**Version actuelle :** MVP complet fonctionnel

---

## 🧪 Tests

### Backend

```bash
cd backend
npm run dev    # Démarrage en mode développement avec nodemon
npm start      # Démarrage en production
```

### Frontend

```bash
cd frontend
npm run dev      # Démarrage en mode développement
npm run build    # Build pour production
npm run preview  # Prévisualiser le build
npm run lint     # Linting
npm run format   # Formatage avec Prettier
```

---

## 📝 Notes de version

### Version 2.0 (17 novembre 2025)
- Synchronisation complète de la documentation avec le code
- Ajout de la documentation API complète
- Mise à jour des modèles de données (MCD, MLD, dictionnaire)
- Correction des incohérences critiques
- Externalisation des URLs en variables d'environnement
- Ajout de fichiers .env.example

### Version 1.0 (Date initiale)
- MVP complet avec authentification
- Recherche de livres via Open Library
- Gestion de bibliothèque personnelle
- Interface responsive

---

## 👤 Auteur

**PAYET Sandrine**
Titre Professionnel Développeur Web et Web Mobile

---

## 📅 Projet

- **Début :** Octobre 2024
- **Date limite :** 27 novembre 2024
- **Statut :** En cours de finalisation

---

## 📄 Licence

Ce projet est développé dans un cadre éducatif pour le Titre Professionnel DWWM.

