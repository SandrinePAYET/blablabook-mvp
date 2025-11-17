# 🚀 GUIDE DE DÉPLOIEMENT - BLABLABOOK

> Guide complet pour mettre votre projet en ligne (production)

---

## ⚠️ AVANT DE DÉPLOYER - CHECKLIST

### ✅ Vérifications obligatoires

Avant de déployer, vous DEVEZ vérifier ces points :

#### 1. **Sécurité**

- [ ] Changer `JWT_SECRET` par une vraie clé secrète aléatoire
- [ ] Changer tous les mots de passe par défaut
- [ ] Vérifier qu'il n'y a pas de secrets dans le code Git
- [ ] Vérifier que `.env` est bien dans `.gitignore`
- [ ] Activer HTTPS (pas HTTP)

#### 2. **Configuration**

- [ ] Créer un fichier `.env` de production
- [ ] Configurer l'URL de production (pas localhost)
- [ ] Configurer la base de données de production
- [ ] Vérifier les CORS (autoriser seulement votre domaine)

#### 3. **Code**

- [ ] Tester que tout fonctionne en local
- [ ] Vérifier qu'il n'y a pas d'erreurs dans la console
- [ ] Build du frontend fonctionne sans erreur
- [ ] Backend démarre sans erreur

#### 4. **Base de données**

- [ ] Créer une base PostgreSQL de production
- [ ] Ne PAS utiliser les mêmes identifiants qu'en développement
- [ ] Sauvegarder la structure de la base

---

## 🔐 SÉCURITÉ - ÉTAPES CRITIQUES

### 1. Générer un vrai JWT_SECRET

**IMPORTANT :** Ne JAMAIS utiliser "votre_secret_jwt_super_securise" en production !

**Comment générer un vrai secret :**

```bash
# Méthode 1 : Avec Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Méthode 2 : Avec OpenSSL
openssl rand -hex 64

# Résultat (exemple) :
# a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2
```

**Copier ce résultat dans votre `.env` de production :**
```env
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2
```

---

### 2. Vérifier qu'il n'y a pas de secrets dans Git

**Commande pour vérifier :**
```bash
# Chercher des mots de passe potentiels
git grep -i "password"
git grep -i "secret"
git grep -i "token"

# Vérifier qu'il n'y a pas de fichier .env
git ls-files | grep ".env"
# → Ne doit rien retourner (sauf .env.example)
```

**Si vous avez accidentellement commit un .env :**
```bash
# ATTENTION : Ceci réécrit l'historique Git
git filter-branch --index-filter "git rm -rf --cached --ignore-unmatch .env" HEAD

# Puis forcer le push
git push origin --force --all
```

---

### 3. Configurer les CORS correctement

**Dans `backend/src/server.js` :**

```javascript
// ❌ MAUVAIS (en production)
app.use(cors());  // ← Autorise TOUT LE MONDE

// ✅ BON (en production)
app.use(cors({
  origin: process.env.FRONTEND_URL,  // ← Seulement votre site
  credentials: true
}));
```

**Dans votre `.env` de production :**
```env
FRONTEND_URL=https://monsite.com  # ← Votre vrai domaine
```

---

## 📦 PRÉPARATION DU BACKEND

### 1. Créer le fichier `.env` de production

**Ne PAS copier votre `.env` de développement !**

Créer un nouveau fichier `backend/.env` :

```env
# Base de données PRODUCTION
DB_NAME=blablabook_prod
DB_USER=blablabook_user
DB_PASSWORD=MOT_DE_PASSE_TRES_COMPLEXE_ALEATOIRE
DB_HOST=votre-serveur-postgres.com  # ← Votre serveur de prod
DB_PORT=5432

# JWT SECRET (généré avec la commande ci-dessus)
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2

# Configuration serveur
PORT=3000
NODE_ENV=production  # ← IMPORTANT : "production"
FRONTEND_URL=https://monsite.com  # ← Votre vrai domaine
```

