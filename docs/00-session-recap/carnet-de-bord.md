
# 📔 CARNET DE BORD - PROJET BLABLABOOK

**Date de début :** Septembre 2024  
**Mise à jour actuelle :** 6 octobre 2025  
**Contexte :** Titre Professionnel DWWM  
**Dossier à rendre :** 12 novembre 2025  
**Examen :** 27 novembre 2025  
**Type de projet :** Individuel  
**Statut :** En stage + développement parallèle  

---

## 🎯 OBJECTIF DU PROJET

Créer une application web de gestion de bibliothèque personnelle pour démontrer les 8 compétences du référentiel DWWM.

---

## ⏰ SITUATION ACTUELLE (6 OCTOBRE 2025)

**Temps restant :**
- 5 semaines jusqu'à la remise du dossier
- 7 semaines jusqu'à l'examen

**Contraintes :**
- Stage en cours (journées occupées)
- Développement sur soirs/weekends
- Timeline serrée

**État d'avancement :**
- Documentation : En cours
- Conception : Partiellement fait
- Développement : À intensifier
- Tests : À prévoir

---

## 🛠️ CE QUI A ÉTÉ MIS EN PLACE

### ✅ Structure du projet

**Arborescence créée :**

blablabook-mvp/
├── docs/
│   ├── 00-session-recap/      ← Nouveau ! (6 oct 2025)
│   ├── 01-conception/
│   ├── 02-technique/
│   ├── 03-tests/
│   └── 04-deploiement/
├── frontend/
├── backend/
└── database/


**Pourquoi cette structure ?**
- Organisation professionnelle
- Documentation séparée du code
- Facile à naviguer pour le jury

### ✅ Gestion de version (Git)

**Branches créées :**
- `develop` → Branche principale de développement
- `feature/conception-wireframes` → Pour les maquettes
- `feature/documentation` → Pour la documentation (actuelle)

**Workflow mis en place :**
- Commits réguliers avec messages clairs
- Une branche par fonctionnalité
- Format de message : `type: description`

**Commits réalisés à ce jour :**

74a1022 docs: ajout fonctionnalités MVP et compétences DWWM dans README
a388472 🎉 Initial commit: Structure projet Blablabook


### ✅ Documentation réalisée

**Fichiers créés (octobre 2025) :**
1. **README.md** → Présentation complète du projet
2. **cahier-des-charges.md** → Plan détaillé
3. **carnet-de-bord.md** → Ce fichier (suivi quotidien)

**Contenu documenté :**
- Fonctionnalités MVP (6 essentielles)
- Technologies choisies et justifiées
- Compétences DWWM couvertes
- Planning prévisionnel ajusté

---

## 💡 DÉCISIONS TECHNIQUES PRISES

### **Stack technologique choisie**

**Frontend :**
- **Svelte 5** → Framework moderne et léger
- **Tailwind CSS** → Styles rapides et responsive
- **Flowbite** → Composants prêts à l'emploi

**Pourquoi ?**
- Svelte est rapide et simple à apprendre
- Tailwind = Pas besoin d'écrire beaucoup de CSS
- Flowbite = Gain de temps avec composants prêts

**Backend :**
- **Node.js** → JavaScript partout
- **Express** → Simple et efficace
- **Sequelize** → ORM pour base de données

**Pourquoi ?**
- Un seul langage (JavaScript front + back)
- Express est le standard de l'industrie
- Sequelize simplifie les requêtes SQL

**Base de données :**
- **PostgreSQL** → Robuste et professionnel

**Pourquoi ?**
- Gratuit et open source
- Très utilisé en entreprise
- Fiable et performant

**Sécurité :**
- **JWT** → Authentification sécurisée
- **Joi** → Validation des données
- **Helmet** → Protection des headers

**Pourquoi ?**
- JWT est le standard moderne
- Joi empêche les erreurs de saisie
- Helmet protège automatiquement

### **Scope MVP défini**

