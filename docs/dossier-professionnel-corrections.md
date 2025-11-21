# 📝 CORRECTIONS DOSSIER PROFESSIONNEL - BLABLABOOK

**Date :** 21 novembre 2025
**Candidat :** Sandrine PAYET
**Titre visé :** Développeur Web et Web Mobile

---

## ✅ CORRECTION N°1 : Activité-type 1 - Exemple n°1

### 🔴 Problème : Dates incorrectes
**Ancienne version :** Du : 14/04/2025 au : 17/11/2025

**Correction à appliquer :**

**4. Contexte**
Nom de l'entreprise, organisme ou association  ►	Centre de formation O'clock
Chantier, atelier, service	►	Projet Blablabook
Période d'exercice  	►    Du :	**09/2025**	au :	**11/2025**

---

## ✅ CORRECTION N°2 : Activité-type 1 - Exemple n°3

### 🔴 Problème : Description incorrecte (copier-coller de l'exemple n°1)

**Remplacer TOUTE la section 1 par :**

**Activité-type 1**
**Exemple n°3   ►	Conception UI/UX responsive avec menu burger et charte graphique - Blablabook**

**1. Décrivez les tâches ou opérations que vous avez effectuées, et dans quelles conditions :**

J'ai conçu et développé l'interface utilisateur complète de Blablabook en créant une charte graphique professionnelle v2.0 avec thème "bibliothèque chaleureuse" et un système de navigation responsive avec menu burger animé.

J'ai défini la palette de couleurs complète (thème bois/marron/beige pour le contenu, navbar bleue #1E3A8A moderne) en respectant WCAG 2.1 niveau AA. J'ai choisi les polices Google Fonts (Lobster pour le logo, Satisfy décoratif) et créé 14 wireframes (7 mobile + 7 desktop) pour valider l'architecture avant développement.

Pour la navigation mobile, j'ai développé un menu burger professionnel positionné à droite avec animations CSS (slideInRight, transitions scale, focus states). J'ai implémenté l'overlay semi-transparent avec backdrop-filter blur, les gradients dégradés sur les boutons, et une scrollbar personnalisée pour le menu.

J'ai configuré Tailwind CSS avec toute la palette personnalisée du projet (wood, brown, beige, navy, purple, orange) pour permettre l'utilisation des couleurs via classes utilitaires. J'ai documenté tous les choix de design avec justifications accessibilité.

**Compétences mobilisées :**

• Conception de charte graphique complète (couleurs, typographie, composants)
• Wireframes pour 14 écrans (mobile-first + desktop)
• Choix typographiques (Google Fonts : Lobster, Satisfy)
• Validation accessibilité WCAG 2.1 AA (contraste 5.5:1 texte, 5:1 footer)
• CSS animations professionnelles (@keyframes, transitions, transforms)
• Menu burger responsive avec positionnement fixed et z-index
• Configuration Tailwind avancée (extend colors, fontFamily)
• Responsive design (mobile-first, breakpoints md, lg)
• Documentation technique Markdown
• Tests multi-navigateurs et multi-devices

**2. Précisez les moyens utilisés :**

Technologies : Svelte 5, SvelteKit, HTML5, CSS3 (animations, gradients, flexbox), Tailwind CSS v4, Google Fonts, VS Code, Chrome DevTools (responsive mode), Git

Outils de design : Wireframes ASCII, contraste checker WCAG, ColorZilla

**3. Avec qui avez-vous travaillé ?**

Projet individuel réalisé en autonomie complète. Consultation de la documentation WCAG 2.1, Google Fonts, et Tailwind CSS pour les bonnes pratiques.

**4. Contexte**
Nom de l'entreprise, organisme ou association  ►	Centre de formation O'clock
Chantier, atelier, service	►	Projet Blablabook - Conception UI/UX
Période d'exercice  	►    Du :	09/2025	au :	11/2025

**5. Informations complémentaires (facultatif)**
✅ Charte graphique v2.0 documentée complètement
✅ Menu burger avec 160+ lignes de CSS professionnel
✅ Accessibilité WCAG AA validée sur tous les éléments
✅ 4 commits git sur la branche de développement

---

## ✅ CORRECTION N°3 : Activité-type 2 - Exemple n°2

### 🔴 Problème : Doublon avec l'exemple n°1 (même contenu API JWT)

**Remplacer TOUT l'exemple n°2 par :**

**Activité-type 2**	**Développer la partie back-end d'une application web ou web mobile sécurisée.**

**Exemple n°2   ►	API de gestion de bibliothèque avec système bonus (notation, statut, avis) - Blablabook**

