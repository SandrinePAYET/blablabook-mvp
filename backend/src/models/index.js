// backend/src/models/index.js
/**
 * FICHIER CENTRAL DES MODÈLES
 * 
 * Gère tous les modèles et leurs associations
 */

const { sequelize } = require('../config/database');

// Import des modèles
const User = require('./User');
const Book = require('./Book');
const UserBook = require('./UserBook');

// ============================================
// DÉFINITION DES ASSOCIATIONS
// ============================================

/**
 * ASSOCIATIONS USER ↔ USERBOOK (1:N)
 * Un User a plusieurs UserBooks
 * Un UserBook appartient à un User
 */
User.hasMany(UserBook, {
  foreignKey: 'user_id',
  as: 'userBooks',
  onDelete: 'CASCADE'
});

UserBook.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

/**
 * ASSOCIATIONS BOOK ↔ USERBOOK (1:N)
 * Un Book peut être dans plusieurs bibliothèques (UserBooks)
 * Un UserBook concerne un Book
 */
Book.hasMany(UserBook, {
  foreignKey: 'book_id',
  as: 'userBooks',
  onDelete: 'CASCADE'
});

UserBook.belongsTo(Book, {
  foreignKey: 'book_id',
  as: 'book'
});

/**
 * ASSOCIATIONS USER ↔ BOOK (N:N via UserBook)
 * Un User a plusieurs Books
 * Un Book appartient à plusieurs Users
 * Relation Many-to-Many via la table UserBook
 */
User.belongsToMany(Book, {
  through: UserBook,
  foreignKey: 'user_id',
  otherKey: 'book_id',
  as: 'books'
});

Book.belongsToMany(User, {
  through: UserBook,
  foreignKey: 'book_id',
  otherKey: 'user_id',
  as: 'users'
});

// ============================================
// FONCTION DE SYNCHRONISATION
// ============================================

/**
 * Synchronise tous les modèles avec la base de données
 * 
 * @param {boolean} force - Si true, DROP les tables et les recrée (ATTENTION : perte de données)
 */
const syncDatabase = async (force = false) => {
  try {
    if (force) {
      console.log('⚠️  Mode FORCE activé : suppression et recréation des tables...');
    }
    
    await sequelize.sync({ force, alter: !force });
    
    if (force) {
      console.log('✅ Tables supprimées et recréées avec succès !');
    } else {
      console.log('✅ Base de données synchronisée avec succès !');
    }
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation de la base de données :', error);
    throw error;
  }
};

// ============================================
// EXPORT
// ============================================

module.exports = {
  // Instance Sequelize
  sequelize,
  
  // Modèles
  User,
  Book,
  UserBook,
  
  // Fonction de synchronisation
  syncDatabase
};