**Fonctionnalités INCLUSES :**
1. 🔐 Authentification (inscription/connexion JWT)
2. 🔍 Recherche de livres (API externe)
3. 📚 Gestion bibliothèque (CRUD complet)
4. 📱 Interface responsive
5. 🗃️ Base de données relationnelle
6. 📖 Documentation technique complète

**Fonctionnalités EXCLUES (par manque de temps) :**
- ❌ Commentaires et avis
- ❌ Système social (amis, partage)
- ❌ Notation de livres
- ❌ Chat/messagerie

**Pourquoi ce choix ?**
- Temps très limité (stage + développement)
- Focus sur les 8 compétences DWWM obligatoires
- MVP fonctionnel et complet pour le jury
- Possibilité d'extension mentionnée pour l'oral

---

## 📚 APPRENTISSAGES ET COMPÉTENCES

### **Méthodologie de projet**

**Ce que j'ai appris :**
- Structurer un projet professionnel de A à Z
- Écrire un cahier des charges complet
- Planifier avec contraintes réelles (stage)
- Utiliser Git de façon professionnelle
- Gérer les priorités sous pression

**Difficultés rencontrées :**
- Comprendre le système de branches Git
- Choisir parmi plusieurs technologies
- Définir un scope réaliste avec peu de temps
- Travailler sur le projet pendant le stage

**Solutions trouvées :**
- Explications simples et visuelles pour Git
- Comparaison méthodique des technologies
- MVP minimal mais complet
- Sessions courtes mais régulières (2h le soir)

### **Compétences techniques développées**

**Git et versioning :**
- Créer et gérer des branches
- Faire des commits propres et réguliers
- Comprendre le workflow professionnel
- Résoudre les conflits

**Documentation :**
- Rédiger clairement pour le jury
- Structurer l'information logiquement
- Utiliser Markdown efficacement
- Adapter le langage (dyslexie-friendly)

**Organisation :**
- Créer une arborescence logique
- Séparer code et documentation
- Nommer les fichiers correctement
- Gérer son temps efficacement

---

## 🔄 CE QUE JE REFERAIS DIFFÉREMMENT

### **Si je recommençais :**

**1. Commencer BEAUCOUP plus tôt**
- Ne pas attendre octobre pour intensifier
- Avoir un prototype dès septembre
- Anticiper les imprévus (stage, fatigue)

**2. Simplifier encore plus le scope**
- Peut-être seulement 4 fonctionnalités
- Focus maximum sur la qualité
- Mieux vaut petit et parfait que gros et moyen

**3. Documenter PENDANT le développement**
- Ne pas séparer code et documentation
- Écrire pendant que c'est frais en mémoire
- Screenshots au fur et à mesure

**4. Faire des tests unitaires dès le début**
- Tester chaque fonctionnalité immédiatement
- Ne pas tout tester à la fin
- Moins de stress avant la remise

**5. Prévoir plus de temps pour le dossier**
- Ne pas sous-estimer la rédaction
- Commencer le dossier plus tôt
- Faire relire par quelqu'un

---

## 🚀 PLANNING RÉVISÉ (URGENT - OCT/NOV 2025)

### **📅 Semaine 1 (7-13 octobre) - BASES**
**Priorité : Fonctionnalités essentielles**

- [ ] Base de données PostgreSQL installée et configurée
- [ ] Modèles Sequelize créés (User, Book)
- [ ] API backend : routes authentification
- [ ] Frontend Svelte : structure de base
- [ ] 3-4 commits minimum

**Temps estimé :** 10-12h réparties sur la semaine

---

### **📅 Semaine 2 (14-20 octobre) - AUTHENTIFICATION**
**Priorité : Login/Register fonctionnels**

- [ ] JWT implémenté côté backend
- [ ] Pages inscription/connexion frontend
- [ ] Validation des formulaires (Joi)
- [ ] Tests manuels complets
- [ ] 3-4 commits minimum

**Temps estimé :** 10-12h

---

