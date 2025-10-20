# 🖥️ WIREFRAMES DESKTOP - BLABLABOOK

**Projet :** Blablabook  
**Date :** 20 octobre 2025  
**Format :** Desktop (1024px+)  
**Approche :** Adaptation des wireframes mobile

---

## 🎯 PRINCIPE DESKTOP

Les wireframes desktop sont des **adaptations** des wireframes mobile, optimisées pour grands écrans.

### **Différences principales :**

**Layout :**
- Navigation horizontale (pas de hamburger menu)
- Sidebar possible
- Grilles 3-4 colonnes (au lieu de 2)
- Contenu côte à côte (au lieu de vertical)

**Interactions :**
- Hover states sur boutons/cards
- Tooltips sur icônes
- Modales plus grandes
- Formulaires side-by-side

---

## 🏠 ÉCRAN 1 : LANDING PAGE (Desktop)

### **Layout principal**
```
┌──────────────────────────────────────────────────────────┐
│  BLABLABOOK          [Fonctionnalités] [À propos]  [Connexion] │ ← Nav horizontale
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────┐  ┌───────────────────────────┐     │
│  │   [Logo 📚]    │  │  Gérez votre bibliothèque │     │ ← Hero 2 colonnes
│  │   Grande       │  │  personnelle simplement   │     │
│  └────────────────┘  │                           │     │
│                      │  [S'inscrire gratuitement]│     │
│                      │  [Déjà inscrit ? →]       │     │
│                      └───────────────────────────┘     │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ✨ Fonctionnalités                                      │
│                                                          │
│  [🔍]               [📚]               [📱]             │ ← 3 colonnes
│  Recherchez         Organisez          Accédez          │
│  Millions de refs   Votre collection   Partout          │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  © 2025 Blablabook  [Mentions] [CGU] [Contact]          │
└──────────────────────────────────────────────────────────┘
```

**Adaptations desktop :**
- Hero : 2 colonnes (image gauche, texte droite)
- Features : 3 colonnes horizontales
- Navigation : Barre horizontale complète
- Footer : Liens horizontaux

---

## 🔐 ÉCRAN 2 : CONNEXION (Desktop)

