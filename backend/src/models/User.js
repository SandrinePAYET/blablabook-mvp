// backend/src/models/User.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcrypt');

/**
 * MODÈLE USER
 * 
 * Table : users
 * Gère les utilisateurs de l'application
 */
const User = sequelize.define('User', {
  // ID (auto-généré par Sequelize)
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
// Nom d'utilisateur (unique, obligatoire)
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: {
      msg: 'Ce nom d\'utilisateur est déjà utilisé'
    },
    validate: {
      notEmpty: {
        msg: 'Le nom d\'utilisateur est obligatoire'
      },
      len: {
        args: [3, 50],
        msg: 'Le nom d\'utilisateur doit contenir entre 3 et 50 caractères'
      }
    }
  },
  
  // Email (unique, obligatoire)
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: {
      msg: 'Cet email est déjà utilisé'
    },
    validate: {
      isEmail: {
        msg: 'Format email invalide'
      },
      notEmpty: {
        msg: 'L\'email est obligatoire'
      }
    }
  },
  
  // Mot de passe (haché, obligatoire)
password: {
  type: DataTypes.STRING,
  allowNull: false,
  validate: {
    len: {
      args: [6, 255],
      msg: 'Le mot de passe doit contenir au moins 6 caractères'
    }
  }
},

  // Prénom (optionnel)
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      len: {
        args: [2, 100],
        msg: 'Le prénom doit contenir entre 2 et 100 caractères'
      }
    }
  },

  // Nom (optionnel)
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      len: {
        args: [2, 100],
        msg: 'Le nom doit contenir entre 2 et 100 caractères'
      }
    }
  }

}, {
  // Options du modèle
  tableName: 'users',           // Nom de la table
  timestamps: true,             // Ajoute createdAt et updatedAt
  underscored: true,            // Utilise snake_case (created_at au lieu de createdAt)
  
  // Hooks : actions avant/après certaines opérations
  hooks: {
    /**
     * HOOK : Avant de créer un utilisateur
     * Hash le mot de passe avant insertion en BDD
     */
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },

    /**
     * HOOK : Avant de mettre à jour un utilisateur
     * Hash le mot de passe si modifié
     */
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

/**
 * MÉTHODE D'INSTANCE
 * Vérifie si un mot de passe correspond au hash stocké
 * 
 * @param {string} password - Mot de passe en clair à vérifier
 * @returns {Promise<boolean>} - True si match, false sinon
 */
User.prototype.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

/**
 * MÉTHODE D'INSTANCE
 * Retourne les données utilisateur sans le mot de passe
 * Pour envoyer dans les réponses API
 * 
 * @returns {Object} - Objet user sans password
 */
User.prototype.toSafeObject = function() {
  const { password, ...userWithoutPassword } = this.toJSON();
  return userWithoutPassword;
};

module.exports = User;