<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import Footer from '$lib/components/Footer.svelte';

  const bookId = $page.params.id;

  let userBook = $state(null);
  let loading = $state(true);
  let error = $state('');
  let saving = $state(false);

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
  <link href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap" rel="stylesheet">
</svelte:head>

<div class="min-h-screen py-8" style="background: linear-gradient(135deg, #8B7355 0%, #6B5444 100%); background-image: url('https://www.transparenttextures.com/patterns/wood-pattern.png'); background-blend-mode: multiply; background-size: 300px;">
  <div class="container mx-auto px-4 max-w-4xl">
    
    <button
      on:click={() => goto('/my-books')}
      class="mb-6 px-6 py-3 font-bold rounded-full transition-all shadow-lg"
      style="background: linear-gradient(135deg, #D4A574 0%, #C19A6B 100%); color: #78350f; box-shadow: 0 4px 12px rgba(0,0,0,0.3);"
    >
      ← Retour à Ma Bibliothèque
    </button>

    {#if loading}
      <div class="flex justify-center items-center py-32">
        <div class="text-center bg-white rounded-xl p-8 shadow-xl">
          <div class="animate-spin h-16 w-16 mx-auto mb-4" style="border: 4px solid #92400e; border-top-color: transparent; border-radius: 50%;"></div>
          <p class="font-bold text-lg" style="color: #78350f;">Chargement...</p>
        </div>
      </div>
    {/if}

    {#if error}
      <div class="bg-red-100 border-2 border-red-400 text-red-700 px-6 py-4 rounded-xl mb-6 font-semibold">
        ❌ {error}
      </div>
    {/if}

    {#if !loading && !error && userBook}
      <div class="bg-white rounded-xl shadow-2xl overflow-hidden" style="background: linear-gradient(135deg, #FFF8DC 0%, #FAEBD7 50%, #F5E6D3 100%);">
        
        <!-- Section couverture et titre -->
        <div class="text-center p-8 border-b-4" style="border-color: #D4A574;">
          <div class="mb-6">
            {#if userBook.book.cover_url}
              <img 
                src={userBook.book.cover_url} 
                alt={userBook.book.title}
                class="max-w-xs mx-auto rounded-lg shadow-2xl"
                style="max-height: 400px; box-shadow: 0 20px 50px rgba(0,0,0,0.5);"
              />
            {:else}
              <div class="mx-auto bg-gradient-to-br from-blue-200 to-cyan-200" style="width: 256px; height: 384px;">
                <svg width="96" height="96" fill="#2563eb" viewBox="0 0 20 20" style="margin-bottom: 16px;">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                <p class="text-lg text-gray-700 font-medium">Pas de couverture</p>
              </div>
            {/if}
          </div>

          <h1 class="text-4xl font-bold mb-3" style="color: #78350f; font-family: 'Satisfy', cursive;">
            {userBook.book.title}
          </h1>
          
          {#if userBook.book.author}
            <p class="text-2xl mb-4" style="color: #92400e;">
              par {userBook.book.author}
            </p>
          {/if}

          <div class="flex flex-wrap justify-center gap-4 text-sm" style="color: #78350f;">
            {#if userBook.book.published_year}
              <span class="font-semibold">📅 {userBook.book.published_year}</span>
            {/if}
            {#if userBook.book.page_count}
              <span class="font-semibold">📄 {userBook.book.page_count} pages</span>
            {/if}
          </div>
        </div>

        <!-- Section formulaire -->
        <div class="p-8">
          <div class="max-w-2xl mx-auto">
            
            <div class="mb-6">
              <label class="block text-lg font-bold mb-3" style="color: #78350f;">
                Statut de lecture
              </label>
              <select
                bind:value={userBook.status}
                class="w-full px-4 py-3 rounded-lg text-base font-semibold focus:outline-none transition-all"
                style="
                  background: {userBook.status === 'to_read' ? 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)' : userBook.status === 'reading' ? 'linear-gradient(135deg, #E9D5FF 0%, #D8B4FE 100%)' : 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)'};
                  color: {userBook.status === 'to_read' ? '#1E40AF' : userBook.status === 'reading' ? '#6B21A8' : '#065F46'};
                  border: 3px solid {userBook.status === 'to_read' ? '#3B82F6' : userBook.status === 'reading' ? '#8B5CF6' : '#10B981'};
                  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                "
              >
                <option value="to_read">📖 À lire</option>
                <option value="reading">📚 En cours de lecture</option>
                <option value="read">✅ Lu</option>
              </select>
            </div>

            <div class="mb-6">
              <label class="block text-lg font-bold mb-3" style="color: #78350f;">
                Note (sur 5)
              </label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.5"
                bind:value={userBook.rating}
                placeholder="Ex: 4.5"
                class="w-full px-4 py-3 rounded-lg text-base focus:outline-none"
                style="background: white; border: 3px solid #D4A574; box-shadow: 0 4px 8px rgba(0,0,0,0.1); color: #78350f; font-weight: 600;"
              />
              {#if userBook.rating}
                <div class="mt-2 text-2xl">
                  {'⭐'.repeat(Math.floor(userBook.rating))}
                  {userBook.rating % 1 !== 0 ? '✨' : ''}
                </div>
              {/if}
            </div>

            <div class="mb-6">
              <label class="block text-lg font-bold mb-3" style="color: #78350f;">
                Votre avis
              </label>
              <textarea
                bind:value={userBook.review}
                placeholder="Qu'avez-vous pensé de ce livre ?"
                rows="6"
                class="w-full px-4 py-3 rounded-lg text-base focus:outline-none resize-none"
                style="background: white; border: 3px solid #D4A574; box-shadow: 0 4px 8px rgba(0,0,0,0.1); color: #78350f; font-family: 'Georgia', serif; line-height: 1.6;"
              ></textarea>
            </div>

            {#if userBook.book.description}
              <div class="mb-6 p-4 rounded-lg" style="background: rgba(212,165,116,0.2); border-left: 4px solid #92400e;">
                <p class="text-sm leading-relaxed" style="color: #78350f;">
                  {userBook.book.description}
                </p>
              </div>
            {/if}

            <div class="flex flex-col sm:flex-row gap-3">
              <button
                on:click={saveChanges}
                disabled={saving}
                class="flex-1 px-6 py-4 font-bold rounded-full transition-all text-lg shadow-lg"
                style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; box-shadow: 0 6px 16px rgba(16, 185, 129, 0.5); border: 3px solid rgba(255, 255, 255, 0.3);"
              >
                {saving ? '⏳ Enregistrement...' : '💾 Enregistrer'}
              </button>
              
              <button
                on:click={deleteBook}
                class="px-6 py-4 font-bold rounded-full transition-all text-lg shadow-lg"
                style="background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%); color: white; box-shadow: 0 6px 16px rgba(220, 38, 38, 0.5); border: 3px solid rgba(255, 255, 255, 0.3);"
              >
                🗑️ Supprimer
              </button>
            </div>

          </div>
        </div>

      </div>
    {/if}

  </div>
  <Footer />
</div>