<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let isLoggedIn = $state(false);

  onMount(() => {
    const token = localStorage.getItem('token');
    isLoggedIn = !!token;
  });
</script>

<svelte:head>
  <title>Accueil - Blablabook</title>
  <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
</svelte:head>

<!-- Fond bois avec texture -->
<div class="min-h-screen flex items-center justify-center" style="background: linear-gradient(135deg, #8B7355 0%, #6B5444 100%); background-image: url('https://www.transparenttextures.com/patterns/wood-pattern.png'); background-blend-mode: multiply; background-size: 300px;">
  
  <div class="max-w-4xl mx-auto px-6 text-center">
    
    <!-- Carte principale avec fond bois doré -->
    <div style="background: linear-gradient(135deg, #D4A574 0%, #C19A6B 50%, #A0826D 100%); background-image: repeating-linear-gradient(90deg, rgba(0,0,0,0.1) 0px, transparent 1px, transparent 3px, rgba(0,0,0,0.15) 4px, transparent 5px, transparent 8px); padding: 60px 40px; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.5), inset 0 2px 8px rgba(255,255,255,0.3);">
      
      <!-- Icône livre géante -->
      <div class="mb-8">
        <div style="display: inline-block; background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); padding: 30px; border-radius: 50%; box-shadow: 0 10px 30px rgba(245, 158, 11, 0.5); border: 5px solid rgba(255, 255, 255, 0.3);">
          <span style="font-size: 80px; display: block; line-height: 1;">📚</span>
        </div>
      </div>

      <!-- Titre avec police Lobster -->
      <h1 style="font-family: 'Lobster', cursive; font-size: 72px; color: #78350f; margin-bottom: 16px; text-shadow: 2px 2px 4px rgba(255,255,255,0.3);">
        Blablabook
      </h1>

      <!-- Sous-titre -->
      <p style="font-size: 24px; color: #92400e; margin-bottom: 40px; font-weight: 600; text-shadow: 1px 1px 2px rgba(255,255,255,0.3);">
        Votre bibliothèque personnelle en ligne
      </p>

      <!-- Description -->
      <p style="font-size: 18px; color: #78350f; margin-bottom: 50px; max-width: 600px; margin-left: auto; margin-right: auto; line-height: 1.6;">
        Organisez, suivez et partagez vos lectures. Créez votre bibliothèque virtuelle et ne perdez plus jamais le fil de vos livres préférés ! 📖✨
      </p>

      <!-- Boutons -->
      <div class="flex gap-6 justify-center">
        {#if isLoggedIn}
          <!-- Utilisateur connecté -->
          <button
            onclick={() => goto('/my-books')}
            class="px-10 py-4 font-bold rounded-full transition-all text-lg"
            style="background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%); color: white; box-shadow: 0 6px 16px rgba(139, 92, 246, 0.5); border: 3px solid rgba(255, 255, 255, 0.3);"
            onmouseover={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(139, 92, 246, 0.7)';
            }}
            onmouseout={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(139, 92, 246, 0.5)';
            }}
          >
            📚 Ma Bibliothèque
          </button>

          <button
            onclick={() => goto('/search')}
            class="px-10 py-4 font-bold rounded-full transition-all text-lg"
            style="background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); color: white; box-shadow: 0 6px 16px rgba(59, 130, 246, 0.5); border: 3px solid rgba(255, 255, 255, 0.3);"
            onmouseover={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.7)';
            }}
            onmouseout={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.5)';
            }}
          >
            🔍 Rechercher
          </button>
        {:else}
          <!-- Utilisateur non connecté -->
          <button
            onclick={() => goto('/register')}
            class="px-10 py-4 font-bold rounded-full transition-all text-lg"
            style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; box-shadow: 0 6px 16px rgba(16, 185, 129, 0.5); border: 3px solid rgba(255, 255, 255, 0.3);"
            onmouseover={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.7)';
            }}
            onmouseout={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.5)';
            }}
          >
            ✨ Commencer gratuitement
          </button>

          <button
            onclick={() => goto('/login')}
            class="px-10 py-4 font-bold rounded-full transition-all text-lg"
            style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); color: white; box-shadow: 0 6px 16px rgba(245, 158, 11, 0.5); border: 3px solid rgba(255, 255, 255, 0.3);"
            onmouseover={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(245, 158, 11, 0.7)';
            }}
            onmouseout={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(245, 158, 11, 0.5)';
            }}
          >
            🔐 Se connecter
          </button>
        {/if}
      </div>

      <!-- Fonctionnalités -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <div style="background: rgba(255, 255, 255, 0.9); padding: 24px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
          <div style="font-size: 48px; margin-bottom: 12px;">📖</div>
          <h3 style="font-size: 20px; font-weight: bold; color: #78350f; margin-bottom: 8px;">Organisez</h3>
          <p style="color: #92400e; font-size: 14px;">Classez vos livres par statut : à lire, en cours, terminés</p>
        </div>

        <div style="background: rgba(255, 255, 255, 0.9); padding: 24px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
          <div style="font-size: 48px; margin-bottom: 12px;">⭐</div>
          <h3 style="font-size: 20px; font-weight: bold; color: #78350f; margin-bottom: 8px;">Notez</h3>
          <p style="color: #92400e; font-size: 14px;">Attribuez des notes à vos lectures favorites</p>
        </div>

        <div style="background: rgba(255, 255, 255, 0.9); padding: 24px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
          <div style="font-size: 48px; margin-bottom: 12px;">🔍</div>
          <h3 style="font-size: 20px; font-weight: bold; color: #78350f; margin-bottom: 8px;">Découvrez</h3>
          <p style="color: #92400e; font-size: 14px;">Recherchez parmi des milliers de livres</p>
        </div>
      </div>

    </div>
  </div>
</div>