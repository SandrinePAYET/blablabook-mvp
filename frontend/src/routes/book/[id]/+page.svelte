<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  // Récupérer l'ID depuis l'URL
  const bookId = $page.params.id;

  // État (Svelte 5 runes)
  let userBook = $state(null);
  let loading = $state(true);
  let error = $state('');
  let saving = $state(false);

  // Charger les données du livre
  onMount(async () => {
    await loadBook();
  });

  async function loadBook() {
    loading = true;
    error = '';

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        goto('/login');
        return;
      }

      // Récupérer tous les livres et trouver celui avec cet ID
      const response = await fetch('http://localhost:3000/api/user-books', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          goto('/login');
          return;
        }
        throw new Error(data.message || 'Erreur de chargement');
      }

      // Trouver le livre avec cet ID
      const found = data.data.books.find(b => b.id === parseInt(bookId));

      if (!found) {
        error = 'Livre non trouvé';
        loading = false;
        return;
      }

      userBook = found;
      loading = false;

    } catch (err) {
      console.error('Erreur loadBook:', err);
      error = 'Erreur de connexion au serveur';
      loading = false;
    }
  }

  // Fonction pour sauvegarder les modifications
  async function saveChanges() {
    if (!userBook) return;

    saving = true;

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:3000/api/user-books/${userBook.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: userBook.status,
          rating: userBook.rating || null,
          review: userBook.review || null
        })
      });

      if (response.ok) {
        alert('✅ Modifications enregistrées !');
      } else {
        alert('❌ Erreur lors de la sauvegarde');
      }

      saving = false;

    } catch (err) {
      console.error('Erreur saveChanges:', err);
      alert('❌ Erreur de connexion');
      saving = false;
    }
  }

  // Fonction pour supprimer le livre
  async function deleteBook() {
    if (!userBook) return;

    if (!confirm(`Supprimer "${userBook.book.title}" de votre bibliothèque ?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:3000/api/user-books/${userBook.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('✅ Livre supprimé !');
        goto('/my-books');
      } else {
        alert('❌ Erreur lors de la suppression');
      }

    } catch (err) {
      console.error('Erreur deleteBook:', err);
      alert('❌ Erreur de connexion');
    }
  }
</script>

<svelte:head>
  <title>{userBook ? userBook.book.title : 'Détail livre'} - Blablabook</title>
</svelte:head>

<div class="bg-gray-50 py-3">
  <div class="container mx-auto px-4 max-w-5xl">
    
    <!-- Bouton retour -->
    <button
      onclick={() => goto('/my-books')}
      class="mb-3 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
    >
      ← Retour à Ma Bibliothèque
    </button>

    <!-- Loading -->
    {#if loading}
      <div class="flex justify-center items-center py-20">
        <div class="text-center">
          <svg class="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-gray-600">Chargement...</p>
        </div>
      </div>
    {/if}

    <!-- Erreur -->
    {#if error}
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        <strong>Erreur :</strong> {error}
      </div>
    {/if}

    <!-- Contenu -->
    {#if !loading && !error && userBook}
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="md:flex md:gap-3">
          
          <!-- Couverture -->
          <div class="md:w-1/4 bg-gray-200 flex items-center justify-center p-2">
            {#if userBook.book.cover_url}
              <img 
                src={userBook.book.cover_url} 
                alt={userBook.book.title}
                class="max-w-full max-h-32 object-contain rounded-lg shadow-md"
              />
            {:else}
              <div class="w-full h-32 bg-gradient-to-br from-blue-200 to-cyan-200 flex flex-col items-center justify-center rounded-lg">
                <svg class="w-12 h-12 mb-1" fill="#2563eb" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                <p class="text-sm text-gray-700 font-medium">Pas de couverture</p>
              </div>
            {/if}
          </div>

          <!-- Informations -->
          <div class="md:w-3/4 p-3">
            
            <!-- Titre et auteur -->
            <h1 class="text-2xl font-bold text-gray-900 mb-1">
              {userBook.book.title}
            </h1>
            
            {#if userBook.book.author}
              <p class="text-lg text-gray-600 mb-2">
                par {userBook.book.author}
              </p>
            {/if}

            <!-- Métadonnées -->
            <div class="flex gap-4 mb-3 text-sm text-gray-600">
              {#if userBook.book.published_year}
                <span>📅 {userBook.book.published_year}</span>
              {/if}
              {#if userBook.book.page_count}
                <span>📄 {userBook.book.page_count} pages</span>
              {/if}
              {#if userBook.book.isbn}
                <span>📚 ISBN: {userBook.book.isbn}</span>
              {/if}
            </div>

            <!-- Description -->
            {#if userBook.book.description}
              <div class="mb-2">
                <p class="text-sm text-gray-700 leading-relaxed line-clamp-1">
                  {userBook.book.description}
                </p>
              </div>
            {/if}

            <!-- Statut -->
            <div class="mb-3">
              <label for="status" class="block text-sm font-semibold text-gray-900 mb-2">
                Statut de lecture
              </label>
              <select
                id="status"
                bind:value={userBook.status}
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="to_read">📖 À lire</option>
                <option value="reading">📚 En cours de lecture</option>
                <option value="read">✅ Lu</option>
              </select>
            </div>

            <!-- Note -->
            <div class="mb-6">
              <label for="rating" class="block text-sm font-semibold text-gray-900 mb-2">
                Note (sur 5)
              </label>
              <input
                id="rating"
                type="number"
                min="0"
                max="5"
                step="0.5"
                bind:value={userBook.rating}
                placeholder="Ex: 4.5"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <!-- Avis -->
            <div class="mb-6">
              <label for="review" class="block text-sm font-semibold text-gray-900 mb-2">
                Votre avis
              </label>
              <textarea
                id="review"
                bind:value={userBook.review}
                placeholder="Qu'avez-vous pensé de ce livre ?"
                rows="2"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>

            <!-- Boutons actions -->
            <div class="flex gap-3">
              <button
                onclick={saveChanges}
                disabled={saving}
                class="flex-1 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
              >
                {saving ? '⏳ Enregistrement...' : '💾 Enregistrer'}
              </button>
              
              <button
                onclick={deleteBook}
                class="px-6 py-2 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 transition-colors"
              >
                🗑️ Supprimer
              </button>
            </div>

          </div>
        </div>
      </div>
    {/if}

  </div>
</div>