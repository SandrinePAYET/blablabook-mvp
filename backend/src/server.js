// backend/src/server.js
/**
 * SERVEUR EXPRESS - BLABLABOOK API
 * Point d'entrée de l'application backend
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { sequelize, syncDatabase } = require('./models');
const { testConnection } = require('./config/database');

// Import des routes
const routes = require('./routes');

// Initialisation Express
const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// MIDDLEWARES GLOBAUX
// ============================================

// Helmet : Sécurité des headers HTTP
app.use(helmet());

// CORS : Autoriser les requêtes cross-origin (frontend)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Parser JSON
app.use(express.json());

// Parser URL-encoded
app.use(express.urlencoded({ extended: true }));

// Logger simple (dev)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// ============================================
// ROUTES
// ============================================

// Route de test (health check)
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Blablabook API - Serveur opérationnel',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      books: '/api/books (à venir)',
      userBooks: '/api/user-books (à venir)'
    }
  });
});

// Montage des routes principales sur /api
app.use('/api', routes);

// Route 404 - Non trouvée
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée',
    path: req.path
  });
});

// ============================================
// GESTION DES ERREURS GLOBALES
// ============================================

app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erreur interne du serveur',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// ============================================
// DÉMARRAGE DU SERVEUR
// ============================================

const startServer = async () => {
  try {
    // 1. Test connexion PostgreSQL
    console.log('🔌 Connexion à la base de données...');
    await testConnection();

    // 2. Synchronisation des modèles (sans force pour ne pas perdre les données)
    console.log('📊 Synchronisation des modèles...');
    await syncDatabase(false);  // false = ne pas DROP les tables

    // 3. Démarrage du serveur Express
    app.listen(PORT, () => {
      console.log('\n🚀 ================================');
      console.log(`✅ Serveur démarré avec succès !`);
      console.log(`📡 URL: http://localhost:${PORT}`);
      console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📊 Base de données: ${process.env.DB_NAME}`);
      console.log('🚀 ================================\n');
      console.log('📝 Endpoints disponibles:');
      console.log(`   GET  http://localhost:${PORT}/`);
      console.log(`   POST http://localhost:${PORT}/api/auth/register`);
      console.log(`   POST http://localhost:${PORT}/api/auth/login`);
      console.log('\n👉 Appuyez sur Ctrl+C pour arrêter le serveur\n');
    });

  } catch (error) {
    console.error('❌ Erreur au démarrage du serveur:', error);
    process.exit(1);
  }
};

// Lancer le serveur
startServer();

// Gestion propre de l'arrêt
process.on('SIGINT', async () => {
  console.log('\n⚠️  Arrêt du serveur...');
  await sequelize.close();
  console.log('🔌 Connexion base de données fermée');
  console.log('👋 Serveur arrêté proprement\n');
  process.exit(0);
});