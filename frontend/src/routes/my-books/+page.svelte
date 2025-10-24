<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  // État (Svelte 5 runes)
  let books = $state([]);
  let loading = $state(true);
  let error = $state('');

  // Charger les livres au montage du composant
  onMount(async () => {
    await loadBooks();
  });

  // Fonction pour charger les livres
  async function loadBooks() {
    loading = true;
    error = '';

    try {
      // Récupérer le token
      const token = localStorage.getItem('token');

      if (!token) {
        // Pas de token → rediriger vers login
        goto('/login');
        return;
      }

      // Appel API
      const response = await fetch('http://localhost:3000/api/user-books', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          // Token invalide → rediriger vers login
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          goto('/login');
          return;
        }
        error = data.message || 'Erreur lors du chargement';
        loading = false;
        return;
      }

      // Succès
      books = data.data.books || [];
      loading = false;

    } catch (err) {
      console.error('Erreur loadBooks:', err);
      error = 'Erreur de connexion au serveur';
      loading = false;
    }
  }

  // Fonction pour supprimer un livre
  async function deleteBook(bookId, bookTitle) {
    if (!confirm(`Supprimer "${bookTitle}" de votre bibliothèque ?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:3000/api/user-books/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.ok) {
        // Recharger la liste
        await loadBooks();
      } else {
        alert('Erreur lors de la suppression');
      }
    } catch (err) {
      console.error('Erreur deleteBook:', err);
      alert('Erreur de connexion');
    }
  }
</script>

<svelte:head>
  <title>Ma Bibliothèque - Blablabook</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 py-8">
  <div class="container mx-auto px-4 max-w-7xl">
    
    <!-- En-tête -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-2">
        📚 Ma Bibliothèque
      </h1>
      <p class="text-gray-600">
        Gérez votre collection personnelle de livres
      </p>
    </div>

    <!-- Loading -->
    {#if loading}
      <div class="flex justify-center items-center py-20">
        <div class="text-center">
          <svg class="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-gray-600">Chargement de vos livres...</p>
        </div>
      </div>
    {/if}

    <!-- Erreur -->
    {#if error}
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        <strong>Erreur :</strong> {error}
      </div>
    {/if}

    <!-- Liste vide -->
    {#if !loading && !error && books.length === 0}
      <div class="bg-white rounded-xl shadow-md p-12 text-center">
        <div class="text-6xl mb-4">📖</div>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">
          Aucun livre dans votre bibliothèque
        </h2>
        <p class="text-gray-600 mb-8">
          Commencez à construire votre collection en recherchant vos livres préférés
        </p>
        <button
          onclick={() => goto('/search')}
          class="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          🔍 Rechercher des livres
        </button>
      </div>
    {/if}

    <!-- Grille de livres -->
    {#if !loading && !error && books.length > 0}
      <div class="mb-6 flex justify-between items-center">
        <p class="text-gray-600">
          {books.length} livre{books.length > 1 ? 's' : ''} dans votre bibliothèque
        </p>
        <button
          onclick={() => goto('/search')}
          class="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          ➕ Ajouter un livre
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {#each books as userBook}
          <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
            
            <!-- Image de couverture -->
            <div class="h-64 bg-gray-200 flex items-center justify-center overflow-hidden">
              {#if userBook.book.cover_url}
                <img 
                  src={userBook.book.cover_url} 
                  alt={userBook.book.title}
                  class="w-full h-full object-cover"
                />
              {:else}
                <div class="text-6xl">📚</div>
              {/if}
            </div>

            <!-- Informations -->
            <div class="p-4">
              <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
                {userBook.book.title}
              </h3>
              
              {#if userBook.book.author}
                <p class="text-sm text-gray-600 mb-3">
                  par {userBook.book.author}
                </p>
              {/if}

              <!-- Statut -->
              <div class="mb-3">
                {#if userBook.status === 'to_read'}
                  <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                    📖 À lire
                  </span>
                {:else if userBook.status === 'reading'}
                  <span class="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                    📚 En cours
                  </span>
                {:else if userBook.status === 'read'}
                  <span class="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                    ✅ Lu
                  </span>
                {/if}
              </div>

              <!-- Bouton supprimer -->
              <button
                onclick={() => deleteBook(userBook.id, userBook.book.title)}
                class="w-full px-4 py-2 bg-red-100 text-red-700 text-sm font-semibold rounded-lg hover:bg-red-200 transition-colors"
              >
                🗑️ Supprimer
              </button>
            </div>
          </div>
        {/each}
      </div>
    {/if}

  </div>
</div>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>