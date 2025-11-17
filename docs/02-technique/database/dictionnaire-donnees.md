# 📖 DICTIONNAIRE DE DONNÉES

**Projet :** Blablabook
**Date :** 17 novembre 2025
**Auteur :** [PAYET Sandrine]

---

## 🎯 OBJECTIF

Décrire précisément chaque attribut de chaque table de la base de données.

---

## 📊 TABLE : USERS

**Description :** Stocke les utilisateurs inscrits sur Blablabook

| Nom du champ | Type | Taille | Contraintes | Description | Exemple |
|--------------|------|--------|-------------|-------------|---------|
| `id` | INTEGER | - | PK, AUTO_INCREMENT | Identifiant unique de l'utilisateur | 1 |
| `username` | VARCHAR | 50 | NOT NULL, UNIQUE | Nom d'utilisateur pour la connexion | marie_dupont |
| `email` | VARCHAR | 255 | NOT NULL, UNIQUE | Adresse email | marie@example.com |
| `password` | VARCHAR | 255 | NOT NULL | Mot de passe crypté (bcrypt) | $2b$10$hash... |
| `first_name` | VARCHAR | 100 | NULL | Prénom de l'utilisateur | Marie |
| `last_name` | VARCHAR | 100 | NULL | Nom de famille de l'utilisateur | Dupont |
| `created_at` | TIMESTAMP | - | DEFAULT NOW() | Date et heure de création du compte | 2025-10-06 19:30:00 |
| `updated_at` | TIMESTAMP | - | DEFAULT NOW() | Date et heure de dernière modification | 2025-10-06 19:30:00 |

**Règles métier :**
- Le `username` doit être unique et contenir entre 3 et 50 caractères
- Le `username` est obligatoire et utilisé pour la connexion
- L'email doit être valide (format email)
- L'email doit être unique dans toute la table
- Le mot de passe doit faire minimum 8 caractères avant cryptage
- Le mot de passe est haché avec bcrypt (10 rounds) avant stockage
- `first_name` et `last_name` sont optionnels (entre 2 et 100 caractères si renseignés)
- `created_at` ne change jamais après création
- `updated_at` est mis à jour automatiquement par Sequelize

**Index :**
- Index sur `email` pour accélérer les recherches
- Index sur `username` pour accélérer les recherches de connexion

---

## 📚 TABLE : BOOKS

**Description :** Stocke les livres référencés dans l'application

| Nom du champ | Type | Taille | Contraintes | Description | Exemple |
|--------------|------|--------|-------------|-------------|---------|
| `id` | INTEGER | - | PK, AUTO_INCREMENT | Identifiant unique du livre | 1 |
| `open_library_id` | VARCHAR | 50 | NOT NULL, UNIQUE | Identifiant depuis l'API Open Library | OL123456W |
| `title` | VARCHAR | 500 | NOT NULL | Titre du livre | Harry Potter à l'école des sorciers |
| `author` | VARCHAR | 300 | NULL | Nom de l'auteur principal | J.K. Rowling |
| `published_year` | INTEGER | - | NULL | Année de publication | 1997 |
| `isbn` | VARCHAR | 20 | NULL | Code ISBN du livre | 978-2070541270 |
| `cover_url` | TEXT | - | NULL | URL complète de la couverture | https://covers.openlibrary.org/... |
| `description` | TEXT | - | NULL | Résumé ou description du livre | Harry Potter, un jeune orphelin... |
| `page_count` | INTEGER | - | NULL | Nombre de pages du livre | 320 |
| `created_at` | TIMESTAMP | - | DEFAULT NOW() | Date d'ajout dans la base | 2025-10-06 19:35:00 |
| `updated_at` | TIMESTAMP | - | DEFAULT NOW() | Date de dernière modification | 2025-10-06 19:35:00 |

**Règles métier :**
- `open_library_id` doit être unique (pas de doublon de livres)
- Le `title` est obligatoire (entre 1 et 500 caractères)
- Les autres champs sont optionnels (peuvent être NULL)
- `published_year` doit être supérieur à 1000 et ne peut pas être dans le futur
- `page_count` doit être supérieur à 0 si renseigné
- Un livre est créé une seule fois, même si plusieurs utilisateurs l'ajoutent
- Les URLs de couverture proviennent de l'API Open Library et doivent être valides
- `updated_at` est mis à jour automatiquement par Sequelize

**Index :**
- Index sur `open_library_id` pour éviter les doublons rapidement
- Index sur `title` pour les recherches de livres

---

## 🔗 TABLE : USER_BOOKS

**Description :** Table de liaison entre utilisateurs et livres (bibliothèques personnelles)

