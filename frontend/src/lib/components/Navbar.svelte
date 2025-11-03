<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let user = $state(null);

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
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
</svelte:head>

<nav style="background: linear-gradient(135deg, #D4A574 0%, #C19A6B 50%, #A0826D 100%); background-image: repeating-linear-gradient(90deg, rgba(0,0,0,0.1) 0px, transparent 1px, transparent 3px, rgba(0,0,0,0.15) 4px, transparent 5px, transparent 8px), repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, transparent 2px, transparent 7px, rgba(255,255,255,0.08) 9px, transparent 11px, transparent 15px); box-shadow: 0 4px 12px rgba(0,0,0,0.3); border-bottom: 3px solid #8B6F47;">
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex justify-between items-center h-16">
      
      <!-- Logo Blablabook -->
      <a 
        href="/"
        class="flex items-center gap-3 transition-transform hover:scale-105"
      >
        <div style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); padding: 8px 12px; border-radius: 12px; box-shadow: 0 4px 8px rgba(245, 158, 11, 0.4); border: 2px solid rgba(255, 255, 255, 0.3);">
          <span style="font-size: 24px;">📚</span>
        </div>
        <span style="font-family: 'Lobster', cursive; font-size: 28px; color: #78350f; text-shadow: 1px 1px 2px rgba(255,255,255,0.3);">
          Blablabook
        </span>
      </a>

      <!-- Boutons navigation -->
      <div class="flex items-center gap-4">
        {#if user}
          <!-- Nom utilisateur -->
          <span style="color: #78350f; font-weight: 600; font-size: 15px; text-shadow: 0 1px 2px rgba(255,255,255,0.5);">
            👤 {user.username}
          </span>

          <!-- Bouton Ma Bibliothèque -->
          <a
            href="/my-books"
            class="px-6 py-2 font-bold rounded-full transition-all"
            style="background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%); color: white; box-shadow: 0 4px 10px rgba(139, 92, 246, 0.4); border: 2px solid rgba(255, 255, 255, 0.3); text-decoration: none;"
            onmouseover={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 14px rgba(139, 92, 246, 0.6)';
            }}
            onfocus={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 14px rgba(139, 92, 246, 0.6)';
            }}
            onmouseout={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(139, 92, 246, 0.4)';
            }}
            onblur={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(139, 92, 246, 0.4)';
            }}
          >
            📖 Ma Bibliothèque
          </a>

          <!-- Bouton Rechercher -->
          <a
            href="/search"
            class="px-6 py-2 font-bold rounded-full transition-all"
            style="background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); color: white; box-shadow: 0 4px 10px rgba(59, 130, 246, 0.4); border: 2px solid rgba(255, 255, 255, 0.3); text-decoration: none;"
            onmouseover={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 14px rgba(59, 130, 246, 0.6)';
            }}
            onfocus={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 14px rgba(59, 130, 246, 0.6)';
            }}
            onmouseout={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(59, 130, 246, 0.4)';
            }}
            onblur={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(59, 130, 246, 0.4)';
            }}
          >
            🔍 Rechercher
          </a>

          <!-- Bouton Déconnexion -->
          <button
            onclick={logout}
            class="px-6 py-2 font-bold rounded-full transition-all"
            style="background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%); color: white; box-shadow: 0 4px 10px rgba(220, 38, 38, 0.4); border: 2px solid rgba(255, 255, 255, 0.3);"
            onmouseover={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 14px rgba(220, 38, 38, 0.6)';
            }}
            onfocus={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 14px rgba(220, 38, 38, 0.6)';
            }}
            onmouseout={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(220, 38, 38, 0.4)';
            }}
            onblur={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(220, 38, 38, 0.4)';
            }}
          >
            🚪 Déconnexion
          </button>
        {:else}
          <!-- Boutons connexion/inscription -->
          
          <a
            href="/login"
            class="px-6 py-2 font-bold rounded-full transition-all"
            style="background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); color: white; box-shadow: 0 4px 10px rgba(59, 130, 246, 0.4); border: 2px solid rgba(255, 255, 255, 0.3); text-decoration: none;"
            onmouseover={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onfocus={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onmouseout={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onblur={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            🔐 Connexion
          </a>
          
          <a
            href="/register"
            class="px-6 py-2 font-bold rounded-full transition-all"
            style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; box-shadow: 0 4px 10px rgba(16, 185, 129, 0.4); border: 2px solid rgba(255, 255, 255, 0.3); text-decoration: none;"
            onmouseover={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onfocus={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onmouseout={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onblur={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            ✨ Inscription
          </a>
        {/if}
      </div>
    </div>
  </div>
</nav>