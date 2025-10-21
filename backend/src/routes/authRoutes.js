// backend/src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * ROUTES AUTHENTIFICATION
 */

// POST /api/auth/register - Inscription
router.post('/register', authController.register);

// POST /api/auth/login - Connexion (à faire ce soir)
router.post('/login', authController.login);

// Route protégée de test (nécessite authentification)
router.get('/me', authMiddleware.authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Vous êtes authentifié !',
    user: req.user
  });
});

module.exports = router;