---

### 2. Installer les dépendances en mode production

```bash
cd backend

# Installer SEULEMENT les dépendances de production (pas nodemon)
npm ci --production

# OU si vous avez déjà node_modules
npm install --production
```

**Différence :**
- `npm install` : Installe TOUT (dev + production)
- `npm ci --production` : Installe SEULEMENT la production (plus rapide, plus sûr)

---

### 3. Tester le backend localement en mode production

```bash
cd backend

# Mettre NODE_ENV en production
export NODE_ENV=production

# Démarrer avec la commande de production
npm start

# Vérifier qu'il n'y a pas d'erreurs
# Vérifier les logs
```

---

## 🎨 PRÉPARATION DU FRONTEND

### 1. Créer le fichier `.env` de production

**`frontend/.env` (ou `.env.production`) :**

```env
# URL de votre API en production
VITE_API_URL=https://api.monsite.com

# OU si API et frontend sur le même domaine
VITE_API_URL=https://monsite.com
```

---

### 2. Build du frontend

**Le build transforme votre code Svelte en HTML/CSS/JS optimisé.**

```bash
cd frontend

# Build pour la production
npm run build

# Résultat : dossier "build/" créé
ls -la build/

# Prévisualiser le build (optionnel)
npm run preview
```

**Ce qui se passe :**
- Vite compile tous vos fichiers `.svelte`
- Minifie le JavaScript (réduit la taille)
- Optimise les images
- Crée des fichiers statiques prêts pour le serveur

**Taille avant/après :**
- Avant : ~10 Mo (code source)
- Après : ~500 Ko (build optimisé)

---

### 3. Tester le build localement

```bash
cd frontend

# Prévisualiser le build
npm run preview

# Ouvrir dans le navigateur
# http://localhost:4173
```

**Vérifier que :**
- Toutes les pages fonctionnent
- Les images s'affichent
- L'authentification marche
- Les requêtes API fonctionnent

---

## 🗄️ BASE DE DONNÉES DE PRODUCTION

### 1. Créer la base de données

**Option A : Sur un serveur PostgreSQL dédié**

```bash
# Se connecter au serveur PostgreSQL
psql -h votre-serveur.com -U postgres

# Créer la base
CREATE DATABASE blablabook_prod;

# Créer un utilisateur dédié
CREATE USER blablabook_user WITH PASSWORD 'MOT_DE_PASSE_COMPLEXE';

# Donner les permissions
GRANT ALL PRIVILEGES ON DATABASE blablabook_prod TO blablabook_user;
```

**Option B : Service cloud (Render, Railway, etc.)**

La plupart des services créent automatiquement la base et vous donnent une URL :
```
postgresql://user:password@host:5432/database
```

---

### 2. Configurer SSL pour PostgreSQL

**Dans `backend/src/config/database.js`, décommenter :**

```javascript
// Pour la production avec SSL
dialectOptions: {
  ssl: {
    require: true,
    rejectUnauthorized: false  // Pour certains hébergeurs
  }
}
```

---

### 3. Initialiser les tables

**Quand vous démarrez le backend pour la première fois :**

```bash
cd backend

# Lancer le serveur (va créer les tables automatiquement)
npm start
```

**Sequelize va automatiquement :**
- Créer les tables `users`, `books`, `user_books`
- Créer les index
- Créer les contraintes

**Vérifier que les tables sont créées :**
```bash
psql -h votre-serveur.com -U blablabook_user -d blablabook_prod

# Lister les tables
\dt

# Doit afficher :
# users
# books
# user_books
```

---

## 🌐 OPTIONS DE DÉPLOIEMENT

### Option 1 : Render (Recommandé - Gratuit)

**Avantages :**
- Gratuit pour commencer
- Facile à utiliser
- PostgreSQL inclus
- HTTPS automatique

**Étapes :**

1. **Créer un compte sur Render.com**

