// backend/src/routes/index.js
const express = require('express');
const router = express.Router();


// Import des routes
const authRoutes = require('./authRoutes');
const bookRoutes = require('./bookRoutes');

/**
 * MONTAGE DES ROUTES
 */

// Routes authentification → /api/auth/*
router.use('/auth', authRoutes);

// Routes books (à faire plus tard) → /api/books/*
router.use('/books', bookRoutes);
// router.use('/books', bookRoutes);

// Routes user-books (à faire plus tard) → /api/user-books/*
// router.use('/user-books', userBookRoutes);

module.exports = router;