| Nom du champ | Type | Taille | Contraintes | Description | Exemple |
|--------------|------|--------|-------------|-------------|---------|
| `id` | INTEGER | - | PK, AUTO_INCREMENT | Identifiant unique de l'association | 1 |
| `user_id` | INTEGER | - | FK, NOT NULL | Référence vers l'utilisateur | 1 |
| `book_id` | INTEGER | - | FK, NOT NULL | Référence vers le livre | 5 |
| `status` | ENUM | - | DEFAULT 'to_read' | Statut de lecture du livre | to_read |
| `rating` | FLOAT | - | NULL | Note du livre (1 à 5 étoiles) | 4.5 |
| `review` | TEXT | - | NULL | Avis personnel sur le livre | Un livre captivant... |
| `created_at` | TIMESTAMP | - | DEFAULT NOW() | Date d'ajout du livre à la bibliothèque | 2025-10-06 19:40:00 |
| `updated_at` | TIMESTAMP | - | DEFAULT NOW() | Date de dernière modification | 2025-10-06 20:15:00 |

**Valeurs possibles pour `status` :**
- `to_read` : Livre à lire (par défaut)
- `reading` : Livre en cours de lecture
- `read` : Livre déjà lu

**Règles métier :**
- `user_id` référence `users(id)` avec `ON DELETE CASCADE`
- `book_id` référence `books(id)` avec `ON DELETE CASCADE`
- La paire (user_id, book_id) doit être unique
- Un utilisateur ne peut pas ajouter le même livre deux fois
- `status` doit être l'une des trois valeurs : 'to_read', 'reading', 'read'
- `rating` est optionnel et doit être entre 1 et 5 si renseigné
- `review` est optionnel et ne peut pas dépasser 2000 caractères
- Si un utilisateur est supprimé, tous ses `user_books` sont supprimés (CASCADE)
- Si un livre est supprimé, tous les `user_books` associés sont supprimés (CASCADE)
- `created_at` ne change jamais après création
- `updated_at` est mis à jour automatiquement par Sequelize lors des modifications

**Index :**
- Index UNIQUE sur (user_id, book_id) nommé `unique_user_book`
- Index sur `user_id` pour récupérer rapidement la bibliothèque d'un user
- Index sur `book_id` pour savoir quels users ont un livre donné

---

## 📐 RELATIONS ENTRE TABLES

### **Relation 1 : users → user_books**

**Type :** 1:N (Un utilisateur peut avoir plusieurs entrées dans user_books)

**Clé :** `user_books.user_id` → `users.id`

**Suppression :** CASCADE (si on supprime un user, on supprime ses user_books)

---

### **Relation 2 : books → user_books**

**Type :** 1:N (Un livre peut avoir plusieurs entrées dans user_books)

**Clé :** `user_books.book_id` → `books.id`

**Suppression :** CASCADE (si on supprime un book, on supprime ses user_books)

---

### **Relation 3 : users ↔ books (via user_books)**

**Type :** N:N (Plusieurs utilisateurs peuvent avoir plusieurs livres)

**Table intermédiaire :** `user_books`

**Description :** Relation many-to-many permettant à chaque utilisateur d'avoir sa propre bibliothèque avec des métadonnées personnelles (statut, note, avis)

---

## 🔒 CONTRAINTES GLOBALES

### **Contraintes de clés primaires**

Toutes les tables ont une clé primaire `id` de type `SERIAL` (auto-incrémenté).

### **Contraintes d'unicité**

- `users.username` : UNIQUE
- `users.email` : UNIQUE
- `books.open_library_id` : UNIQUE
- `user_books(user_id, book_id)` : UNIQUE (contrainte composite)

### **Contraintes de clés étrangères**

- `user_books.user_id` → `users.id` ON DELETE CASCADE
- `user_books.book_id` → `books.id` ON DELETE CASCADE

### **Contraintes NOT NULL**

**Table users :**
- `username` : NOT NULL
- `email` : NOT NULL
- `password` : NOT NULL

**Table books :**
- `open_library_id` : NOT NULL
- `title` : NOT NULL

**Table user_books :**
- `user_id` : NOT NULL
- `book_id` : NOT NULL

### **Contraintes ENUM**

**Table user_books :**
- `status` : ENUM('to_read', 'reading', 'read')

---

## 💡 TYPES DE DONNÉES - EXPLICATIONS

### **SERIAL**
- Équivalent de AUTO_INCREMENT
- Génère automatiquement un nombre unique
- Utilisé pour les clés primaires

### **VARCHAR(n)**
- Chaîne de caractères de longueur variable
- Maximum n caractères
- Utilisé pour textes courts (email, titre, auteur, username)

### **TEXT**
- Chaîne de caractères de longueur illimitée
- Utilisé pour contenus longs (description, review, URL)

