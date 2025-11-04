<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let user = $state(null);
  let menuOpen = $state(false);

  onMount(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      user = JSON.parse(userData);
    }
  });

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    goto('/login');
  }

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  function closeMenu() {
    menuOpen = false;
  }
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
</svelte:head>

<nav style="background: linear-gradient(135deg, #D4A574 0%, #C19A6B 50%, #A0826D 100%); box-shadow: 0 4px 12px rgba(0,0,0,0.3); border-bottom: 3px solid #8B6F47; position: relative;">
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex justify-between items-center h-16">
      
      <!-- Logo -->
      <a href="/" onclick={closeMenu} style="font-family: 'Lobster', cursive; font-size: 24px; color: #78350f; text-decoration: none;">
        📚 Blablabook
      </a>

      <!-- Bouton menu mobile -->
      <button
        onclick={toggleMenu}
        class="md:hidden px-3 py-2 rounded"
        style="background: #F59E0B; color: white; border: none;"
      >
        {#if menuOpen}✕{:else}☰{/if}
      </button>

      <!-- Menu desktop -->
      <div class="hidden md:flex gap-4 items-center">
        {#if user}
          <span style="color: #78350f; font-weight: 600;">👤 {user.username}</span>
          <a href="/my-books" style="color: white; text-decoration: none; background: #8B5CF6; padding: 8px 16px; border-radius: 20px;">📖 Ma Bibliothèque</a>
          <a href="/search" style="color: white; text-decoration: none; background: #3B82F6; padding: 8px 16px; border-radius: 20px;">🔍 Rechercher</a>
          <button onclick={logout} style="color: white; background: #DC2626; padding: 8px 16px; border-radius: 20px; border: none; cursor: pointer;">🚪 Déconnexion</button>
        {:else}
          <a href="/login" style="color: white; text-decoration: none; background: #3B82F6; padding: 8px 16px; border-radius: 20px;">🔐 Connexion</a>
          <a href="/register" style="color: white; text-decoration: none; background: #10B981; padding: 8px 16px; border-radius: 20px;">✨ Inscription</a>
        {/if}
      </div>
    </div>
  </div>

  <!-- Menu mobile -->
  {#if menuOpen}
    <div class="md:hidden absolute top-16 left-0 right-0 p-4" style="background: #D4A574; border-bottom: 3px solid #8B6F47; box-shadow: 0 8px 16px rgba(0,0,0,0.4);">
      {#if user}
        <div class="text-center mb-3" style="color: #78350f; font-weight: 700;">👤 {user.username}</div>
        <a href="/my-books" onclick={closeMenu} class="block w-full text-center mb-3 py-3 rounded-full" style="background: #8B5CF6; color: white; text-decoration: none;">📖 Ma Bibliothèque</a>
        <a href="/search" onclick={closeMenu} class="block w-full text-center mb-3 py-3 rounded-full" style="background: #3B82F6; color: white; text-decoration: none;">🔍 Rechercher</a>
        <button onclick={() => { logout(); closeMenu(); }} class="block w-full py-3 rounded-full" style="background: #DC2626; color: white; border: none; cursor: pointer;">🚪 Déconnexion</button>
      {:else}
        <a href="/login" onclick={closeMenu} class="block w-full text-center mb-3 py-3 rounded-full" style="background: #3B82F6; color: white; text-decoration: none;">🔐 Connexion</a>
        <a href="/register" onclick={closeMenu} class="block w-full text-center py-3 rounded-full" style="background: #10B981; color: white; text-decoration: none;">✨ Inscription</a>
      {/if}
    </div>
  {/if}
</nav>