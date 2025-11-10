// backend/src/controllers/userBookController.js
/**
 * CONTROLLER USERBOOKS
 * Gère la bibliothèque personnelle de l'utilisateur
 */

const { User, Book, UserBook } = require('../models');
const Joi = require('joi');

/**
 * SCHÉMA DE VALIDATION POUR AJOUTER UN LIVRE
 */
const addBookSchema = Joi.object({
  open_library_id: Joi.string().required().messages({
    'any.required': 'L\'ID Open Library est obligatoire'
  }),
  title: Joi.string().required().min(1).max(500).messages({
    'any.required': 'Le titre est obligatoire'
  }),
  author: Joi.string().allow('', null).optional(),
  published_year: Joi.number().integer().min(1000).optional(),
  isbn: Joi.string().allow('', null).optional(),
  cover_url: Joi.string().uri().allow('', null).optional(),
  description: Joi.string().allow('', null).optional(),
  page_count: Joi.number().integer().min(1).optional(),
  status: Joi.string().valid('to_read', 'reading', 'read').optional().default('to_read')
});

/**
 * FONCTION : ADD BOOK
 * 
 * POST /api/user-books
 * Ajoute un livre à la bibliothèque de l'utilisateur
 * Route protégée (nécessite authentification)
 * 
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 */
const addBook = async (req, res) => {
  try {
    // 1. Valider les données
    const { error, value } = addBookSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Données invalides',
        errors: error.details.map(detail => detail.message)
      });
    }

    // 2. Trouver ou créer le livre dans la table books
    const [book, created] = await Book.findOrCreate({
      where: { open_library_id: value.open_library_id },
      defaults: {
        open_library_id: value.open_library_id,
        title: value.title,
        author: value.author || null,
        published_year: value.published_year || null,
        isbn: value.isbn || null,
        cover_url: value.cover_url || null,
        description: value.description || null,
        page_count: value.page_count || null
      }
    });

    // 3. Vérifier si l'utilisateur a déjà ce livre
    const existingUserBook = await UserBook.findOne({
      where: {
        user_id: req.userId,
        book_id: book.id
      }
    });

    if (existingUserBook) {
      return res.status(409).json({
        success: false,
        message: 'Ce livre est déjà dans votre bibliothèque'
      });
    }

    // 4. Créer l'entrée UserBook (lien user <-> book)
    const userBook = await UserBook.create({
      user_id: req.userId,
      book_id: book.id,
      status: value.status || 'to_read'
    });

    // 5. Récupérer le UserBook avec les détails du livre
    const userBookWithDetails = await UserBook.findByPk(userBook.id, {
      include: {
        model: Book,
        as: 'book'
      }
    });

    // 6. Retourner la réponse
    res.status(201).json({
      success: true,
      message: created ? 'Livre ajouté à votre bibliothèque' : 'Livre existant ajouté à votre bibliothèque',
      data: {
        userBook: userBookWithDetails
      }
    });

  } catch (error) {
    console.error('Erreur addBook:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'ajout du livre',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * FONCTION : GET MY BOOKS
 * 
 * GET /api/user-books
 * Récupère tous les livres de la bibliothèque de l'utilisateur
 * Route protégée (nécessite authentification)
 * 
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 */
const getMyBooks = async (req, res) => {
  try {
    // 1. Récupérer les paramètres de filtrage optionnels
    const { status } = req.query;

    // 2. Construire les conditions de recherche
    const where = { user_id: req.userId };
    
    if (status && ['to_read', 'reading', 'read'].includes(status)) {
      where.status = status;
    }

    // 3. Récupérer les livres de l'utilisateur avec détails
    const userBooks = await UserBook.findAll({
      where,
      include: {
        model: Book,
        as: 'book'
      },
      order: [['created_at', 'DESC']]  // Plus récents en premier
    });

    // 4. Retourner la réponse
    res.json({
      success: true,
      message: `${userBooks.length} livre(s) dans votre bibliothèque`,
      data: {
        count: userBooks.length,
        books: userBooks
      }
    });

  } catch (error) {
    console.error('Erreur getMyBooks:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de vos livres',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * FONCTION : REMOVE BOOK
 * 
 * DELETE /api/user-books/:id
 * Supprime un livre de la bibliothèque de l'utilisateur
 * Route protégée (nécessite authentification)
 * 
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 */
const removeBook = async (req, res) => {
  try {
    // 1. Récupérer l'ID du UserBook
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID invalide'
      });
    }

    // 2. Trouver le UserBook
    const userBook = await UserBook.findOne({
      where: {
        id: parseInt(id),
        user_id: req.userId  // Vérifier que c'est bien le livre de l'utilisateur
      },
      include: {
        model: Book,
        as: 'book'
      }
    });

    if (!userBook) {
      return res.status(404).json({
        success: false,
        message: 'Livre non trouvé dans votre bibliothèque'
      });
    }

    // 3. Supprimer le UserBook
    const bookTitle = userBook.book.title;
    await userBook.destroy();

    // 4. Retourner la réponse
    res.json({
      success: true,
      message: `"${bookTitle}" supprimé de votre bibliothèque`
    });

  } catch (error) {
    console.error('Erreur removeBook:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du livre',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * FONCTION : UPDATE BOOK
 * 
 * PUT /api/user-books/:id
 * Modifie un livre de la bibliothèque (statut, rating, review)
 * Route protégée (nécessite authentification)
 * 
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 */
const updateBook = async (req, res) => {
  try {
    // 1. Récupérer l'ID du UserBook
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID invalide'
      });
    }

    // 2. Récupérer les données à mettre à jour
    const { status, rating, review } = req.body;

    // 3. Valider le statut si fourni
    if (status && !['to_read', 'reading', 'read'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Statut invalide. Valeurs autorisées: to_read, reading, read'
      });
    }

    // 4. Trouver le UserBook
    const userBook = await UserBook.findOne({
      where: {
        id: parseInt(id),
        user_id: req.userId  // Vérifier que c'est bien le livre de l'utilisateur
      },
      include: {
        model: Book,
        as: 'book'
      }
    });

    if (!userBook) {
      return res.status(404).json({
        success: false,
        message: 'Livre non trouvé dans votre bibliothèque'
      });
    }

    // 5. Mettre à jour les champs
    if (status !== undefined) userBook.status = status;
    if (rating !== undefined) userBook.rating = rating;
    if (review !== undefined) userBook.review = review;

    await userBook.save();

    // 6. Recharger avec les relations
    await userBook.reload({
      include: {
        model: Book,
        as: 'book'
      }
    });

    // 7. Retourner la réponse
    res.json({
      success: true,
      message: 'Livre mis à jour avec succès',
      data: {
        userBook
      }
    });

  } catch (error) {
    console.error('Erreur updateBook:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du livre',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  addBook,
  getMyBooks,
  updateBook,
  removeBook
};