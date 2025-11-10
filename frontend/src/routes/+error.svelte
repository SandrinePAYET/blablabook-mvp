<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
</script>

<svelte:head>
  <title>Page introuvable - Blablabook</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center px-4">
  <div class="text-center max-w-2xl">
    
    <!-- Icône 404 -->
    <div class="mb-8">
      <div class="text-9xl font-bold text-blue-600 mb-4">404</div>
      <div class="text-6xl mb-4">📚</div>
    </div>

    <!-- Message -->
    <h1 class="text-4xl font-bold text-gray-900 mb-4">
      Oups ! Page introuvable
    </h1>
    
    <p class="text-xl text-gray-600 mb-8">
      Cette page semble avoir disparu de notre bibliothèque...
    </p>

    <!-- Détails de l'erreur -->
    {#if $page.error}
      <div class="bg-white rounded-lg shadow-md p-6 mb-8 max-w-md mx-auto">
        <p class="text-sm text-gray-500 mb-2">Erreur détectée :</p>
        <p class="text-sm font-mono text-red-600">{$page.error.message || 'Page non trouvée'}</p>
      </div>
    {/if}

    <!-- Boutons d'action -->
    <div class="flex gap-4 justify-center flex-wrap">
      <button
        onclick={() => goto('/')}
        class="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
      >
        🏠 Retour à l'accueil
      </button>
      
      <button
        onclick={() => goto('/my-books')}
        class="px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
      >
        📚 Ma bibliothèque
      </button>
      
      <button
        onclick={() => goto('/search')}
        class="px-8 py-4 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl"
      >
        🔍 Rechercher des livres
      </button>
    </div>

    <!-- Message d'aide -->
    <p class="text-sm text-gray-500 mt-8">
      Si le problème persiste, vous pouvez retourner à la page d'accueil ou explorer votre bibliothèque.
    </p>

  </div>
</div>