### **📅 Semaine 3 (21-27 octobre) - BIBLIOTHÈQUE**
**Priorité : CRUD des livres**

- [ ] Recherche via API externe (Open Library)
- [ ] Ajout livre à la bibliothèque
- [ ] Affichage liste des livres
- [ ] Suppression de livres
- [ ] 4-5 commits minimum

**Temps estimé :** 12-15h

---

### **📅 Semaine 4 (28 oct - 3 nov) - FINITIONS**
**Priorité : Responsive + Sécurité**

- [ ] Interface responsive (mobile, tablette, desktop)
- [ ] Helmet et sécurité backend
- [ ] Messages d'erreur utilisateur
- [ ] Dernières corrections
- [ ] 3-4 commits minimum

**Temps estimé :** 10h

---

### **📅 Semaine 5 (4-10 novembre) - TESTS & CAPTURES**
**Priorité : Préparer le dossier**

- [ ] Tests complets de toutes les fonctionnalités
- [ ] Corrections des derniers bugs
- [ ] Screenshots de l'application
- [ ] Screenshots du code important
- [ ] Export schéma base de données
- [ ] Commit final

**Temps estimé :** 8-10h

---

### **📅 10-12 novembre - DOSSIER PROFESSIONNEL**
**DEADLINE CRITIQUE**

- [ ] Remplir le dossier pour les 8 compétences
- [ ] Relier Blablabook à chaque compétence
- [ ] Ajouter les captures d'écran
- [ ] Expliquer les choix techniques
- [ ] Relecture complète
- [ ] **RENDRE LE DOSSIER**

**Temps nécessaire :** 15-20h sur 3 jours

---

### **📅 13-27 novembre - PRÉPARATION ORAL**

- [ ] Relire le dossier
- [ ] Préparer la présentation (15-20 min)
- [ ] Anticiper les questions du jury
- [ ] S'entraîner à l'oral
- [ ] Repos avant l'examen !

---

## ❓ POINTS BLOQUANTS ACTUELS

### **Bloquants identifiés (6 octobre) :**

1. **Temps limité** ⚠️
   - Stage toute la journée
   - Seulement soirs/weekends disponibles
   - Fatigue à gérer

2. **Pression temporelle** ⚠️
   - 5 semaines seulement
   - Beaucoup à faire
   - Risque de stress

3. **Questions techniques en suspens :**
   - Quelle API de livres exactement ? (Open Library ?)
   - Où héberger pour la démo ? (localhost OK ?)
   - Format exact du dossier professionnel ?

### **Solutions prévues :**

1. **Gestion du temps :**
   - Sessions courtes mais efficaces (2h/soir)
   - Weekends dédiés au projet
   - Prioriser impitoyablement

2. **Réduction du stress :**
   - Planning réaliste (ce document)
   - Commits réguliers = progression visible
   - Demander de l'aide si besoin

3. **Résolution technique :**
   - Open Library API (gratuite, simple)
   - Démo en local suffit pour l'examen
   - Demander le template du dossier

---

## 💭 RÉFLEXIONS PERSONNELLES

### **Ce qui m'inquiète**

- Le temps très serré
- Jongler stage et projet
- La fatigue qui s'accumule
- La pression de l'examen

### **Ce qui me rassure**

- J'ai un plan clair maintenant
- La structure est prête
- Je comprends Git
- Je sais exactement quoi faire

### **Ce qui me motive**

- Avoir un vrai projet à montrer
- Apprendre des vraies technologies pro
- Réussir mon examen DWWM
- Prouver que je peux le faire

---

## 📊 STATISTIQUES DU PROJET (6 OCTOBRE 2025)

**Temps passé à ce jour :** ~8 heures

**Répartition :**
- Documentation : 5h
- Configuration : 2h
- Apprentissage Git : 1h

**Commits réalisés :** 2
- Initial commit (structure)
- README complet avec MVP

**Fichiers créés :** 12+
- Structure docs/ complète
- README, cahier des charges
- Carnet de bord (ce fichier)

