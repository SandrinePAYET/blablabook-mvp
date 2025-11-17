# 🗄️ MLD - MODÈLE LOGIQUE DE DONNÉES

**Projet :** Blablabook
**Date :** 17 novembre 2025
**Auteur :** [PAYET Sandrine]

---

## 🎯 OBJECTIF DU MLD

Traduire le MCD en structure SQL pour PostgreSQL avec Sequelize ORM.

---

## 📊 TABLES SQL

### **Table 1 : users**

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Contraintes :**
- `id` : Clé primaire auto-incrémentée (SERIAL)
- `username` : Unique et obligatoire (3-50 caractères)
- `email` : Unique et obligatoire (format email validé)
- `password` : Obligatoire (stocke le hash bcrypt)
- `first_name`, `last_name` : Optionnels (2-100 caractères si renseignés)
- Timestamps gérés automatiquement par Sequelize

**Index :**
```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
```

---

### **Table 2 : books**

```sql
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    open_library_id VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(500) NOT NULL,
    author VARCHAR(300),
    published_year INTEGER,
    isbn VARCHAR(20),
    cover_url TEXT,
    description TEXT,
    page_count INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_published_year CHECK (published_year IS NULL OR (published_year > 1000 AND published_year <= EXTRACT(YEAR FROM CURRENT_DATE) + 1)),
    CONSTRAINT chk_page_count CHECK (page_count IS NULL OR page_count > 0)
);
```

**Contraintes :**
- `id` : Clé primaire auto-incrémentée
- `open_library_id` : Unique et obligatoire (pas de doublon depuis API)
- `title` : Obligatoire (1-500 caractères)
- `author` : Optionnel (max 300 caractères)
- `published_year` : Optionnel, doit être entre 1000 et année courante + 1
- `page_count` : Optionnel, doit être supérieur à 0
- `cover_url` : TEXT pour URL complète, validée comme URL
- `description` : TEXT pour contenu long

**Index :**
```sql
CREATE INDEX idx_books_open_library_id ON books(open_library_id);
CREATE INDEX idx_books_title ON books(title);
```

---

### **Table 3 : user_books**

```sql
CREATE TABLE user_books (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    book_id INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'to_read' CHECK (status IN ('to_read', 'reading', 'read')),
    rating FLOAT CHECK (rating IS NULL OR (rating >= 1 AND rating <= 5)),
    review TEXT CHECK (review IS NULL OR LENGTH(review) <= 2000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT unique_user_book UNIQUE(user_id, book_id)
);
```

**Contraintes :**
- `id` : Clé primaire auto-incrémentée
- `user_id` : Clé étrangère vers `users.id`, obligatoire
- `book_id` : Clé étrangère vers `books.id`, obligatoire
- `status` : ENUM ('to_read', 'reading', 'read'), par défaut 'to_read'
- `rating` : Optionnel, entre 1 et 5 si renseigné
- `review` : Optionnel, max 2000 caractères
- UNIQUE(user_id, book_id) : Un user ne peut pas avoir le même livre 2 fois
- ON DELETE CASCADE : Suppression automatique si user ou book supprimé
- ON UPDATE CASCADE : Mise à jour automatique si PK modifiée

**Index :**
```sql
CREATE UNIQUE INDEX unique_user_book ON user_books(user_id, book_id);
CREATE INDEX idx_user_books_user_id ON user_books(user_id);
CREATE INDEX idx_user_books_book_id ON user_books(book_id);
```

---

## 🔗 SCHÉMA RELATIONNEL

### **Représentation textuelle :**

