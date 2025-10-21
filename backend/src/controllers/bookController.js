// backend/src/controllers/bookController.js
/**
 * CONTROLLER BOOKS
 * Gère la recherche de livres via l'API Open Library
 */

const axios = require('axios');

/**
 * FONCTION : SEARCH BOOKS
 * 
 * GET /api/books/search?q=harry+potter
 * Recherche des livres sur Open Library
 * 
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 */
const searchBooks = async (req, res) => {
  try {
    // 1. Récupérer le paramètre de recherche
    const { q } = req.query;

    if (!q || q.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Le paramètre de recherche "q" est obligatoire'
      });
    }

    // 2. Appeler l'API Open Library
    const response = await axios.get('https://openlibrary.org/search.json', {
      params: {
        q: q.trim(),
        limit: 20,  // Limiter à 20 résultats
        fields: 'key,title,author_name,first_publish_year,isbn,cover_i,number_of_pages_median'
      },
      timeout: 10000  // Timeout de 10 secondes
    });

    // 3. Transformer les données pour notre format
    const books = response.data.docs.map(book => ({
      open_library_id: book.key,  // Ex: "/works/OL27448W"
      title: book.title || 'Titre inconnu',
      author: book.author_name ? book.author_name.join(', ') : 'Auteur inconnu',
      published_year: book.first_publish_year || null,
      isbn: book.isbn ? book.isbn[0] : null,
      cover_url: book.cover_i 
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        : null,
      page_count: book.number_of_pages_median || null
    }));

    // 4. Retourner les résultats
    res.json({
      success: true,
      message: `${books.length} livre(s) trouvé(s)`,
      data: {
        query: q,
        count: books.length,
        books
      }
    });

  } catch (error) {
    console.error('Erreur searchBooks:', error.message);

    // Gérer les erreurs spécifiques
    if (error.code === 'ECONNABORTED') {
      return res.status(504).json({
        success: false,
        message: 'Timeout: l\'API Open Library ne répond pas'
      });
    }

    if (error.response) {
      // Erreur de l'API Open Library
      return res.status(error.response.status).json({
        success: false,
        message: 'Erreur lors de la recherche sur Open Library',
        error: error.response.data
      });
    }

    // Erreur générale
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la recherche de livres',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * FONCTION : GET BOOK DETAILS
 * 
 * GET /api/books/:openLibraryId
 * Récupère les détails d'un livre spécifique
 * (À implémenter plus tard si nécessaire)
 */
const getBookDetails = async (req, res) => {
  res.status(501).json({
    success: false,
    message: 'getBookDetails pas encore implémenté'
  });
};

module.exports = {
  searchBooks,
  getBookDetails
};