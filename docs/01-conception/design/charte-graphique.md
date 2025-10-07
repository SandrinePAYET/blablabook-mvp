# 🎨 CHARTE GRAPHIQUE - BLABLABOOK

**Projet :** Blablabook - Bibliothèque personnelle  
**Date :** 7 octobre 2025  
**Auteur :** [PAYET Sandrine]  
**Version :** 1.0

---

## 🎯 OBJECTIFS DE LA CHARTE

### **Principes directeurs**

1. **Accessible** → Utilisable par tous, y compris daltoniens
2. **Moderne** → Design contemporain et épuré
3. **Lisible** → Clarté maximale pour faciliter la lecture
4. **Cohérent** → Uniformité sur toutes les pages

### **Public cible**

- Lecteurs passionnés (25-40 ans)
- Tous niveaux de vision (daltonisme inclus)
- Multi-supports (mobile, tablette, desktop)

---

## 🎨 PALETTE DE COULEURS

### **Couleurs principales**

#### **Bleu Profond - Couleur primaire**

Nom : Bleu Bibliothèque
Code HEX : 
#1E3A8A
RGB : rgb(30, 58, 138)
Utilisation :

En-têtes
Boutons principaux
Navigation
Liens
Signification : Confiance, savoir, stabilité Accessible : ✅ Excellent contraste sur blanc (8.59:1)

#### **Orange Ambre - Couleur secondaire**

Nom : Orange Chaleureux
Code HEX : 
#F59E0B
RGB : rgb(245, 158, 11)
Utilisation :

Boutons d'action (Ajouter, Valider)
Éléments interactifs
Hover states
Icônes importantes
Signification : Énergie, créativité, action
Accessible : ✅ Visible par les daltoniens (contraste avec bleu)

---

### **Couleurs d'état**

#### **Succès - Vert Menthe**

Code HEX : 
#10B981
RGB : rgb(16, 185, 129)
Utilisation :

- Messages de confirmation
- Badges de succès
- Toujours avec icône ✓
Note : ⚠️ Ne JAMAIS utiliser seul (+ icône obligatoire)

#### **Erreur - Rouge Corail**

Code HEX : 
#EF4444
RGB : rgb(239, 68, 68)
Utilisation :

- Messages d'erreur
- Champs invalides
- Toujours avec icône ✗
Note : ⚠️ Ne JAMAIS utiliser seul (+ icône obligatoire)

#### **Information - Bleu Ciel**

Code HEX : 
#3B82F6
RGB : rgb(59, 130, 246)
Utilisation :

- Messages informatifs
- Tooltips
- Toujours avec icône ℹ

---

### **Couleurs neutres**

#### **Texte principal**

Gris Anthracite : 
#1F2937 RGB : rgb(31, 41, 55) Utilisation : Corps de texte Contraste sur blanc : 16:1 (AAA)

#### **Texte secondaire**

Gris Moyen : 
#6B7280 RGB : rgb(107, 114, 128) Utilisation : Sous-titres, métadonnées Contraste sur blanc : 5.74:1 (AA)

#### **Bordures**

Gris Clair : 
#E5E7EB
RGB : rgb(229, 231, 235)
Utilisation : Séparateurs, contours

#### **Fond secondaire**

Gris Très Clair : 
#F3F4F6
RGB : rgb(243, 244, 246)
Utilisation : Cartes, sections

#### **Fond principal**

Blanc : 
#FFFFFF
RGB : rgb(255, 255, 255)
Utilisation : Fond de page

---

### **Dégradés (optionnel)**

Dégradé Bleu → Bleu Clair
De : 
#1E3A8A
À : 
#3B82F6
Utilisation : Headers, hero sections

---

## ♿ ACCESSIBILITÉ COULEURS

### **Tests de contraste WCAG 2.1 niveau AA**

