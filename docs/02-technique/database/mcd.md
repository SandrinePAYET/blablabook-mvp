# 📊 MCD - MODÈLE CONCEPTUEL DE DONNÉES

**Projet :** Blablabook  
**Date :** 6 octobre 2025  
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
- `email` : Adresse email (unique, obligatoire)
- `password` : Mot de passe crypté (obligatoire)
- `createdAt` : Date de création du compte
- `updatedAt` : Date de dernière modification

**Règles métier :**
- L'email doit être unique
- Le mot de passe doit faire minimum 8 caractères
- Le mot de passe est haché avec bcrypt

---

### **Entité 2 : BOOK**

**Description :** Livre référencé dans l'application

**Attributs :**
- `id` : Identifiant unique (clé primaire)
- `openLibraryId` : Identifiant depuis l'API Open Library (unique)
- `title` : Titre du livre (obligatoire)
- `author` : Auteur du livre
- `publishedDate` : Année de publication
- `coverUrl` : URL de la couverture du livre
- `description` : Résumé ou description
- `isbn` : Code ISBN (optionnel)
- `createdAt` : Date d'ajout dans la base
- `updatedAt` : Date de dernière modification

**Règles métier :**
- Un livre ne peut être créé qu'une seule fois (pas de doublon)
- L'openLibraryId est unique
- Le titre est obligatoire

---

### **Entité 3 : USERBOOK**

**Description :** Association entre un utilisateur et un livre (bibliothèque personnelle)

**Attributs :**
- `id` : Identifiant unique (clé primaire)
- `userId` : Identifiant de l'utilisateur (clé étrangère → User)
- `bookId` : Identifiant du livre (clé étrangère → Book)
- `addedAt` : Date d'ajout du livre à la bibliothèque

**Règles métier :**
- Un utilisateur ne peut pas ajouter le même livre deux fois
- La paire (userId, bookId) doit être unique

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

---

### **Relation 2 : BOOK ↔ USERBOOK**

**Type :** 1,N (Un à plusieurs)

**Description :**
- Un livre peut être dans la bibliothèque de **plusieurs** utilisateurs
- Un enregistrement UserBook fait référence à **un seul** livre

**Cardinalités :**
- Book (1,N) → Un book peut avoir 0 ou plusieurs UserBook
- UserBook (1,1) → Un UserBook fait référence à exactement 1 book

---

## 📐 SCHÉMA MCD

### **Représentation textuelle :**

┌───────────────────────┐
│        USER           │
├───────────────────────┤
│ PK  id                │
│     email             │
│     password          │
│     createdAt         │
│     updatedAt         │
└───────────────────────┘
│
│ 1,N
│
▼
┌───────────────────────┐
│      USERBOOK         │
├───────────────────────┤
│ PK  id                │
│ FK  userId            │───┐
│ FK  bookId            │   │
│     addedAt           │   │
└───────────────────────┘   │
│
│ 1,N
│
▼
┌───────────────────────┐
│        BOOK           │
├───────────────────────┤
│ PK  id                │
│     openLibraryId     │
│     title             │
│     author            │
│     publishedDate     │
│     coverUrl          │
│     description       │
│     isbn              │
│     createdAt         │
│     updatedAt         │
└───────────────────────┘

**Légende :**
- PK = Primary Key (Clé primaire)
- FK = Foreign Key (Clé étrangère)

---

## 📝 EXPLICATION SIMPLIFIÉE

### **Comment ça fonctionne ?**

**Exemple concret :**

1. **Marie s'inscrit** → Création d'un USER

User { id: 1, email: "marie@example.com", ... }

2. **Marie cherche "Harry Potter"** → API externe trouve le livre

3. **Marie ajoute le livre** → Création d'un BOOK (si pas déjà existant)

Book { id: 1, title: "Harry Potter", author: "J.K. Rowling", ... }

4. **Création du lien** → Création d'un USERBOOK

UserBook { id: 1, userId: 1, bookId: 1, addedAt: "2025-10-06" }

5. **Pierre ajoute aussi "Harry Potter"** → Pas de nouveau Book, juste un UserBook

UserBook { id: 2, userId: 2, bookId: 1, addedAt: "2025-10-07" }

**Résultat :**
- 1 livre dans la base (Book)
- 2 utilisateurs qui l'ont (2 UserBook)
- Pas de duplication de données !

---

## ✅ AVANTAGES DE CE MODÈLE

**Pas de duplication :**
- Un livre n'est stocké qu'une seule fois
- Même si 100 utilisateurs l'ont

**Performances :**
- Requêtes rapides grâce aux clés étrangères
- Indexation possible sur userId et bookId

**Flexibilité :**
- Facile d'ajouter de nouvelles fonctionnalités
- Exemple : date de lecture, note, statut (lu/non lu)

**Intégrité :**
- Pas de livre orphelin
- Pas d'utilisateur orphelin
- Relations garanties par la base de données

---

## 🔄 ÉVOLUTIONS POSSIBLES (Hors MVP)

**Futures fonctionnalités qui pourraient s'ajouter :**

### **Statut de lecture**
Ajouter dans UserBook :
- `status` : "à lire", "en cours", "lu"
- `rating` : Note sur 5

### **Listes personnalisées**
Nouvelle entité :
- `List` (id, userId, name)
- `ListBook` (listId, bookId)

### **Commentaires**
Nouvelle entité :
- `Review` (id, userId, bookId, comment, rating)

**→ Mais pour le MVP, on reste sur le modèle simple ! ✓**

---

## 📅 HISTORIQUE

| Date | Version | Modification |
|------|---------|--------------|
| 06/10/2025 | 1.0 | Création du MCD initial |

---

**Document validé pour le développement ✅**

**Résultat :**
- 1 livre dans la base (Book)
- 2 utilisateurs qui l'ont (2 UserBook)
- Pas de duplication de données !

---

## ✅ AVANTAGES DE CE MODÈLE

**Pas de duplication :**
- Un livre n'est stocké qu'une seule fois
- Même si 100 utilisateurs l'ont

**Performances :**
- Requêtes rapides grâce aux clés étrangères
- Indexation possible sur userId et bookId

**Flexibilité :**
- Facile d'ajouter de nouvelles fonctionnalités
- Exemple : date de lecture, note, statut (lu/non lu)

**Intégrité :**
- Pas de livre orphelin
- Pas d'utilisateur orphelin
- Relations garanties par la base de données

---

## 🔄 ÉVOLUTIONS POSSIBLES (Hors MVP)

**Futures fonctionnalités qui pourraient s'ajouter :**

### **Statut de lecture**
Ajouter dans UserBook :
- `status` : "à lire", "en cours", "lu"
- `rating` : Note sur 5

### **Listes personnalisées**
Nouvelle entité :
- `List` (id, userId, name)
- `ListBook` (listId, bookId)

### **Commentaires**
Nouvelle entité :
- `Review` (id, userId, bookId, comment, rating)

**→ Mais pour le MVP, on reste sur le modèle simple ! ✓**

---

## 📅 HISTORIQUE

| Date | Version | Modification |
|------|---------|--------------|
| 06/10/2025 | 1.0 | Création du MCD initial |

---

**Document validé pour le développement ✅**