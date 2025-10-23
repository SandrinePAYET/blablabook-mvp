<script>
  import { Button, Label, Input, Card, Alert } from 'flowbite-svelte';
  import { goto } from '$app/navigation';

  // État du formulaire (Svelte 5 runes)
  let email = $state('');
  let password = $state('');
  let error = $state('');
  let loading = $state(false);

  // Fonction de connexion
  async function handleLogin() {
    // Réinitialiser l'erreur
    error = '';
    
    // Validation basique
    if (!email || !password) {
      error = 'Veuillez remplir tous les champs';
      return;
    }

    // Validation email
    if (!email.includes('@')) {
      error = 'Email invalide';
      return;
    }

    // Validation mot de passe
    if (password.length < 8) {
      error = 'Le mot de passe doit contenir au moins 8 caractères';
      return;
    }

    try {
      loading = true;

      // Appel API backend
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        // Erreur de l'API
        error = data.message || 'Erreur lors de la connexion';
        loading = false;
        return;
      }

      // Succès ! Sauvegarder le token
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));

      // Redirection vers la page d'accueil
      goto('/');

    } catch (err) {
      console.error('Erreur login:', err);
      error = 'Erreur de connexion au serveur';
      loading = false;
    }
  }

  // Gestion de la touche Entrée
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleLogin();
    }
  }
</script>

<svelte:head>
  <title>Connexion - Blablabook</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full">
    <!-- Logo / Titre -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-2">
        📚 Blablabook
      </h1>
      <p class="text-gray-600">
        Connectez-vous à votre bibliothèque personnelle
      </p>
    </div>

    <!-- Carte de connexion -->
    <Card size="xl" padding="xl">
      <h2 class="text-2xl font-semibold text-gray-900 mb-6">
        Connexion
      </h2>

      <!-- Message d'erreur -->
      {#if error}
        <Alert color="red" class="mb-4">
          <span class="font-medium">Erreur :</span> {error}
        </Alert>
      {/if}

      <!-- Formulaire -->
      <form onsubmit={(e) => { e.preventDefault(); handleLogin(); }} class="space-y-6">
        
        <!-- Email -->
        <div>
          <Label for="email" class="mb-2">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="exemple@email.com"
            bind:value={email}
            onkeypress={handleKeyPress}
            required
            size="lg"
          />
        </div>

        <!-- Mot de passe -->
        <div>
          <Label for="password" class="mb-2">Mot de passe</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            bind:value={password}
            onkeypress={handleKeyPress}
            required
            size="lg"
          />
        </div>

        <!-- Bouton connexion -->
        <Button
          type="submit"
          color="blue"
          size="lg"
          class="w-full"
          disabled={loading}
        >
          {#if loading}
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Connexion en cours...
          {:else}
            Se connecter
          {/if}
        </Button>

        <!-- Lien inscription -->
        <div class="text-center text-sm text-gray-600">
          Pas encore de compte ?
          <a href="/register" class="font-medium text-blue-600 hover:text-blue-500">
            S'inscrire
          </a>
        </div>
      </form>
    </Card>

    <!-- Footer -->
    <p class="mt-8 text-center text-sm text-gray-500">
      Blablabook - Votre bibliothèque personnelle
    </p>
  </div>
</div>

<style>
  /* Styles personnalisés si nécessaire */
</style>