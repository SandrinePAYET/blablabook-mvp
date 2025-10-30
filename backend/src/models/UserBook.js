// backend/src/models/UserBook.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * MODÈLE USERBOOK
 * 
 * Table : user_books
 * Table de liaison entre User et Book (relation N:N)
 * Représente un livre dans la bibliothèque personnelle d'un utilisateur
 */
const UserBook = sequelize.define('UserBook', {
  // ID (auto-généré)
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  // Clé étrangère vers User
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE',  // Si user supprimé → supprime ses UserBooks
    onUpdate: 'CASCADE'
  },

  // Clé étrangère vers Book
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'books',
      key: 'id'
    },
    onDelete: 'CASCADE',  // Si book supprimé → supprime les UserBooks
    onUpdate: 'CASCADE'
  },

  // Statut de lecture (optionnel, pour futur post-MVP)
  // 'to_read' = à lire
  // 'reading' = en cours de lecture
  // 'read' = déjà lu
  status: {
    type: DataTypes.ENUM('to_read', 'reading', 'read'),
    allowNull: true,
    defaultValue: 'to_read',
    validate: {
      isIn: {
        args: [['to_read', 'reading', 'read']],
        msg: 'Le statut doit être to_read, reading ou read'
      }
    }
  },

  // Note du livre (optionnel, pour futur post-MVP)
  // De 1 à 5 étoiles
  rating: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: {
        args: [1],
        msg: 'La note doit être entre 1 et 5'
      },
      max: {
        args: [5],
        msg: 'La note doit être entre 1 et 5'
      }
    }
  },

  // Avis personnel sur le livre (optionnel, pour futur post-MVP)
  review: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: {
        args: [0, 2000],
        msg: 'L\'avis ne peut pas dépasser 2000 caractères'
      }
    }
  }

}, {
  // Options du modèle
  tableName: 'user_books',
  timestamps: true,
  underscored: true,
  
  // Index UNIQUE sur (user_id, book_id)
  // Un utilisateur ne peut pas avoir 2 fois le même livre dans sa bibliothèque
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'book_id'],
      name: 'unique_user_book'
    },
    {
      // Index pour recherche rapide par user_id
      fields: ['user_id']
    },
    {
      // Index pour recherche rapide par book_id
      fields: ['book_id']
    }
  ]
});

/**
 * MÉTHODE STATIQUE
 * Vérifie si un utilisateur a déjà un livre dans sa bibliothèque
 * 
 * @param {number} userId - ID de l'utilisateur
 * @param {number} bookId - ID du livre
 * @returns {Promise<boolean>} - True si le livre est dans la bibliothèque
 */
UserBook.userHasBook = async function(userId, bookId) {
  const count = await UserBook.count({
    where: {
      user_id: userId,
      book_id: bookId
    }
  });
  return count > 0;
};

/**
 * MÉTHODE STATIQUE
 * Récupère tous les livres d'un utilisateur avec détails
 * 
 * @param {number} userId - ID de l'utilisateur
 * @returns {Promise<Array>} - Liste des UserBooks avec infos Book
 */
UserBook.getUserBooksWithDetails = async function(userId) {
  const Book = require('./Book');
  
  return await UserBook.findAll({
    where: { user_id: userId },
    include: [
      {
        model: Book,
        as: 'book'
      }
    ],
    order: [['created_at', 'DESC']]  // Plus récents en premier
  });
};

module.exports = UserBook;