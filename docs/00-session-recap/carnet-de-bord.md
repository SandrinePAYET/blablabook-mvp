
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

**Temps passé :** 

**Ce qui a été fait :**

**Difficultés :**

**Solutions :**

**Prochaine session :**

**État d'esprit :**

---




---

## 📝 NOTES POUR MOI-MÊME

### **Commandes Git importantes**
```bash
git status                    # Voir l'état
git add .                     # Tout ajouter
git commit -m "message"       # Sauvegarder
git log --oneline             # Voir l'historique
git checkout -b nom-branche   # Nouvelle branche
git checkout nom-branche      # Changer de branche
git merge nom-branche         # Fusionner une branche
