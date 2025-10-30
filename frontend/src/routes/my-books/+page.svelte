<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  // État (Svelte 5 runes)
  let books = $state([]);
  let loading = $state(true);
  let error = $state('');
  let currentFilter = $state('all');
  let filteredBooks = $derived(
  currentFilter === 'all' 
    ? books 
    : books.filter(b => b.status === currentFilter)
);

  // Charger les livres au montage du composant
  onMount(async () => {
    await loadBooks();
  });

  // Fonction pour changer le filtre
  function filterBooks(filter) {
    currentFilter = filter;
  }

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

  // Fonction pour changer le statut d'un livre
  async function updateStatus(userBookId, newStatus) {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:3000/api/user-books/${userBookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        // Recharger la liste
        await loadBooks();
      } else {
        alert('Erreur lors de la mise à jour du statut');
      }
    } catch (err) {
      console.error('Erreur updateStatus:', err);
      alert('Erreur de connexion');
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

    <!-- Loading amélioré -->
{#if loading}
  <div class="flex justify-center items-center py-32">
    <div class="text-center">
      <div class="relative inline-block">
        <svg class="animate-spin h-16 w-16 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-2xl">📚</div>
        </div>
      </div>
      <p class="text-gray-700 font-semibold text-lg mt-4">Chargement de votre bibliothèque...</p>
      <p class="text-gray-500 text-sm mt-2">Préparation de vos livres</p>
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

    <!-- Filtres par statut -->
    {#if !loading && !error && books.length > 0}
      <div class="mb-6 flex gap-3">
        <button
          onclick={() => filterBooks('all')}
          class="px-4 py-2 rounded-lg font-semibold transition-colors {currentFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
        >
          Tous ({books.length})
        </button>
        <button
          onclick={() => filterBooks('to_read')}
          class="px-4 py-2 rounded-lg font-semibold transition-colors {currentFilter === 'to_read' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
        >
          📖 À lire ({books.filter(b => b.status === 'to_read').length})
        </button>
        <button
          onclick={() => filterBooks('reading')}
          class="px-4 py-2 rounded-lg font-semibold transition-colors {currentFilter === 'reading' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
        >
          📚 En cours ({books.filter(b => b.status === 'reading').length})
        </button>
        <button
          onclick={() => filterBooks('read')}
          class="px-4 py-2 rounded-lg font-semibold transition-colors {currentFilter === 'read' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
        >
          ✅ Lu ({books.filter(b => b.status === 'read').length})
        </button>
      </div>
    {/if}

    <!-- Grille de livres -->
    {#if !loading && !error && books.length > 0}
      <div class="mb-6 flex justify-between items-center">
        <p class="text-gray-600">
  {filteredBooks.length} livre{filteredBooks.length > 1 ? 's' : ''} 
  {currentFilter === 'all' ? 'dans votre bibliothèque' : 'trouvé' + (filteredBooks.length > 1 ? 's' : '')}
</p>
        <button
          onclick={() => goto('/search')}
          class="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          ➕ Ajouter un livre
        </button>
      </div>

      <div class="grid grid-cols-6 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-10" style="gap: 40px;">
        {#each filteredBooks as userBook}
          <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
            
            <!-- Image de couverture -->
            <div class="aspect-[2/3] bg-gray-200 flex items-center justify-center overflow-hidden">
              {#if userBook.book.cover_url}
                <img 
                  src={userBook.book.cover_url} 
                  alt={userBook.book.title}
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
              <a 
  href="/book/{userBook.id}"
  class="font-semibold text-gray-900 text-xs mb-1 line-clamp-1 hover:text-blue-600 transition-colors cursor-pointer block"
>
  {userBook.book.title}
</a>

<a 
  href="/book/{userBook.id}"
  class="font-semibold text-gray-900 text-xs mb-1 line-clamp-1 hover:text-blue-600 transition-colors cursor-pointer block"
>
  {userBook.book.title}
</a>

<!-- Note (NOUVEAU CODE À AJOUTER ICI) -->
{#if userBook.rating}
  <div class="flex items-center gap-1 text-xs text-yellow-600 mb-1">
    <span>⭐</span>
    <span class="font-semibold">{userBook.rating}</span>
  </div>
{/if}
              
{#if userBook.book.author}
  <p class="text-[10px] text-gray-600 mb-2 truncate">
    par {userBook.book.author}
  </p>
{/if}
              
              {#if userBook.book.author}
                <p class="text-[10px] text-gray-600 mb-2 truncate">
                  par {userBook.book.author}
                </p>
              {/if}

              <!-- Statut avec sélecteur -->
              <select
                value={userBook.status}
                onchange={(e) => updateStatus(userBook.id, e.target.value)}
                class="w-full text-[10px] px-2 py-1 mb-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              >
                <option value="to_read">📖 À lire</option>
                <option value="reading">📚 En cours</option>
                <option value="read">✅ Lu</option>
              </select>

              <!-- Bouton supprimer -->
              <button
                onclick={() => deleteBook(userBook.id, userBook.book.title)}
                class="w-full px-2 py-1 bg-red-100 text-red-700 text-[10px] font-semibold rounded hover:bg-red-200 transition-colors"
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