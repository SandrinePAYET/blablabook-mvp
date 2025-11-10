// backend/src/controllers/authController.js
/**
 * CONTROLLER AUTH
 * Gère l'authentification : inscription et connexion
 */

const { User } = require('../models');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { Op } = require('sequelize');

/**
 * SCHÉMA DE VALIDATION INSCRIPTION
 * Définit les règles pour les données d'inscription
 */
const registerSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.min': 'Le nom d\'utilisateur doit contenir au moins 3 caractères',
      'string.max': 'Le nom d\'utilisateur ne peut pas dépasser 50 caractères',
      'any.required': 'Le nom d\'utilisateur est obligatoire'
    }),
  
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Format email invalide',
      'any.required': 'L\'email est obligatoire'
    }),
  
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Le mot de passe doit contenir au moins 6 caractères',
      'any.required': 'Le mot de passe est obligatoire'
    })
});

/**
 * FONCTION : REGISTER (Inscription)
 * 
 * POST /api/auth/register
 * Body: { username, email, password }
 * 
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 */
const register = async (req, res) => {
  try {
    console.log('📝 Tentative d\'inscription:', req.body);

    // 1. Valider les données reçues
    const { error, value } = registerSchema.validate(req.body);
    
    if (error) {
      console.log('❌ Validation échouée:', error.details);
      return res.status(400).json({
        success: false,
        message: 'Données invalides',
        errors: error.details.map(detail => detail.message)
      });
    }

    // 2. Vérifier si l'username ou l'email existent déjà
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { username: value.username },
          { email: value.email }
        ]
      }
    });

    if (existingUser) {
      const field = existingUser.username === value.username ? 'nom d\'utilisateur' : 'email';
      console.log(`❌ ${field} déjà utilisé`);
      return res.status(409).json({
        success: false,
        message: `Ce ${field} est déjà utilisé`
      });
    }

    // 3. Créer l'utilisateur (le password sera hashé automatiquement par le hook beforeCreate)
    const user = await User.create({
      username: value.username,
      email: value.email,
      password: value.password
    });

    console.log('✅ Utilisateur créé:', user.id, user.username);

    // 4. Générer un token JWT
    const token = jwt.sign(
      { 
        userId: user.id,
        username: user.username,
        email: user.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }  // Token valide 7 jours
    );

    // 5. Retourner la réponse (sans le password)
    res.status(201).json({
      success: true,
      message: 'Inscription réussie',
      data: {
        user: user.toSafeObject(),  // Méthode qui enlève le password
        token
      }
    });

  } catch (error) {
    console.error('❌ Erreur register:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'inscription',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * SCHÉMA DE VALIDATION LOGIN
 */
const loginSchema = Joi.object({
  username: Joi.string()
    .required()
    .messages({
      'any.required': 'Le nom d\'utilisateur est obligatoire'
    }),
  
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Le mot de passe est obligatoire'
    })
});

/**
 * FONCTION : LOGIN (Connexion)
 * 
 * POST /api/auth/login
 * Body: { username, password }
 */
const login = async (req, res) => {
  try {
    console.log('🔐 Tentative de connexion:', req.body.username);

    // 1. Valider les données
    const { error, value } = loginSchema.validate(req.body);
    
    if (error) {
      console.log('❌ Validation échouée:', error.details);
      return res.status(400).json({
        success: false,
        message: 'Données invalides',
        errors: error.details.map(detail => detail.message)
      });
    }

    // 2. Trouver l'utilisateur par username
    const user = await User.findOne({
      where: { username: value.username }
    });

    if (!user) {
      console.log('❌ Utilisateur non trouvé');
      return res.status(401).json({
        success: false,
        message: 'Nom d\'utilisateur ou mot de passe incorrect'
      });
    }

    // 3. Vérifier le mot de passe
    const isPasswordValid = await user.validatePassword(value.password);

    if (!isPasswordValid) {
      console.log('❌ Mot de passe incorrect');
      return res.status(401).json({
        success: false,
        message: 'Nom d\'utilisateur ou mot de passe incorrect'
      });
    }

    console.log('✅ Connexion réussie:', user.username);

    // 4. Générer un token JWT
    const token = jwt.sign(
      { 
        userId: user.id,
        username: user.username,
        email: user.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 5. Retourner la réponse
    res.status(200).json({
      success: true,
      message: 'Connexion réussie',
      data: {
        user: user.toSafeObject(),
        token
      }
    });

  } catch (error) {
    console.error('❌ Erreur login:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la connexion',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Export des fonctions
module.exports = {
  register,
  login
};