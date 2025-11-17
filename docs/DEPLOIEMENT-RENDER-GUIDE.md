# 🚀 GUIDE DE DÉPLOIEMENT SUR RENDER - BLABLABOOK

> Instructions pas à pas pour déployer votre application sur Render
> Date : 17 novembre 2025
> Durée estimée : 30-45 minutes

---

## ✅ VÉRIFICATIONS PRÉALABLES

Avant de commencer, assurez-vous que :

- [x] Votre code est poussé sur GitHub
- [x] Branche : `claude/fix-consistency-issues-01R1hwSVThgcoGLSjiWhtvST`
- [x] Le build frontend fonctionne (testé ✅)
- [x] JWT_SECRET généré : `c58c06444ce23e3d6cdc6a0ee4cc62f7e1faa88452426f8c5e284ff135a6270b6b91c2225aedc6c0d87bca338e9bad03acf36d9e1ad918ceec8f4dd2feda68f3`

---

## 📋 PLAN DE DÉPLOIEMENT

**Ordre d'exécution :**
1. Créer compte Render
2. Créer base PostgreSQL
3. Déployer BACKEND
4. Déployer FRONTEND
5. Connecter les deux
6. Tester

---

## ÉTAPE 1 : CRÉER UN COMPTE RENDER

### 1.1 Inscription

1. Aller sur **https://render.com**
2. Cliquer sur **"Get Started"**
3. S'inscrire avec GitHub (recommandé) ou email
4. Si avec GitHub :
   - Cliquer **"Sign up with GitHub"**
   - Autoriser Render à accéder à vos repos
   - Sélectionner votre repo `blablabook-mvp`

### 1.2 Vérification

- Vous devriez voir le Dashboard Render
- Votre repo GitHub devrait être accessible

✅ **Statut :** Compte créé

---

## ÉTAPE 2 : CRÉER LA BASE DE DONNÉES POSTGRESQL

### 2.1 Créer la base

1. Dans le Dashboard Render, cliquer **"New +"** (en haut à droite)
2. Sélectionner **"PostgreSQL"**

### 2.2 Configuration

Remplir le formulaire :

| Champ | Valeur |
|-------|--------|
| **Name** | `blablabook-db` |
| **Database** | `blablabook` (auto-rempli) |
| **User** | `blablabook` (auto-rempli) |
| **Region** | `Frankfurt (EU Central)` ou le plus proche |
| **PostgreSQL Version** | 16 (dernière version) |
| **Datadog API Key** | Laisser vide |
| **Plan** | **Free** |

3. Cliquer **"Create Database"**

### 2.3 Attendre la création

- La base va être provisionnée (1-2 minutes)
- Statut : "Creating..." → "Available"

### 2.4 Copier les informations de connexion

Une fois la base créée, dans l'onglet **"Info"** ou **"Connect"** :

1. Trouver **"Internal Database URL"** (c'est l'URL complète)
2. La copier (ressemble à ça) :
   ```
   postgresql://blablabook:XXXXXX@dpg-XXXXX.frankfurt-postgres.render.com/blablabook
   ```

3. **IMPORTANT :** Décomposer cette URL pour obtenir :
   - **Host** : `dpg-XXXXX.frankfurt-postgres.render.com`
   - **Database** : `blablabook`
   - **User** : `blablabook`
   - **Password** : `XXXXXX` (entre `:` et `@`)
   - **Port** : `5432` (par défaut)

**Exemple de décomposition :**
```
postgresql://USER:PASSWORD@HOST:5432/DATABASE

postgresql://blablabook:abc123def456@dpg-xyz789.frankfurt-postgres.render.com/blablabook
              ^^^^^^^^  ^^^^^^^^^^^^  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  ^^^^^^^^^
              USER      PASSWORD      HOST                                      DATABASE
```

4. **Noter ces informations** dans un fichier temporaire

✅ **Statut :** Base PostgreSQL créée

---

## ÉTAPE 3 : DÉPLOYER LE BACKEND

### 3.1 Créer le service

1. Dashboard → **"New +"** → **"Web Service"**
2. Sélectionner **"Build and deploy from a Git repository"**
3. Cliquer **"Next"**

### 3.2 Connecter le repository

1. Trouver votre repo **`SandrinePAYET/blablabook-mvp`**
2. Cliquer **"Connect"**

### 3.3 Configuration du service

Remplir le formulaire :

| Champ | Valeur |
|-------|--------|
| **Name** | `blablabook-api` (ou ce que vous voulez) |
| **Region** | `Frankfurt (EU Central)` (même région que la DB) |
| **Branch** | `claude/fix-consistency-issues-01R1hwSVThgcoGLSjiWhtvST` |
| **Root Directory** | `backend` ⚠️ IMPORTANT |
| **Runtime** | `Node` (détecté automatiquement) |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | **Free** |

### 3.4 Variables d'environnement

Descendre jusqu'à **"Environment Variables"** et ajouter :

