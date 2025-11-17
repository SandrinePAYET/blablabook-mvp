# 📊 MCD - MODÈLE CONCEPTUEL DE DONNÉES

**Projet :** Blablabook
**Date :** 17 novembre 2025
**Auteur :** [PAYET Sandrine]

---

## 🎯 OBJECTIF DU MCD

Définir les entités et leurs relations pour la base de données de Blablabook.

---

## 📦 ENTITÉS PRINCIPALES

### **Entité 1 : USER**

**Description :** Utilisateur inscrit sur Blablabook

**Attributs :**
- `id` : Identifiant unique (clé primaire)
- `username` : Nom d'utilisateur (unique, obligatoire)
- `email` : Adresse email (unique, obligatoire)
- `password` : Mot de passe crypté (obligatoire)
- `first_name` : Prénom (optionnel)
- `last_name` : Nom (optionnel)
- `created_at` : Date de création du compte
- `updated_at` : Date de dernière modification

**Règles métier :**
- Le `username` doit être unique et contenir entre 3 et 50 caractères
- L'email doit être unique et au format valide
- Le mot de passe doit faire minimum 8 caractères avant cryptage
- Le mot de passe est haché avec bcrypt (10 rounds)
- `first_name` et `last_name` sont optionnels

---

### **Entité 2 : BOOK**

**Description :** Livre référencé dans l'application

**Attributs :**
- `id` : Identifiant unique (clé primaire)
- `open_library_id` : Identifiant depuis l'API Open Library (unique, obligatoire)
- `title` : Titre du livre (obligatoire)
- `author` : Auteur du livre (optionnel)
- `published_year` : Année de publication (optionnel)
- `isbn` : Code ISBN (optionnel)
- `cover_url` : URL de la couverture du livre (optionnel)
- `description` : Résumé ou description (optionnel)
- `page_count` : Nombre de pages (optionnel)
- `created_at` : Date d'ajout dans la base
- `updated_at` : Date de dernière modification

**Règles métier :**
- Un livre ne peut être créé qu'une seule fois (pas de doublon)
- L'`open_library_id` est unique et obligatoire
- Le `title` est obligatoire (entre 1 et 500 caractères)
- `published_year` doit être supérieur à 1000 et ne peut pas être dans le futur
- `page_count` doit être supérieur à 0 si renseigné

---

### **Entité 3 : USERBOOK**

**Description :** Association entre un utilisateur et un livre (bibliothèque personnelle)

**Attributs :**
- `id` : Identifiant unique (clé primaire)
- `user_id` : Identifiant de l'utilisateur (clé étrangère → User)
- `book_id` : Identifiant du livre (clé étrangère → Book)
- `status` : Statut de lecture (ENUM: 'to_read', 'reading', 'read')
- `rating` : Note du livre de 1 à 5 étoiles (optionnel)
- `review` : Avis personnel sur le livre (optionnel, max 2000 caractères)
- `created_at` : Date d'ajout du livre à la bibliothèque
- `updated_at` : Date de dernière modification

**Règles métier :**
- Un utilisateur ne peut pas ajouter le même livre deux fois
- La paire (user_id, book_id) doit être unique
- `status` est obligatoire et vaut 'to_read' par défaut
- `rating` doit être entre 1 et 5 si renseigné
- `review` ne peut pas dépasser 2000 caractères
- Si un utilisateur est supprimé → ses UserBook sont supprimés (CASCADE)
- Si un livre est supprimé → les UserBook associés sont supprimés (CASCADE)

---

## 🔗 RELATIONS

### **Relation 1 : USER ↔ USERBOOK**

**Type :** 1,N (Un à plusieurs)

**Description :**
- Un utilisateur peut avoir **plusieurs** livres dans sa bibliothèque
- Un enregistrement UserBook appartient à **un seul** utilisateur

**Cardinalités :**
- User (1,N) → Un user peut avoir 0 ou plusieurs UserBook
- UserBook (1,1) → Un UserBook appartient à exactement 1 user

**Contrainte :**
- ON DELETE CASCADE : Si on supprime un user, on supprime ses user_books

---

### **Relation 2 : BOOK ↔ USERBOOK**

**Type :** 1,N (Un à plusieurs)

**Description :**
- Un livre peut être dans la bibliothèque de **plusieurs** utilisateurs
- Un enregistrement UserBook fait référence à **un seul** livre

**Cardinalités :**
- Book (1,N) → Un book peut avoir 0 ou plusieurs UserBook
- UserBook (1,1) → Un UserBook fait référence à exactement 1 book

**Contrainte :**
- ON DELETE CASCADE : Si on supprime un book, on supprime ses user_books

---

### **Relation 3 : USER ↔ BOOK (indirecte via USERBOOK)**

**Type :** N:N (Plusieurs à plusieurs)

**Description :**
- Un utilisateur peut avoir **plusieurs** livres
- Un livre peut appartenir à **plusieurs** utilisateurs
- Relation many-to-many implémentée via la table intermédiaire `USERBOOK`
- La table `USERBOOK` permet de stocker des métadonnées spécifiques à chaque association (status, rating, review)

---

## 📐 SCHÉMA MCD

### **Représentation textuelle :**

```
┌───────────────────────┐
│        USER           │
├───────────────────────┤
│ PK  id                │
│     username          │
│     email             │
│     password          │
│     first_name        │
│     last_name         │
│     created_at        │
│     updated_at        │
└───────────────────────┘
         │
         │ 1,N
         │
         ▼
┌───────────────────────┐       1,1        ┌───────────────────────┐
│      USERBOOK         │◄─────────────────│        BOOK           │
├───────────────────────┤                  ├───────────────────────┤
│ PK  id                │                  │ PK  id                │
│ FK  user_id           │                  │     open_library_id   │
│ FK  book_id           │──────────────────│     title             │
│     status            │       1,1        │     author            │
│     rating            │                  │     published_year    │
│     review            │                  │     isbn              │
│     created_at        │                  │     cover_url         │
│     updated_at        │                  │     description       │
└───────────────────────┘                  │     page_count        │
                                            │     created_at        │
                                            │     updated_at        │
                                            └───────────────────────┘
                                                     ▲
                                                     │ 1,N
                                                     │
```

