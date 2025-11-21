<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import Footer from '$lib/components/Footer.svelte';

  let isLoggedIn = $state(false);
  let user = $state(null);
  let stats = $state(null);
  let loading = $state(true);

  onMount(async () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      isLoggedIn = true;
      user = JSON.parse(userData);
      await loadUserData();
    } else {
      loading = false;
    }
  });

  async function loadUserData() {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:3000/api/user-books', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        const books = data.data.books || [];
        
        stats = {
          total: books.length,
          to_read: books.filter(b => b.status === 'to_read').length,
          reading: books.filter(b => b.status === 'reading').length,
          read: books.filter(b => b.status === 'read').length
        };
      }
      
      loading = false;
    } catch (err) {
      console.error('Erreur chargement données:', err);
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Accueil - Blablabook</title>
  <link href="https://fonts.googleapis.com/css2?family=Lobster&family=Satisfy&display=swap" rel="stylesheet">
</svelte:head>

<div class="min-h-screen" style="background: linear-gradient(135deg, #8B7355 0%, #6B5444 100%); background-image: url('https://www.transparenttextures.com/patterns/wood-pattern.png'); background-blend-mode: multiply; background-size: 300px;">
  
  {#if !isLoggedIn}
    <!-- Page d'accueil pour visiteurs NON connectés -->
    <div class="min-h-screen flex items-center justify-center px-6">
      <div class="max-w-4xl mx-auto text-center">
        
        <div style="background: linear-gradient(135deg, #D4A574 0%, #C19A6B 50%, #A0826D 100%); background-image: repeating-linear-gradient(90deg, rgba(0,0,0,0.1) 0px, transparent 1px, transparent 3px, rgba(0,0,0,0.15) 4px, transparent 5px, transparent 8px); padding: 60px 40px; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.5), inset 0 2px 8px rgba(255,255,255,0.3);">
          
          <div class="mb-8">
            <div style="display: inline-block; background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); padding: 30px; border-radius: 50%; box-shadow: 0 10px 30px rgba(245, 158, 11, 0.5); border: 5px solid rgba(255, 255, 255, 0.3);">
              <span style="font-size: 80px; display: block; line-height: 1;">📚</span>
            </div>
          </div>

          <h1 style="font-family: 'Lobster', cursive; font-size: 72px; color: #78350f; margin-bottom: 16px; text-shadow: 2px 2px 4px rgba(255,255,255,0.3);">
            Blablabook
          </h1>

          <p style="font-size: 24px; color: #6B2D0E; margin-bottom: 40px; font-weight: 600; text-shadow: 1px 1px 2px rgba(255,255,255,0.3);">
            Votre bibliothèque personnelle en ligne
          </p>

          <p style="font-size: 18px; color: #78350f; margin-bottom: 50px; max-width: 600px; margin-left: auto; margin-right: auto; line-height: 1.6;">
            Organisez, suivez et partagez vos lectures. Créez votre bibliothèque virtuelle et ne perdez plus jamais le fil de vos livres préférés ! 📖✨
          </p>

          <div class="flex gap-6 justify-center flex-wrap">
            <button
              on:click={() => goto('/register')}
              class="px-10 py-4 font-bold rounded-full transition-all text-lg"
              style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; box-shadow: 0 6px 16px rgba(16, 185, 129, 0.5); border: 3px solid rgba(255, 255, 255, 0.3);"
            >
              ✨ Commencer gratuitement
            </button>

            <button
              on:click={() => goto('/login')}
              class="px-10 py-4 font-bold rounded-full transition-all text-lg"
              style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); color: white; box-shadow: 0 6px 16px rgba(245, 158, 11, 0.5); border: 3px solid rgba(255, 255, 255, 0.3);"
            >
              🔐 Se connecter
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div style="background: rgba(255, 255, 255, 0.9); padding: 24px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
              <div style="font-size: 48px; margin-bottom: 12px;">📖</div>
              <h3 style="font-size: 20px; font-weight: bold; color: #78350f; margin-bottom: 8px;">Organisez</h3>
              <p style="color: #6B2D0E; font-size: 14px;">Classez vos livres par statut : à lire, en cours, terminés</p>
            </div>

            <div style="background: rgba(255, 255, 255, 0.9); padding: 24px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
              <div style="font-size: 48px; margin-bottom: 12px;">⭐</div>
              <h3 style="font-size: 20px; font-weight: bold; color: #78350f; margin-bottom: 8px;">Notez</h3>
              <p style="color: #6B2D0E; font-size: 14px;">Attribuez des notes à vos lectures favorites</p>
            </div>

            <div style="background: rgba(255, 255, 255, 0.9); padding: 24px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
              <div style="font-size: 48px; margin-bottom: 12px;">🔍</div>
              <h3 style="font-size: 20px; font-weight: bold; color: #78350f; margin-bottom: 8px;">Découvrez</h3>
              <p style="color: #6B2D0E; font-size: 14px;">Recherchez parmi des milliers de livres</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  {:else}
    <!-- Page d'accueil pour utilisateurs CONNECTÉS -->
    <div class="container mx-auto px-4 max-w-6xl py-8">
      
      <div class="min-h-screen flex items-center justify-center">
        <div class="max-w-4xl w-full text-center">
          
          <div style="background: linear-gradient(135deg, #D4A574 0%, #C19A6B 50%, #A0826D 100%); background-image: repeating-linear-gradient(90deg, rgba(0,0,0,0.1) 0px, transparent 1px, transparent 3px, rgba(0,0,0,0.15) 4px, transparent 5px, transparent 8px); padding: 40px; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.5), inset 0 2px 8px rgba(255,255,255,0.3);">
            
            <h1 class="mb-3" style="font-family: 'Satisfy', cursive; font-size: 48px; color: #78350f; text-shadow: 2px 2px 4px rgba(255,255,255,0.3);">
              👋 Bonjour {user?.username || 'lecteur'} !
            </h1>
            <p class="mb-8" style="font-size: 20px; color: #6B2D0E; font-weight: 600;">
              Bienvenue dans votre bibliothèque personnelle
            </p>

            {#if loading}
              <div class="flex justify-center py-12">
                <div class="animate-spin h-12 w-12" style="border: 4px solid #6B2D0E; border-top-color: transparent; border-radius: 50%;"></div>
              </div>
            {:else if stats}
              <!-- Statistiques -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div class="rounded-lg p-6 text-center" style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
                  <div class="text-4xl font-bold text-white mb-2">{stats.total}</div>
                  <div class="text-white font-semibold">📚 Total</div>
                </div>

                <div class="rounded-lg p-6 text-center" style="background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
                  <div class="text-4xl font-bold text-white mb-2">{stats.to_read}</div>
                  <div class="text-white font-semibold">📖 À lire</div>
                </div>

                <div class="rounded-lg p-6 text-center" style="background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%); box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
                  <div class="text-4xl font-bold text-white mb-2">{stats.reading}</div>
                  <div class="text-white font-semibold">📚 En cours</div>
                </div>

                <div class="rounded-lg p-6 text-center" style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
                  <div class="text-4xl font-bold text-white mb-2">{stats.read}</div>
                  <div class="text-white font-semibold">✅ Lus</div>
                </div>
              </div>
            {/if}

            <!-- Boutons -->
            <div class="flex gap-6 justify-center flex-wrap">
              <button
                on:click={() => goto('/my-books')}
                class="px-10 py-4 font-bold rounded-full transition-all text-lg"
                style="background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%); color: white; box-shadow: 0 6px 16px rgba(139, 92, 246, 0.5); border: 3px solid rgba(255, 255, 255, 0.3);"
              >
                📚 Ma Bibliothèque
              </button>

              <button
                on:click={() => goto('/search')}
                class="px-10 py-4 font-bold rounded-full transition-all text-lg"
                style="background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); color: white; box-shadow: 0 6px 16px rgba(59, 130, 246, 0.5); border: 3px solid rgba(255, 255, 255, 0.3);"
              >
                🔍 Rechercher
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  {/if}
  <Footer />
</div>