### **Layout modal centré**
```
┌──────────────────────────────────────────────────────────┐
│  BLABLABOOK                                   [Accueil]  │
├──────────────────────────────────────────────────────────┤
│                                                          │
│              ┌─────────────────────────┐                │
│              │  [Connexion] [Inscription] │              │ ← Onglets
│              │  ──────────              │                │
│              │                          │                │
│              │  Email                   │                │
│              │  [____________________]  │                │ ← Formulaire centré
│              │                          │                │
│              │  Mot de passe            │                │
│              │  [____________________]  │                │
│              │                          │                │
│              │  [Se connecter →]        │                │
│              │                          │                │
│              └─────────────────────────┘                │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Adaptations desktop :**
- Formulaire centré (max-width 400px)
- Plus d'espace autour
- Même logique que mobile

---

## 🏠 ÉCRAN 3 : ACCUEIL CONNECTÉ (Desktop)

### **Layout avec sidebar**
```
┌──────────────────────────────────────────────────────────┐
│  ☰ BLABLABOOK    [Rechercher...]           [👤 Marie]   │ ← Header
├────────┬─────────────────────────────────────────────────┤
│        │                                                 │
│  [🏠]  │  Bonjour Marie ! 👋                            │
│  Home  │                                                 │
│        │  Ma bibliothèque (12 livres)                    │
│  [🔍]  │                                                 │
│  Rech  │  [📖]  [📖]  [📖]  [📖]                       │ ← Grille 4 colonnes
│        │  Titre Titre Titre Titre                       │
│  [📚]  │                                                 │
│  Biblio│  [📖]  [📖]  [📖]  [📖]                       │
│        │  Titre Titre Titre Titre                       │
│  [👤]  │                                                 │
│  Profil│  [Voir toute ma bibliothèque →]                │
│        │                                                 │
└────────┴─────────────────────────────────────────────────┘
```

**Adaptations desktop :**
- Sidebar navigation gauche (fixe)
- Grille 4 colonnes (au lieu de 2)
- Barre recherche dans header
- Plus de contenu visible

---

## 🔍 ÉCRAN 4 : RECHERCHE (Desktop)

### **Layout 2 colonnes**
```
┌──────────────────────────────────────────────────────────┐
│  [←] BLABLABOOK    [Rechercher: Harry Potter...]   [👤] │
├────────┬─────────────────────────────────────────────────┤
│        │                                                 │
│  [🏠]  │  12 résultats pour "Harry Potter"              │
│        │                                                 │
│  [🔍]  │  ┌────────────────────────────────────┐        │
│        │  │ [📖] Harry Potter à l'école...     │        │ ← Liste large
│  [📚]  │  │      J.K. Rowling - 1997           │        │
│        │  │                    [+ Ajouter]     │        │
│  [👤]  │  └────────────────────────────────────┘        │
│        │                                                 │
│        │  ┌────────────────────────────────────┐        │
│        │  │ [📖] Harry Potter et la chambre... │        │
│        │  │      J.K. Rowling - 1998           │        │
│        │  │                    [+ Ajouter]     │        │
│        │  └────────────────────────────────────┘        │
│        │                                                 │
└────────┴─────────────────────────────────────────────────┘
```

**Adaptations desktop :**
- Cards plus larges (horizontal layout)
- Cover + infos côte à côte
- Plus de métadonnées visibles
- Hover effects sur cards

---

## 📚 ÉCRAN 5 : BIBLIOTHÈQUE (Desktop)

### **Layout grille large**
```
┌──────────────────────────────────────────────────────────┐
│  BLABLABOOK         Ma bibliothèque (12)    [Tri ▼] [👤]│
├────────┬─────────────────────────────────────────────────┤
│        │                                                 │
│  [🏠]  │  [📖]    [📖]    [📖]    [📖]    [📖]         │ ← Grille 5 colonnes
│        │  Titre   Titre   Titre   Titre   Titre         │
│  [🔍]  │  Auteur  Auteur  Auteur  Auteur  Auteur        │
│        │                                                 │
│  [📚]  │  [📖]    [📖]    [📖]    [📖]    [📖]         │
│        │  Titre   Titre   Titre   Titre   Titre         │
│  [👤]  │  Auteur  Auteur  Auteur  Auteur  Auteur        │
│        │                                                 │
│        │  [📖]    [📖]                                   │
│        │  Titre   Titre                                  │
│        │  Auteur  Auteur                                 │
│        │                                                 │
└────────┴─────────────────────────────────────────────────┘
```

**Adaptations desktop :**
- Grille 5 colonnes
- Cards avec hover effect (élévation)
- Actions au hover (œil, poubelle)
- Tri dans header

---

## 📖 ÉCRAN 6 : DÉTAIL LIVRE (Desktop)

### **Layout 2 colonnes**
```
┌──────────────────────────────────────────────────────────┐
│  [←] BLABLABOOK                                     [👤] │
├────────┬─────────────────────────────────────────────────┤
│        │                                                 │
│  [🏠]  │  ┌────────┐  Harry Potter à l'école des...    │ ← 2 colonnes
│        │  │        │  J.K. Rowling                      │
│  [🔍]  │  │  [📖]  │  Publié en 1997                    │
│        │  │        │                                     │
│  [📚]  │  │200x300 │  [+ Ajouter à ma bibliothèque]     │
│        │  │        │                                     │
│  [👤]  │  └────────┘  📝 Résumé                         │
│        │              Harry Potter, un jeune orphelin,  │
│        │              découvre le jour de ses onze...   │
│        │                                                 │
│        │              ℹ️ Informations                    │
│        │              ISBN : 978-2070541270             │
│        │              Pages : 320                        │
│        │              Éditeur : Gallimard               │
│        │                                                 │
└────────┴─────────────────────────────────────────────────┘
```

**Adaptations desktop :**
- Image gauche, infos droite
- Plus d'espace pour résumé complet
- Toutes les métadonnées visibles
- Pas de scroll nécessaire

---

## 👤 ÉCRAN 7 : PROFIL (Desktop)

### **Layout 2 colonnes**
```
┌──────────────────────────────────────────────────────────┐
│  BLABLABOOK                      Mon profil         [👤] │
├────────┬─────────────────────────────────────────────────┤
│        │  ┌──────────────┐  ┌──────────────────────┐    │
│  [🏠]  │  │   [👤]       │  │  marie@example.com    │    │ ← 2 colonnes
│        │  │              │  │  Membre depuis oct 25 │    │
│  [🔍]  │  │ Avatar 100px │  │                       │    │
│        │  │              │  │  📊 Statistiques      │    │
│  [📚]  │  └──────────────┘  │                       │    │
│        │                    │  12 livres  45 pages  │    │
│  [👤]  │                    │                       │    │
│        │                    │  ⚙️ Paramètres        │    │
│        │                    │  → Modifier email     │    │
│        │                    │  → Changer MDP        │    │
│        │                    │                       │    │
│        │                    │  [Se déconnecter]     │    │
│        │                    └──────────────────────┘    │
└────────┴─────────────────────────────────────────────────┘
```

**Adaptations desktop :**
- Avatar gauche, infos droite
- Statistiques côte à côte
- Plus d'espace pour options

---

## 📱 vs 🖥️ RÉSUMÉ DES DIFFÉRENCES

| Aspect | Mobile | Desktop |
|--------|--------|---------|
| **Navigation** | Bottom nav | Sidebar gauche |
| **Grille livres** | 2 colonnes | 4-5 colonnes |
| **Formulaires** | Vertical | Centré/Modal |
| **Hero** | Vertical | 2 colonnes |
| **Cards détail** | Vertical | Horizontal |
| **Largeur max** | 375-768px | 1024-1920px |

---

## ✅ WIREFRAMES DESKTOP - COMPLET !

**Approche :** Adaptation responsive des wireframes mobile  
**Statut :** Prêt pour le développement

---

## 📅 HISTORIQUE

| Date | Version | Modification |
|------|---------|--------------|
| 20/10/2025 | 1.0 | Wireframes desktop (version adaptative simplifiée) |

---

**Document validé pour le développement ✅**