```
┌──────────────────────────────────────────────────┐
│                     users                        │
│                                                  │
│  id (PK)                                         │
│  username (UNIQUE, NOT NULL)                     │
│  email (UNIQUE, NOT NULL)                        │
│  password (NOT NULL)                             │
│  first_name                                      │
│  last_name                                       │
│  created_at                                      │
│  updated_at                                      │
└──────────────────────────────────────────────────┘
                    │
                    │ 1:N
                    │
                    ▼
┌──────────────────────────────────────────────────┐
│                 user_books                       │
│                                                  │
│  id (PK)                                         │
│  user_id (FK → users.id) ON DELETE CASCADE       │
│  book_id (FK → books.id) ON DELETE CASCADE       │
│  status (ENUM) DEFAULT 'to_read'                 │
│  rating (FLOAT 1-5)                              │
│  review (TEXT max 2000)                          │
│  created_at                                      │
│  updated_at                                      │
│  UNIQUE(user_id, book_id)                        │
└──────────────────────────────────────────────────┘
                    │
                    │ N:1
                    │
                    ▼
┌──────────────────────────────────────────────────┐
│                    books                         │
│                                                  │
│  id (PK)                                         │
│  open_library_id (UNIQUE, NOT NULL)              │
│  title (NOT NULL)                                │
│  author                                          │
│  published_year (INTEGER)                        │
│  isbn                                            │
│  cover_url (TEXT)                                │
│  description (TEXT)                              │
│  page_count (INTEGER)                            │
│  created_at                                      │
│  updated_at                                      │
└──────────────────────────────────────────────────┘
```

**Légende :**
- PK = Primary Key
- FK = Foreign Key
- 1:N = Relation un à plusieurs
- N:1 = Relation plusieurs à un

---

## 📝 CONVENTIONS DE NOMMAGE

### **Tables**
- Format : `snake_case` au pluriel
- Exemples : `users`, `books`, `user_books`

### **Colonnes**
- Format : `snake_case`
- Exemples : `created_at`, `open_library_id`, `user_id`, `first_name`

### **Index**
- Format : `idx_{table}_{column(s)}`
- Exemples : `idx_users_email`, `idx_books_title`

### **Contraintes**
- Unique : `unique_{table}_{column(s)}`
- Check : `chk_{column}`
- Exemple : `unique_user_book`, `chk_published_year`

---

## 🔍 REQUÊTES D'EXEMPLE

### **Récupérer tous les livres d'un utilisateur**
```sql
SELECT
    b.*,
    ub.status,
    ub.rating,
    ub.review,
    ub.created_at as added_at
FROM user_books ub
INNER JOIN books b ON ub.book_id = b.id
WHERE ub.user_id = 1
ORDER BY ub.created_at DESC;
```

### **Trouver tous les utilisateurs qui ont un livre spécifique**
```sql
SELECT
    u.id,
    u.username,
    u.email,
    ub.status,
    ub.rating
FROM user_books ub
INNER JOIN users u ON ub.user_id = u.id
WHERE ub.book_id = 5;
```

### **Livres les plus populaires (les plus ajoutés)**
```sql
SELECT
    b.id,
    b.title,
    b.author,
    COUNT(ub.id) as user_count
FROM books b
LEFT JOIN user_books ub ON b.id = ub.book_id
GROUP BY b.id, b.title, b.author
ORDER BY user_count DESC
LIMIT 10;
```

### **Statistiques par utilisateur**
```sql
SELECT
    u.username,
    COUNT(ub.id) as total_books,
    COUNT(CASE WHEN ub.status = 'read' THEN 1 END) as books_read,
    COUNT(CASE WHEN ub.status = 'reading' THEN 1 END) as books_reading,
    COUNT(CASE WHEN ub.status = 'to_read' THEN 1 END) as books_to_read,
    AVG(ub.rating) FILTER (WHERE ub.rating IS NOT NULL) as avg_rating
FROM users u
LEFT JOIN user_books ub ON u.id = ub.user_id
WHERE u.id = 1
GROUP BY u.id, u.username;
```

### **Recherche de livres (like)**
```sql
SELECT *
FROM books
WHERE
    title ILIKE '%harry%'
    OR author ILIKE '%rowling%'
ORDER BY title
LIMIT 20;
```

---

## ⚙️ IMPLÉMENTATION AVEC SEQUELIZE

### **Configuration**
```javascript
// Sequelize utilise la convention snake_case pour les colonnes
{
  tableName: 'users',           // Nom de la table
  timestamps: true,              // created_at, updated_at automatiques
  underscored: true,             // Utilise snake_case au lieu de camelCase
}
```

