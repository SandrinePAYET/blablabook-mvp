# 🔌 DOCUMENTATION API - BLABLABOOK

**Projet :** Blablabook MVP
**Date :** 17 novembre 2025
**Base URL :** `http://localhost:3000/api`
**Format :** JSON

---

## 📋 TABLE DES MATIÈRES

1. [Authentification](#authentification)
2. [Livres (Recherche)](#livres-recherche)
3. [Bibliothèque Personnelle](#bibliothèque-personnelle)
4. [Codes d'erreur](#codes-derreur)

---

## 🔐 AUTHENTIFICATION

### POST `/api/auth/register`

**Description :** Créer un nouveau compte utilisateur

**Headers :**
```json
{
  "Content-Type": "application/json"
}
```

**Body :**
```json
{
  "username": "marie_dupont",
  "email": "marie@example.com",
  "password": "motdepasse123"
}
```

**Validation :**
- `username` : 3-50 caractères, unique
- `email` : Format email valide, unique
- `password` : Minimum 8 caractères

**Réponse (201 Created) :**
```json
{
  "success": true,
  "message": "Utilisateur créé avec succès",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "marie_dupont",
      "email": "marie@example.com"
    }
  }
}
```

**Erreurs possibles :**
- `400` : Données invalides
- `409` : Email ou username déjà utilisé

---

### POST `/api/auth/login`

**Description :** Se connecter à un compte existant

**Headers :**
```json
{
  "Content-Type": "application/json"
}
```

**Body :**
```json
{
  "username": "marie_dupont",
  "password": "motdepasse123"
}
```

**Réponse (200 OK) :**
```json
{
  "success": true,
  "message": "Connexion réussie",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "marie_dupont",
      "email": "marie@example.com",
      "first_name": "Marie",
      "last_name": "Dupont"
    }
  }
}
```

**Erreurs possibles :**
- `400` : Données manquantes
- `401` : Identifiants invalides

---

### GET `/api/auth/me`

**Description :** Récupérer les informations de l'utilisateur connecté

**Headers :**
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Réponse (200 OK) :**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "username": "marie_dupont",
      "email": "marie@example.com",
      "first_name": "Marie",
      "last_name": "Dupont",
      "created_at": "2025-11-17T10:30:00.000Z"
    }
  }
}
```

**Erreurs possibles :**
- `401` : Token manquant ou invalide

---

## 📚 LIVRES (RECHERCHE)

### GET `/api/books/search`

**Description :** Rechercher des livres via l'API Open Library

**Headers :**
```json
{
  "Content-Type": "application/json"
}
```

**Query Parameters :**
- `q` (obligatoire) : Terme de recherche

**Exemple :**
```
GET /api/books/search?q=harry%20potter
```

**Réponse (200 OK) :**
```json
{
  "success": true,
  "data": {
    "books": [
      {
        "open_library_id": "OL123456W",
        "title": "Harry Potter à l'école des sorciers",
        "author": "J.K. Rowling",
        "published_year": 1997,
        "cover_url": "https://covers.openlibrary.org/b/id/123456-L.jpg",
        "isbn": "978-2070541270",
        "page_count": 320
      },
      ...
    ],
    "count": 20
  }
}
```

**Erreurs possibles :**
- `400` : Paramètre `q` manquant
- `500` : Erreur de l'API Open Library

---

### GET `/api/books/:openLibraryId`

**Description :** Récupérer les détails d'un livre spécifique

**Headers :**
```json
{
  "Content-Type": "application/json"
}
```

**Exemple :**
```
GET /api/books/OL123456W
```

**Réponse (200 OK) :**
```json
{
  "success": true,
  "data": {
    "book": {
      "open_library_id": "OL123456W",
      "title": "Harry Potter à l'école des sorciers",
      "author": "J.K. Rowling",
      "published_year": 1997,
      "cover_url": "https://covers.openlibrary.org/b/id/123456-L.jpg",
      "isbn": "978-2070541270",
      "page_count": 320,
      "description": "Harry Potter, un jeune orphelin..."
    }
  }
}
```

**Erreurs possibles :**
- `404` : Livre non trouvé

---

## 📖 BIBLIOTHÈQUE PERSONNELLE

Toutes ces routes nécessitent une authentification (token JWT).

### POST `/api/user-books`

**Description :** Ajouter un livre à sa bibliothèque personnelle

**Headers :**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Body :**
```json
{
  "open_library_id": "OL123456W",
  "title": "Harry Potter à l'école des sorciers",
  "author": "J.K. Rowling",
  "published_year": 1997,
  "cover_url": "https://covers.openlibrary.org/b/id/123456-L.jpg",
  "isbn": "978-2070541270",
  "page_count": 320,
  "status": "to_read"
}
```

**Champs obligatoires :**
- `open_library_id`
- `title`

**Champs optionnels :**
- `author`, `published_year`, `cover_url`, `isbn`, `page_count`
- `status` : `to_read` (par défaut), `reading`, `read`

**Réponse (201 Created) :**
```json
{
  "success": true,
  "message": "Livre ajouté à votre bibliothèque",
  "data": {
    "userBook": {
      "id": 42,
      "user_id": 1,
      "book_id": 15,
      "status": "to_read",
      "rating": null,
      "review": null,
      "created_at": "2025-11-17T14:30:00.000Z",
      "Book": {
        "id": 15,
        "open_library_id": "OL123456W",
        "title": "Harry Potter à l'école des sorciers",
        "author": "J.K. Rowling",
        ...
      }
    }
  }
}
```

**Erreurs possibles :**
- `400` : Données invalides
- `401` : Non authentifié
- `409` : Livre déjà dans la bibliothèque

---

### GET `/api/user-books`

**Description :** Récupérer tous les livres de sa bibliothèque

**Headers :**
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Réponse (200 OK) :**
```json
{
  "success": true,
  "data": {
    "books": [
      {
        "id": 42,
        "user_id": 1,
        "book_id": 15,
        "status": "reading",
        "rating": 4.5,
        "review": "Captivant ! J'adore cette histoire.",
        "created_at": "2025-11-17T14:30:00.000Z",
        "updated_at": "2025-11-18T10:15:00.000Z",
        "Book": {
          "id": 15,
          "open_library_id": "OL123456W",
          "title": "Harry Potter à l'école des sorciers",
          "author": "J.K. Rowling",
          "published_year": 1997,
          "cover_url": "https://covers.openlibrary.org/b/id/123456-L.jpg",
          "isbn": "978-2070541270",
          "page_count": 320
        }
      },
      ...
    ],
    "count": 25
  }
}
```

**Erreurs possibles :**
- `401` : Non authentifié

---

### PUT `/api/user-books/:id`

**Description :** Mettre à jour un livre de sa bibliothèque (statut, note, avis)

**Headers :**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Body (tous les champs sont optionnels) :**
```json
{
  "status": "read",
  "rating": 4.5,
  "review": "Un livre fantastique ! L'univers est très immersif et les personnages sont attachants."
}
```

**Validation :**
- `status` : `to_read`, `reading`, ou `read`
- `rating` : Entre 1 et 5 (peut être décimal)
- `review` : Maximum 2000 caractères

**Réponse (200 OK) :**
```json
{
  "success": true,
  "message": "Livre mis à jour avec succès",
  "data": {
    "userBook": {
      "id": 42,
      "user_id": 1,
      "book_id": 15,
      "status": "read",
      "rating": 4.5,
      "review": "Un livre fantastique ! L'univers est très immersif et les personnages sont attachants.",
      "updated_at": "2025-11-18T16:45:00.000Z",
      "Book": {
        "id": 15,
        "title": "Harry Potter à l'école des sorciers",
        ...
      }
    }
  }
}
```

**Erreurs possibles :**
- `400` : Données invalides
- `401` : Non authentifié
- `403` : Livre n'appartient pas à l'utilisateur
- `404` : Livre non trouvé

---

### DELETE `/api/user-books/:id`

**Description :** Retirer un livre de sa bibliothèque

**Headers :**
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Réponse (200 OK) :**
```json
{
  "success": true,
  "message": "Livre retiré de votre bibliothèque"
}
```

**Erreurs possibles :**
- `401` : Non authentifié
- `403` : Livre n'appartient pas à l'utilisateur
- `404` : Livre non trouvé

---

## ⚠️ CODES D'ERREUR

### Format des erreurs

Toutes les erreurs suivent ce format :

```json
{
  "success": false,
  "message": "Description de l'erreur",
  "errors": [
    "Détail erreur 1",
    "Détail erreur 2"
  ]
}
```

### Codes HTTP utilisés

| Code | Signification | Usage |
|------|---------------|-------|
| `200` | OK | Requête réussie (GET, PUT, DELETE) |
| `201` | Created | Ressource créée (POST) |
| `400` | Bad Request | Données invalides ou manquantes |
| `401` | Unauthorized | Token manquant, invalide ou expiré |
| `403` | Forbidden | Accès refusé (pas propriétaire) |
| `404` | Not Found | Ressource non trouvée |
| `409` | Conflict | Ressource déjà existante (doublon) |
| `500` | Internal Server Error | Erreur serveur |

### Exemples d'erreurs

**400 - Validation échouée :**
```json
{
  "success": false,
  "message": "Données invalides",
  "errors": [
    "Le nom d'utilisateur doit contenir entre 3 et 50 caractères",
    "L'email doit être au format valide"
  ]
}
```

**401 - Non authentifié :**
```json
{
  "success": false,
  "message": "Token manquant ou invalide"
}
```

**409 - Doublon :**
```json
{
  "success": false,
  "message": "Ce livre est déjà dans votre bibliothèque"
}
```

---

## 🔒 AUTHENTIFICATION & SÉCURITÉ

### JWT (JSON Web Token)

**Format du token :**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoibWFyaWVfZHVwb250IiwiZW1haWwiOiJtYXJpZUBleGFtcGxlLmNvbSIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoxNzAwNjA0ODAwfQ.signature
```

**Payload du token :**
```json
{
  "userId": 1,
  "username": "marie_dupont",
  "email": "marie@example.com",
  "iat": 1700000000,
  "exp": 1700604800
}
```

**Durée de validité :** 7 jours

**Utilisation :**
```http
Authorization: Bearer {token}
```

### Sécurité

- ✅ Mots de passe hachés avec bcrypt (10 rounds)
- ✅ Validation des entrées avec Joi
- ✅ Protection CORS configurée
- ✅ Headers sécurisés avec Helmet
- ✅ Tokens JWT signés et vérifiés
- ✅ Pas de données sensibles dans les réponses

---

## 📝 NOTES D'IMPLÉMENTATION

### Variables d'environnement

Le fichier `backend/.env` doit contenir :

```env
DB_NAME=blablabook
DB_USER=student
DB_PASSWORD=blablabook2025
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=votre_secret_jwt_super_securise
PORT=3000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### CORS

Le serveur accepte les requêtes depuis :
- `http://localhost:5173` (développement)
- URL configurée dans `FRONTEND_URL` (production)

### Limites

- Pas de limite de taux (rate limiting) pour le moment
- Pas de pagination (tous les livres retournés)
- Recherche limitée à 20 résultats (API Open Library)

---

## 🧪 EXEMPLES AVEC CURL

### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"marie_dupont","email":"marie@example.com","password":"motdepasse123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"marie_dupont","password":"motdepasse123"}'
```

### Rechercher un livre
```bash
curl "http://localhost:3000/api/books/search?q=harry+potter"
```

### Ajouter un livre (nécessite token)
```bash
curl -X POST http://localhost:3000/api/user-books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"open_library_id":"OL123456W","title":"Harry Potter","author":"J.K. Rowling","status":"to_read"}'
```

### Récupérer sa bibliothèque
```bash
curl http://localhost:3000/api/user-books \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Mettre à jour un livre
```bash
curl -X PUT http://localhost:3000/api/user-books/42 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"status":"read","rating":4.5,"review":"Excellent livre !"}'
```

### Supprimer un livre
```bash
curl -X DELETE http://localhost:3000/api/user-books/42 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

**Documentation mise à jour le 17 novembre 2025**
**Version API : 1.0**

