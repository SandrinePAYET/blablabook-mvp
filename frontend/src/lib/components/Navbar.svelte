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
    user = null; // Réinitialise l'état
    window.location.href = '/'; // Force un rechargement complet
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

<style>
  /* === STYLES POUR LE MENU BURGER === */
  /* Animation d'ouverture du menu mobile depuis la droite */
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  /* Animation du bouton burger */
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  /* Style de l'overlay semi-transparent */
  .menu-overlay {
    position: fixed;
    top: 64px; /* hauteur de la navbar */
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    z-index: 40;
    animation: fadeIn 0.3s ease-in-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* Container du menu mobile positionné à droite */
  .mobile-menu {
    position: fixed;
    top: 64px; /* hauteur de la navbar */
    right: 0;
    width: 280px;
    max-width: 85vw;
    height: calc(100vh - 64px);
    background: linear-gradient(180deg, #1E3A8A 0%, #3B82F6 100%);
    box-shadow: -4px 0 16px rgba(0, 0, 0, 0.4);
    border-left: 3px solid #1E40AF;
    padding: 1.5rem;
    z-index: 50;
    overflow-y: auto;
    animation: slideInRight 0.3s ease-out;
  }

  /* Style du bouton burger avec effet hover */
  .burger-button {
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    color: white;
    border: 2px solid #B45309;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1.5rem;
    box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
  }

  .burger-button:hover {
    background: linear-gradient(135deg, #D97706 0%, #B45309 100%);
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.5);
  }

  .burger-button:active {
    transform: scale(0.95);
  }

  .burger-button:focus {
    outline: 3px solid #F59E0B;
    outline-offset: 2px;
  }

  /* Style des liens du menu mobile */
  .mobile-menu-item {
    display: block;
    width: 100%;
    text-align: center;
    padding: 0.875rem 1rem;
    margin-bottom: 0.75rem;
    border-radius: 12px;
    text-decoration: none;
    color: white;
    font-weight: 600;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  .mobile-menu-item:hover {
    transform: translateX(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .mobile-menu-item:active {
    transform: translateX(-3px) scale(0.98);
  }

  /* Couleurs spécifiques pour chaque type de bouton */
  .menu-library {
    background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
  }

  .menu-search {
    background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  }

  .menu-login {
    background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  }

  .menu-register {
    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  }

  .menu-logout {
    background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);
  }

  /* Style pour le nom d'utilisateur */
  .user-badge {
    background: rgba(255, 255, 255, 0.95);
    color: #1E3A8A;
    font-weight: 700;
    padding: 0.75rem;
    border-radius: 12px;
    margin-bottom: 1rem;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.3);
  }

  /* Scrollbar personnalisée pour le menu mobile */
  .mobile-menu::-webkit-scrollbar {
    width: 8px;
  }

  .mobile-menu::-webkit-scrollbar-track {
    background: rgba(30, 58, 138, 0.3);
    border-radius: 4px;
  }

  .mobile-menu::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 4px;
  }

  .mobile-menu::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.7);
  }
</style>

<nav style="background: linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%); box-shadow: 0 4px 12px rgba(0,0,0,0.3); border-bottom: 3px solid #1E40AF; position: fixed; top: 0; left: 0; right: 0; z-index: 100;">
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex justify-between items-center h-16">

      <!-- Logo -->
      <a href="/" onclick={closeMenu} style="font-family: 'Lobster', cursive; font-size: 24px; color: #FFFFFF; text-decoration: none;">
        📚 Blablabook
      </a>

      <!-- Bouton menu mobile avec style amélioré -->
      <button
        onclick={toggleMenu}
        class="md:hidden burger-button"
        aria-label="Toggle menu"
      >
        {#if menuOpen}✕{:else}☰{/if}
      </button>

      <!-- Menu desktop -->
      <div class="hidden md:flex gap-4 items-center">
        {#if user}
          <span style="color: #FFFFFF; font-weight: 600;">👤 {user.username}</span>
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
</nav>

<!-- Overlay semi-transparent (cliquable pour fermer le menu) -->
{#if menuOpen}
  <div class="menu-overlay md:hidden" onclick={closeMenu}></div>
{/if}

<!-- Menu mobile repositionné à droite -->
{#if menuOpen}
  <div class="mobile-menu md:hidden">
    {#if user}
      <div class="user-badge">👤 {user.username}</div>
      <a href="/my-books" onclick={closeMenu} class="mobile-menu-item menu-library">
        📖 Ma Bibliothèque
      </a>
      <a href="/search" onclick={closeMenu} class="mobile-menu-item menu-search">
        🔍 Rechercher
      </a>
      <button
        onclick={() => { logout(); closeMenu(); }}
        class="mobile-menu-item menu-logout"
        style="border: none; cursor: pointer; font-size: inherit;"
      >
        🚪 Déconnexion
      </button>
    {:else}
      <a href="/login" onclick={closeMenu} class="mobile-menu-item menu-login">
        🔐 Connexion
      </a>
      <a href="/register" onclick={closeMenu} class="mobile-menu-item menu-register">
        ✨ Inscription
      </a>
    {/if}
  </div>
{/if}