**Reste à faire :**
- Code backend : 0%
- Code frontend : 0%
- Base de données : 0%
- Tests : 0%
- Dossier final : 0%

**→ Beaucoup de travail devant moi ! Il faut accélérer ! ⚡**

---

## 📝 JOURNAL QUOTIDIEN

### **6 octobre 2025 - Dimanche**

**Temps passé :** 2h

**Ce qui a été fait :**
- Reprise du projet après période stage
- Correction dates dans documentation
- Création structure docs/00-session-recap/
- Rédaction carnet de bord complet
- Commits documentation sur branche feature/documentation
- Apprentissage Git (branches, stash, merge)

**Difficultés :**
- Conflits Git lors du stash pop
- Confusion sur les dates (2024 vs 2025)
- Compréhension du système de branches

**Solutions trouvées :**
- Reset et recommencer proprement
- Clarification du planning avec dates exactes
- Explications détaillées Git

**Prochaine session :**
- Fusionner branche documentation dans develop
- Commencer l'installation PostgreSQL
- Créer les premiers modèles

**État d'esprit :** 😰 Stressé par le timing mais motivé !

---

#### **7 octobre 2025 - Mardi**

**Temps passé :** 37 min (19h23-20h00)

**Ce qui a été fait :**
- ✅ Création charte graphique complète
- ✅ Définition palette couleurs accessible (daltonisme)
- ✅ Choix typographies (Inter + Poppins)
- ✅ Style visuel moderne et épuré
- ✅ Principes UI/UX définis
- ✅ Configuration Tailwind CSS
- ✅ Commit de la charte graphique

**Difficultés rencontrées :**
- Temps très limité (37 minutes seulement)
- Choix entre plusieurs palettes de couleurs
- Équilibre entre esthétique et accessibilité

**Solutions trouvées :**
- Session ultra concentrée et efficace
- Choix palette Bleu/Orange (meilleure accessibilité)
- Priorité à l'accessibilité (WCAG AA, daltonisme)
- Documentation complète en une fois

**Apprentissages :**
- Conception accessible (daltonisme, contrastes)
- Standards WCAG 2.1 niveau AA
- Ne pas utiliser QUE la couleur (+ icônes)
- Palettes de couleurs professionnelles
- Hiérarchie typographique
- Système de design cohérent

**Fichiers créés :**
1. `docs/01-conception/design/charte-graphique.md` (palette, typo, style)

**Commits réalisés :**

[nouveau] docs: charte graphique complète avec accessibilité daltonisme

**Points forts de la charte :**
- ✅ Accessible aux daltoniens (bleu/orange)
- ✅ Contrastes validés WCAG AA
- ✅ Typographies lisibles (Inter, Poppins)
- ✅ Style moderne et chaleureux
- ✅ Prête pour Tailwind CSS

**Prochaine session :**
- Mercredi 8 octobre (ce soir 19h30)
- Objectif : Wireframes mobile (7 écrans)
- Temps estimé : 1h-1h30

**État d'esprit :** 😊 Satisfaite ! En 37 minutes j'ai créé une charte complète et accessible. C'est un gros plus pour le dossier professionnel. La palette bleu/orange est parfaite : moderne, professionnelle ET accessible. Le jury va apprécier cette réflexion sur l'accessibilité dès la conception. Je suis fière de ce choix ! 💪

**Note personnelle :** L'accessibilité n'est pas une contrainte, c'est une force ! Penser aux daltoniens dès le début = meilleure expérience pour TOUS. Ça montre ma maturité de développeuse.

---

### **8 octobre 2025 - Mercredi**

### **8 octobre 2025 - Mercredi**

**Temps passé :** Repos - Pas de session

**Raison :**
- Stage + vie familiale prioritaires
- Besoin de récupération

---

### **9 octobre 2025 - Jeudi**

**Temps passé :** 16 min (8h32-8h48 matin)