### **INTEGER**
- Nombre entier
- Utilisé pour les IDs, clés étrangères, années, nombre de pages

### **FLOAT**
- Nombre à virgule flottante
- Utilisé pour les notes (permet 4.5, 3.7, etc.)

### **ENUM**
- Liste de valeurs prédéfinies
- Utilisé pour le statut de lecture
- Garantit que seules les valeurs autorisées sont stockées

### **TIMESTAMP**
- Date et heure précises
- Format : YYYY-MM-DD HH:MM:SS
- Utilisé pour les dates de création/modification
- Géré automatiquement par Sequelize

---

## 📊 VOLUMÉTRIE ESTIMÉE

**Prévisions pour 100 utilisateurs actifs :**

| Table | Nombre d'enregistrements | Taille estimée |
|-------|-------------------------|----------------|
| `users` | 100 | ~15 Ko |
| `books` | 500 | ~250 Ko |
| `user_books` | 2000 | ~120 Ko |
| **TOTAL** | **2600** | **~385 Ko** |

**Hypothèses :**
- Chaque utilisateur a en moyenne 20 livres
- Les livres sont partagés entre utilisateurs (pas de doublon)
- Environ 50% des utilisateurs renseignent des avis et notes

---

## 🔍 REQUÊTES D'INTÉGRITÉ

### **Vérifier qu'il n'y a pas de livres en doublon**
```sql
SELECT open_library_id, COUNT(*)
FROM books
GROUP BY open_library_id
HAVING COUNT(*) > 1;
-- Doit retourner 0 résultat
```

### **Vérifier qu'un user n'a pas le même livre 2 fois**
```sql
SELECT user_id, book_id, COUNT(*)
FROM user_books
GROUP BY user_id, book_id
HAVING COUNT(*) > 1;
-- Doit retourner 0 résultat
```

### **Vérifier l'intégrité référentielle**
```sql
-- Tous les user_id existent dans users
SELECT COUNT(*)
FROM user_books ub
LEFT JOIN users u ON ub.user_id = u.id
WHERE u.id IS NULL;
-- Doit retourner 0

-- Tous les book_id existent dans books
SELECT COUNT(*)
FROM user_books ub
LEFT JOIN books b ON ub.book_id = b.id
WHERE b.id IS NULL;
-- Doit retourner 0
```

### **Vérifier la validité des notes**
```sql
SELECT COUNT(*)
FROM user_books
WHERE rating IS NOT NULL AND (rating < 1 OR rating > 5);
-- Doit retourner 0
```

### **Vérifier la validité des statuts**
```sql
SELECT COUNT(*)
FROM user_books
WHERE status NOT IN ('to_read', 'reading', 'read');
-- Doit retourner 0
```

---

## 📅 ÉVOLUTIONS FUTURES (Hors MVP)

Champs qui pourraient être ajoutés plus tard :

### **Table users**
- `avatar_url` TEXT : Photo de profil
- `bio` TEXT : Biographie
- `reading_goal` INTEGER : Objectif de lecture annuel

### **Table user_books**
- `started_at` TIMESTAMP : Date de début de lecture
- `finished_at` TIMESTAMP : Date de fin de lecture
- `is_favorite` BOOLEAN : Marquer comme favori
- `reading_progress` INTEGER : Progression en pages ou %

### **Nouvelles tables possibles**
- `lists` : Listes personnalisées de livres
- `reading_challenges` : Défis de lecture
- `book_recommendations` : Recommandations entre utilisateurs
- `user_follows` : Système de suivi entre utilisateurs

→ Mais pour le MVP, on a déjà les fonctionnalités essentielles ! ✓

---

## ✅ VALIDATION

Ce dictionnaire décrit :

✅ 3 tables (users, books, user_books)
✅ 24 attributs au total
✅ Toutes les contraintes (PK, FK, UNIQUE, NOT NULL, ENUM)
✅ Toutes les relations (1:N et N:N)
✅ Les règles métier complètes
✅ Les index pour les performances

**Statut :** Implémenté et fonctionnel avec Sequelize ✓

---

## 📝 NOTES DE MISE À JOUR

**17 novembre 2025 :**
- Ajout des champs `username`, `first_name`, `last_name` dans la table `users`
- Remplacement de `published_date` (VARCHAR) par `published_year` (INTEGER) dans `books`
- Ajout du champ `page_count` dans la table `books`
- Déplacement de `status`, `rating`, `review` de "Hors MVP" vers la table `user_books` (fonctionnalités implémentées)
- Ajout de `created_at` et `updated_at` dans `user_books`
- Mise à jour de la volumétrie estimée
- Ajout de requêtes d'intégrité supplémentaires
- Documentation synchronisée avec le code réel

