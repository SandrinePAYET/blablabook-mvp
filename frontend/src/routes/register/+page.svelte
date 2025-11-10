<script>
  import { goto } from '$app/navigation';
  import Footer from '$lib/components/Footer.svelte';

  let username = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let error = '';
  let loading = false;

  async function handleRegister(e) {
    e.preventDefault();
    
    if (!username || !email || !password || !confirmPassword) {
      error = 'Veuillez remplir tous les champs';
      return;
    }

    if (password !== confirmPassword) {
      error = 'Les mots de passe ne correspondent pas';
      return;
    }

    if (password.length < 6) {
      error = 'Le mot de passe doit contenir au moins 6 caractères';
      return;
    }

    loading = true;
    error = '';

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        window.location.href = '/my-books';
      } else {
        error = data.message || 'Erreur lors de l\'inscription';
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
  <title>Inscription - Blablabook</title>
  <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
</svelte:head>

<!-- Fond bois avec texture -->
<div class="min-h-screen flex items-center justify-center py-12 px-4" style="background: linear-gradient(135deg, #8B7355 0%, #6B5444 100%); background-image: url('https://www.transparenttextures.com/patterns/wood-pattern.png'); background-blend-mode: multiply; background-size: 300px;">
  
  <div class="max-w-md w-full">
    
    <!-- Carte d'inscription -->
    <div style="background: linear-gradient(135deg, #D4A574 0%, #C19A6B 50%, #A0826D 100%); background-image: repeating-linear-gradient(90deg, rgba(0,0,0,0.1) 0px, transparent 1px, transparent 3px, rgba(0,0,0,0.15) 4px, transparent 5px, transparent 8px); padding: 48px 40px; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.5), inset 0 2px 8px rgba(255,255,255,0.3);">
      
      <!-- Logo et titre -->
      <div class="text-center mb-8">
        <div style="display: inline-block; background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 20px; border-radius: 50%; box-shadow: 0 8px 20px rgba(16, 185, 129, 0.5); border: 4px solid rgba(255, 255, 255, 0.3); margin-bottom: 16px;">
          <span style="font-size: 48px; display: block; line-height: 1;">✨</span>
        </div>
        
        <h1 style="font-family: 'Lobster', cursive; font-size: 42px; color: #78350f; margin-bottom: 8px; text-shadow: 1px 1px 2px rgba(255,255,255,0.3);">
          Inscription
        </h1>
        
        <p style="color: #92400e; font-size: 16px; font-weight: 600;">
          Créez votre compte gratuitement
        </p>
      </div>

      <!-- Formulaire -->
      <form onsubmit={handleRegister} class="space-y-6">
        
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
            placeholder="Choisissez un nom d'utilisateur"
            required
            style="width: 100%; padding: 14px 18px; border-radius: 12px; border: 3px solid rgba(16, 185, 129, 0.3); font-size: 16px; background: white; box-shadow: 0 3px 10px rgba(0,0,0,0.2); font-weight: 500;"
            onfocus={(e) => e.currentTarget.style.borderColor = '#10B981'}
            onblur={(e) => e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)'}
          />
        </div>

        <!-- Email -->
        <div>
          <label for="email" style="display: block; color: #78350f; font-weight: 700; margin-bottom: 8px; font-size: 15px;">
            📧 Email
          </label>
          <input
            id="email"
            type="email"
            bind:value={email}
            placeholder="votre@email.com"
            required
            style="width: 100%; padding: 14px 18px; border-radius: 12px; border: 3px solid rgba(16, 185, 129, 0.3); font-size: 16px; background: white; box-shadow: 0 3px 10px rgba(0,0,0,0.2); font-weight: 500;"
            onfocus={(e) => e.currentTarget.style.borderColor = '#10B981'}
            onblur={(e) => e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)'}
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
            placeholder="Minimum 6 caractères"
            required
            style="width: 100%; padding: 14px 18px; border-radius: 12px; border: 3px solid rgba(16, 185, 129, 0.3); font-size: 16px; background: white; box-shadow: 0 3px 10px rgba(0,0,0,0.2); font-weight: 500;"
            onfocus={(e) => e.currentTarget.style.borderColor = '#10B981'}
            onblur={(e) => e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)'}
          />
        </div>

        <!-- Confirmation mot de passe -->
        <div>
          <label for="confirmPassword" style="display: block; color: #78350f; font-weight: 700; margin-bottom: 8px; font-size: 15px;">
            🔒 Confirmer le mot de passe
          </label>
          <input
            id="confirmPassword"
            type="password"
            bind:value={confirmPassword}
            placeholder="Retapez votre mot de passe"
            required
            style="width: 100%; padding: 14px 18px; border-radius: 12px; border: 3px solid rgba(16, 185, 129, 0.3); font-size: 16px; background: white; box-shadow: 0 3px 10px rgba(0,0,0,0.2); font-weight: 500;"
            onfocus={(e) => e.currentTarget.style.borderColor = '#10B981'}
            onblur={(e) => e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)'}
          />
        </div>

        <!-- Bouton d'inscription -->
        <button
          type="submit"
          disabled={loading}
          class="w-full px-8 py-4 font-bold rounded-full transition-all text-lg"
          style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; box-shadow: 0 6px 16px rgba(16, 185, 129, 0.5); border: 3px solid rgba(255, 255, 255, 0.3); {loading ? 'opacity: 0.7; cursor: not-allowed;' : ''}"
          onmouseover={(e) => {
            if (!loading) {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.7)';
            }
          }}
          onmouseout={(e) => {
            if (!loading) {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.5)';
            }
          }}
        >
          {#if loading}
            ⏳ Inscription en cours...
          {:else}
            ✨ Créer mon compte
          {/if}
        </button>

        <!-- Lien connexion -->
        <div class="text-center">
          <p style="color: #92400e; font-weight: 600; margin-bottom: 12px;">
            Vous avez déjà un compte ?
          </p>
          
          <a href="/login"
            class="inline-block px-8 py-3 font-bold rounded-full transition-all"
            style="background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%); color: white; box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4); border: 2px solid rgba(255, 255, 255, 0.3); text-decoration: none;"
            onmouseover={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(139, 92, 246, 0.6)';
            }}
            onmouseout={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.4)';
            }}
          >
            🔐 Se connecter
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