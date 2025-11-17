// backend/src/routes/index.js
const express = require('express');
const router = express.Router();


// Import des routes
const authRoutes = require('./authRoutes');
const bookRoutes = require('./bookRoutes');
const userBookRoutes = require('./userBookRoutes');

/**
 * MONTAGE DES ROUTES
 */

// Routes user-books → /api/user-books/*
router.use('/user-books', userBookRoutes);

// Routes authentification → /api/auth/*
router.use('/auth', authRoutes);

// Routes books → /api/books/*
router.use('/books', bookRoutes);

module.exports = router;