**Légende :**
- PK = Primary Key (Clé primaire)
- FK = Foreign Key (Clé étrangère)
- 1,N = Relation un à plusieurs
- 1,1 = Relation un à un (du point de vue de UserBook)

---

## 📝 EXPLICATION SIMPLIFIÉE

### **Comment ça fonctionne ?**

**Exemple concret :**

1. **Marie s'inscrit** → Création d'un USER
   ```
   User {
     id: 1,
     username: "marie_dupont",
     email: "marie@example.com",
     first_name: "Marie",
     last_name: "Dupont",
     ...
   }
   ```

2. **Marie cherche "Harry Potter"** → API Open Library trouve le livre

3. **Marie ajoute le livre** → Création d'un BOOK (si pas déjà existant)
   ```
   Book {
     id: 1,
     open_library_id: "OL123456W",
     title: "Harry Potter à l'école des sorciers",
     author: "J.K. Rowling",
     published_year: 1997,
     page_count: 320,
     ...
   }
   ```

4. **Création du lien** → Création d'un USERBOOK
   ```
   UserBook {
     id: 1,
     user_id: 1,
     book_id: 1,
     status: "to_read",
     rating: null,
     review: null,
     created_at: "2025-10-06 19:40:00"
   }
   ```

5. **Marie commence à lire et note le livre** → Mise à jour du USERBOOK
   ```
   UserBook {
     id: 1,
     user_id: 1,
     book_id: 1,
     status: "reading",        // ← Modifié
     rating: 4.5,              // ← Ajouté
     review: "Captivant !",    // ← Ajouté
     updated_at: "2025-10-08 20:15:00"  // ← Mis à jour
   }
   ```

6. **Pierre ajoute aussi "Harry Potter"** → Pas de nouveau Book, juste un UserBook
   ```
   UserBook {
     id: 2,
     user_id: 2,
     book_id: 1,  // ← Même book_id !
     status: "to_read",
     created_at: "2025-10-07"
   }
   ```

**Résultat :**
- 1 livre dans la base (Book)
- 2 utilisateurs qui l'ont (2 UserBook)
- Chacun avec ses propres métadonnées (statut, note, avis)
- Pas de duplication des données du livre !

---

## ✅ AVANTAGES DE CE MODÈLE

**Pas de duplication :**
- Un livre n'est stocké qu'une seule fois
- Même si 100 utilisateurs l'ont
- Économie d'espace et cohérence des données

**Métadonnées personnelles :**
- Chaque utilisateur a son propre statut de lecture
- Chaque utilisateur peut noter et commenter indépendamment
- Flexibilité totale pour les préférences personnelles

**Performances :**
- Requêtes rapides grâce aux clés étrangères
- Index sur (user_id, book_id) pour éviter les doublons
- Index séparés sur user_id et book_id pour les recherches

**Flexibilité :**
- Facile d'ajouter de nouvelles fonctionnalités
- Possibilité d'ajouter des champs sans modifier la structure
- Évolution naturelle vers des fonctionnalités avancées

**Intégrité :**
- Contraintes de clés étrangères
- Cascade DELETE automatique
- Unicité garantie par la base de données
- Validation des ENUMs au niveau de la base

---

## 🔄 ÉVOLUTIONS POSSIBLES (Hors MVP)

**Futures fonctionnalités qui pourraient s'ajouter :**

### **Suivi détaillé de lecture**
Ajouter dans UserBook :
- `started_at` : Date de début de lecture
- `finished_at` : Date de fin de lecture
- `reading_progress` : Progression en pages ou %
- `is_favorite` : Marquer comme favori

### **Listes personnalisées**
Nouvelles entités :
- `List` (id, user_id, name, description)
- `ListBook` (list_id, book_id, position)

### **Social & Partage**
Nouvelles entités :
- `UserFollow` (follower_id, followed_id)
- `BookRecommendation` (from_user_id, to_user_id, book_id)
- `ReadingChallenge` (id, name, target_books, year)

### **Statistiques**
Vue matérialisée :
- Livres les plus lus
- Auteurs préférés par utilisateur
- Moyenne des notes par livre

**→ Le MVP actuel inclut déjà status, rating et review ! ✓**

---

## 📊 NORMALISATION

**Forme normale :** 3NF (Troisième Forme Normale)

**Vérification :**
- ✅ 1NF : Tous les attributs sont atomiques
- ✅ 2NF : Pas de dépendance partielle aux clés
- ✅ 3NF : Pas de dépendance transitive

**Aucune anomalie détectée :**
- Pas de redondance
- Pas d'anomalie d'insertion
- Pas d'anomalie de mise à jour
- Pas d'anomalie de suppression

---

## 📅 HISTORIQUE

| Date | Version | Modification |
|------|---------|--------------|
| 06/10/2025 | 1.0 | Création du MCD initial |
| 17/11/2025 | 2.0 | Ajout username, first_name, last_name dans User |
| 17/11/2025 | 2.0 | Correction published_date → published_year dans Book |
| 17/11/2025 | 2.0 | Ajout page_count dans Book |
| 17/11/2025 | 2.0 | Ajout status, rating, review dans UserBook |
| 17/11/2025 | 2.0 | Synchronisation complète avec le code implémenté |

---

**Document validé et implémenté ✅**