**Ce qui a été fait :**
- ✅ Planification semaine complète
- ✅ Carnet de bord mis à jour (8-9 oct)
- ✅ Création fichier wireframes mobile
- ✅ Rédaction 3 premiers wireframes (Landing, Login, Home)
- ✅ Commit propre

**Difficultés rencontrées :**
- Temps très limité avant départ stage
- Besoin de travailler ultra vite

**Solutions trouvées :**
- Session hyper concentrée 16 minutes
- Priorité aux wireframes pour avancer
- Efficacité maximale

**Apprentissages :**
- Conception d'interfaces mobile
- Structure wireframes (ASCII art)
- Définition interactions utilisateur
- Documentation complète des écrans

**État d'esprit :** 😊 Satisfaite ! 16 minutes ultra productives. J'avance bien sur la conception. Les wireframes prennent forme.

**Soir :** REPOS - Athlétisme Taïna 🏃‍♀️

---

### **10 octobre 2025 - Vendredi**

**Temps passé :** 24 min (8h16-8h40 matin)

**Ce qui a été fait :**
- ✅ Complété les 4 wireframes mobile restants
- ✅ Écran 4 : Recherche + Résultats (avec états vide, résultats, erreurs)
- ✅ Écran 5 : Ma bibliothèque (grille, tri, suppression)
- ✅ Écran 6 : Détail d'un livre (complet avec actions)
- ✅ Écran 7 : Profil utilisateur (statistiques, paramètres)
- ✅ **WIREFRAMES MOBILE 100% TERMINÉS (7/7 écrans)**
- ✅ Documentation navigation entre écrans
- ✅ Accessibilité intégrée (touch targets, contrastes)
- ✅ Commit propre

**Difficultés rencontrées :**
- Détailler tous les états de chaque écran
- Penser à toutes les interactions possibles
- Gérer les cas d'erreur et états vides

**Solutions trouvées :**
- Wireframes ASCII clairs et visuels
- Documentation exhaustive de chaque élément
- États multiples documentés (vide, chargement, erreur)
- Interactions et navigation bien définies

**Apprentissages :**
- Conception UX complète mobile-first
- Gestion des états d'interface (loading, empty, error)
- Navigation intuitive avec bottom nav
- Importance des feedbacks utilisateur (toasts, confirmations)
- Accessibilité tactile (44px touch targets)

**Points forts de ces wireframes :**
- ✅ 7 écrans complets et détaillés
- ✅ Tous les cas d'usage couverts
- ✅ Navigation fluide et logique
- ✅ Messages d'erreur prévus
- ✅ États vides gérés (empty states)
- ✅ Confirmations pour actions destructives
- ✅ Accessibilité intégrée dès la conception

**Fichiers créés/modifiés :**
1. `docs/01-conception/wireframes/mobile.md` (COMPLET - 7 écrans)

**Commits réalisés :**

[09/10] docs: wireframes mobile (3 premiers écrans) + carnet de bord
[10/10] docs: wireframes mobile complets (7/7 écrans terminés)

**Progression globale conception :**
- ✅ Base de données : 100%
- ✅ Charte graphique : 100%
- ✅ Wireframes mobile : 100% (7/7)
- ⏳ Wireframes desktop : 0% (à faire)
- ⏳ Maquette finale : 0% (à faire)

**Total conception : ~75% ✓**

**Prochaine session :**
- Ce weekend (12-13 octobre)
- Objectif : Wireframes desktop (7 écrans) + maquette
- Temps estimé : 2-3h

**État d'esprit :** 🎉 SUPER FIÈRE ! En 2 matinées j'ai terminé TOUS les wireframes mobile ! C'est un énorme morceau de la conception. Les écrans sont détaillés, les interactions sont claires, tout est documenté. Ça va beaucoup m'aider pour le développement. Le jury va voir que j'ai vraiment réfléchi à l'UX mobile. Je suis sur la bonne voie ! 💪