2. **Créer une base de données PostgreSQL :**
   - New → PostgreSQL
   - Nom : `blablabook-db`
   - Plan : Free
   - Copier l'URL de connexion (Internal Database URL)

3. **Déployer le backend :**
   - New → Web Service
   - Connecter votre repo GitHub
   - Branche : `claude/fix-consistency-issues-01R1hwSVThgcoGLSjiWhtvST`
   - Root Directory : `backend`
   - Build Command : `npm install`
   - Start Command : `npm start`
   - Variables d'environnement :
     ```
     DB_NAME=...          (depuis l'URL PostgreSQL)
     DB_USER=...          (depuis l'URL PostgreSQL)
     DB_PASSWORD=...      (depuis l'URL PostgreSQL)
     DB_HOST=...          (depuis l'URL PostgreSQL)
     DB_PORT=5432
     JWT_SECRET=votre_secret_généré
     NODE_ENV=production
     FRONTEND_URL=https://votre-frontend.onrender.com
     ```

4. **Déployer le frontend :**
   - New → Static Site
   - Root Directory : `frontend`
   - Build Command : `npm install && npm run build`
   - Publish Directory : `build`
   - Variables d'environnement :
     ```
     VITE_API_URL=https://votre-backend.onrender.com
     ```

---

### Option 2 : Railway (Alternative)

**Similar à Render, avec interface différente.**

**Étapes :**

1. Créer compte sur Railway.app
2. New Project → Deploy from GitHub
3. Ajouter PostgreSQL dans le projet
4. Configurer les variables d'environnement
5. Railway détecte automatiquement Node.js

---

### Option 3 : VPS (Serveur dédié - Avancé)

**Pour utilisateurs avancés (DigitalOcean, OVH, etc.)**

Nécessite :
- Installation de Node.js sur le serveur
- Installation de PostgreSQL
- Configuration de Nginx
- Gestion des certificats SSL
- PM2 pour garder le serveur actif

---

## 📋 CHECKLIST FINALE AVANT DÉPLOIEMENT

### Backend

- [ ] `.env` de production créé avec vraies valeurs
- [ ] `JWT_SECRET` généré aléatoirement (64 caractères min)
- [ ] `NODE_ENV=production`
- [ ] CORS configuré avec le bon domaine
- [ ] `npm ci --production` exécuté
- [ ] Pas de `console.log()` sensibles dans le code
- [ ] Base de données de production créée
- [ ] SSL configuré pour PostgreSQL si nécessaire

### Frontend

- [ ] `.env` de production créé
- [ ] `VITE_API_URL` pointe vers l'URL de production
- [ ] `npm run build` fonctionne sans erreur
- [ ] Build testé avec `npm run preview`
- [ ] Pas d'URL hardcodées (tout utilise `getApiUrl()`)

### Sécurité

- [ ] Aucun mot de passe dans le code
- [ ] `.env` dans `.gitignore`
- [ ] `JWT_SECRET` différent de celui de développement
- [ ] HTTPS activé (pas HTTP)
- [ ] CORS limité au domaine de production

### Tests

- [ ] Inscription fonctionne
- [ ] Connexion fonctionne
- [ ] Recherche de livres fonctionne
- [ ] Ajout de livre fonctionne
- [ ] Modification de livre fonctionne
- [ ] Suppression de livre fonctionne
- [ ] Déconnexion fonctionne

---

## 🐛 DEBUGGING EN PRODUCTION

### Voir les logs du backend

**Sur Render :**
- Logs → View Logs en temps réel

**Sur un VPS :**
```bash
# Si vous utilisez PM2
pm2 logs backend

# Logs Node.js
tail -f /var/log/nodejs/backend.log
```

---

### Problèmes courants

**1. "Cannot connect to database"**

Vérifier :
```env
DB_HOST=le-bon-host
DB_PORT=5432
DB_NAME=le-bon-nom
DB_USER=le-bon-user
DB_PASSWORD=le-bon-password
```