Cliquer **"Add Environment Variable"** pour chaque ligne :

| Key | Value |
|-----|-------|
| `DB_NAME` | `blablabook` (depuis l'URL PostgreSQL) |
| `DB_USER` | `blablabook` (depuis l'URL PostgreSQL) |
| `DB_PASSWORD` | `VOTRE_PASSWORD` (depuis l'URL PostgreSQL) |
| `DB_HOST` | `dpg-XXXXX.frankfurt-postgres.render.com` (depuis l'URL) |
| `DB_PORT` | `5432` |
| `JWT_SECRET` | `c58c06444ce23e3d6cdc6a0ee4cc62f7e1faa88452426f8c5e284ff135a6270b6b91c2225aedc6c0d87bca338e9bad03acf36d9e1ad918ceec8f4dd2feda68f3` |
| `NODE_ENV` | `production` |
| `PORT` | `3000` |
| `FRONTEND_URL` | `https://PLACEHOLDER.onrender.com` (on mettra à jour après) |

⚠️ **Attention :** Remplacer `VOTRE_PASSWORD` et `dpg-XXXXX...` par les vraies valeurs de l'étape 2.4

### 3.5 Déployer

1. Cliquer **"Create Web Service"** (en bas)
2. Le déploiement va commencer automatiquement
3. Attendre (5-10 minutes)

### 3.6 Vérifier les logs

Dans l'onglet **"Logs"**, vous devriez voir :
```
==> Downloading code from repository...
==> Running build command 'npm install'...
==> Starting service with 'npm start'...
Serveur démarré sur le port 3000
✓ Connexion à la base de données réussie
```

### 3.7 Copier l'URL du backend

Une fois le déploiement terminé (statut "Live") :
1. En haut de la page, copier l'URL
2. Exemple : `https://blablabook-api.onrender.com`
3. **Noter cette URL** pour l'étape 4

✅ **Statut :** Backend déployé

---

## ÉTAPE 4 : DÉPLOYER LE FRONTEND

### 4.1 Créer le service static

1. Dashboard → **"New +"** → **"Static Site"**
2. Sélectionner **"Build and deploy from a Git repository"**
3. Cliquer **"Next"**

### 4.2 Connecter le repository

1. Trouver **`SandrinePAYET/blablabook-mvp`** (déjà connecté normalement)
2. Cliquer **"Connect"**

### 4.3 Configuration

| Champ | Valeur |
|-------|--------|
| **Name** | `blablabook` (ou ce que vous voulez) |
| **Branch** | `claude/fix-consistency-issues-01R1hwSVThgcoGLSjiWhtvST` |
| **Root Directory** | `frontend` ⚠️ IMPORTANT |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `build` |

### 4.4 Variable d'environnement

Ajouter **"Environment Variables"** :

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://blablabook-api.onrender.com` (URL du backend de l'étape 3.7) |

⚠️ **Remplacer par votre vraie URL backend !**

### 4.5 Déployer

1. Cliquer **"Create Static Site"**
2. Attendre le build (5-10 minutes)

### 4.6 Vérifier les logs

Dans **"Logs"** :
```
==> Running build command 'npm install && npm run build'...
✓ built in XXs
==> Uploading build...
==> Build successful!
==> Your site is live at https://blablabook.onrender.com
```

### 4.7 Copier l'URL du frontend

1. Copier l'URL du site (ex: `https://blablabook.onrender.com`)
2. **Noter cette URL**

✅ **Statut :** Frontend déployé

---

## ÉTAPE 5 : CONNECTER FRONTEND ET BACKEND

### 5.1 Mettre à jour FRONTEND_URL dans le backend

1. Retourner dans le service **backend** (`blablabook-api`)
2. Aller dans **"Environment"** (menu de gauche)
3. Trouver la variable `FRONTEND_URL`
4. Cliquer sur **"Edit"** (icône crayon)
5. Remplacer `https://PLACEHOLDER.onrender.com` par l'URL réelle du frontend
   - Exemple : `https://blablabook.onrender.com`
6. Cliquer **"Save Changes"**

### 5.2 Redéployer le backend

1. Le backend va automatiquement se redéployer
2. Attendre 2-3 minutes

✅ **Statut :** Frontend et Backend connectés

---

## ÉTAPE 6 : TESTER L'APPLICATION

### 6.1 Ouvrir l'application

1. Ouvrir l'URL du frontend dans votre navigateur
   - Exemple : `https://blablabook.onrender.com`

### 6.2 Tester l'inscription

1. Cliquer **"S'inscrire"**
2. Créer un compte test :
   - Username : `test`
   - Email : `test@example.com`
   - Password : `test12345`
3. Cliquer **"S'inscrire"**
4. Vous devriez être redirigé vers la page d'accueil connecté

### 6.3 Tester la recherche

1. Cliquer **"Rechercher un livre"**
2. Rechercher "Harry Potter"
3. Vérifier que les résultats s'affichent

### 6.4 Tester l'ajout d'un livre

1. Cliquer **"Ajouter"** sur un livre
2. Le livre devrait être ajouté à votre bibliothèque

### 6.5 Tester Ma Bibliothèque

1. Cliquer **"Ma Bibliothèque"**
2. Vérifier que le livre ajouté apparaît
3. Cliquer sur le livre pour le modifier
4. Changer le statut, ajouter une note
5. Cliquer **"Enregistrer"**

### 6.6 Checklist complète

- [ ] Page d'accueil charge correctement
- [ ] Inscription fonctionne
- [ ] Connexion fonctionne
- [ ] Recherche de livres fonctionne (API Open Library)
- [ ] Ajout de livre fonctionne
- [ ] Ma Bibliothèque affiche les livres
- [ ] Modification de livre fonctionne
- [ ] Suppression de livre fonctionne
- [ ] Déconnexion fonctionne

✅ **Statut :** Application testée et fonctionnelle

---

## 🎉 FÉLICITATIONS !

Votre application est en ligne !

### URLs de production

- **Frontend :** https://blablabook.onrender.com (à remplacer par votre URL)
- **Backend API :** https://blablabook-api.onrender.com (à remplacer par votre URL)

### Partager votre projet

Vous pouvez maintenant partager l'URL du frontend avec :
- Votre formateur
- Les membres du jury
- Sur votre CV
- Sur LinkedIn

---

## ⚠️ LIMITATIONS DU PLAN GRATUIT

### Backend (Web Service Free)
- S'endort après **15 minutes** d'inactivité
- Premier chargement : **30-60 secondes** (cold start)
- 750 heures/mois (environ 31 jours)

### Base de données PostgreSQL Free
- **1 Go** de stockage
- Expire après **90 jours**
- Sauvegardes automatiques : Non
- Connexions : 97 maximum

### Frontend (Static Site Free)
- **100 Go** de bande passante/mois
- CDN global
- Pas de limite de temps
- HTTPS automatique

---

## 🔧 DEBUGGING

### Problème : "Cannot connect to database"

**Solution :**
1. Vérifier que la base PostgreSQL est "Available"
2. Vérifier les variables d'environnement du backend
3. Regarder les logs du backend pour l'erreur exacte

### Problème : "CORS error" dans la console

**Solution :**
1. Vérifier que `FRONTEND_URL` dans le backend = URL exacte du frontend
2. Pas de `/` à la fin de l'URL
3. Redéployer le backend après modification

### Problème : Le backend met 30 secondes à répondre

**Cause :** Cold start (plan gratuit)

**Solution :**
- Première requête toujours lente
- Requêtes suivantes rapides
- Pour éviter : Passer au plan payant (7$/mois)

### Problème : Build frontend échoue

**Regarder les logs :**
1. Vérifier que `Root Directory` = `frontend`
2. Vérifier que `VITE_API_URL` est défini
3. Regarder les erreurs dans les logs de build

---

## 📊 MONITORING

### Voir les logs en temps réel

**Backend :**
1. Service `blablabook-api` → "Logs"
2. Filtrer par niveau : Error, Warning, Info

**Frontend :**
1. Service `blablabook` → "Events"
2. Voir les déploiements

### Métriques

Dans chaque service, onglet **"Metrics"** :
- Requêtes par seconde
- Temps de réponse
- Utilisation CPU/RAM
- Bande passante

---

## 🔄 DÉPLOIEMENTS FUTURS

### Déploiement automatique

Par défaut, Render redéploie automatiquement quand vous poussez sur la branche configurée.

### Déploiement manuel

1. Service → "Manual Deploy"
2. Choisir la branche
3. Cliquer "Deploy"

---

## 📝 NOTES IMPORTANTES

### Sécurité

✅ **Ce qui est fait :**
- JWT_SECRET sécurisé
- HTTPS activé automatiquement
- CORS configuré
- Variables d'environnement sécurisées

⚠️ **À faire pour la production réelle :**
- Régénérer un nouveau JWT_SECRET unique
- Activer les logs d'audit
- Mettre en place des sauvegardes DB régulières
- Passer au plan payant pour la DB (au-delà de 90 jours)

### Performance

**Améliorer le cold start :**
- Passer au plan payant (7$/mois)
- Utiliser un cron job pour garder le service actif

**Améliorer la base de données :**
- Plan Standard : 7$/mois, 10 Go, sauvegardes automatiques

---

## 🆘 SUPPORT

### Documentation Render
- https://render.com/docs
- https://render.com/docs/deploy-node-express-app
- https://render.com/docs/deploy-svelte

### En cas de problème
1. Vérifier les logs
2. Vérifier les variables d'environnement
3. Consulter la documentation Render
4. Support Render : https://render.com/support

---

**Document créé le 17 novembre 2025**
**Projet : Blablabook MVP**
**Auteur : PAYET Sandrine**