**Note personnelle :** Ces sessions matinales avant le stage sont TRÈS efficaces. 20-25 minutes ultra concentrées = résultats incroyables. Je garde ce rythme ! Le weekend sera pour finir la conception (desktop + maquette) et ensuite JE CODE ! 🚀

---

### **11-19 octobre 2025**

**Temps passé :** Repos / Focus stage

**Période :**
- Stage intensif avec projets urgents
- Priorité aux deadlines du stage
- Pas de session sur Blablabook

**Décision :**
Choix assumé de prioriser le stage sur le projet personnel. Les compétences acquises au stage seront valorisables dans le dossier professionnel.

**État d'esprit :** 😌 Pas de culpabilité. Le stage est important et fait partie de la formation. Je reprends maintenant avec détermination.

---

---

### **20 octobre 2025 - Lundi (SESSION 2 - Soir)**

**Temps passé :** 17 min (20h05-20h22)

**Ce qui a été fait :**
- ✅ Modèle Book créé (141 lignes)
- ✅ Modèle UserBook créé (154 lignes)
- ✅ Fichier index.js avec associations (114 lignes)
- ✅ Tests complets des 3 modèles réussis
- ✅ **MODÈLES BDD 100% TERMINÉS !**
- ✅ 4 commits propres

**Difficultés rencontrées :**
- Comprendre les associations Sequelize (1:N, N:N)
- Définir la contrainte UNIQUE sur (user_id, book_id)

**Solutions trouvées :**
- Explications détaillées des associations
- Index UNIQUE dans UserBook pour éviter doublons
- Tests complets pour valider toutes les relations

**Apprentissages :**
- Associations Sequelize (hasMany, belongsTo, belongsToMany)
- Contraintes d'intégrité en BDD
- Table de liaison pour relation N:N
- Méthodes statiques sur modèles
- Tests des relations avec include

**Points forts :**
- ✅ User, Book, UserBook fonctionnent parfaitement
- ✅ Contrainte UNIQUE empêche doublons
- ✅ Associations 1:N et N:N validées
- ✅ Méthodes utiles (userHasBook, findOrCreate...)
- ✅ Session ultra efficace (17 min)

**Commits réalisés :**
```
1fe02ca feat: modèle Book avec validation et méthode findOrCreate
a53200b feat: modèle UserBook (table liaison) avec contrainte unique
ec92cce feat: fichier index modèles avec associations User-Book-UserBook
(+ 1 test)
```

**Progression backend :**
- ✅ PostgreSQL : 100%
- ✅ Modèles Sequelize : 100%
- ⏳ Controllers : 0%
- ⏳ Routes : 0%
- ⏳ Middleware : 0%

**Prochaine session :**
- Mardi 21 octobre (ce soir 19h30)
- Objectif : Controller Auth + Register
- Temps estimé : 1h30

**État d'esprit :** 🔥 ULTRA MOTIVÉE ! Session express mais hyper efficace ! Les modèles sont prêts, maintenant on passe aux controllers. Le backend prend forme. Je maîtrise de mieux en mieux Sequelize. Les associations sont claires. Prête pour la suite ! 💪

**Note personnelle :** Bilan total lundi 20 oct = 4h47 de travail. Conception 100% + Modèles BDD 100%. Progression énorme. Le planning tient la route. 22 jours restants = largement faisable ! 🚀

---

### **21 octobre 2025 - Mardi (3 SESSIONS !)**

**Temps passé :** 3h30 (matin 41min + après-midi 10min + soir 2h40)

**Ce qui a été fait :**
- ✅ Carnet de bord mis à jour (session 20 oct)
- ✅ **Controller Auth complet** (register + login) - 219 lignes
- ✅ **Routes Auth** créées - 37 lignes
- ✅ **Serveur Express** opérationnel - 116 lignes
- ✅ **Middleware JWT** (vérification token) - 128 lignes
- ✅ Route protégée /api/auth/me pour tests
- ✅ **Tests Auth complets** : register, login, JWT validés
- ✅ **Controller Books** (recherche Open Library) - 129 lignes
- ✅ **Routes Books** créées
- ✅ **Tests Books** : recherche validée
- ✅ Installation axios
- ✅ **19 commits propres**

