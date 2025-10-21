// backend/src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * ROUTES AUTHENTIFICATION
 */

// POST /api/auth/register - Inscription
router.post('/register', authController.register);

// POST /api/auth/login - Connexion (à faire ce soir)
router.post('/login', authController.login);

module.exports = router;