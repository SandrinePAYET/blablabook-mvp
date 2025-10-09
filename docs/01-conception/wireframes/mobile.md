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

**À compléter lors de la prochaine session.**

---

## 📅 HISTORIQUE

| Date | Version | Modification |
|------|---------|--------------|
| 09/10/2025 | 0.5 | Wireframes 1-3 (Landing, Login, Home) |

---

**Document en cours de rédaction...**

