<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { getApiUrl } from '$lib/config';

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
      const response = await fetch('${getApiUrl('/api/user-books')}', {
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

      const response = await fetch(`${getApiUrl('/api/user-books')}/${userBookId}`, {
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

      const response = await fetch(`${getApiUrl('/api/user-books')}/${bookId}`, {
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

  // Fonction générique pour mettre à jour un livre
  async function updateBook(userBookId, updates) {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${getApiUrl('/api/user-books')}/${userBookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updates)
      });
      
      if (response.ok) {
        await loadBooks();
        return true;
      } else {
        alert('Erreur lors de la mise à jour');
        return false;
      }
    } catch (err) {
      console.error('Erreur updateBook:', err);
      alert('Erreur de connexion');
      return false;
    }
  }

  // Mettre à jour la note (rating)
  async function updateRating(userBookId, rating) {
    await updateBook(userBookId, { rating });
  }

  // Mettre à jour l'avis (review)
  async function updateReview(userBookId, review) {
    await updateBook(userBookId, { review });
  }

</script>

<svelte:head>
  <title>Ma Bibliothèque - Blablabook</title>
  <link href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap" rel="stylesheet">
</svelte:head>

<div class="min-h-screen py-8" style="background: linear-gradient(135deg, #8B7355 0%, #6B5444 100%); background-image: url('https://www.transparenttextures.com/patterns/wood-pattern.png'); background-blend-mode: multiply; background-size: 300px;">
  <div class="container mx-auto px-4 max-w-7xl">
    
    <!-- En-tête -->
    <div class="mb-8 rounded-lg p-6 shadow-lg" style="background: linear-gradient(135deg, #D4A574 0%, #C19A6B 50%, #A0826D 100%); background-image: repeating-linear-gradient(90deg, rgba(0,0,0,0.1) 0px, transparent 1px, transparent 3px, rgba(0,0,0,0.15) 4px, transparent 5px, transparent 8px), repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, transparent 2px, transparent 7px, rgba(255,255,255,0.08) 9px, transparent 11px, transparent 15px); box-shadow: 0 6px 12px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.3);">
      <h1 class="text-3xl md:text-5xl mb-2" style="color: #78350f; font-family: 'Satisfy', cursive; font-weight: normal; text-shadow: 1px 1px 0px #78350f;">
      </h1>
      <p style="color: #92400e;">
        Gérez votre collection personnelle de livres
      </p>
    </div>

    <!-- Loading amélioré -->
    {#if loading}
      <div class="flex justify-center items-center py-32">
        <div class="text-center bg-white rounded-xl p-8 shadow-xl" style="background-color: rgba(255, 255, 255, 0.95);">
          <div class="relative inline-block">
            <svg class="animate-spin h-16 w-16 mx-auto" style="color: #92400e;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-2xl">📚</div>
            </div>
          </div>
          <p class="font-semibold text-lg mt-4" style="color: #78350f;">Chargement de votre bibliothèque...</p>
          <p class="text-sm mt-2" style="color: #92400e;">Préparation de vos livres</p>
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
          class="px-8 py-3 text-white font-semibold rounded-lg transition-colors shadow-lg"
          style="background-color: #92400e;"
          onmouseover={(e) => e.currentTarget.style.backgroundColor = '#78350f'}
          onmouseout={(e) => e.currentTarget.style.backgroundColor = '#92400e'}
          onfocus={(e) => e.currentTarget.style.backgroundColor = '#78350f'}
          onblur={(e) => e.currentTarget.style.backgroundColor = '#92400e'}
        >
          🔍 Rechercher des livres
        </button>
      </div>
    {/if}

    <!-- Filtres par statut -->
    {#if !loading && !error && books.length > 0}
      <div class="mb-6 flex flex-wrap gap-3 p-4 rounded-lg shadow-md" style="background: linear-gradient(135deg, #C19A6B 0%, #A0826D 100%); box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
        <button
          onclick={() => filterBooks('all')}
          class="px-6 py-2 rounded-full font-bold transition-all text-sm"
          style="
            background: {currentFilter === 'all' ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : 'rgba(255, 255, 255, 0.9)'};
            color: {currentFilter === 'all' ? 'white' : '#78350f'};
            box-shadow: {currentFilter === 'all' ? '0 4px 12px rgba(245, 158, 11, 0.5)' : '0 2px 4px rgba(0,0,0,0.1)'};
            border: 2px solid {currentFilter === 'all' ? 'rgba(255, 255, 255, 0.3)' : 'transparent'};
          "
          onmouseover={(e) => {
            if (currentFilter !== 'all') {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }
          }}
          onmouseout={(e) => {
            if (currentFilter !== 'all') {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
          onfocus={(e) => {
            if (currentFilter !== 'all') {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }
          }}
          onblur={(e) => {
            if (currentFilter !== 'all') {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
        >
          📚 Tous ({books.length})
        </button>
        
        <button
          onclick={() => filterBooks('to_read')}
          class="px-6 py-2 rounded-full font-bold transition-all text-sm"
          style="
            background: {currentFilter === 'to_read' ? 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)' : 'rgba(255, 255, 255, 0.9)'};
            color: {currentFilter === 'to_read' ? 'white' : '#78350f'};
            box-shadow: {currentFilter === 'to_read' ? '0 4px 12px rgba(59, 130, 246, 0.5)' : '0 2px 4px rgba(0,0,0,0.1)'};
            border: 2px solid {currentFilter === 'to_read' ? 'rgba(255, 255, 255, 0.3)' : 'transparent'};
          "
          onmouseover={(e) => {
            if (currentFilter !== 'to_read') {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }
          }}
          onmouseout={(e) => {
            if (currentFilter !== 'to_read') {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
          onfocus={(e) => {
            if (currentFilter !== 'to_read') {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }
          }}
          onblur={(e) => {
            if (currentFilter !== 'to_read') {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
        >
          📖 À lire ({books.filter(b => b.status === 'to_read').length})
        </button>
        
        <button
          onclick={() => filterBooks('reading')}
          class="px-6 py-2 rounded-full font-bold transition-all text-sm"
          style="
            background: {currentFilter === 'reading' ? 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)' : 'rgba(255, 255, 255, 0.9)'};
            color: {currentFilter === 'reading' ? 'white' : '#78350f'};
            box-shadow: {currentFilter === 'reading' ? '0 4px 12px rgba(139, 92, 246, 0.5)' : '0 2px 4px rgba(0,0,0,0.1)'};
            border: 2px solid {currentFilter === 'reading' ? 'rgba(255, 255, 255, 0.3)' : 'transparent'};
          "
          onmouseover={(e) => {
            if (currentFilter !== 'reading') {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }
          }}
          onmouseout={(e) => {
            if (currentFilter !== 'reading') {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
          onfocus={(e) => {
            if (currentFilter !== 'reading') {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }
          }}
          onblur={(e) => {
            if (currentFilter !== 'reading') {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
        >
          📚 En cours ({books.filter(b => b.status === 'reading').length})
        </button>
        
        <button
          onclick={() => filterBooks('read')}
          class="px-6 py-2 rounded-full font-bold transition-all text-sm"
          style="
            background: {currentFilter === 'read' ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' : 'rgba(255, 255, 255, 0.9)'};
            color: {currentFilter === 'read' ? 'white' : '#78350f'};
            box-shadow: {currentFilter === 'read' ? '0 4px 12px rgba(16, 185, 129, 0.5)' : '0 2px 4px rgba(0,0,0,0.1)'};
            border: 2px solid {currentFilter === 'read' ? 'rgba(255, 255, 255, 0.3)' : 'transparent'};
          "
          onmouseover={(e) => {
            if (currentFilter !== 'read') {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }
          }}
          onmouseout={(e) => {
            if (currentFilter !== 'read') {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
          onfocus={(e) => {
            if (currentFilter !== 'read') {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }
          }}
          onblur={(e) => {
            if (currentFilter !== 'read') {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
        >
          ✅ Lu ({books.filter(b => b.status === 'read').length})
        </button>
      </div>
    {/if}

    <!-- Grille de livres -->
    {#if !loading && !error && books.length > 0}
<div class="mb-6 flex justify-between items-center p-4 rounded-lg shadow-md" style="background: linear-gradient(135deg, #C19A6B 0%, #A0826D 100%); box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
        <p class="font-semibold" style="color: #78350f;">
          {filteredBooks.length} livre{filteredBooks.length > 1 ? 's' : ''} 
          {currentFilter === 'all' ? 'dans votre bibliothèque' : 'trouvé' + (filteredBooks.length > 1 ? 's' : '')}
        </p>
        <button
  onclick={() => goto('/search')}
  class="px-4 md:px-8 py-2 md:py-3 font-bold rounded-full transition-all shadow-lg hover:scale-105 text-sm md:text-base"
  style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); color: white; box-shadow: 0 6px 16px rgba(245, 158, 11, 0.5); border: 3px solid rgba(255, 255, 255, 0.3);"
  onmouseover={(e) => {
    e.currentTarget.style.transform = 'scale(1.05)';
    e.currentTarget.style.boxShadow = '0 8px 24px rgba(245, 158, 11, 0.7)';
  }}
  onmouseout={(e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = '0 6px 16px rgba(245, 158, 11, 0.5)';
  }}
  onfocus={(e) => {
    e.currentTarget.style.transform = 'scale(1.05)';
    e.currentTarget.style.boxShadow = '0 8px 24px rgba(245, 158, 11, 0.7)';
  }}
  onblur={(e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = '0 6px 16px rgba(245, 158, 11, 0.5)';
  }}
>
  📚 Ajouter un livre
</button>
      </div>

<!-- Étagères multiples -->
      <!-- Étagères avec planche uniquement -->
      {#each Array(Math.ceil(filteredBooks.length / 6)) as _, shelfIndex}
        <div style="position: relative; margin-bottom: 40px;">
          
          <!-- Livres directement sur le fond bois -->
          <div class="flex justify-around items-end gap-6" style="min-height: 300px; padding: 0 40px 20px 40px;">
            {#each filteredBooks.slice(shelfIndex * 6, (shelfIndex + 1) * 6) as userBook}
              <div class="bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 md:hover:-translate-y-4 overflow-hidden w-full max-w-[160px] mx-auto">
                <!-- Image de couverture -->
                <div class="aspect-[2/3] bg-gray-200 flex items-center justify-center overflow-hidden">
                  {#if userBook.book.cover_url}
                    <img 
                      src={userBook.book.cover_url} 
                      alt={userBook.book.title}
                      class="w-full h-full object-cover"
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
                <div class="p-2 bg-white">
                  <a 
                    href="/book/{userBook.id}"
                    class="font-semibold text-gray-900 text-xs mb-1 hover:text-amber-700 transition-colors cursor-pointer block"
                    style="display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;"
                  >
                    {userBook.book.title}
                  </a>

                  <!-- Note -->
                  {#if userBook.rating}
                    <div class="flex items-center gap-1 text-xs text-yellow-600 mb-1">
                      <span>⭐</span>
                      <span class="font-semibold">{userBook.rating}</span>
                    </div>
                  {/if}
                  
                  {#if userBook.book.author}
                    <p class="text-[10px] text-gray-600 mb-2" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                      par {userBook.book.author}
                    </p>
                  {/if}

                  <!-- Statut avec sélecteur -->
<select
  value={userBook.status}
  onchange={(e) => updateStatus(userBook.id, e.target.value)}
  class="w-full text-[11px] px-3 py-2 mb-2 rounded-full focus:outline-none font-semibold transition-all cursor-pointer"
  style="
    background: {userBook.status === 'to_read' ? 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)' : userBook.status === 'reading' ? 'linear-gradient(135deg, #E9D5FF 0%, #D8B4FE 100%)' : 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)'};
    color: {userBook.status === 'to_read' ? '#1E40AF' : userBook.status === 'reading' ? '#6B21A8' : '#065F46'};
    border: 2px solid {userBook.status === 'to_read' ? '#3B82F6' : userBook.status === 'reading' ? '#8B5CF6' : '#10B981'};
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  "
  onmouseover={(e) => e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.25)'}
  onmouseout={(e) => e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)'}
  onfocus={(e) => e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.25)'}
  onblur={(e) => e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)'}
>
  <option value="to_read">📖 À lire</option>
  <option value="reading">📚 En cours</option>
  <option value="read">✅ Lu</option>
</select>

                  <!-- Bouton supprimer -->
                  <button
  onclick={() => deleteBook(userBook.id, userBook.book.title)}
  class="w-full px-2 py-2 text-[10px] font-bold rounded-full transition-all"
  style="background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%); color: white; box-shadow: 0 2px 6px rgba(220, 38, 38, 0.3); border: 1px solid rgba(255, 255, 255, 0.2);"
  onmouseover={(e) => {
    e.currentTarget.style.background = 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)';
    e.currentTarget.style.boxShadow = '0 4px 10px rgba(220, 38, 38, 0.5)';
  }}
  onmouseout={(e) => {
    e.currentTarget.style.background = 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)';
    e.currentTarget.style.boxShadow = '0 2px 6px rgba(220, 38, 38, 0.3)';
  }}
  onfocus={(e) => {
    e.currentTarget.style.background = 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)';
    e.currentTarget.style.boxShadow = '0 4px 10px rgba(220, 38, 38, 0.5)';
  }}
  onblur={(e) => {
    e.currentTarget.style.background = 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)';
    e.currentTarget.style.boxShadow = '0 2px 6px rgba(220, 38, 38, 0.3)';
  }}
>
  🗑️ Supprimer
</button>
                </div>
              </div>
            {/each}
          </div>
          
          <!-- BARRE/PLANCHE épaisse en bas -->
          
  <div class="h-[25px] md:h-[35px] mx-4 md:mx-8" style="
background: 
  repeating-linear-gradient(90deg, 
    rgba(0,0,0,0.1) 0px, 
    transparent 1px, 
    transparent 3px, 
    rgba(0,0,0,0.15) 4px,
    transparent 5px,
    transparent 8px
  ),
  repeating-linear-gradient(90deg, 
    rgba(255,255,255,0.05) 0px, 
    transparent 2px, 
    transparent 7px, 
    rgba(255,255,255,0.08) 9px,
    transparent 11px,
    transparent 15px
  ),
  repeating-linear-gradient(90deg, 
    rgba(0,0,0,0.08) 0px, 
    transparent 3px, 
    transparent 12px, 
    rgba(0,0,0,0.12) 14px,
    transparent 16px,
    transparent 25px
  ),
  linear-gradient(180deg, #A05030 0%, #8B4513 50%, #6B3410 100%); 
border-radius: 8px; 
box-shadow: 0 10px 20px rgba(0,0,0,0.5), inset 0 3px 8px rgba(255,255,255,0.4), inset 0 -3px 8px rgba(0,0,0,0.3); 
position: relative; 
z-index: 1;"></div>


    </div>
        {/each}
      {/if}
    </div>
    <Footer />
  </div>
