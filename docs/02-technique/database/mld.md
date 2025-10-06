# 🗄️ MLD - MODÈLE LOGIQUE DE DONNÉES

**Projet :** Blablabook  
**Date :** 6 octobre 2025  
**Auteur :** [PAYET Sandrine]

---

## 🎯 OBJECTIF DU MLD

Traduire le MCD en structure SQL pour PostgreSQL.

---

## 📊 TABLES SQL

### **Table 1 : users**

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Contraintes :

- id : Auto-incrémenté (SERIAL)
- email : Unique et obligatoire
- password : Obligatoire (stockera le hash bcrypt)
- Timestamps automatiques
- Index :
CREATE INDEX idx_users_email ON users(email);

Table 2 : books

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    open_library_id VARCHAR(255) UNIQUE,
    title VARCHAR(500) NOT NULL,
    author VARCHAR(255),
    published_date VARCHAR(50),
    cover_url TEXT,
    description TEXT,
    isbn VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Contraintes :

- id : Auto-incrémenté
- open_library_id : Unique (pas de doublon depuis API)
- title : Obligatoire
- cover_url et description : TEXT pour contenu long

Index :
CREATE INDEX idx_books_open_library_id ON books(open_library_id);
CREATE INDEX idx_books_title ON books(title);

Table 3 : user_books
CREATE TABLE user_books (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    book_id INTEGER NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    
    UNIQUE(user_id, book_id)
);

Contraintes :

- user_id : Clé étrangère vers users
- book_id : Clé étrangère vers books
- UNIQUE(user_id, book_id) : Un user ne peut pas avoir le même livre 2 fois
- ON DELETE CASCADE : Si on supprime un user ou un book, on supprime les liens

Index :
CREATE INDEX idx_user_books_user_id ON user_books(user_id);
CREATE INDEX idx_user_books_book_id ON user_books(book_id);

🔗 SCHÉMA RELATIONNEL
users (1) ←────── (N) user_books (N) ──────→ (1) books
  │                       │                        │
  └─ id                   ├─ user_id (FK)         └─ id
                          └─ book_id 

📝 CONVENTIONS DE NOMMAGE
Tables : snake_case au pluriel

- users, books, user_books

Colonnes : snake_case

- created_at, open_library_id, user_id

Clés primaires : id

Clés étrangères : {table}_id

- Exemple : user_id référence users(id)

💡 REQUÊTES SQL COURANTES

1. Créer un utilisateur
INSERT INTO users (email, password)
VALUES ('marie@example.com', '$2b$10$hash...');

2. Ajouter un livre
INSERT INTO books (open_library_id, title, author, cover_url)
VALUES ('OL123456W', 'Harry Potter', 'J.K. Rowling', 'https://...')
ON CONFLICT (open_library_id) DO NOTHING;
-- N'insère que si le livre n'existe pas déjà

3. Ajouter un livre à la bibliothèque d'un utilisateur
INSERT INTO user_books (user_id, book_id)
VALUES (1, 5)
ON CONFLICT (user_id, book_id) DO NOTHING;
-- Évite les doublons

4. Récupérer la bibliothèque d'un utilisateur
SELECT 
    b.id,
    b.title,
    b.author,
    b.cover_url,
    ub.added_at
FROM user_books ub
INNER JOIN books b ON ub.book_id = b.id
WHERE ub.user_id = 1
ORDER BY ub.added_at DESC;

5. Supprimer un livre de la bibliothèque
DELETE FROM user_books
WHERE user_id = 1 AND book_id = 5;

6. Compter les livres d'un utilisateur
SELECT COUNT(*) as total_books
FROM user_books
WHERE user_id = 1;

7. Vérifier si un livre est dans la bibliothèque
SELECT EXISTS(
    SELECT 1 
    FROM user_books 
    WHERE user_id = 1 AND book_id = 5
) as is_in_library;


🔒 SÉCURITÉ
Triggers pour updated_at
-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour users
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger pour books
CREATE TRIGGER update_books_updated_at 
    BEFORE UPDATE ON books
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

📦 SCRIPT COMPLET D'INITIALISATION
-- Créer la base de données
CREATE DATABASE blablabook;

-- Se connecter à la base
\c blablabook

-- Table users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table books
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    open_library_id VARCHAR(255) UNIQUE,
    title VARCHAR(500) NOT NULL,
    author VARCHAR(255),
    published_date VARCHAR(50),
    cover_url TEXT,
    description TEXT,
    isbn VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table user_books
CREATE TABLE user_books (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    book_id INTEGER NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    
    UNIQUE(user_id, book_id)
);

-- Index
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_books_open_library_id ON books(open_library_id);
CREATE INDEX idx_books_title ON books(title);
CREATE INDEX idx_user_books_user_id ON user_books(user_id);
CREATE INDEX idx_user_books_book_id ON user_books(book_id);

-- Triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_books_updated_at 
    BEFORE UPDATE ON books
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

✅ VALIDATION
Ce modèle permet :

✅ Authentification (table users)
✅ Stockage des livres (table books)
✅ Bibliothèques personnelles (table user_books)
✅ Pas de doublon de livres
✅ Pas de doublon dans les bibliothèques
✅ Suppression en cascade
✅ Performances optimisées (index)
Prêt pour Sequelize ! ✓