**Difficultés rencontrées :**
- Erreur chemin .env (résolu avec path relatif)
- Axios manquant (installé)
- Syntaxe ligne coupée dans server.js (corrigé)

**Solutions trouvées :**
- require('dotenv').config({ path: '../.env' })
- npm install axios
- Vérification syntaxe complète

**Apprentissages :**
- Création serveur Express complet
- Middleware authentification JWT
- Validation Joi pour données
- Appels API externes (Open Library)
- Tests API avec curl
- Gestion des erreurs HTTP
- Headers Authorization Bearer

**Points forts :**
- ✅ API Auth 100% fonctionnelle
- ✅ Register : création user + hash password + génération JWT
- ✅ Login : vérification password + JWT
- ✅ Middleware JWT : protection routes
- ✅ API Books : recherche 20 livres Open Library
- ✅ Tous les tests passent
- ✅ 3h30 ultra productives = ~700 lignes

**Commits réalisés :**
```
7987acf docs: carnet de bord session 20 oct soir
a584bb8 feat: controller Auth avec fonction register (inscription + JWT)
b81281a feat: routes Auth (register, login) + index routes
59b55cd feat: serveur Express avec routes API et gestion erreurs
6747057 fix: correction chemin .env et syntaxe server.js
f52d93c feat: middleware authentification JWT (vérification token)
6dfdbc1 feat: fonction login complète avec validation JWT
45dd50e feat: route protégée /api/auth/me pour test JWT
9b25300 feat: controller Books + recherche via API Open Library
```

**Progression backend :**
- ✅ PostgreSQL : 100%
- ✅ Modèles Sequelize : 100%
- ✅ API Auth (register, login) : 100%
- ✅ Middleware JWT : 100%
- ✅ API Books (recherche) : 100%
- ⏳ API UserBooks : 0%

**Backend : 85% terminé !**

**Prochaine session :**
- Mercredi 22 octobre (ce soir 19h30)
- Objectif : API UserBooks (bibliothèque)
- Temps estimé : 1h30

**État d'esprit :** 🔥 EN FEU ! 3h30 de travail ultra concentré ! J'ai fait 3 sessions dans la journée. Le backend avance à une vitesse incroyable. API Auth complète et testée. API Books qui fonctionne parfaitement. J'ai installé tout seule axios. Les tests curl passent tous. Je COMPRENDS ce que je fais. Plus que UserBooks et le backend sera terminé. Je suis EN AVANCE de 6 jours sur le planning ! C'EST ÉNORME ! Fatiguée mais hyper fière. Repos bien mérité. Demain je termine le backend. JE VAIS Y ARRIVER ! 💪🔥

**Note personnelle :** Session marathon mais incroyable. 19 commits en une journée. ~700 lignes de code. Tout fonctionne. API testée et validée. Je maîtrise Express, JWT, Sequelize, axios. Le projet prend vie ! Backend presque fini. 6 jours d'avance ! Je suis une warrior ! 🚀✨

---

### **22 octobre 2025 - Mercredi**

**Session prévue ce soir :** 19h30-21h00

**Objectif :** API UserBooks complète

**À faire :**
- Controller UserBooks
- Fonction addBook (ajouter livre à bibliothèque)
- Fonction getMyBooks (récupérer mes livres)
- Fonction removeBook (supprimer livre)
- Routes UserBooks
- Tests complets
- **BACKEND 100% TERMINÉ !**


---

## 📝 NOTES POUR MOI-MÊME

### **Commandes Git importantes**

git status                    # Voir l'état
git add .                     # Tout ajouter
git commit -m "message"       # Sauvegarder
git log --oneline             # Voir l'historique
git checkout -b nom-branche   # Nouvelle branche
git checkout nom-branche      # Changer de branche
git merge nom-branche         # Fusionner une branche

