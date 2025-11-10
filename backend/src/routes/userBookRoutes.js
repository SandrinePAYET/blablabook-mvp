// backend/src/routes/userBookRoutes.js
const express = require('express');
const router = express.Router();
const userBookController = require('../controllers/userBookController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * ROUTES USER BOOKS (Bibliothèque personnelle)
 * Toutes les routes sont protégées (nécessitent authentification)
 */

// POST /api/user-books - Ajouter un livre à ma bibliothèque
router.post('/', authMiddleware.authenticateToken, userBookController.addBook);

// GET /api/user-books - Récupérer mes livres (optionnel: ?status=reading)
router.get('/', authMiddleware.authenticateToken, userBookController.getMyBooks);

// PUT /api/user-books/:id - Modifier un livre de ma bibliothèque (statut, rating, review)
router.put('/:id', authMiddleware.authenticateToken, userBookController.updateBook);

// DELETE /api/user-books/:id - Supprimer un livre de ma bibliothèque
router.delete('/:id', authMiddleware.authenticateToken, userBookController.removeBook);

module.exports = router;