<script>
  import { onMount } from 'svelte';
  import Footer from '$lib/components/Footer.svelte';

  let query = $state('');
  let results = $state([]);
  let loading = $state(false);
  let error = $state('');

  async function searchBooks() {
    if (!query.trim()) {
      results = [];
      return;
    }

    loading = true;
    error = '';

    try {
      const response = await fetch(`http://localhost:3000/api/books/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (response.ok) {
        results = data.data.books || [];
      } else {
        error = data.message || 'Erreur lors de la recherche';
      }
    } catch (err) {
      console.error('Erreur:', err);
      error = 'Erreur de connexion au serveur';
    } finally {
      loading = false;
    }
  }

  async function addToLibrary(book) {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('Veuillez vous connecter pour ajouter des livres');
        return;
      }

      const response = await fetch('http://localhost:3000/api/user-books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
body: JSON.stringify({
  open_library_id: book.open_library_id,
  title: book.title,
   author: book.author,
    cover_url: book.cover_url,
     status: 'to_read'
        })
      });

      if (response.ok) {
        alert(`"${book.title}" ajouté à votre bibliothèque ! 📚`);
      } else {
        const data = await response.json();
        alert(data.message || 'Erreur lors de l\'ajout');
      }
    } catch (err) {
      console.error('Erreur:', err);
      alert('Erreur de connexion');
    }
  }
</script>

<svelte:head>
  <title>Rechercher des livres - Blablabook</title>
  <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
</svelte:head>

<style>
  /* Effet 3D sur les livres */
  .book-3d {
    transform-style: preserve-3d;
    transition: all 0.3s ease;
  }
  
  .book-3d:hover {
    transform: translateY(-20px) rotateY(-5deg);
  }

  /* Ombre réaliste */
  .book-shadow {
    box-shadow: 
      0 15px 30px rgba(0,0,0,0.3),
      0 5px 15px rgba(0,0,0,0.2),
      inset 0 -2px 5px rgba(0,0,0,0.1);
  }

  /* Réflexion sous le livre */
  .book-reflection {
    position: relative;
  }
  
.book-reflection::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(to bottom, rgba(0,0,0,0.15), transparent);
  transform: scaleY(-1);
  opacity: 0.4;
  filter: blur(3px);
  pointer-events: none;
}

  /* Étagère avec profondeur */
  .shelf-3d {
    background: 
      linear-gradient(180deg, 
        #A05030 0%, 
        #8B4513 30%,
        #6B3410 60%,
        #5A3510 100%
      );
    box-shadow: 
      0 -2px 0 rgba(255,255,255,0.2),
      0 15px 25px rgba(0,0,0,0.6),
      inset 0 -5px 15px rgba(0,0,0,0.4),
      inset 0 3px 8px rgba(255,255,255,0.3);
    border-top: 2px solid rgba(160,80,48,0.8);
    position: relative;
  }

  /* Texture bois sur étagère */
  .shelf-3d::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      repeating-linear-gradient(90deg, 
        rgba(0,0,0,0.1) 0px, 
        transparent 1px, 
        transparent 3px, 
        rgba(0,0,0,0.15) 4px,
        transparent 5px,
        transparent 10px
      );
    pointer-events: none;
  }

  /* Effet de profondeur sur le conteneur */
  .shelf-container {
    perspective: 1000px;
    transform-style: preserve-3d;
  }
</style>

<!-- Fond bois avec texture -->
<div class="min-h-screen py-8" style="background: linear-gradient(135deg, #8B7355 0%, #6B5444 100%); background-image: url('https://www.transparenttextures.com/patterns/wood-pattern.png'); background-blend-mode: multiply; background-size: 300px;">

  <div class="container mx-auto px-4 max-w-7xl">
    
    <!-- En-tête avec barre de recherche -->
    <div class="mb-8 rounded-xl p-8 shadow-xl" style="background: linear-gradient(135deg, #D4A574 0%, #C19A6B 50%, #A0826D 100%); background-image: repeating-linear-gradient(90deg, rgba(0,0,0,0.1) 0px, transparent 1px, transparent 3px, rgba(0,0,0,0.15) 4px, transparent 5px, transparent 8px); box-shadow: 0 6px 16px rgba(0,0,0,0.4), inset 0 2px 6px rgba(255,255,255,0.3);">
      
      <h1 style="font-family: 'Lobster', cursive; font-size: 48px; color: #78350f; margin-bottom: 8px; text-shadow: 1px 1px 2px rgba(255,255,255,0.3);">
        🔍 Rechercher des livres
      </h1>
      
      <p style="color: #6B2D0E; font-size: 16px; margin-bottom: 24px; font-weight: 600;">
        Découvrez des millions de livres grâce à Open Library
      </p>

      <!-- Barre de recherche élégante -->
      <div class="flex gap-3">
        <input
          type="text"
          bind:value={query}
          on:keydown={(e) => e.key === 'Enter' && searchBooks()}
          placeholder="Titre, auteur, ISBN..."
          class="flex-1 px-6 py-4 rounded-full text-lg focus:outline-none"
          style="background: white; border: 3px solid rgba(139, 92, 246, 0.3); box-shadow: 0 4px 12px rgba(0,0,0,0.2); font-weight: 500;"
          on:focus={(e) => e.currentTarget.style.borderColor = '#8B5CF6'}
          on:blur={(e) => e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)'}
        />
        
        <button
          on:click={searchBooks}
          class="px-8 py-4 font-bold rounded-full transition-all text-lg"
          style="background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%); color: white; box-shadow: 0 6px 16px rgba(139, 92, 246, 0.5); border: 3px solid rgba(255, 255, 255, 0.3); min-width: 180px;"
          on:mouseover={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.7)';
          }}
          on:mouseout={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(139, 92, 246, 0.5)';
          }}
        >
          🔍 Rechercher
        </button>
      </div>
    </div>

    <!-- Loading -->
    {#if loading}
      <div class="flex justify-center items-center py-32">
        <div class="text-center bg-white rounded-xl p-8 shadow-xl">
          <div class="animate-spin h-16 w-16 mx-auto mb-4" style="border: 4px solid #8B5CF6; border-top-color: transparent; border-radius: 50%;"></div>
          <p class="font-bold text-lg" style="color: #78350f;">Recherche en cours...</p>
        </div>
      </div>
    {/if}

    <!-- Erreur -->
    {#if error}
      <div class="bg-red-100 border-2 border-red-400 text-red-700 px-6 py-4 rounded-xl mb-6 font-semibold">
        ❌ {error}
      </div>
    {/if}

    <!-- Résultats -->
    {#if !loading && results.length > 0}
      <div class="mb-6 p-4 rounded-lg" style="background: rgba(212, 165, 116, 0.9); box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
        <p class="font-bold text-lg" style="color: #78350f;">
          📚 {results.length} résultat{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
        </p>
      </div>

      <!-- Étagères avec livres 3D -->
      {#each Array(Math.ceil(results.length / 6)) as _, shelfIndex}
        <div class="shelf-container" style="position: relative; margin-bottom: 60px;">
          
          <!-- Livres sur l'étagère avec effet 3D -->
          <div class="flex justify-around items-end gap-6" style="min-height: 300px; padding: 0 40px 20px 40px;">
            {#each results.slice(shelfIndex * 6, (shelfIndex + 1) * 6) as book}
              <div class="book-3d book-reflection bg-white rounded-lg book-shadow overflow-hidden" style="width: 160px; flex-shrink: 0;">
                
                <!-- Couverture -->
                <div class="aspect-[2/3] bg-gray-200 flex items-center justify-center overflow-hidden" style="border-bottom: 3px solid rgba(0,0,0,0.1);">
                  {#if book.cover_url}
                    <img 
                      src={book.cover_url} 
                      alt={book.title}
                      class="w-full h-full object-cover"
                      style="box-shadow: inset 0 0 20px rgba(0,0,0,0.2);"
                    />
                  {:else}
                    <div class="w-full h-full bg-gradient-to-br from-blue-200 to-cyan-200 flex flex-col items-center justify-center p-3">
                      <svg class="w-16 h-16 mb-2" fill="#2563eb" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                      <p class="text-xs text-gray-700 font-medium text-center">Pas de couverture</p>
                    </div>
                  {/if}
                </div>

                <!-- Infos -->
                <div class="p-3 bg-white">
                  <h3 
                    class="font-bold text-gray-900 text-sm mb-1"
                    style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;"
                    title={book.title}
                  >
                    {book.title}
                  </h3>
                  
                  {#if book.author}
                    <p class="text-xs text-gray-600 mb-3" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                      par {book.author}
                    </p>
                  {/if}

                  <!-- Bouton ajouter élégant -->
<button
  on:click={() => addToLibrary(book)}
  class="w-full px-3 py-2 font-bold rounded-full text-xs"
  style="background: #10B981; color: white;"
>
  ➕ Ajouter
</button>
                </div>
              </div>
            {/each}
          </div>
          
          <!-- Planche d'étagère avec profondeur 3D -->
          <div class="shelf-3d" style="height: 45px; border-radius: 8px; margin: 0 30px;"></div>
        </div>
      {/each}
    {/if}

    <!-- Message si pas de résultats -->
    {#if !loading && results.length === 0 && query}
      <div class="text-center py-16 bg-white rounded-xl shadow-lg p-12">
        <div class="text-6xl mb-4">🔍</div>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">
          Aucun résultat trouvé
        </h2>
        <p class="text-gray-600">
          Essayez avec d'autres mots-clés
        </p>
      </div>
    {/if}

  </div>
  <Footer />
</div>
