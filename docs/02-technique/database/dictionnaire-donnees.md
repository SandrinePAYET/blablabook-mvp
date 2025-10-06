# 📖 DICTIONNAIRE DE DONNÉES

**Projet :** Blablabook  
**Date :** 6 octobre 2025  
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
| `email` | VARCHAR | 255 | NOT NULL, UNIQUE | Adresse email pour la connexion | marie@example.com |
| `password` | VARCHAR | 255 | NOT NULL | Mot de passe crypté (bcrypt) | $2b$10$hash... |
| `created_at` | TIMESTAMP | - | DEFAULT NOW() | Date et heure de création du compte | 2025-10-06 19:30:00 |
| `updated_at` | TIMESTAMP | - | DEFAULT NOW() | Date et heure de dernière modification | 2025-10-06 19:30:00 |

**Règles métier :**
- L'email doit être valide (format email)
- L'email doit être unique dans toute la table
- Le mot de passe doit faire minimum 8 caractères avant cryptage
- Le mot de passe est haché avec bcrypt (10 rounds) avant stockage
- `created_at` ne change jamais après création
- `updated_at` est mis à jour automatiquement (trigger)

**Index :**
- Index sur `email` pour accélérer les recherches de connexion

---

## 📚 TABLE : BOOKS

**Description :** Stocke les livres référencés dans l'application

| Nom du champ | Type | Taille | Contraintes | Description | Exemple |
|--------------|------|--------|-------------|-------------|---------|
| `id` | INTEGER | - | PK, AUTO_INCREMENT | Identifiant unique du livre | 1 |
| `open_library_id` | VARCHAR | 255 | UNIQUE | Identifiant depuis l'API Open Library | OL123456W |
| `title` | VARCHAR | 500 | NOT NULL | Titre du livre | Harry Potter à l'école des sorciers |
| `author` | VARCHAR | 255 | NULL | Nom de l'auteur principal | J.K. Rowling |
| `published_date` | VARCHAR | 50 | NULL | Année ou date de publication | 1997 |
| `cover_url` | TEXT | - | NULL | URL complète de la couverture | https://covers.openlibrary.org/... |
| `description` | TEXT | - | NULL | Résumé ou description du livre | Harry Potter, un jeune orphelin... |
| `isbn` | VARCHAR | 20 | NULL | Code ISBN du livre | 978-2070541270 |
| `created_at` | TIMESTAMP | - | DEFAULT NOW() | Date d'ajout dans la base | 2025-10-06 19:35:00 |
| `updated_at` | TIMESTAMP | - | DEFAULT NOW() | Date de dernière modification | 2025-10-06 19:35:00 |

**Règles métier :**
- `open_library_id` doit être unique (pas de doublon de livres)
- Le `title` est obligatoire
- Les autres champs sont optionnels (peuvent être NULL)
- Un livre est créé une seule fois, même si plusieurs utilisateurs l'ajoutent
- Les URLs de couverture proviennent de l'API Open Library
- `updated_at` est mis à jour automatiquement (trigger)

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
| `added_at` | TIMESTAMP | - | DEFAULT NOW() | Date d'ajout du livre à la bibliothèque | 2025-10-06 19:40:00 |

**Règles métier :**
- `user_id` référence `users(id)` avec `ON DELETE CASCADE`
- `book_id` référence `books(id)` avec `ON DELETE CASCADE`
- La paire (user_id, book_id) doit être unique
- Un utilisateur ne peut pas ajouter le même livre deux fois
- Si un utilisateur est supprimé, tous ses `user_books` sont supprimés (CASCADE)
- Si un livre est supprimé, tous les `user_books` associés sont supprimés (CASCADE)

**Index :**
- Index sur `user_id` pour récupérer rapidement la bibliothèque d'un user
- Index sur `book_id` pour savoir quels users ont un livre donné
- Contrainte UNIQUE sur (user_id, book_id)

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

## 🔒 CONTRAINTES GLOBALES

### **Contraintes de clés primaires**

Toutes les tables ont une clé primaire `id` de type `SERIAL` (auto-incrémenté).

### **Contraintes d'unicité**

- `users.email` : UNIQUE
- `books.open_library_id` : UNIQUE
- `user_books(user_id, book_id)` : UNIQUE (contrainte composite)

### **Contraintes de clés étrangères**

- `user_books.user_id` → `users.id` ON DELETE CASCADE
- `user_books.book_id` → `books.id` ON DELETE CASCADE

### **Contraintes NOT NULL**

**Table users :**
- `email` : NOT NULL
- `password` : NOT NULL

**Table books :**
- `title` : NOT NULL

**Table user_books :**
- `user_id` : NOT NULL
- `book_id` : NOT NULL

---

## 💡 TYPES DE DONNÉES - EXPLICATIONS

### **SERIAL**
- Équivalent de AUTO_INCREMENT
- Génère automatiquement un nombre unique
- Utilisé pour les clés primaires

### **VARCHAR(n)**
- Chaîne de caractères de longueur variable
- Maximum n caractères
- Utilisé pour textes courts (email, titre, auteur)

### **TEXT**
- Chaîne de caractères de longueur illimitée
- Utilisé pour contenus longs (description, URL)

### **INTEGER**
- Nombre entier
- Utilisé pour les IDs et clés étrangères

### **TIMESTAMP**
- Date et heure précises
- Format : YYYY-MM-DD HH:MM:SS
- Utilisé pour les dates de création/modification

---

## 📊 VOLUMÉTRIE ESTIMÉE

**Prévisions pour 100 utilisateurs actifs :**

| Table | Nombre d'enregistrements | Taille estimée |
|-------|-------------------------|----------------|
| `users` | 100 | ~10 Ko |
| `books` | 500 | ~200 Ko |
| `user_books` | 2000 | ~80 Ko |
| **TOTAL** | **2600** | **~290 Ko** |

**Hypothèses :**
- Chaque utilisateur a en moyenne 20 livres
- Les livres sont partagés entre utilisateurs (pas de doublon)

---

## 🔍 REQUÊTES D'INTÉGRITÉ

### **Vérifier qu'il n'y a pas de livres en doublon**
```sql
SELECT open_library_id, COUNT(*)
FROM books
GROUP BY open_library_id
HAVING COUNT(*) > 1;
-- Doit retourner 0 résultat


Vérifier qu'un user n'a pas le même livre 2 fois

SELECT user_id, book_id, COUNT(*)
FROM user_books
GROUP BY user_id, book_id
HAVING COUNT(*) > 1;
-- Doit retourner 0 résultat

Vérifier l'intégrité référentielle

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

📅 ÉVOLUTIONS FUTURES (Hors MVP)
Champs qui pourraient être ajoutés plus tard :

Table users
first_name VARCHAR(100) : Prénom
last_name VARCHAR(100) : Nom
avatar_url TEXT : Photo de profil
bio TEXT : Biographie
Table user_books
status VARCHAR(20) : "à lire", "en cours", "lu"
rating INTEGER : Note sur 5
started_at TIMESTAMP : Date de début de lecture
finished_at TIMESTAMP : Date de fin de lecture
notes TEXT : Notes personnelles
Nouvelles tables possibles
lists : Listes personnalisées
reviews : Commentaires publics
favorites : Favoris
→ Mais pour le MVP, on reste simple ! ✓

✅ VALIDATION
Ce dictionnaire décrit :

✅ 3 tables (users, books, user_books)
✅ 18 attributs au total
✅ Toutes les contraintes
✅ Toutes les relations
✅ Les règles métier
Prêt pour l'implémentation avec Sequelize ! ✓
