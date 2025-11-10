// backend/src/models/Book.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * MODÈLE BOOK
 * 
 * Table : books
 * Représente un livre (stocké une seule fois même si plusieurs utilisateurs l'ont)
 */
const Book = sequelize.define('Book', {
  // ID (auto-généré)
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  // ID Open Library (unique, obligatoire)
  // Permet d'identifier le livre de manière unique
  // Ex: "OL27448W" pour Harry Potter
  open_library_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: {
      msg: 'Ce livre existe déjà dans la base de données'
    },
    validate: {
      notEmpty: {
        msg: 'L\'ID Open Library est obligatoire'
      }
    }
  },

  // Titre du livre (obligatoire)
  title: {
    type: DataTypes.STRING(500),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Le titre est obligatoire'
      },
      len: {
        args: [1, 500],
        msg: 'Le titre doit contenir entre 1 et 500 caractères'
      }
    }
  },

  // Auteur(s) du livre (optionnel car parfois inconnu)
  author: {
    type: DataTypes.STRING(300),
    allowNull: true
  },

  // Année de publication (optionnel)
  published_year: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: {
        args: [1000],
        msg: 'L\'année de publication doit être supérieure à 1000'
      },
      max: {
        args: [new Date().getFullYear() + 1],
        msg: 'L\'année de publication ne peut pas être dans le futur'
      }
    }
  },

  // ISBN (optionnel)
  isbn: {
    type: DataTypes.STRING(20),
    allowNull: true
  },

  // URL de la couverture (optionnel)
  cover_url: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      isUrl: {
        msg: 'L\'URL de la couverture doit être valide'
      }
    }
  },

  // Description/résumé du livre (optionnel)
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  // Nombre de pages (optionnel)
  page_count: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: {
        args: [1],
        msg: 'Le nombre de pages doit être supérieur à 0'
      }
    }
  }

}, {
  // Options du modèle
  tableName: 'books',
  timestamps: true,
  underscored: true,
  
  // Index pour recherche rapide par open_library_id
  indexes: [
    {
      unique: true,
      fields: ['open_library_id']
    },
    {
      // Index pour recherche par titre
      fields: ['title']
    }
  ]
});

/**
 * MÉTHODE STATIQUE
 * Trouve ou crée un livre (évite les doublons)
 * 
 * @param {Object} bookData - Données du livre
 * @returns {Promise<[Book, boolean]>} - [livre, créé?]
 */
Book.findOrCreateByOpenLibraryId = async function(bookData) {
  const [book, created] = await Book.findOrCreate({
    where: { open_library_id: bookData.open_library_id },
    defaults: bookData
  });
  return [book, created];
};

module.exports = Book;