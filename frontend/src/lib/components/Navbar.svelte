<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let user = $state(null);
  let isLoggedIn = $state(false);
  let menuOpen = $state(false);

  onMount(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      user = JSON.parse(userData);
      isLoggedIn = true;
    }
  });

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    user = null;
    isLoggedIn = false;
    goto('/login');
  }

  function navigateTo(path) {
    goto(path);
    menuOpen = false;
  }
</script>

<nav class="bg-white border-b border-gray-200 px-6 py-4">
  <div class="flex justify-between items-center max-w-7xl mx-auto">
    
    <!-- Logo -->
    <button onclick={() => navigateTo('/')} class="flex items-center space-x-2">
      <span class="text-2xl">📚</span>
      <span class="text-xl font-bold text-gray-900">Blablabook</span>
    </button>

    <!-- Menu Desktop -->
    <div class="hidden md:flex items-center space-x-6">
      <button onclick={() => navigateTo('/')} class="text-gray-700 hover:text-blue-600">
        🏠 Accueil
      </button>
      
      {#if isLoggedIn}
        <button onclick={() => navigateTo('/my-books')} class="text-gray-700 hover:text-blue-600">
          📚 Ma Bibliothèque
        </button>
        <button onclick={() => navigateTo('/search')} class="text-gray-700 hover:text-blue-600">
          🔍 Rechercher
        </button>
      {/if}
    </div>

    <!-- Boutons utilisateur -->
    <div class="flex items-center space-x-3">
      {#if isLoggedIn}
        <div class="flex items-center space-x-3">
          <span class="hidden sm:inline text-sm text-gray-700">
            👋 {user?.first_name}
          </span>
          <button 
            onclick={handleLogout}
            class="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
          >
            Déconnexion
          </button>
        </div>
      {:else}
        <button 
          onclick={() => navigateTo('/login')}
          class="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Se connecter
        </button>
        <button 
          onclick={() => navigateTo('/register')}
          class="hidden sm:inline px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          S'inscrire
        </button>
      {/if}
    </div>
  </div>
</nav>