Tester la connexion :
```bash
psql -h $DB_HOST -U $DB_USER -d $DB_NAME
```

---

**2. "CORS error"**

Vérifier :
```javascript
// backend/src/server.js
app.use(cors({
  origin: process.env.FRONTEND_URL  // ← Doit matcher exactement
}));
```

```env
# backend/.env
FRONTEND_URL=https://monsite.com  # ← Pas de / à la fin
```

---

**3. "Token invalid"**

Vérifier :
- Le `JWT_SECRET` est le même entre :
  - Celui qui a généré le token (backend au login)
  - Celui qui vérifie le token (backend aux autres requêtes)

---

**4. "API URL not found"**

Vérifier :
```env
# frontend/.env
VITE_API_URL=https://api.monsite.com  # ← URL complète avec https://
```

Tester :
```bash
curl https://api.monsite.com/api/auth/me
```

---

## 📊 APRÈS LE DÉPLOIEMENT

### Monitoring (surveillance)

**Choses à surveiller :**
- Temps de réponse de l'API
- Erreurs dans les logs
- Utilisation de la base de données
- Nombre d'utilisateurs actifs

**Outils gratuits :**
- **Render Dashboard** : Métriques de base
- **UptimeRobot** : Vérifie que votre site est en ligne
- **Google Analytics** : Stats de visite

---

### Sauvegardes de la base de données

**IMPORTANT : Faire des sauvegardes régulières !**

**Sur Render :**
- Les sauvegardes automatiques sont incluses (plan payant)

**Manuellement :**
```bash
# Sauvegarder
pg_dump -h $DB_HOST -U $DB_USER -d $DB_NAME > backup.sql

# Restaurer
psql -h $DB_HOST -U $DB_USER -d $DB_NAME < backup.sql
```

---

### Mises à jour

**Quand vous modifiez le code :**

1. Commit les changements sur GitHub
2. Push sur la branche de production
3. Sur Render : Le déploiement se fait automatiquement
4. Vérifier les logs pour s'assurer que tout fonctionne

---

## 📝 RÉSUMÉ - ORDRE DES ÉTAPES

### 1. Préparation (1-2 heures)

- [ ] Générer `JWT_SECRET` aléatoire
- [ ] Créer `.env` de production (backend + frontend)
- [ ] Tester en local avec `NODE_ENV=production`
- [ ] Build du frontend et tester

### 2. Infrastructure (30 min)

- [ ] Créer compte Render/Railway
- [ ] Créer base de données PostgreSQL
- [ ] Noter l'URL de connexion

### 3. Déploiement Backend (30 min)

- [ ] Créer Web Service
- [ ] Configurer variables d'environnement
- [ ] Déployer
- [ ] Vérifier les logs

### 4. Déploiement Frontend (30 min)

- [ ] Créer Static Site
- [ ] Configurer `VITE_API_URL`
- [ ] Build et déployer
- [ ] Tester dans le navigateur

### 5. Tests (1 heure)

- [ ] Tester toutes les fonctionnalités
- [ ] Vérifier sur mobile
- [ ] Vérifier les erreurs dans la console
- [ ] Créer un compte test

### 6. Finalisation (30 min)

- [ ] Configurer le domaine personnalisé (optionnel)
- [ ] Activer HTTPS
- [ ] Faire une sauvegarde de la base
- [ ] Documenter les URLs de production

---

## 🎉 VOTRE PROJET EST EN LIGNE !

**URLs à partager :**
- Frontend : `https://blablabook.onrender.com`
- Backend API : `https://blablabook-api.onrender.com`

**Prochaines étapes :**
- Ajouter un domaine personnalisé (`www.blablabook.com`)
- Mettre en place des sauvegardes automatiques
- Ajouter Google Analytics
- Optimiser les performances
- Ajouter plus de fonctionnalités !

---

**Félicitations pour le déploiement de votre projet ! 🚀**

