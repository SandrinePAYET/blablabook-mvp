<script>
  import { goto } from '$app/navigation';
  import Footer from '$lib/components/Footer.svelte';

  let username = '';
  let password = '';
  let error = '';
  let loading = false;

  async function handleLogin(e) {
    e.preventDefault();
    
    if (!username || !password) {
      error = 'Veuillez remplir tous les champs';
      return;
    }

    loading = true;
    error = '';

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        window.location.href = '/my-books';
      } else {
        error = data.message || 'Erreur de connexion';
      }
    } catch (err) {
      console.error('Erreur:', err);
      error = 'Erreur de connexion au serveur';
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Connexion - Blablabook</title>
  <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
</svelte:head>

<!-- Fond bois avec texture -->
<div class="min-h-screen flex items-center justify-center py-12 px-4" style="background: linear-gradient(135deg, #8B7355 0%, #6B5444 100%); background-image: url('https://www.transparenttextures.com/patterns/wood-pattern.png'); background-blend-mode: multiply; background-size: 300px;">
  
  <div class="max-w-md w-full">
    
    <!-- Carte de connexion -->
    <div style="background: linear-gradient(135deg, #D4A574 0%, #C19A6B 50%, #A0826D 100%); background-image: repeating-linear-gradient(90deg, rgba(0,0,0,0.1) 0px, transparent 1px, transparent 3px, rgba(0,0,0,0.15) 4px, transparent 5px, transparent 8px); padding: 48px 40px; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.5), inset 0 2px 8px rgba(255,255,255,0.3);">
      
      <!-- Logo et titre -->
      <div class="text-center mb-8">
        <div style="display: inline-block; background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); padding: 20px; border-radius: 50%; box-shadow: 0 8px 20px rgba(245, 158, 11, 0.5); border: 4px solid rgba(255, 255, 255, 0.3); margin-bottom: 16px;">
          <span style="font-size: 48px; display: block; line-height: 1;">📚</span>
        </div>
        
        <h1 style="font-family: 'Lobster', cursive; font-size: 42px; color: #78350f; margin-bottom: 8px; text-shadow: 1px 1px 2px rgba(255,255,255,0.3);">
          Connexion
        </h1>
        
        <p style="color: #92400e; font-size: 16px; font-weight: 600;">
          Accédez à votre bibliothèque personnelle
        </p>
      </div>

      <!-- Formulaire -->
      <form onsubmit={handleLogin} class="space-y-6">
        
        <!-- Message d'erreur -->
        {#if error}
          <div style="background: rgba(220, 38, 38, 0.1); border: 2px solid #DC2626; color: #991B1B; padding: 12px 16px; border-radius: 12px; font-weight: 600; font-size: 14px;">
            ❌ {error}
          </div>
        {/if}

        <!-- Nom d'utilisateur -->
        <div>
          <label for="username" style="display: block; color: #78350f; font-weight: 700; margin-bottom: 8px; font-size: 15px;">
            👤 Nom d'utilisateur
          </label>
          <input
            id="username"
            type="text"
            bind:value={username}
            placeholder="Entrez votre nom d'utilisateur"
            required
            style="width: 100%; padding: 14px 18px; border-radius: 12px; border: 3px solid rgba(139, 92, 246, 0.3); font-size: 16px; background: white; box-shadow: 0 3px 10px rgba(0,0,0,0.2); font-weight: 500;"
            onfocus={(e) => e.currentTarget.style.borderColor = '#8B5CF6'}
            onblur={(e) => e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)'}
          />
        </div>

        <!-- Mot de passe -->
        <div>
          <label for="password" style="display: block; color: #78350f; font-weight: 700; margin-bottom: 8px; font-size: 15px;">
            🔒 Mot de passe
          </label>
          <input
            id="password"
            type="password"
            bind:value={password}
            placeholder="Entrez votre mot de passe"
            required
            style="width: 100%; padding: 14px 18px; border-radius: 12px; border: 3px solid rgba(139, 92, 246, 0.3); font-size: 16px; background: white; box-shadow: 0 3px 10px rgba(0,0,0,0.2); font-weight: 500;"
            onfocus={(e) => e.currentTarget.style.borderColor = '#8B5CF6'}
            onblur={(e) => e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)'}
          />
        </div>

        <!-- Bouton de connexion -->
        <button
          type="submit"
          disabled={loading}
          class="w-full px-8 py-4 font-bold rounded-full transition-all text-lg"
          style="background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%); color: white; box-shadow: 0 6px 16px rgba(139, 92, 246, 0.5); border: 3px solid rgba(255, 255, 255, 0.3); {loading ? 'opacity: 0.7; cursor: not-allowed;' : ''}"
          onmouseover={(e) => {
            if (!loading) {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.7)';
            }
          }}
          onmouseout={(e) => {
            if (!loading) {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(139, 92, 246, 0.5)';
            }
          }}
        >
          {#if loading}
            ⏳ Connexion en cours...
          {:else}
            🔓 Se connecter
          {/if}
        </button>

        <!-- Lien inscription -->
        <div class="text-center">
          <p style="color: #92400e; font-weight: 600; margin-bottom: 12px;">
            Pas encore de compte ?
          </p>
          
          <a href="/register"
            class="inline-block px-8 py-3 font-bold rounded-full transition-all"
            style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4); border: 2px solid rgba(255, 255, 255, 0.3); text-decoration: none;"
            onmouseover={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.6)';
            }}
            onmouseout={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4)';
            }}
          >
            ✨ Créer un compte
          </a>
        </div>
      </form>
    </div>

    <!-- Lien retour accueil -->
    <div class="text-center mt-6">
      
      <a href="/"
        class="inline-block px-6 py-2 font-semibold rounded-full transition-all"
        style="background: rgba(255, 255, 255, 0.9); color: #78350f; box-shadow: 0 3px 8px rgba(0,0,0,0.3); text-decoration: none;"
        onmouseover={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onmouseout={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        ← Retour à l'accueil
      </a>
    </div>
    <Footer />
  </div>
</div>