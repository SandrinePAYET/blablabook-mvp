// backend/src/middleware/authMiddleware.js
/**
 * MIDDLEWARE AUTHENTIFICATION JWT
 * Vérifie que l'utilisateur est connecté (token JWT valide)
 */

const jwt = require('jsonwebtoken');
const { User } = require('../models');

/**
 * Middleware : Vérifier le token JWT
 * 
 * Vérifie qu'un token valide est présent dans le header Authorization
 * Format attendu : "Bearer <token>"
 * 
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @param {Function} next - Fonction next
 */
const authenticateToken = async (req, res, next) => {
  try {
    // 1. Récupérer le header Authorization
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Token d\'authentification manquant'
      });
    }

    // 2. Extraire le token (format: "Bearer <token>")
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Format du token invalide'
      });
    }

    // 3. Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Récupérer l'utilisateur depuis la BDD
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    // 5. Ajouter l'utilisateur à la requête (accessible dans les controllers)
    req.user = user.toSafeObject();
    req.userId = user.id;

    // 6. Passer au controller suivant
    next();

  } catch (error) {
    // Token expiré ou invalide
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expiré. Veuillez vous reconnecter'
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token invalide'
      });
    }

    // Autre erreur
    console.error('Erreur middleware auth:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la vérification du token'
    });
  }
};

/**
 * Middleware optionnel : Vérifier le token mais ne pas bloquer si absent
 * Utile pour les routes qui fonctionnent avec ou sans authentification
 */
const authenticateTokenOptional = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    req.user = null;
    req.userId = null;
    return next();
  }

  const token = authHeader.split(' ')[1];
  
  if (!token) {
    req.user = null;
    req.userId = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);
    
    if (user) {
      req.user = user.toSafeObject();
      req.userId = user.id;
    }
  } catch (error) {
    // Token invalide mais on continue quand même
    req.user = null;
    req.userId = null;
  }

  next();
};

module.exports = {
  authenticateToken,
  authenticateTokenOptional
};