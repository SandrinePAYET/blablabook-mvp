# 📋 CAHIER DES CHARGES - BLABLABOOK

**Projet :** Blablabook - Gestionnaire de bibliothèque personnelle  
**Version :** 1.0 MVP  
**Date de création :** Septembre 2024  
**Dernière mise à jour :** 6 octobre 2025  
**Porteur du projet :** [PAYET Sandrine]  
**Contexte :** Titre Professionnel Développeur Web et Web Mobile (DWWM)  
**Échéance dossier :** 12 novembre 2025  
**Échéance examen :** 27 novembre 2025  

---

## 📑 TABLE DES MATIÈRES

1. [Présentation générale](#présentation-générale)
2. [Contexte et objectifs](#contexte-et-objectifs)
3. [Périmètre du projet (MVP)](#périmètre-du-projet-mvp)
4. [Spécifications fonctionnelles](#spécifications-fonctionnelles)
5. [Spécifications techniques](#spécifications-techniques)
6. [Architecture de l'application](#architecture-de-lapplication)
7. [Base de données](#base-de-données)
8. [Sécurité](#sécurité)
9. [Accessibilité](#accessibilité)
10. [Planning et jalons](#planning-et-jalons)
11. [Critères de réussite](#critères-de-réussite)
12. [Compétences DWWM démontrées](#compétences-dwwm-démontrées)

---

## 📖 1. PRÉSENTATION GÉNÉRALE

### 1.1 Description du projet

Blablabook est une application web permettant aux passionnés de lecture de gérer leur bibliothèque personnelle de manière simple et efficace.

**En bref :**

- Rechercher des livres via une API externe
- Ajouter des livres à sa collection personnelle
- Consulter et organiser sa bibliothèque
- Interface moderne et responsive

### 1.2 Problématique

**Constats :**

- Les lecteurs possèdent de nombreux livres
- Difficile de se souvenir de tous les livres lus
- Pas d'outil simple pour gérer sa bibliothèque
- Les solutions existantes sont complexes ou payantes

**Solution apportée :**
Une application web gratuite, simple et intuitive pour gérer sa collection de livres.

### 1.3 Valeur ajoutée

- ✅ Interface simple et épurée
- ✅ Recherche rapide via API externe (Open Library)
- ✅ Accès depuis n'importe quel appareil (responsive)
- ✅ Données sécurisées (authentification JWT)
- ✅ Gratuit et sans publicité

---

## 🎯 2. CONTEXTE ET OBJECTIFS

### 2.1 Contexte du projet

**Projet individuel** réalisé dans le cadre du **Titre Professionnel DWWM**.

**Contraintes :**

- Réalisation en parallèle d'un stage professionnel
- Délai serré : 6 semaines de développement effectif
- Dossier professionnel à rendre le 12 novembre 2025
- Examen le 27 novembre 2025

**Particularités :**

- Développement en autonomie complète
- Choix techniques personnels et justifiés
- Documentation intégrale du processus

### 2.2 Objectifs du projet

**Objectif principal :**
Démontrer la maîtrise des 8 compétences du référentiel DWWM à travers un projet concret et fonctionnel.

**Objectifs pédagogiques :**

- Concevoir une application de A à Z
- Appliquer les bonnes pratiques de développement
- Utiliser des technologies modernes
- Documenter professionnellement
- Gérer un projet sous contraintes temporelles

**Objectifs techniques :**

- Application full-stack fonctionnelle
- Authentification sécurisée
- Base de données relationnelle
- Interface responsive
- Code propre et commenté

---

## 🎯 3. PÉRIMÈTRE DU PROJET (MVP)

### 3.1 Version MVP (Minimum Viable Product)

Le projet se concentre sur les **fonctionnalités essentielles** pour valider le concept et démontrer les compétences DWWM.

### 3.2 Fonctionnalités INCLUSES

#### 🔐 Module 1 : Authentification

- Inscription avec validation des données
- Connexion sécurisée (JWT)
- Déconnexion
- Protection des routes privées

#### 🔍 Module 2 : Recherche de livres

- Recherche par titre, auteur ou ISBN
- Affichage des résultats avec couvertures
- Détails complets du livre (auteur, date, résumé)
- Pagination des résultats

#### 📚 Module 3 : Gestion de bibliothèque

- Ajouter un livre à ma collection
- Consulter ma liste de livres
- Voir les détails d'un livre de ma collection
- Supprimer un livre de ma collection

#### 📱 Module 4 : Interface utilisateur

- Design moderne et épuré
- Responsive (mobile, tablette, desktop)
- Navigation intuitive
- Feedback utilisateur (messages de succès/erreur)

#### 👤 Module 5 : Profil utilisateur

- Voir mon profil
- Nombre de livres dans ma bibliothèque
- Statistiques simples

#### 🗃️ Module 6 : Base de données

- Stockage sécurisé des utilisateurs
- Stockage des livres
- Relations utilisateur-livres

### 3.3 Fonctionnalités EXCLUES (hors MVP)

Pour respecter le délai, ces fonctionnalités ne seront **pas développées** :

- ❌ Système de notation des livres
- ❌ Commentaires et avis
- ❌ Partage social (amis, publications)
- ❌ Listes de lecture personnalisées
- ❌ Recommandations algorithmiques
- ❌ Import/Export de données
- ❌ Mode hors ligne (PWA)
- ❌ Chat ou messagerie

**Note :** Ces fonctionnalités pourront être mentionnées comme **évolutions possibles** lors de la présentation au jury.

---

## ⚙️ 4. SPÉCIFICATIONS FONCTIONNELLES

### 4.1 Acteurs du système

**Acteur principal : L'utilisateur**

**Profil type (persona) :**

- **Nom :** Marie
- **Âge :** 25-40 ans
- **Profession :** Employée de bureau / Étudiante
- **Passions :** Lecture, organisation
- **Besoins :**
  - Gérer sa collection de livres
  - Se souvenir des livres lus
  - Trouver rapidement un livre
  - Accéder depuis son téléphone ou ordinateur

### 4.2 User Stories détaillées

#### Authentification

**US-001 : Inscription**

En tant que visiteur,
Je veux pouvoir créer un compte,
Afin de gérer ma bibliothèque personnelle.

Critères d'acceptation :

- Email valide requis
- Mot de passe sécurisé (min 8 caractères)
- Message de confirmation
- Redirection vers la page de connexion

**US-002 : Connexion**

En tant qu'utilisateur,
Je veux pouvoir me connecter,
Afin d'accéder à ma bibliothèque.

Critères d'acceptation :

- Email et mot de passe requis
- Validation côté client et serveur
- Token JWT généré
- Redirection vers l'accueil
- Session maintenue

**US-003 : Déconnexion**

En tant qu'utilisateur connecté,
Je veux pouvoir me déconnecter,
Afin de sécuriser mon compte.

Critères d'acceptation :

- Bouton visible dans le menu
- Token supprimé
- Redirection vers la page d'accueil publique


#### Recherche de livres

**US-004 : Rechercher un livre**

En tant qu'utilisateur connecté,
Je veux pouvoir rechercher des livres,
Afin de trouver des livres à ajouter à ma collection.

Critères d'acceptation :

- Barre de recherche visible
- Recherche par titre, auteur ou ISBN
- Résultats affichés avec couverture
- Minimum 10 résultats par page
- Gestion du cas "aucun résultat"

**US-005 : Voir les détails d'un livre**

En tant qu'utilisateur,
Je veux voir les informations complètes d'un livre,
Afin de décider si je veux l'ajouter.

Critères d'acceptation :

- Couverture en grand format
- Titre, auteur, année de publication
- Résumé / description
- ISBN si disponible
- Bouton "Ajouter à ma bibliothèque"


#### Gestion de bibliothèque

**US-006 : Ajouter un livre**


En tant qu'utilisateur,
Je veux ajouter un livre à ma bibliothèque,
Afin de construire ma collection.

Critères d'acceptation :

- Bouton "Ajouter" visible
- Confirmation visuelle de l'ajout
- Pas de doublon possible
- Livre visible dans ma bibliothèque

**US-007 : Consulter ma bibliothèque**

En tant qu'utilisateur,
Je veux voir tous mes livres,
Afin de consulter ma collection.

Critères d'acceptation :

- Liste de tous mes livres
- Affichage en grille avec couvertures
- Titre et auteur visibles
- Responsive (adapté mobile)

**US-008 : Supprimer un livre**

En tant qu'utilisateur,
Je veux pouvoir retirer un livre,
Afin de gérer ma collection.

Critères d'acceptation :

- Bouton de suppression visible
- Confirmation avant suppression
- Message de succès
- Livre immédiatement retiré de l'affichage

#### Profil

**US-009 : Consulter mon profil**


En tant qu'utilisateur,
Je veux voir mon profil,
Afin de consulter mes informations.

Critères d'acceptation :

- Email affiché
- Nombre de livres dans ma bibliothèque
- Date d'inscription
- Interface propre et lisible



### 4.3 Parcours utilisateur type

**Scénario complet : Premier ajout d'un livre**

1. **Arrivée sur le site** → Page d'accueil publique
2. **Inscription** → Formulaire → Compte créé
3. **Connexion** → Email + mot de passe → Accès à l'espace personnel
4. **Recherche** → "Harry Potter" → Liste de résultats
5. **Sélection** → Clic sur un livre → Page détail
6. **Ajout** → Bouton "Ajouter" → Confirmation
7. **Consultation** → Menu "Ma bibliothèque" → Livre visible
8. **Déconnexion** → Bouton "Déconnexion" → Retour accueil

---

## 🛠️ 5. SPÉCIFICATIONS TECHNIQUES

### 5.1 Stack technologique

#### Frontend

**Framework : Svelte 5 (+ SvelteKit)**

**Justification :**
- Moderne et performant
- Courbe d'apprentissage douce
- Moins de code que React
- Compilation optimisée
- Parfait pour un projet MVP

**Librairies CSS :**
- **Tailwind CSS** → Utility-first, rapide à implémenter
- **Flowbite** → Composants Svelte prêts à l'emploi

**Autres dépendances :**
- `axios` → Appels API
- `svelte-routing` → Navigation

#### Backend

**Runtime : Node.js (v18+)**

**Framework : Express.js**

**Justification :**
- Standard de l'industrie
- Simple et flexible
- Grande communauté
- Documentation complète

**ORM : Sequelize**

**Justification :**
- Facilite les requêtes SQL
- Migrations de base de données
- Support PostgreSQL excellent
- Validation intégrée

**Librairies principales :**
- `jsonwebtoken` → Authentification JWT
- `bcrypt` → Hachage des mots de passe
- `joi` → Validation des données
- `helmet` → Sécurité headers HTTP
- `cors` → Gestion Cross-Origin
- `dotenv` → Variables d'environnement

#### Base de données

**SGBD : PostgreSQL 14+**

**Justification :**
- Robuste et fiable
- Open source
- Très utilisé en entreprise
- Relationnel (adapté au projet)
- Bon support par Sequelize

#### API externe

**Open Library API**

**URL :** `https://openlibrary.org/api`

**Justification :**
- Gratuite et sans clé API
- Millions de livres référencés
- Couvertures disponibles
- Documentation claire
- Fiable

#### Outils de développement

- **Git** → Versioning
- **GitHub** → Hébergement du code
- **VS Code** → Éditeur de code
- **Postman** → Tests API
- **pgAdmin** → Gestion PostgreSQL

### 5.2 Architecture logicielle

**Pattern : MVC (Model-View-Controller)**

Frontend (View)
↓
API REST (Controller)
↓
Backend Logic (Controller)
↓
Database (Model)

**Séparation claire :**
- **Frontend** → Présentation et interaction utilisateur
- **Backend** → Logique métier et gestion des données
- **Base de données** → Persistance des données

### 5.3 API REST

**Format : JSON**

**Endpoints prévus :**

#### Authentification

POST /api/auth/register     → Inscription
POST /api/auth/login        → Connexion
POST /api/auth/logout       → Déconnexion
GET  /api/auth/me           → Profil utilisateur

#### Livres

GET /api/books/search?q=harry → Recherche via API externe GET /api/books/my-library → Ma bibliothèque POST /api/books/my-library → Ajouter un livre DELETE /api/books/my-library/:id → Supprimer un livre GET /api/books/:id → Détails d'un livre

**Codes de statut HTTP :**
- `200` → Succès
- `201` → Création réussie
- `400` → Erreur de requête (validation)
- `401` → Non authentifié
- `404` → Non trouvé
- `500` → Erreur serveur

---

## 🏗️ 6. ARCHITECTURE DE L'APPLICATION

### 6.1 Structure des dossiers

blablabook-mvp/
├── frontend/
│   ├── src/
│   │   ├── routes/              # Pages Svelte
│   │   ├── lib/                 # Composants réutilisables
│   │   ├── stores/              # State management
│   │   └── utils/               # Fonctions utilitaires
│   ├── static/                  # Assets statiques
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── models/              # Modèles Sequelize
│   │   ├── controllers/         # Logique métier
│   │   ├── routes/              # Routes Express
│   │   ├── middleware/          # Middlewares (auth, etc.)
│   │   ├── config/              # Configuration
│   │   └── utils/               # Fonctions utilitaires
│   ├── server.js                # Point d'entrée
│   └── package.json
│
├── database/
│   ├── migrations/              # Migrations Sequelize
│   └── seeders/                 # Données de test
│
└── docs/                        # Documentation
├── 00-session-recap/
├── 01-conception/
├── 02-technique/
├── 03-tests/
└── 04-deploiement/

### 6.2 Flux de données

**Exemple : Ajout d'un livre**

1. Utilisateur clique "Ajouter" (Frontend) ↓
2. Requête POST /api/books/my-library (Frontend → Backend) ↓
3. Middleware d'authentification (vérifie JWT) ↓
4. Validation des données (Joi) ↓
6. Controller ajoute en base de données (Sequelize) ↓
7. Réponse JSON 201 Created (Backend → Frontend) ↓
8. Mise à jour de l'interface (Frontend) ↓
9. Message de succès affiché

---

## 🗄️ 7. BASE DE DONNÉES

### 7.1 Modèle Conceptuel de Données (MCD)

**Entités principales :**

#### User (Utilisateur)
- id (PK)
- email
- password (haché)
- createdAt
- updatedAt

#### Book (Livre)
- id (PK)
- openLibraryId (identifiant API externe)
- title
- author
- publishedDate
- coverUrl
- description
- isbn
- createdAt
- updatedAt

#### UserBook (Relation N:N)
- id (PK)
- userId (FK → User)
- bookId (FK → Book)
- addedAt

### 7.2 Schéma relationnel
```sql
User (1) ←→ (N) UserBook (N) ←→ (1) Book

Relations :

Un utilisateur peut avoir plusieurs livres
Un livre peut appartenir à plusieurs utilisateurs
Table de liaison : UserBook
7.3 Exemple de requêtes SQL
Récupérer la bibliothèque d'un utilisateur :

SELECT 
    b.id, 
    b.title, 
    b.author, 
    b.coverUrl,
    ub.addedAt
FROM UserBook ub
JOIN Book b ON ub.bookId = b.id
WHERE ub.userId = ?
ORDER BY ub.addedAt DESC;

🔒 8. SÉCURITÉ
8.1 Authentification
JWT (JSON Web Token)

Fonctionnement :

1. L'utilisateur se connecte (email + password)
2. Le serveur vérifie les identifiants
3. Si OK → Génération d'un JWT signé
4. Le token est renvoyé au frontend
5. Le frontend stocke le token (localStorage)
6. Chaque requête inclut le token dans les headers
7. Le serveur vérifie le token à chaque requête

Structure du token :

{
  "userId": "123",
  "email": "user@example.com",
  "iat": 1696608000,
  "exp": 1696694400
}

8.2 Protection des mots de passe
bcrypt

Processus :

1. L'utilisateur saisit son mot de passe
2. Le serveur le hache avec bcrypt (10 rounds)
3. Le hash est stocké en base (jamais le mot de passe clair)
4. À la connexion : comparaison du hash

Exemple :
// Inscription
const hashedPassword = await bcrypt.hash(password, 10);

// Connexion
const isValid = await bcrypt.compare(password, hashedPassword);

8.3 Validation des données
Joi

Exemples de validation :
// Inscription
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

// Ajout d'un livre
const addBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  openLibraryId: Joi.string().required()
});

8.4 Sécurité HTTP
Helmet.js

Headers sécurisés :

- Content-Security-Policy
- X-Frame-Options (protection contre clickjacking)
- X-Content-Type-Options (prévention MIME sniffing)
- Strict-Transport-Security (force HTTPS)

8.5 Protection CORS
Configuration :

// Uniquement le frontend autorisé
cors({
  origin: 'http://localhost:5173',
  credentials: true
});

8.6 Autres mesures de sécurité
- ✅ Rate limiting (limitation des requêtes)
- ✅ Sanitization des entrées utilisateur
- ✅ Gestion des erreurs sans fuite d'information
- ✅ Logs sécurisés (pas de données sensibles)
- ✅ Variables d'environnement (.env) pour secrets

♿ 9. ACCESSIBILITÉ
9.1 Standards respectés
- WCAG 2.1 niveau AA
- RGAA 4.1 (Référentiel Général d'Amélioration de l'Accessibilité)

9.2 Mesures d'accessibilité
HTML sémantique :
<header>, <nav>, <main>, <section>, <article>, <footer>

Contrastes de couleurs :
- Ratio minimum 4.5:1 (texte normal)
- Ratio minimum 3:1 (texte large)

Navigation au clavier :
- Tous les éléments interactifs accessibles au Tab
- Focus visible sur tous les éléments
- Pas de piège au clavier

Labels et ARIA :
<label for="email">Email</label>
<input id="email" type="email" aria-required="true">

<button aria-label="Ajouter à ma bibliothèque">
  <svg aria-hidden="true">...</svg>
</button>

Images alternatives :
<img src="cover.jpg" alt="Couverture du livre Harry Potter">

Messages d'erreur :
<input aria-invalid="true" aria-describedby="error-email">
<span id="error-email" role="alert">L'email est invalide</span>

📅 10. PLANNING ET JALONS
10.1 Planning révisé (octobre-novembre 2025)
Contexte : En parallèle du stage

Semaine 1 (7-13 octobre) - Fondations
 Installation PostgreSQL
 Configuration backend (Express + Sequelize)
 Modèles de base de données (User, Book, UserBook)
 Migrations Sequelize
 Structure frontend Svelte
Livrable : Base de données opérationnelle + structure projet

Semaine 2 (14-20 octobre) - Authentification
 API authentification (register, login, logout)
 JWT implémenté
 Middleware d'authentification
 Pages inscription/connexion frontend
 Tests manuels authentification
Livrable : Système d'authentification complet

Semaine 3 (21-27 octobre) - Bibliothèque
 API recherche livres (Open Library)
 API CRUD bibliothèque
 Pages frontend recherche + résultats
 Page ma bibliothèque
 Ajout/suppression de livres
Livrable : Fonctionnalités principales opérationnelles

Semaine 4 (28 oct - 3 nov) - Finitions
 Page détail livre
 Page profil utilisateur
 Design responsive complet
 Validation et messages d'erreur
 Sécurité (Helmet, validation Joi)
Livrable : Application MVP complète

Semaine 5 (4-10 novembre) - Tests & Documentation
 Tests manuels exhaustifs
 Corrections des bugs
 Screenshots et captures
 Export schéma BDD
 Documentation technique finale
Livrable : Application testée + supports pour dossier

10-12 novembre - Dossier Professionnel
 Rédaction du dossier complet
 Mapping projet ↔ 8 compétences DWWM
 Intégration des captures d'écran
 Relecture et corrections
 REMISE DU DOSSIER
Livrable : Dossier professionnel complet

13-27 novembre - Préparation oral
 Relecture du dossier
 Préparation présentation (15-20 min)
 Anticipation questions jury
 Entraînement oral
Livrable : Présentation prête pour l'examen

10.2 Charge de travail estimée
Total : ~60-70 heures sur 6 semaines

Répartition :

Conception & Documentation : 10h (déjà fait en partie)
Backend : 20h
Frontend : 20h
Tests & Debug : 10h
Dossier professionnel : 15h
Préparation oral : 5h
Moyenne : 10-12h par semaine Contrainte : En parallèle du stage (soirs/weekends)

✅ 11. CRITÈRES DE RÉUSSITE
11.1 Critères fonctionnels
L'application doit permettre de :

 S'inscrire et se connecter
 Rechercher des livres
 Ajouter des livres à sa bibliothèque
 Consulter sa bibliothèque
 Supprimer des livres
 Voir son profil
11.2 Critères techniques
 Application full-stack fonctionnelle
 Base de données relationnelle avec migrations
 API REST documentée
 Authentification JWT sécurisée
 Interface responsive (mobile, tablette, desktop)
 Code commenté et propre
 Versioning Git avec commits réguliers
11.3 Critères pédagogiques (DWWM)
 Les 8 compétences du référentiel sont démontrées
 Documentation professionnelle complète
 Choix techniques justifiés
 Gestion autonome du projet
 Respect des délais
11.4 Critères de qualité
 Pas de bugs bloquants
 Temps de réponse < 1 seconde
 Interface intuitive
 Messages d'erreur clairs
 Respect des standards web (HTML5, CSS3)
 Accessibilité niveau AA
🎓 12. COMPÉTENCES DWWM DÉMONTRÉES
Ce projet couvre l'intégralité du référentiel du Titre Professionnel DWWM.

CCP 1 : Développer la partie front-end d'une application web ou web mobile sécurisée
Compétence 1 : Installer et configurer son environnement de travail
Démonstration dans Blablabook :

Installation de Node.js, npm, Git
Configuration de VS Code avec extensions
Installation de Svelte + Vite
Configuration Tailwind CSS + Flowbite
Gestion des dépendances (package.json)
Preuves :

Fichiers de configuration (vite.config.js, tailwind.config.js)
Liste des extensions VS Code
Screenshots de l'environnement
Compétence 2 : Maquetter des interfaces utilisateur
Démonstration dans Blablabook :

Wireframes des 7 écrans principaux
Charte graphique (couleurs, typographies)
Composants UI documentés
Respect des principes UX
Preuves :

Wireframes (docs/01-conception/)
Charte graphique
Captures de l'interface finale
Compétence 3 : Réaliser des interfaces utilisateur statiques
Démonstration dans Blablabook :

Intégration HTML/CSS avec Svelte
Composants réutilisables (Button, Card, Input)
Layout responsive avec Tailwind
Structure sémantique (header, nav, main, footer)
Preuves :

Code source frontend (composants .svelte)
Screenshots responsive (mobile, tablette, desktop)
Validation HTML5
Compétence 4 : Développer la partie dynamique des interfaces utilisateur
Démonstration dans Blablabook :

Gestion d'état avec Svelte stores
Formulaires interactifs avec validation
Appels API (fetch/axios)
Routage SvelteKit
Gestion des erreurs côté client
Preuves :

Code source avec logique métier frontend
Démonstration des interactions (vidéo/GIF)
Gestion d'état documentée
CCP 2 : Développer la partie back-end d'une application web ou web mobile sécurisée
Compétence 5 : Mettre en place une base de données relationnelle
Démonstration dans Blablabook :

Installation PostgreSQL
Création du schéma (MCD/MLD)
Tables User, Book, UserBook
Relations 1:N et N:N
Migrations Sequelize
Preuves :

Schéma de base de données
Fichiers de migration
Export de la structure (pg_dump)
Screenshots pgAdmin
Compétence 6 : Développer des composants d'accès aux données
Démonstration dans Blablabook :

Modèles Sequelize (User, Book, UserBook)
Requêtes SQL via ORM
Relations entre modèles (associations)
Transactions
Gestion des erreurs
Preuves :

Code source des modèles
Exemples de requêtes
Tests des opérations CRUD
Compétence 7 : Développer des composants métier côté serveur
Démonstration dans Blablabook :

API REST avec Express
Controllers avec logique métier
Authentification JWT
Validation avec Joi
Middleware personnalisés
Gestion des erreurs
Appel API externe (Open Library)
Preuves :

Code source backend
Documentation API (endpoints)
Tests avec Postman
Gestion de la sécurité
Compétence 8 : Documenter le déploiement d'une application dynamique
Démonstration dans Blablabook :

README complet avec instructions
Guide d'installation (prérequis, étapes)
Variables d'environnement (.env.example)
Scripts npm (start, dev, build)
Documentation technique complète
Ce cahier des charges
Preuves :

README.md détaillé
Guide de déploiement (docs/04-deploiement/)
Procédures d'installation testées
Dossier professionnel complet
📝 CONCLUSION
Ce cahier des charges définit le périmètre, les spécifications et le planning du projet Blablabook.

Objectif final : Une application web fonctionnelle démontrant la maîtrise des 8 compétences DWWM, réalisée en autonomie dans un délai contraint.

Prochaines étapes :

Développement selon le planning défini
Documentation continue (carnet de bord)
Tests réguliers
Préparation du dossier professionnel