### **Associations Sequelize**
```javascript
// Dans backend/src/models/index.js

// User ↔ UserBook
User.hasMany(UserBook, { foreignKey: 'user_id', onDelete: 'CASCADE' });
UserBook.belongsTo(User, { foreignKey: 'user_id' });

// Book ↔ UserBook
Book.hasMany(UserBook, { foreignKey: 'book_id', onDelete: 'CASCADE' });
UserBook.belongsTo(Book, { foreignKey: 'book_id' });

// User ↔ Book (many-to-many via UserBook)
User.belongsToMany(Book, { through: UserBook, foreignKey: 'user_id' });
Book.belongsToMany(User, { through: UserBook, foreignKey: 'book_id' });
```

---

## 🔒 SÉCURITÉ & PERFORMANCES

### **Sécurité**
- ✅ Mots de passe hachés avec bcrypt (jamais en clair)
- ✅ Validation des contraintes au niveau DB
- ✅ Clés étrangères pour intégrité référentielle
- ✅ Index UNIQUE pour éviter les doublons
- ✅ Validation des ENUMs pour limiter les valeurs possibles

### **Performances**
- ✅ Index sur toutes les clés étrangères
- ✅ Index sur les colonnes de recherche fréquente
- ✅ Contrainte UNIQUE composite optimisée
- ✅ Timestamps indexés automatiquement
- ✅ CASCADE DELETE géré au niveau DB (plus rapide)

---

## 📊 TYPES PostgreSQL UTILISÉS

| Type SQL | Usage | Exemple |
|----------|-------|---------|
| SERIAL | Clé primaire auto-incrémentée | `id SERIAL` |
| VARCHAR(n) | Chaîne de caractères limitée | `username VARCHAR(50)` |
| TEXT | Chaîne de longueur illimitée | `description TEXT` |
| INTEGER | Nombre entier | `published_year INTEGER` |
| FLOAT | Nombre à virgule flottante | `rating FLOAT` |
| TIMESTAMP | Date et heure | `created_at TIMESTAMP` |

---

## ✅ VÉRIFICATIONS D'INTÉGRITÉ

### **Script de vérification**
```sql
-- 1. Vérifier qu'il n'y a pas de doublons de livres
SELECT open_library_id, COUNT(*)
FROM books
GROUP BY open_library_id
HAVING COUNT(*) > 1;

-- 2. Vérifier qu'un user n'a pas le même livre 2 fois
SELECT user_id, book_id, COUNT(*)
FROM user_books
GROUP BY user_id, book_id
HAVING COUNT(*) > 1;

-- 3. Vérifier l'intégrité référentielle
SELECT COUNT(*) FROM user_books ub
LEFT JOIN users u ON ub.user_id = u.id
WHERE u.id IS NULL;

SELECT COUNT(*) FROM user_books ub
LEFT JOIN books b ON ub.book_id = b.id
WHERE b.id IS NULL;

-- 4. Vérifier les contraintes de rating
SELECT COUNT(*) FROM user_books
WHERE rating IS NOT NULL AND (rating < 1 OR rating > 5);

-- 5. Vérifier les contraintes de status
SELECT COUNT(*) FROM user_books
WHERE status NOT IN ('to_read', 'reading', 'read');
```

---

## 🔄 MIGRATIONS & SYNCHRONISATION

**Stratégie actuelle :** Sequelize sync automatique

```javascript
// backend/src/models/index.js
await sequelize.sync({ alter: false });
```

**Pour la production :** Utiliser des migrations Sequelize CLI

```bash
npx sequelize-cli migration:generate --name create-tables
npx sequelize-cli db:migrate
```

---

## 📅 HISTORIQUE

| Date | Version | Modification |
|------|---------|--------------|
| 06/10/2025 | 1.0 | Création du MLD initial |
| 17/11/2025 | 2.0 | Ajout username, first_name, last_name dans users |
| 17/11/2025 | 2.0 | Correction published_date → published_year (VARCHAR → INTEGER) |
| 17/11/2025 | 2.0 | Ajout page_count dans books |
| 17/11/2025 | 2.0 | Ajout status (ENUM), rating, review dans user_books |
| 17/11/2025 | 2.0 | Ajout created_at/updated_at dans user_books |
| 17/11/2025 | 2.0 | Ajout contraintes CHECK sur rating, page_count, published_year |
| 17/11/2025 | 2.0 | Documentation des requêtes d'exemple |
| 17/11/2025 | 2.0 | Synchronisation complète avec le code implémenté |

---

**Document validé et implémenté avec Sequelize ORM ✅**

