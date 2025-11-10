// backend/src/routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

/**
 * ROUTES BOOKS (Recherche)
 */

// GET /api/books/search?q=harry - Rechercher des livres
router.get('/search', bookController.searchBooks);

// GET /api/books/:openLibraryId - Détails d'un livre (futur)
router.get('/:openLibraryId', bookController.getBookDetails);

module.exports = router;