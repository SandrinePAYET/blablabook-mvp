// backend/src/config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

/**
 * Configuration de la connexion à PostgreSQL avec Sequelize
 */
const sequelize = new Sequelize(
  process.env.DB_NAME,      // blablabook
  process.env.DB_USER,      // student
  process.env.DB_PASSWORD,  // blablabook2025
  {
    host: process.env.DB_HOST,     // localhost
    port: process.env.DB_PORT,     // 5432
    dialect: 'postgres',
    
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    
    // Pool de connexions
    pool: {
      max: 5,           // Maximum 5 connexions simultanées
      min: 0,           // Minimum 0
      acquire: 30000,   // Temps max pour acquérir connexion (30s)
      idle: 10000       // Temps max avant fermeture connexion inactive (10s)
    },
    
    // Options PostgreSQL
    dialectOptions: {
      // SSL si production (Heroku, etc.)
      // ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    },
    
    // Timezone
    timezone: '+02:00' // Europe/Paris (CEST)
  }
);

/**
 * Fonction pour tester la connexion à la base de données
 */
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à PostgreSQL réussie !');
    console.log(`📊 Base de données : ${process.env.DB_NAME}`);
  } catch (error) {
    console.error('❌ Erreur de connexion à PostgreSQL :', error.message);
    process.exit(1); // Arrêter l'application si pas de connexion BDD
  }
};

module.exports = { sequelize, testConnection };