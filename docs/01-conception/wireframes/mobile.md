# 📱 WIREFRAMES MOBILE - BLABLABOOK

**Projet :** Blablabook  
**Date :** 9 octobre 2025  
**Format :** Mobile (320px - 768px)  
**Nombre d'écrans :** 7

---

## 🎯 OBJECTIFS DES WIREFRAMES

- Définir la structure de chaque page mobile
- Organiser les éléments (navigation, contenus, actions)
- Préparer le développement
- Valider l'expérience utilisateur mobile

---

## 📐 CONVENTIONS

**Éléments :**
- `[Bouton]` → Bouton cliquable
- `[Input]` → Champ de saisie
- `[Image]` → Image/Icône
- `---` → Séparateur/ligne
- `[Card]` → Carte/conteneur

**Layout :**
- Largeur : 375px (référence iPhone)
- Scroll vertical
- Menu hamburger si nécessaire

---

## 🏠 ÉCRAN 1 : LANDING PAGE (Accueil visiteur)

### **Description**

Page d'accueil pour les visiteurs non connectés. Présente l'application et incite à l'inscription.

### **Wireframe ASCII**

┌─────────────────────────────────┐
│  [☰]  BLABLABOOK      [Connexion] │ ← Header fixe
├─────────────────────────────────┤
│                                 │
│         [Logo 📚]               │
│                                 │
│   Gérez votre bibliothèque      │ ← Hero
│   personnelle simplement        │
│                                 │
│   [S'inscrire gratuitement]     │ ← CTA principal
│                                 │
│   [Déjà inscrit ? Connexion]    │ ← Lien secondaire
│                                 │
├─────────────────────────────────┤
│                                 │
│   ✨ Fonctionnalités            │ ← Section features
│                                 │
│   [🔍]                          │
│   Recherchez des livres         │
│   Millions de références        │
│                                 │
│   [📚]                          │
│   Organisez votre collection    │
│   Bibliothèque personnelle      │
│                                 │
│   [📱]                          │
│   Accédez partout              │
│   Mobile, tablette, desktop     │
│                                 │
├─────────────────────────────────┤
│                                 │
│   [Commencer maintenant]        │ ← CTA bas de page
│                                 │
├─────────────────────────────────┤
│  © 2025 Blablabook             │ ← Footer
│  [Mentions légales] [CGU]       │
└─────────────────────────────────┘

### **Éléments de la page**

#### **Header**
- Logo Blablabook (gauche)
- Bouton "Connexion" (droite)
- Couleur : Bleu (#1E3A8A)
- Position : Fixe (reste visible au scroll)

#### **Hero Section**
- Logo/icône principal (📚)
- Titre : "Gérez votre bibliothèque personnelle simplement"
- Taille : H1, Poppins Bold
- CTA : "S'inscrire gratuitement" (Orange #F59E0B)
- Lien secondaire : "Déjà inscrit ? Connexion"

#### **Section Fonctionnalités**
- 3 blocs verticaux
- Icône + Titre + Description courte
- Icônes : 40px, Bleu
- Fond : Blanc ou Gris très clair

#### **CTA Bas de page**
- Bouton : "Commencer maintenant"
- Même style que CTA hero
- Redirige vers inscription

#### **Footer**
- Copyright
- Liens légaux
- Couleur : Gris clair (#F3F4F6)

### **Interactions**

| Élément | Action | Résultat |
|---------|--------|----------|
| Menu burger | Tap | Ouvre menu latéral (CGU, Contact) |
| Bouton "Connexion" | Tap | → Écran 2 (Login) |
| "S'inscrire" | Tap | → Écran 2 (Register) |
| "Commencer" | Tap | → Écran 2 (Register) |

### **Notes techniques**

- Scroll vertical fluide
- Header sticky (position: fixed)
- Animations légères au scroll (fade in)
- Responsive : s'adapte 320px → 768px

---

## 🔐 ÉCRAN 2 : CONNEXION / INSCRIPTION

### **Description**

Écran avec 2 onglets : Connexion et Inscription. Permet de créer un compte ou se connecter.

### **Wireframe ASCII**

┌─────────────────────────────────┐ │ [←] BLABLABOOK │ ← Header avec retour ├─────────────────────────────────┤ │ │ │ [Connexion] [Inscription] │ ← Onglets │ ────────── ───────── │ │ │ │ ┌─ CONNEXION ─────────────┐ │ │ │ │ │ │ │ Email │ │ │ │ [] │ │ │ │ │ │ │ │ Mot de passe │ │ │ │ [] [👁]│ │ │ │ │ │ │ │ [Mot de passe oublié ?] │ │ │ │ │ │ │ │ [ Se connecter ] │ │ ← Bouton bleu │ │ │ │ │ └──────────────────────────┘ │ │ │ │ Pas encore inscrit ? │ │ [Créer un compte] │ ← Lien vers onglet inscription │ │ └─────────────────────────────────┘

┌─────────────────────────────────┐ │ [←] BLABLABOOK │ ├─────────────────────────────────┤ │ │ │ [Connexion] [Inscription] │ ← Onglets │ ───────── ────────── │ │ │ │ ┌─ INSCRIPTION ────────────┐ │ │ │ │ │ │ │ Email │ │ │ │ [] │ │ │ │ │ │ │ │ Mot de passe │ │ │ │ [] [👁]│ │ │ │ Min. 8 caractères │ │ │ │ │ │ │ │ Confirmer mot de passe │ │ │ │ [________________] [👁]│ │ │ │ │ │ │ │ ☐ J'accepte les CGU │ │ │ │ │ │ │ │ [ S'inscrire ] │ │ ← Bouton orange │ │ │ │ │ └──────────────────────────┘ │ │ │ │ Déjà inscrit ? │ │ [Se connecter] │ │ │ └─────────────────────────────────┘

### **Éléments de la page**

#### **Header**
- Flèche retour ← (vers Landing)
- Logo Blablabook

#### **Onglets**
- Connexion / Inscription
- Actif : souligné (Bleu)
- Inactif : Gris

#### **Formulaire Connexion**
- Champ Email (type: email, required)
- Champ Mot de passe (type: password, required)
- Icône œil pour afficher/masquer
- Lien "Mot de passe oublié ?"
- Bouton "Se connecter" (Bleu #1E3A8A)

#### **Formulaire Inscription**
- Champ Email (validation format)
- Champ Mot de passe (min 8 caractères)
- Aide visuelle : indicateur force mot de passe
- Champ Confirmation mot de passe
- Checkbox CGU (required)
- Bouton "S'inscrire" (Orange #F59E0B)

### **Validations**

**Email :**
- Format valide (regex email)
- Message erreur : "Email invalide"

**Mot de passe :**
- Min 8 caractères
- Message erreur : "8 caractères minimum"

**Confirmation :**
- Identique au mot de passe
- Message erreur : "Les mots de passe ne correspondent pas"

### **Interactions**

| Élément | Action | Résultat |
|---------|--------|----------|
| Flèche ← | Tap | Retour Landing page |
| Onglet | Tap | Switch entre Connexion/Inscription |
| Icône œil 👁 | Tap | Toggle affichage mot de passe |
| "Se connecter" | Tap | Validation → Écran 3 (Home) |
| "S'inscrire" | Tap | Validation → Écran 3 (Home) |

### **Messages d'erreur**

┌─────────────────────────────────┐
│  ⚠️ Email ou mot de passe       │
│     incorrect                    │
└─────────────────────────────────┘

Position : Au-dessus du formulaire  
Couleur : Rouge (#EF4444) + icône ⚠️

---

## 🏠 ÉCRAN 3 : ACCUEIL CONNECTÉ

### **Description**

Page d'accueil après connexion. Affiche un résumé de la bibliothèque et un accès rapide aux fonctions principales.

### **Wireframe ASCII**

┌─────────────────────────────────┐
│  [☰]  BLABLABOOK      [👤]      │ ← Header connecté
├─────────────────────────────────┤
│                                 │
│   Bonjour Marie ! 👋            │ ← Greeting
│                                 │
├─────────────────────────────────┤
│  🔍 [Rechercher un livre...]    │ ← Barre recherche
├─────────────────────────────────┤
│                                 │
│   Ma bibliothèque               │ ← Section
│   12 livres                     │
│                                 │
│  [📖 Card]  [📖 Card]          │ ← Grille 2 colonnes
│  Titre      Titre               │
│  Auteur     Auteur              │
│                                 │
│  [📖 Card]  [📖 Card]          │
│  Titre      Titre               │
│  Auteur     Auteur              │
│                                 │
│  [Voir toute ma bibliothèque]   │ ← Lien
│                                 │
├─────────────────────────────────┤
│                                 │
│   Suggestions                   │ ← Section (futur)
│   Découvrez de nouveaux livres  │
│                                 │
│  [À venir...]                   │
│                                 │
└─────────────────────────────────┘
│                                 │
│  [🏠] [🔍] [📚] [👤]          │ ← Navigation bottom
│  Home Search Biblio Profil     │
└─────────────────────────────────┘

### **Éléments de la page**

#### **Header connecté**
- Menu burger ☰ (gauche)
- Logo Blablabook (centre)
- Icône profil 👤 (droite)

#### **Greeting**
- "Bonjour [Prénom] !" avec emoji
- Personnalisé selon heure (Bonjour/Bonsoir)

#### **Barre de recherche**
- Input : "Rechercher un livre..."
- Icône 🔍 à gauche
- Tap → Écran 4 (Recherche)

#### **Ma bibliothèque**
- Titre + nombre de livres
- Aperçu : 4 derniers livres ajoutés
- Grille 2 colonnes
- Cards : Couverture + Titre + Auteur
- Bouton "Voir toute ma bibliothèque"

#### **Bottom Navigation**
- Fixe en bas
- 4 icônes : Home, Recherche, Bibliothèque, Profil
- Actif : Bleu + souligné
- Inactif : Gris

### **Interactions**

| Élément | Action | Résultat |
|---------|--------|----------|
| Menu ☰ | Tap | Menu latéral (Paramètres, Déconnexion) |
| Profil 👤 | Tap | → Écran 7 (Profil) |
| Barre recherche | Tap | → Écran 4 (Recherche) |
| Card livre | Tap | → Écran 6 (Détail) |
| "Voir toute..." | Tap | → Écran 5 (Ma bibliothèque) |
| Nav Home | Tap | Reste sur Écran 3 |
| Nav Recherche | Tap | → Écran 4 |
| Nav Bibliothèque | Tap | → Écran 5 |
| Nav Profil | Tap | → Écran 7 |

---

## 📝 SUITE DES WIREFRAMES

Les écrans restants seront détaillés :

4. **Recherche + Résultats**
5. **Ma bibliothèque complète**
6. **Détail d'un livre**
7. **Profil utilisateur**

## 🔍 ÉCRAN 4 : RECHERCHE + RÉSULTATS

### **Description**

Page de recherche de livres via l'API Open Library. Affiche les résultats en liste scrollable.

### **Wireframe ASCII - Recherche vide**

┌─────────────────────────────────┐
│  [←]  Recherche                 │ ← Header
├─────────────────────────────────┤
│  🔍 [Titre, auteur, ISBN...]    │ ← Barre recherche
│     [X]                         │    (X = effacer)
├─────────────────────────────────┤
│                                 │
│         [🔍]                    │
│                                 │
│   Recherchez un livre           │ ← État vide
│   par titre ou auteur           │
│                                 │
│                                 │
└─────────────────────────────────┘
│  [🏠] [🔍] [📚] [👤]          │ ← Nav bottom
└─────────────────────────────────┘

### **Wireframe ASCII - Résultats**

┌─────────────────────────────────┐
│  [←]  Recherche                 │
├─────────────────────────────────┤
│  🔍 [Harry Potter         ] [X] │ ← Recherche active
├─────────────────────────────────┤
│  12 résultats                   │
├─────────────────────────────────┤
│  ┌───────────────────────────┐ │
│  │ [📖]  Harry Potter à...  │ │ ← Card résultat
│  │       J.K. Rowling        │ │
│  │       1997                │ │
│  │              [+ Ajouter]  │ │
│  └───────────────────────────┘ │
│                                 │
│  ┌───────────────────────────┐ │
│  │ [📖]  Harry Potter et...  │ │
│  │       J.K. Rowling        │ │
│  │       1998                │ │
│  │              [+ Ajouter]  │ │
│  └───────────────────────────┘ │
│                                 │
│  ┌───────────────────────────┐ │
│  │ [📖]  Harry Potter et...  │ │
│  │       J.K. Rowling        │ │
│  │       1999                │ │
│  │              [✓ Ajouté]   │ │ ← Déjà dans biblio
│  └───────────────────────────┘ │
│                                 │
│  [Charger plus...]              │ ← Pagination
│                                 │
└─────────────────────────────────┘
│  [🏠] [🔍] [📚] [👤]          │
└─────────────────────────────────┘

### **Éléments de la page**

#### **Header**
- Flèche retour ←
- Titre "Recherche"

#### **Barre de recherche**
- Input avec placeholder "Titre, auteur, ISBN..."
- Icône 🔍 à gauche
- Bouton X pour effacer (si texte saisi)
- Auto-focus au chargement
- Recherche en temps réel (debounce 500ms)

#### **État vide (pas de recherche)**
- Icône 🔍 centrée
- Texte explicatif
- Fond blanc

#### **Résultats**
- Nombre de résultats affiché
- Liste scrollable verticale
- Cards avec :
  - Miniature couverture (60x90px)
  - Titre (tronqué si long)
  - Auteur
  - Année de publication
  - Bouton "+ Ajouter" OU badge "✓ Ajouté"

#### **Pagination**
- Bouton "Charger plus..." en bas
- Loader pendant chargement

### **États du bouton Ajouter**

**Non ajouté :**

[+ Ajouter]
Couleur : Orange (#F59E0B)

**Déjà dans bibliothèque :**

[✓ Ajouté]
Couleur : Vert (#10B981)
Désactivé (non cliquable)

**En cours d'ajout :**

[... Ajout]
Loader animé

### **Interactions**

| Élément | Action | Résultat |
|---------|--------|----------|
| Flèche ← | Tap | Retour écran précédent |
| Input recherche | Type | Recherche API après 500ms |
| Bouton X | Tap | Efface la recherche |
| Card livre | Tap | → Écran 6 (Détail) |
| "+ Ajouter" | Tap | Ajoute à bibliothèque + change en "✓ Ajouté" |
| "Charger plus" | Tap | Charge 10 résultats suivants |

### **Messages**

**Aucun résultat :**

┌─────────────────────────────────┐
│  Aucun livre trouvé             │
│  Essayez une autre recherche    │
└─────────────────────────────────┘

**Erreur API :**

┌─────────────────────────────────┐
│  ⚠️ Erreur de connexion         │
│  Veuillez réessayer             │
└─────────────────────────────────┘

### **Notes techniques**

- Debounce 500ms sur input (éviter trop de requêtes)
- Cache des résultats (si retour en arrière)
- Loader pendant recherche
- Maximum 50 résultats affichés (pagination)

---

## 📚 ÉCRAN 5 : MA BIBLIOTHÈQUE

### **Description**

Vue complète de tous les livres de l'utilisateur. Grille scrollable avec possibilité de supprimer.

### **Wireframe ASCII**

┌─────────────────────────────────┐
│  [←]  Ma bibliothèque      [⚙]  │ ← Header
├─────────────────────────────────┤
│  12 livres                      │ ← Compteur
│  [Tri: Récents ▼]               │ ← Filtre tri
├─────────────────────────────────┤
│                                 │
│  ┌────────┐  ┌────────┐        │ ← Grille 2 colonnes
│  │ [📖]   │  │ [📖]   │        │
│  │ Titre  │  │ Titre  │        │
│  │ Auteur │  │ Auteur │        │
│  │  [👁]  │  │  [👁]  │        │
│  └────────┘  └────────┘        │
│                                 │
│  ┌────────┐  ┌────────┐        │
│  │ [📖]   │  │ [📖]   │        │
│  │ Titre  │  │ Titre  │        │
│  │ Auteur │  │ Auteur │        │
│  │  [👁]  │  │  [👁]  │        │
│  └────────┘  └────────┘        │
│                                 │
│  ┌────────┐  ┌────────┐        │
│  │ [📖]   │  │ [📖]   │        │
│  │ Titre  │  │ Titre  │        │
│  │ Auteur │  │ Auteur │        │
│  │  [👁]  │  │  [👁]  │        │
│  └────────┘  └────────┘        │
│                                 │
└─────────────────────────────────┘
│  [🏠] [🔍] [📚] [👤]          │
└─────────────────────────────────┘

### **Wireframe ASCII - Bibliothèque vide**

┌─────────────────────────────────┐
│  [←]  Ma bibliothèque           │
├─────────────────────────────────┤
│  0 livre                        │
├─────────────────────────────────┤
│                                 │
│         [📚]                    │
│                                 │
│   Votre bibliothèque est vide   │
│                                 │
│   [Rechercher des livres]       │ ← CTA
│                                 │
└─────────────────────────────────┘
│  [🏠] [🔍] [📚] [👤]          │
└─────────────────────────────────┘

### **Éléments de la page**

#### **Header**
- Flèche retour ←
- Titre "Ma bibliothèque"
- Icône paramètres ⚙ (futur : tri avancé, export)

#### **Compteur**
- "X livres" (ou "X livre" si 1)
- Mis à jour dynamiquement

#### **Filtre de tri**
- Dropdown : "Tri: Récents ▼"
- Options :
  - Plus récents (date ajout DESC)
  - Plus anciens (date ajout ASC)
  - Titre A-Z
  - Titre Z-A
  - Auteur A-Z

#### **Grille de livres**
- 2 colonnes
- Cards :
  - Couverture (120x180px)
  - Titre (max 2 lignes, ellipsis)
  - Auteur (1 ligne, ellipsis)
  - Icône œil 👁 (action "voir détails")
- Scroll vertical infini

#### **État vide**
- Icône 📚 centrée
- Message "Votre bibliothèque est vide"
- CTA "Rechercher des livres" → Écran 4

### **Actions sur une card**

**Tap sur card :**
→ Écran 6 (Détail)

**Long press sur card :**
→ Menu contextuel :

┌─────────────────────┐
│  Voir les détails   │
│  Supprimer          │
│  Annuler            │
└─────────────────────┘

**Swipe gauche sur card :**

┌────────────────┐ [🗑️]
│  Card livre    │ Supprimer
└────────────────┘

### **Confirmation suppression**

┌─────────────────────────────────┐
│  Supprimer ce livre ?           │
│                                 │
│  Titre du livre                 │
│  par Auteur                     │
│                                 │
│  [Annuler]    [Supprimer]       │
└─────────────────────────────────┘

Modal centré  
Bouton Supprimer : Rouge

### **Interactions**

| Élément | Action | Résultat |
|---------|--------|----------|
| Flèche ← | Tap | Retour Écran 3 (Home) |
| ⚙ Paramètres | Tap | Menu tri/filtres |
| Dropdown tri | Tap | Liste options |
| Card | Tap | → Écran 6 (Détail) |
| Card | Long press | Menu contextuel |
| Card | Swipe left | Bouton supprimer |
| "Supprimer" | Tap | Modal confirmation |
| "Rechercher" (vide) | Tap | → Écran 4 (Recherche) |

### **Notes techniques**

- Lazy loading des couvertures
- Placeholders pendant chargement
- Animation smooth lors suppression
- Cache des images (performance)

---

## 📖 ÉCRAN 6 : DÉTAIL D'UN LIVRE

### **Description**

Page détaillée d'un livre spécifique. Affiche toutes les informations et permet d'ajouter/supprimer de la bibliothèque.

### **Wireframe ASCII**

┌─────────────────────────────────┐
│  [←]                       [⋮]  │ ← Header minimal
├─────────────────────────────────┤
│                                 │
│       ┌──────────────┐          │ ← Couverture grande
│       │              │          │
│       │    [📖]      │          │
│       │   200x300    │          │
│       │              │          │
│       └──────────────┘          │
│                                 │
│   Harry Potter à l'école        │ ← Titre (H2)
│   des sorciers                  │
│                                 │
│   J.K. Rowling                  │ ← Auteur
│   Publié en 1997                │ ← Année
│                                 │
├─────────────────────────────────┤
│  [+ Ajouter à ma bibliothèque]  │ ← CTA (si pas ajouté)
│  OU                             │
│  [✓ Dans ma bibliothèque]       │ ← Badge (si ajouté)
│  [Retirer de ma bibliothèque]   │ ← Bouton secondaire
├─────────────────────────────────┤
│                                 │
│  📝 Résumé                      │ ← Section
│                                 │
│  Harry Potter, un jeune         │
│  orphelin, découvre le jour     │
│  de ses onze ans qu'il est      │
│  un sorcier. Il est alors       │
│  convié à intégrer Poudlard...  │
│  [Lire plus]                    │ ← Si texte long
│                                 │
├─────────────────────────────────┤
│  ℹ️ Informations                │ ← Section
│                                 │
│  ISBN : 978-2070541270          │
│  Pages : 320                    │
│  Éditeur : Gallimard            │
│  Langue : Français              │
│                                 │
└─────────────────────────────────┘
│  [🏠] [🔍] [📚] [👤]          │
└─────────────────────────────────┘

### **Éléments de la page**

#### **Header**
- Flèche retour ← (vers écran précédent)
- Menu 3 points ⋮ (partager, signaler)
- Transparent ou blanc selon scroll

#### **Section Couverture**
- Image grande (200x300px)
- Centrée
- Placeholder si pas d'image

#### **Section Titre**
- Titre du livre (Poppins SemiBold, 24px)
- Auteur (Inter Regular, 16px, Gris)
- Année publication (Inter Regular, 14px, Gris)

#### **CTA Principal**

**Si livre PAS dans bibliothèque :**

[+ Ajouter à ma bibliothèque]
Couleur : Orange (#F59E0B)
Largeur : 100%

**Si livre DANS bibliothèque :**

[✓ Dans ma bibliothèque]
Couleur : Vert (#10B981)
État : Désactivé
+
[Retirer de ma bibliothèque]
Couleur : Rouge clair
Bouton secondaire

#### **Section Résumé**
- Titre "📝 Résumé"
- Texte description (max 300 caractères)
- Bouton "Lire plus" si texte tronqué
- Expansion in-place au tap

#### **Section Informations**
- Titre "ℹ️ Informations"
- Liste des métadonnées :
  - ISBN (si disponible)
  - Nombre de pages (si disponible)
  - Éditeur (si disponible)
  - Langue (si disponible)
- Format : Label (gras) : Valeur

### **Menu 3 points**

┌─────────────────────┐
│  Partager           │ (futur)
│  Signaler erreur    │ (futur)
│  Annuler            │
└─────────────────────┘

### **Interactions**

| Élément | Action | Résultat |
|---------|--------|----------|
| Flèche ← | Tap | Retour écran précédent |
| Menu ⋮ | Tap | Menu contextuel |
| "+ Ajouter" | Tap | Ajoute + change en "✓ Dans" |
| "Retirer" | Tap | Modal confirmation suppression |
| "Lire plus" | Tap | Expand résumé complet |
| Couverture | Tap | Zoom image (futur) |

### **Confirmation retrait**

┌─────────────────────────────────┐
│Retirer de votre bibliothèque ?│ |
│           |                     │
│  [Annuler]    [Retirer] |       │
└─────────────────────────────────┘

### **Messages de succès**

**Ajout :**

┌─────────────────────────────────┐
│  ✓ Livre ajouté à votre |       │
│    bibliothèque !       |       │
└─────────────────────────────────┘

**Retrait :**

┌─────────────────────────────────┐
│  ✓ Livre retiré de votre |      │
│    bibliothèque  |              │
└─────────────────────────────────┘

Toast en haut, disparaît après 3s

### **Notes techniques**

- Scroll vertical fluide
- Image lazy loading
- Cache des données livre
- Animation smooth pour expand/collapse résumé

---

## 👤 ÉCRAN 7 : PROFIL UTILISATEUR

### **Description**

Page de profil de l'utilisateur connecté. Affiche les informations du compte et permet de gérer les paramètres.

### **Wireframe ASCII**

┌─────────────────────────────────┐
│  [←]  Mon profil           [⚙]  │ ← Header
├─────────────────────────────────┤
│                                 │
│       ┌────────┐                │ ← Avatar
│       │   👤   │                │
│       └────────┘                │
│                                 │
│   marie@example.com             │ ← Email
│   Membre depuis oct. 2025       │ ← Date inscription
│                                 │
├─────────────────────────────────┤
│  📊 Statistiques                │ ← Section
│                                 │
│  ┌─────────────┐ ┌────────────┐│
│  │     12      │ │     45     ││ ← Cards stats
│  │   Livres    │ │   Pages    ││
│  └─────────────┘ └────────────┘│
│                                 │
├─────────────────────────────────┤
│  ⚙️ Paramètres                  │ ← Section
│                                 │
│  ➤ Modifier mon email           │
│  ➤ Changer mot de passe         │
│  ➤ Notifications (futur)        │
│  ➤ Thème (futur)                │
│                                 │
├─────────────────────────────────┤
│  📄 Légal                       │ ← Section
│                                 │
│  ➤ Mentions légales             │
│  ➤ CGU                          │
│  ➤ Politique confidentialité    │
│                                 │
├─────────────────────────────────┤
│                                 │
│  [Se déconnecter]               │ ← Bouton rouge
│                                 │
├─────────────────────────────────┤
│  Version 1.0.0 - MVP            │ ← Footer
└─────────────────────────────────┘
│  [🏠] [🔍] [📚] [👤]          │
└─────────────────────────────────┘

### **Éléments de la page**

#### **Header**
- Flèche retour ←
- Titre "Mon profil"
- Icône paramètres ⚙ (raccourci paramètres)

#### **Section Avatar**
- Avatar circulaire (80px)
- Par défaut : Icône 👤 sur fond bleu
- Futur : Upload photo

#### **Section Identité**
- Email de l'utilisateur
- Date d'inscription ("Membre depuis...")
- Police : Inter Regular, 14px

#### **Section Statistiques**
- 2 cards côte à côte
- Card 1 : Nombre de livres dans bibliothèque
- Card 2 : Total pages lues (futur, pour l'instant statique)
- Design : Bordure, coins arrondis, centré

#### **Section Paramètres**
- Liste d'options :
  - Modifier mon email
  - Changer mot de passe
  - Notifications (grisé - futur)
  - Thème (grisé - futur)
- Icône ➤ à droite de chaque ligne
- Séparateurs entre lignes

#### **Section Légal**
- Liens vers pages légales
- Mentions légales
- CGU
- Politique de confidentialité
- Icône ➤ à droite

#### **Bouton Déconnexion**
- Texte : "Se déconnecter"
- Couleur : Rouge (#EF4444)
- Bordure rouge, fond blanc
- Largeur : 80% centrée

#### **Footer**
- Version de l'app
- Petite police, gris

### **Modal Déconnexion**

┌─────────────────────────────────┐
│  Se déconnecter ?               │
│                                 │
│  Vous devrez vous reconnecter   │
│  pour accéder à votre compte    │
│                                 │
│  [Annuler]    [Déconnecter]     │
└─────────────────────────────────┘

### **Interactions**

| Élément | Action | Résultat |
|---------|--------|----------|
| Flèche ← | Tap | Retour Écran 3 (Home) |
| ⚙ Paramètres | Tap | Scroll vers section Paramètres |
| Avatar | Tap | Modal "Changer photo" (futur) |
| "Modifier email" | Tap | Modal formulaire (futur MVP) |
| "Changer MDP" | Tap | Modal formulaire (futur MVP) |
| Options grisées | Tap | Toast "Bientôt disponible" |
| Mentions légales | Tap | Page externe |
| CGU | Tap | Page externe |
| Politique | Tap | Page externe |
| "Se déconnecter" | Tap | Modal confirmation |
| Confirmation | Tap | Déconnexion → Écran 1 (Landing) |

### **Modification Email (futur)**

┌─────────────────────────────────┐
│  Modifier mon email             │
│                                 │
│  Email actuel                   │
│  [marie@example.com     ]       │
│                                 │
│  Nouvel email                   │
│  []          │
│                                 │
│  Mot de passe (confirmation)    │
│  [] [👁]     │
│                                 │
│  [Annuler]    [Enregistrer]     │
└─────────────────────────────────┘

### **Changement MDP (futur)**

┌─────────────────────────────────┐
│  Changer mon mot de passe       │
│                                 │
│  Mot de passe actuel            │
│  [] [👁]     │
│                                 │
│  Nouveau mot de passe           │
│  [] [👁]     │
│  Min. 8 caractères              │
│                                 │
│  Confirmer nouveau MDP          │
│  [___________________] [👁]     │
│                                 │
│  [Annuler]    [Enregistrer]     │
└─────────────────────────────────┘

### **Notes techniques**

- Statistiques rechargées à chaque visite
- Token JWT supprimé à la déconnexion
- Redirect vers Landing après déconnexion
- Animations smooth pour modals

---

## ✅ WIREFRAMES MOBILE - COMPLET !

### **Les 7 écrans sont maintenant définis :**

1. ✅ Landing Page (Accueil visiteur)
2. ✅ Connexion / Inscription
3. ✅ Accueil connecté
4. ✅ Recherche + Résultats
5. ✅ Ma bibliothèque complète
6. ✅ Détail d'un livre
7. ✅ Profil utilisateur

---

## 🎨 COHÉRENCE VISUELLE

### **Éléments communs à tous les écrans**

**Header :**
- Hauteur : 56px
- Fond : Bleu (#1E3A8A) OU Blanc selon écran
- Padding : 16px

**Bottom Navigation (écrans 3-7) :**
- Hauteur : 64px
- Fond : Blanc
- Ombre légère en haut
- 4 icônes équidistantes

**Boutons :**
- Primaire : Bleu (#1E3A8A)
- Action : Orange (#F59E0B)
- Succès : Vert (#10B981)
- Danger : Rouge (#EF4444)
- Border-radius : 8px
- Padding : 12px 24px

**Cards :**
- Fond : Blanc (#FFFFFF)
- Bordure : 1px Gris clair (#E5E7EB)
- Border-radius : 12px
- Ombre : 0 1px 3px rgba(0,0,0,0.1)

**Typographie :**
- Titres : Poppins SemiBold/Bold
- Corps : Inter Regular
- Tailles : 14px (small), 16px (normal), 24px (H3), 32px (H2)

---

## 📱 RESPONSIVE

**Breakpoints mobiles :**
- Small : 320px - 375px (iPhone SE)
- Medium : 375px - 414px (iPhone standard)
- Large : 414px - 768px (iPhone Plus, petites tablettes)

**Adaptations :**
- Padding réduit sur small (12px au lieu de 16px)
- Font-size -2px sur small
- Grilles : 2 colonnes fixe sur mobile

---

## ♿ ACCESSIBILITÉ

**Contraste :**
- Tous les textes : ratio ≥ 4.5:1
- Boutons : ratio ≥ 3:1

**Touch targets :**
- Minimum : 44x44px (recommandation Apple/Android)
- Boutons, icônes, liens respectent cette taille

**Navigation clavier :**
- Ordre logique (top → bottom)
- Focus visible sur tous éléments interactifs

**Labels :**
- Tous inputs ont un label visible
- Icônes importantes ont aria-label
- Images ont alt text

---

## 🔄 NAVIGATION ENTRE ÉCRANS

### **Flow principal**

Landing (1)
↓
Login/Register (2)
↓
Home (3) ←→ Recherche (4) → Détail (6)
↓            ↓
Bibliothèque (5) → Détail (6)
↓
Profil (7)

### **Bottom Navigation (écrans 3-7)**

Home (3) ← Recherche (4) ← Bibliothèque (5) ← Profil (7)

---

## 📅 HISTORIQUE

| Date | Version | Modification |
|------|---------|--------------|
| 09/10/2025 | 0.5 | Wireframes 1-3 (Landing, Login, Home) |
| 10/10/2025 | 1.0 | Wireframes 4-7 (Recherche, Biblio, Détail, Profil) - COMPLET ✅ |

---

## ✅ WIREFRAMES MOBILE TERMINÉS !

**Prochaine étape : Wireframes Desktop (7 écrans)**

---

**Document validé pour le développement ✅**

