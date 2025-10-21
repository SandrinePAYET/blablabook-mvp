// backend/src/controllers/authController.js
/**
 * CONTROLLER AUTH
 * Gère l'authentification : inscription et connexion
 */

const { User } = require('../models');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

/**
 * SCHÉMA DE VALIDATION INSCRIPTION
 * Définit les règles pour les données d'inscription
 */
const registerSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Format email invalide',
      'any.required': 'L\'email est obligatoire'
    }),
  
  password: Joi.string()
    .min(8)
    .required()
    .messages({
      'string.min': 'Le mot de passe doit contenir au moins 8 caractères',
      'any.required': 'Le mot de passe est obligatoire'
    }),
  
  first_name: Joi.string()
    .min(2)
    .max(100)
    .optional()
    .allow('', null),
  
  last_name: Joi.string()
    .min(2)
    .max(100)
    .optional()
    .allow('', null)
});

/**
 * FONCTION : REGISTER (Inscription)
 * 
 * POST /api/auth/register
 * Body: { email, password, first_name?, last_name? }
 * 
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 */
const register = async (req, res) => {
  try {
    // 1. Valider les données reçues
    const { error, value } = registerSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Données invalides',
        errors: error.details.map(detail => detail.message)
      });
    }

    // 2. Vérifier si l'email existe déjà
    const existingUser = await User.findOne({
      where: { email: value.email }
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Cet email est déjà utilisé'
      });
    }

    // 3. Créer l'utilisateur (le password sera hashé automatiquement par le hook beforeCreate)
    const user = await User.create({
      email: value.email,
      password: value.password,
      first_name: value.first_name || null,
      last_name: value.last_name || null
    });

    // 4. Générer un token JWT
    const token = jwt.sign(
      { 
        userId: user.id,
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
    console.error('Erreur register:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'inscription',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * FONCTION : LOGIN (Connexion)
 * À DÉVELOPPER CE SOIR
 */
const login = async (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Login pas encore implémenté - à faire ce soir'
  });
};

// Export des fonctions
module.exports = {
  register,
  login
};