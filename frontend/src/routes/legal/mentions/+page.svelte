<script>
  import { goto } from '$app/navigation';
  import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
  <title>Mentions légales - Blablabook</title>
</svelte:head>

<div class="min-h-screen py-8" style="background: linear-gradient(135deg, #8B7355 0%, #6B5444 100%); background-image: url('https://www.transparenttextures.com/patterns/wood-pattern.png'); background-blend-mode: multiply; background-size: 300px;">
  <div class="container mx-auto px-4 max-w-4xl">
    
    <button
      onclick={() => goto('/')}
      class="mb-6 px-6 py-3 font-bold rounded-full transition-all shadow-lg"
      style="background: linear-gradient(135deg, #D4A574 0%, #C19A6B 100%); color: #78350f; box-shadow: 0 4px 12px rgba(0,0,0,0.3);"
    >
      ← Retour à l'accueil
    </button>

    <div class="bg-white rounded-xl shadow-2xl p-8" style="background: linear-gradient(135deg, #FFF8DC 0%, #FAEBD7 100%);">
      
      <h1 class="text-4xl font-bold mb-6" style="color: #78350f; font-family: 'Satisfy', cursive;">
        📋 Mentions légales
      </h1>

      <div class="space-y-6" style="color: #78350f;">
        
        <section>
          <h2 class="text-2xl font-bold mb-3" style="color: #6B2D0E;">1. Présentation du site</h2>
          <p class="mb-2"><strong>Nom du site :</strong> Blablabook</p>
          <p class="mb-2"><strong>URL :</strong> http://localhost:5173</p>
          <p class="mb-2"><strong>Éditeur :</strong> Projet étudiant dans le cadre de la formation DWWM</p>
          <p class="mb-2"><strong>Responsable de publication :</strong> Sandrine</p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-3" style="color: #6B2D0E;">2. Hébergement</h2>
          <p class="mb-2"><strong>Hébergeur :</strong> Développement local</p>
          <p>Ce site est actuellement hébergé en environnement de développement local dans le cadre d'un projet de formation.</p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-3" style="color: #6B2D0E;">3. Propriété intellectuelle</h2>
          <p class="mb-2">
            L'ensemble du contenu de ce site est la propriété exclusive de son créateur, sauf mention contraire.
          </p>
          <p class="mb-2">
            Les données de livres proviennent de l'API Google Books et restent la propriété de Google.
          </p>
          <p>
            Toute reproduction, même partielle, est interdite sans autorisation préalable.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-3" style="color: #6B2D0E;">4. Données personnelles</h2>
          <p class="mb-2">
            Conformément au RGPD, les utilisateurs disposent d'un droit d'accès, de rectification et de suppression de leurs données personnelles.
          </p>
          <p>
            Pour plus d'informations, consultez notre <a href="/legal/privacy" class="underline font-bold hover:text-amber-700">Politique de confidentialité</a>.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-3" style="color: #6B2D0E;">5. Cookies</h2>
          <p>
            Ce site utilise uniquement des cookies techniques nécessaires au fonctionnement de l'authentification. Aucun cookie de traçage n'est utilisé.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-3" style="color: #6B2D0E;">6. Limitation de responsabilité</h2>
          <p>
            Ce site est un projet pédagogique. L'éditeur ne saurait être tenu responsable des éventuels dysfonctionnements.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-3" style="color: #6B2D0E;">7. Contact</h2>
          <p>
            Pour toute question, contactez-nous via la <a href="/legal/contact" class="underline font-bold hover:text-amber-700">page de contact</a>.
          </p>
        </section>

      </div>

      <div class="mt-8 text-sm text-center" style="color: #6B2D0E;">
        <p>Dernière mise à jour : 07 novembre 2025</p>
      </div>

    </div>
  </div>

  <Footer />
</div>