| Combinaison | Ratio | Statut | Usage |
|-------------|-------|--------|-------|
| Bleu (#1E3A8A) sur Blanc | 8.59:1 | AAA ✅ | Texte |
| Orange (#F59E0B) sur Blanc | 2.18:1 | ❌ | Fond uniquement |
| Gris foncé (#1F2937) sur Blanc | 16:1 | AAA ✅ | Texte |
| Blanc sur Bleu (#1E3A8A) | 8.59:1 | AAA ✅ | Boutons |
| Blanc sur Orange (#F59E0B) | 2.18:1 | ❌ | Ne pas utiliser |

**Règle importante :** 
- Orange UNIQUEMENT pour les fonds de boutons avec texte blanc OU texte foncé
- Toujours tester avec https://webaim.org/resources/contrastchecker/

---

### **Compatibilité daltonisme**

**Types testés :**

✅ **Deutéranopie** (rouge/vert) → Bleu et Orange restent distincts  
✅ **Protanopie** (rouge) → Palette visible  
✅ **Tritanopie** (bleu/jaune) → Orange reste visible  

**Principe clé :**
→ Ne JAMAIS utiliser uniquement la couleur pour transmettre une information
→ TOUJOURS ajouter une icône, un texte ou une forme

**Exemple :**

❌ MAUVAIS : Bouton vert = valide, bouton rouge = annuler
✅ BON : Bouton vert + icône ✓ + texte "Valider"
Bouton rouge + icône ✗ + texte "Annuler"

---

## ✍️ TYPOGRAPHIE

### **Police principale : Inter**

Famille : Inter (Google Fonts) Type : Sans-serif URL : https://fonts.google.com/specimen/Inter Graisses utilisées :

- Regular (400) → Texte courant
- Medium (500) → Sous-titres
- SemiBold (600) → Titres secondaires
- Bold (700) → Titres principaux
Pourquoi Inter ?
✅ Excellente lisibilité
✅ Moderne et épurée
✅ Optimisée pour écrans
✅ Gratuite (Google Fonts)
✅ Supporte le français (accents)

**Code d'import :**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

CSS :
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

Police secondaire : Poppins (titres)
Famille : Poppins (Google Fonts)
Type : Sans-serif géométrique
URL : https://fonts.google.com/specimen/Poppins
Graisses utilisées :
- SemiBold (600) → Titres de page
- Bold (700) → Titre principal (H1)

Pourquoi Poppins ?
✅ Personnalité chaleureuse
✅ Contraste avec Inter
✅ Parfaite pour les titres
✅ Gratuite

Code d'import :
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap" rel="stylesheet">

Hiérarchie typographique
/* Titre principal H1 */
font-family: 'Poppins', sans-serif;
font-size: 48px;
font-weight: 700;
line-height: 1.2;
color: #1F2937;

/* Titre H2 */
font-family: 'Poppins', sans-serif;
font-size: 36px;
font-weight: 600;
line-height: 1.3;
color: #1F2937;

/* Titre H3 */
font-family: 'Inter', sans-serif;
font-size: 24px;
font-weight: 600;
line-height: 1.4;
color: #1F2937;

/* Titre H4 */
font-family: 'Inter', sans-serif;
font-size: 20px;
font-weight: 600;
line-height: 1.4;
color: #1F2937;

/* Corps de texte */
font-family: 'Inter', sans-serif;
font-size: 16px;
font-weight: 400;
line-height: 1.6;
color: #1F2937;

/* Petit texte */
font-family: 'Inter', sans-serif;
font-size: 14px;
font-weight: 400;
line-height: 1.5;
color: #6B7280;

Responsive - Tailles mobiles
/* Mobile (< 768px) */
H1 : 32px
H2 : 28px
H3 : 20px
Corps : 16px
Petit : 14px

🎭 STYLE VISUEL
Principes généraux
Style : Moderne et épuré
Mood : Chaleureux mais professionnel
Inspiration : Bibliothèques modernes, applications de lecture

Coins arrondis (Border radius)
Boutons : 8px (border-radius: 8px)
Cartes : 12px (border-radius: 12px)
Champs de saisie : 8px
Images de couverture : 6px
Badges : 16px (arrondis complets)
Pourquoi ? → Arrondis = doux, accueillant → Pas trop arrondis = reste professionnel


Ombres (Shadows)
/* Ombre légère (cartes) */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

/* Ombre moyenne (hover) */
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

/* Ombre forte (modales) */
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);

Usage :

- Cartes de livres : Ombre légère
- Hover : Ombre moyenne
- Modales/Popovers : Ombre forte

Espacements (Spacing)
Système 8px :
4px  (0.25rem) → Très petit
8px  (0.5rem)  → Petit
16px (1rem)    → Moyen
24px (1.5rem)  → Grand
32px (2rem)    → Très grand
48px (3rem)    → Extra grand

Application :

- Padding boutons : 12px 24px
- Margin entre sections : 48px
- Gap dans les grilles : 24px

Transitions et animations
/* Transition standard */
transition: all 0.2s ease-in-out;

/* Hover boutons */
transform: translateY(-2px);
transition: transform 0.2s ease;

/* Pas d'animations agressives */
→ Subtiles et rapides (200-300ms max)

🧩 COMPOSANTS UI
Boutons
Bouton primaire
background: #1E3A8A (Bleu)
color: #FFFFFF (Blanc)
padding: 12px 24px
border-radius: 8px
font-weight: 600
hover: background #1E40AF (Bleu plus clair)

Bouton secondaire
background: transparent
color: #1E3A8A
border: 2px solid #1E3A8A
padding: 12px 24px
border-radius: 8px
font-weight: 600
hover: background #1E3A8A, color #FFFFFF

Bouton action (Ajouter, Valider)
background: #F59E0B (Orange)
color: #1F2937 (Gris foncé)
padding: 12px 24px
border-radius: 8px
font-weight: 600
hover: background #F59E0B avec opacity 0.9

Cartes de livres
background: #FFFFFF
border: 1px solid #E5E7EB
border-radius: 12px
padding: 16px
box-shadow: 0 1px 3px rgba(0,0,0,0.1)

hover:
  box-shadow: 0 4px 6px rgba(0,0,0,0.1)
  transform: translateY(-4px)
  transition: all 0.2s ease

  Champs de formulaire
  background: #FFFFFF
border: 1px solid #E5E7EB
border-radius: 8px
padding: 12px 16px
font-size: 16px
color: #1F2937

focus:
  border-color: #1E3A8A
  outline: none
  box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1)

error:
  border-color: #EF4444

Navigation
background: #1E3A8A (Bleu)
height: 64px
padding: 0 24px
color: #FFFFFF

Links:
  color: #FFFFFF
  font-weight: 500
  hover: color #F59E0B (Orange)

📱 RESPONSIVE DESIGN
Breakpoints
/* Mobile first */
Base : 320px+
Tablet : 768px+
Desktop : 1024px+
Large : 1280px+

Comportements
Mobile (< 768px) :

Navigation : Hamburger menu
Grille livres : 2 colonnes
Padding réduit : 16px
Tablet (768px - 1023px) :

Navigation : Horizontale condensée
Grille livres : 3 colonnes
Desktop (1024px+) :

Navigation : Complète
Grille livres : 4-5 colonnes
Sidebar possible
🖼️ IMAGES ET ICÔNES
Couvertures de livres

aspect-ratio: 2/3 (portrait)
border-radius: 6px
object-fit: cover
max-width: 200px

Placeholder si pas d'image:
  background: linear-gradient(135deg, #1E3A8A, #3B82F6)
  Icône livre au centre

Icônes
Bibliothèque d'icônes : Lucide Icons

URL : https://lucide.dev
Style : Outline (contour)
Taille standard : 24px
Couleur : Hérite du texte parent
Exemples utilisés :

🔍 Search
📚 Book
➕ Plus
✓ Check
✗ X
👤 User
⚙️ Settings
✅ CHECKLIST ACCESSIBILITÉ
Contraste
 Tous les textes ont un ratio ≥ 4.5:1
 Les boutons respectent le contraste
 Testés avec WebAIM Contrast Checker
Couleur
 Palette compatible daltonisme (bleu/orange)
 Pas d'information uniquement par couleur
 Icônes ajoutées aux messages d'état
Typographie
 Polices lisibles (Inter, Poppins)
 Taille minimum 16px
 Line-height ≥ 1.5
Navigation
 Focus visible sur tous les éléments
 Ordre logique au clavier
 Skip links prévus
Images
 Textes alternatifs (alt) obligatoires
 Icônes décoratives : aria-hidden="true"

🎨 EXEMPLES VISUELS

Page d'accueil

Header : Fond Bleu (#1E3A8A), texte Blanc
Hero : Titre Poppins Bold 48px, CTA Orange
Grille livres : Cartes blanches, ombres légères
Footer : Fond Gris clair (#F3F4F6)

Bouton "Ajouter à ma bibliothèque"

Fond : Orange (#F59E0B)
Texte : Gris foncé (#1F2937), Inter SemiBold
Icône : Plus (+) 20px, même couleur que texte
Hover : Légère élévation (translateY -2px)

Message de succès

Fond : Vert clair (#D1FAE5)
Bordure gauche : 4px Vert (#10B981)
Icône : ✓ Vert
Texte : "Livre ajouté avec succès !" Inter Regular

📦 EXPORT TAILWIND

Configuration Tailwind CSS :

// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E3A8A',
          light: '#3B82F6',
        },
        secondary: {
          DEFAULT: '#F59E0B',
        },
        success: '#10B981',
        error: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
      },
    },
  },
}

📅 ÉVOLUTIONS FUTURES
Post-MVP (hors scope actuel) :

 Mode sombre (dark mode)
 Thèmes personnalisables
 Animations de transition de page
 Illustrations custom
📝 VALIDATION
Cette charte graphique :

- ✅ Respecte WCAG 2.1 niveau AA
- ✅ Compatible daltonisme
- ✅ Moderne et professionnelle
- ✅ Cohérente et réutilisable
- ✅ Prête pour le développement
