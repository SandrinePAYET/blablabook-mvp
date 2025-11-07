<script>
  import { goto } from '$app/navigation';
  import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
  <title>Politique de confidentialité - Blablabook</title>
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
        🔒 Politique de confidentialité
      </h1>

      <div class="space-y-6" style="color: #78350f;">
        
        <section>
          <h2 class="text-2xl font-bold mb-3" style="color: #92400e;">1. Collecte des données</h2>
          <p class="mb-2">
            Blablabook collecte uniquement les données strictement nécessaires au fonctionnement du service :
          </p>
          <ul class="list-disc list-inside mb-2 ml-4">
            <li>Nom d'utilisateur</li>
            <li>Adresse email</li>
            <li>Mot de passe (hashé avec bcrypt)</li>
            <li>Données de votre bibliothèque personnelle (livres, notes, avis)</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-3" style="color: #92400e;">2. Utilisation des données</h2>
          <p class="mb-2">
            Vos données sont utilisées exclusivement pour :
          </p>
          <ul class="list-disc list-inside mb-2 ml-4">
            <li>Créer et gérer votre compte utilisateur</li>
            <li>Sauvegarder votre bibliothèque personnelle</li>
            <li>Vous permettre de vous connecter de manière sécurisée</li>
          </ul>
          <p>
            Aucune donnée n'est partagée avec des tiers. Aucune publicité ciblée n'est utilisée.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-3" style="color: #92400e;">3. Sécurité des données</h2>
          <p class="mb-2">
            Blablabook met en œuvre les mesures de sécurité suivantes :
          </p>
          <ul class="list-disc list-inside mb-2 ml-4">
            <li>Mots de passe hashés avec bcrypt (impossible à décrypter)</li>
            <li>Authentification par token JWT sécurisé</li>
            <li>Base de données PostgreSQL avec accès restreint</li>
            <li>Validation de toutes les entrées utilisateur côté serveur</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-3" style="color: #92400e;">4. Vos droits (RGPD)</h2>
          <p class="mb-2">
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
          </p>
          <ul class="list-disc list-inside mb-2 ml-4">
            <li><strong>Droit d'accès :</strong> consulter vos données personnelles</li>
            <li><strong>Droit de rectification :</strong> corriger vos données</li>
            <li><strong>Droit à l'effacement :</strong> supprimer votre compte et toutes vos données</li>
            <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format standard</li>
            <li><strong>Droit d'opposition :</strong> refuser le traitement de vos données</li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous via la <a href="/legal/contact" class="underline font-bold hover:text-amber-700">page de contact</a>.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-3" style="color: #92400e;">5. Cookies</h2>
          <p>
            Blablabook utilise uniquement des cookies techniques essentiels (localStorage) pour stocker votre token d'authentification. Aucun cookie de traçage ou publicitaire n'est utilisé.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-3" style="color: #92400e;">6. Conservation des données</h2>
          <p>
            Vos données sont conservées tant que votre compte est actif. Vous pouvez supprimer votre compte à tout moment, ce qui entraînera la suppression définitive de toutes vos données.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-3" style="color: #92400e;">7. API externe</h2>
          <p>
            Les recherches de livres utilisent l'API Google Books. Les requêtes sont envoyées directement depuis votre navigateur. Consultez la <a href="https://policies.google.com/privacy" target="_blank" class="underline font-bold hover:text-amber-700">politique de confidentialité de Google</a> pour plus d'informations.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-3" style="color: #92400e;">8. Modifications</h2>
          <p>
            Cette politique de confidentialité peut être modifiée. La date de dernière mise à jour est indiquée ci-dessous.
          </p>
        </section>

      </div>

      <div class="mt-8 text-sm text-center" style="color: #92400e;">
        <p>Dernière mise à jour : 07 novembre 2025</p>
      </div>

    </div>
  </div>

  <Footer />
</div>