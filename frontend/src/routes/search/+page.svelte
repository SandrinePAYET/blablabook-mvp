<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  // État (Svelte 5 runes)
  let searchQuery = $state('');
  let books = $state([]);
  let loading = $state(false);
  let error = $state('');
  let addingBookId = $state(null);

  // Vérifier authentification
  onMount(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      goto('/login');
    }
  });

  // Fonction de recherche
  async function searchBooks(event) {
    event.preventDefault();
    
    if (!searchQuery.trim()) {
      error = 'Veuillez entrer un titre ou un auteur';
      return;
    }

    loading = true;
    error = '';
    books = [];

    try {
      // Appel API Open Library
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&limit=20`
      );

      if (!response.ok) {
        throw new Error('Erreur lors de la recherche');
      }

      const data = await response.json();

      // Transformer les résultats
      books = data.docs.map(book => ({
        key: book.key,
        title: book.title,
        author: book.author_name ? book.author_name[0] : 'Auteur inconnu',
        cover_id: book.cover_i,
        first_publish_year: book.first_publish_year,
        isbn: book.isbn ? book.isbn[0] : null
      }));

      if (books.length === 0) {
        error = 'Aucun livre trouvé. Essayez une autre recherche.';
      }

      loading = false;

    } catch (err) {
      console.error('Erreur searchBooks:', err);
      error = 'Erreur lors de la recherche. Réessayez.';
      loading = false;
    }
  }

  // Fonction pour ajouter un livre à la bibliothèque
  async function addToLibrary(book) {
    addingBookId = book.key;

    try {
      const token = localStorage.getItem('token');

      // Préparer les données du livre
      const bookData = {
        open_library_id: book.key,
        title: book.title,
        author: book.author,
        isbn: book.isbn || null,
        cover_url: book.cover_id 
          ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
          : null,
        published_year: book.first_publish_year || null
      };

      // Appel API backend
      const response = await fetch('http://localhost:3000/api/user-books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookData)
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          goto('/login');
          return;
        }
        alert(data.message || 'Erreur lors de l\'ajout');
        addingBookId = null;
        return;
      }

      // Succès
      alert(`"${book.title}" ajouté à votre bibliothèque ! 📚`);
      addingBookId = null;

    } catch (err) {
      console.error('Erreur addToLibrary:', err);
      alert('Erreur de connexion au serveur');
      addingBookId = null;
    }
  }

  // Fonction pour obtenir l'URL de la couverture
  function getCoverUrl(coverId) {
    if (!coverId) return null;
    return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
  }
</script>

<svelte:head>
  <title>Rechercher des livres - Blablabook</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 py-8">
  <div class="container mx-auto px-4 max-w-7xl">
    
    <!-- En-tête -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-2">
        🔍 Rechercher des livres
      </h1>
      <p class="text-gray-600">
        Découvrez des millions de livres grâce à Open Library
      </p>
    </div>

    <!-- Formulaire de recherche -->
    <form onsubmit={searchBooks} class="mb-8">
      <div class="flex gap-3">
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Titre, auteur, ISBN..."
          class="flex-1 px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          class="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? '⏳ Recherche...' : '🔍 Rechercher'}
        </button>
      </div>
    </form>

    <!-- Erreur -->
    {#if error}
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        {error}
      </div>
    {/if}

    <!-- Loading -->
    {#if loading}
      <div class="flex justify-center items-center py-20">
        <div class="text-center">
          <svg class="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-gray-600">Recherche en cours...</p>
        </div>
      </div>
    {/if}

    <!-- Résultats -->
    {#if !loading && books.length > 0}
      <div class="mb-6">
        <p class="text-gray-600">
          {books.length} résultat{books.length > 1 ? 's' : ''} trouvé{books.length > 1 ? 's' : ''}
        </p>
      </div>

      <div class="grid grid-cols-6 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-10" style="gap: 40px;">
        {#each books as book (book.key)}
          <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
            
            <!-- Image de couverture -->
            <div class="aspect-[2/3] bg-gray-200 flex items-center justify-center overflow-hidden">
              {#if book.cover_id}
                <img 
                  src={getCoverUrl(book.cover_id)} 
                  alt={book.title}
                  class="w-full h-full object-contain"
                />
           {:else}
  <div class="w-full h-full bg-gradient-to-br from-blue-200 to-cyan-200 flex flex-col items-center justify-center p-2">
    <svg class="w-12 h-12 mb-1" fill="#2563eb" viewBox="0 0 20 20">
      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
    </svg>
    <p class="text-[9px] text-gray-700 font-medium text-center">Pas de couverture</p>
  </div>
{/if}
            </div>

            <!-- Informations -->
            <div class="p-2">
              <h3 class="font-semibold text-gray-900 text-xs mb-1 line-clamp-1">
                {book.title}
              </h3>
              
              <p class="text-[10px] text-gray-600 mb-2 truncate">
                {book.author}
              </p>

              <!-- Bouton ajouter -->
              <button
                onclick={() => addToLibrary(book)}
                disabled={addingBookId === book.key}
                class="w-full px-2 py-1 bg-blue-600 text-white text-[10px] font-semibold rounded hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {addingBookId === book.key ? '⏳' : '➕'}
              </button>
            </div>
          </div>
        {/each}
      </div>

      <!-- Bouton voir ma bibliothèque -->
      <div class="mt-8 text-center">
        <button
          onclick={() => goto('/my-books')}
          class="px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition-colors"
        >
          📚 Voir ma bibliothèque
        </button>
      </div>
    {/if}

  </div>
</div>

<style>
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>