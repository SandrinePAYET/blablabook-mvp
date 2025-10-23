<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let isLoggedIn = $state(false);
  let userName = $state('');

  onMount(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      const user = JSON.parse(userData);
      isLoggedIn = true;
      userName = user.first_name;
    }
  });

  function navigateTo(path) {
    goto(path);
  }
</script>

<svelte:head>
  <title>Blablabook - Votre bibliothèque personnelle</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">
  
  <!-- Hero Section -->
  <div class="container mx-auto px-4 py-16 md:py-24">
    <div class="text-center max-w-4xl mx-auto">
      
      <!-- Emoji Hero -->
      <div class="text-8xl mb-6">
        📚
      </div>

      <!-- Titre principal -->
      {#if isLoggedIn}
        <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Bienvenue {userName} ! 👋
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          Prêt à découvrir de nouveaux livres ?
        </p>
      {:else}
        <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Bienvenue sur Blablabook
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          Votre bibliothèque personnelle en ligne
        </p>
      {/if}

      <!-- Description -->
      <p class="text-lg text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
        Organisez vos lectures, découvrez de nouveaux livres et gardez une trace de vos aventures littéraires. 
        Simple, élégant, efficace.
      </p>

      <!-- Call to Actions -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {#if isLoggedIn}
          <button
            onclick={() => navigateTo('/my-books')}
            class="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            📚 Ma Bibliothèque
          </button>
          <button
            onclick={() => navigateTo('/search')}
            class="px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg hover:bg-gray-50 transition-colors border-2 border-blue-600 shadow-lg"
          >
            🔍 Rechercher un livre
          </button>
        {:else}
          <button
            onclick={() => navigateTo('/register')}
            class="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            🚀 Commencer gratuitement
          </button>
          <button
            onclick={() => navigateTo('/login')}
            class="px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg hover:bg-gray-50 transition-colors border-2 border-blue-600 shadow-lg"
          >
            🔐 Se connecter
          </button>
        {/if}
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="container mx-auto px-4 py-16">
    <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      
      <!-- Feature 1 -->
      <div class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
        <div class="text-5xl mb-4">📖</div>
        <h3 class="text-xl font-bold text-gray-900 mb-3">
          Organisez vos livres
        </h3>
        <p class="text-gray-600">
          Créez votre bibliothèque personnelle et classez vos livres facilement
        </p>
      </div>

      <!-- Feature 2 -->
      <div class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
        <div class="text-5xl mb-4">🔍</div>
        <h3 class="text-xl font-bold text-gray-900 mb-3">
          Découvrez de nouveaux livres
        </h3>
        <p class="text-gray-600">
          Recherchez parmi des millions de livres via l'API Open Library
        </p>
      </div>

      <!-- Feature 3 -->
      <div class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
        <div class="text-5xl mb-4">⭐</div>
        <h3 class="text-xl font-bold text-gray-900 mb-3">
          Suivez vos lectures
        </h3>
        <p class="text-gray-600">
          Notez et commentez vos livres, suivez votre progression de lecture
        </p>
      </div>

    </div>
  </div>

  <!-- Stats Section (si connecté) -->
  {#if isLoggedIn}
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-white text-center shadow-2xl">
        <h2 class="text-3xl font-bold mb-6">
          Votre aventure littéraire commence maintenant ! 📚
        </h2>
        <p class="text-xl mb-8 opacity-90">
          Explorez, lisez, partagez vos découvertes
        </p>
        <button
          onclick={() => navigateTo('/search')}
          class="px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
        >
          🔍 Commencer à rechercher
        </button>
      </div>
    </div>
  {/if}

  <!-- Footer -->
  <footer class="container mx-auto px-4 py-8 mt-16 border-t border-gray-200">
    <div class="text-center text-gray-600">
      <p class="text-sm">
        © 2025 Blablabook - Votre bibliothèque personnelle
      </p>
      <p class="text-xs mt-2 text-gray-500">
        Propulsé par Open Library API
      </p>
    </div>
  </footer>

</div>

<style>
  /* Animations personnalisées si nécessaire */
</style>