**1. Décrivez les tâches ou opérations que vous avez effectuées, et dans quelles conditions :**

J'ai développé l'API complète de gestion de bibliothèque personnelle avec Express.js : recherche de livres via Google Books API, gestion CRUD de la collection utilisateur, et système bonus (notation 0-5 étoiles, statut de lecture en 4 niveaux, avis personnels).

J'ai créé les routes REST protégées par middleware JWT : recherche externe (GET /api/books/search), consultation bibliothèque (GET /api/my-library), ajout de livres (POST /api/my-library), suppression (DELETE /api/my-library/:id), et mise à jour des métadonnées enrichies (PUT /api/my-library/:id pour rating, status, review).

J'ai intégré l'API externe Google Books avec axios, géré la pagination des résultats, implémenté la déduplication (vérification qu'un livre n'est pas déjà dans la collection), et optimisé les requêtes Sequelize avec eager loading (include: [Book]) pour réduire le nombre d'appels base de données.

Pour le système bonus, j'ai modifié le modèle UserBook en ajoutant les champs rating (INTEGER 0-5), status (ENUM: 'to_read', 'reading', 'read', 'abandoned'), et review (TEXT). Ces fonctionnalités démontrent ma capacité à aller au-delà du MVP initial.

**Compétences mobilisées :**

• API REST complète (GET, POST, PUT, DELETE)
• Intégration API tierce (Google Books API avec axios)
• Middleware d'authentification JWT (verification token)
• Gestion pagination et paramètres de recherche (query params)
• Validation données avec Joi (schémas pour ajout/mise à jour)
• Requêtes Sequelize optimisées (include, where, findOne)
• Gestion erreurs HTTP (codes 200, 201, 400, 401, 404, 500)
• Architecture MVC (séparation controllers/services/models)
• Évolution du schéma base de données (ajout champs bonus)
• Tests API avec Thunder Client

**2. Précisez les moyens utilisés :**

Technologies : Node.js 18+, Express.js 5.x, Sequelize 6.x, PostgreSQL, axios, Joi 18.x, jsonwebtoken, Thunder Client, VS Code

API externe : Google Books API (https://www.googleapis.com/books/v1/volumes)

**3. Avec qui avez-vous travaillé ?**

Projet individuel. Consultation de la documentation Google Books API, Express.js, Sequelize, et recommandations REST API best practices.

**4. Contexte**
Nom de l'entreprise, organisme ou association  ►	Centre de formation O'clock
Chantier, atelier, service	►	Projet Blablabook - API Backend
Période d'exercice  	►    Du :	10/2025	au :	11/2025

**5. Informations complémentaires (facultatif)**
✅ API complètement fonctionnelle et testée
✅ Système bonus (rating, status, review) au-delà du MVP
✅ Intégration Google Books API réussie
✅ Optimisations Sequelize (eager loading)

---

## 📋 RÉSUMÉ DES CORRECTIONS

| Correction | Section | Problème | Action |
|------------|---------|----------|--------|
| **#1** | Activité 1, Ex. 1 | Dates incorrectes | Changer 04/2025 → 09/2025 |
| **#2** | Activité 1, Ex. 3 | Mauvaise description | Remplacer par UI/UX + menu burger |
| **#3** | Activité 2, Ex. 2 | Doublon avec Ex. 1 | Remplacer par API bibliothèque |

---

## ✅ APRÈS CORRECTIONS

Votre dossier professionnel sera :

**Activité-type 1 (Frontend) :**
1. ✅ Système d'authentification (formulaires, validation)
2. ✅ Animation préloader SVG - Stage Digitconseil
3. ✅ Conception UI/UX responsive + menu burger

**Activité-type 2 (Backend) :**
1. ✅ API d'authentification JWT sécurisée
2. ✅ API de gestion bibliothèque + système bonus
3. ✅ Optimisation WordPress + automatisation PHP - Stage

**Résultat :** 6 exemples **uniques et complémentaires** démontrant toutes vos compétences DWWM.

---

## 🎯 PROCHAINES ÉTAPES

1. ✅ Copier-coller les 3 corrections dans votre document Word
2. ✅ Vérifier la mise en page et la cohérence
3. ✅ Ajouter les captures d'écran dans "Documents illustrant la pratique"
4. ✅ Relire l'ensemble du dossier
5. ✅ Imprimer et signer la déclaration sur l'honneur

**Date limite dossier :** 12 novembre 2025
**Examen :** 27 novembre 2025

Bon courage ! 🚀
