<script>
  import { goto } from '$app/navigation';
  import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
  <title>Conditions Générales d'Utilisation - Blablabook</title>
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
        ⚖️ Conditions Générales d'Utilisation
      </h1>

      <div class="space-y-6" style="color: #78350f;">
        
        <section>
          <h2 class="text-2xl font-bold mb-3" style="color: #6B2D0E;">1. Acceptation des conditions</h2>
          <p>
            En utilisant Blablabook, vous acceptez pleinement et sans réserve les présentes Conditions Générales d'Utilisation (CGU). Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser ce service.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-3" style="color: #6B2D0E;">2. Objet du service</h2>
          <p class="mb-2">
            Blablabook est une application web gratuite permettant de :
          </p>
          <ul class="list-disc list-inside mb-2 ml-4">
            <li>Créer et gérer une bibliothèque personnelle de livres</li>
            <li>Rechercher des livres via l'API Google Books</li>
            <li>Noter et commenter vos lectures</li>
            <li>Organiser vos livres par statut (à lire, en cours, lu)</li>
          </ul>
          <p>
            Ce service est proposé dans le cadre d'un projet pédagogique de formation DWWM.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-3" style="color: #6B2D0E;">3. Création de compte</h2>
          <p class="mb-2">
            Pour utiliser Blablabook, vous devez créer un compte en fournissant :
          </p>
          <ul class="list-disc list-inside mb-2 ml-4">
            <li>Un nom d'utilisateur unique</li>
            <li>Une adresse email valide</li>
            <li>Un mot de passe sécurisé (minimum 6 caractères)</li>
          </ul>
          <p>
            Vous êtes responsable de la confidentialité de vos identifiants. Toute activité effectuée avec votre compte est sous votre responsabilité.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-3" style="color: #6B2D0E;">4. Utilisation du service</h2>
          <p class="mb-2">
            Vous vous engagez à :
          </p>
          <ul class="list-disc list-inside mb-2 ml-4">
            <li>Utiliser le service de manière légale et conforme aux présentes CGU</li>
            <li>Ne pas tenter de pirater, perturber ou endommager le service</li>
            <li>Ne pas créer de comptes multiples de manière abusive</li>
            <li>Respecter les droits de propriété intellectuelle de Google Books</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-3" style="color: #6B2D0E;">5. Contenu utilisateur</h2>
          <p class="mb-2">
            Vos notes, avis et bibliothèque personnelle vous appartiennent. Blablabook s'engage à :
          </p>
          <ul class="list-disc list-inside mb-2 ml-4">
            <li>Ne jamais partager vos données avec des tiers</li>
            <li>Ne pas utiliser vos contenus à des fins commerciales</li>
            <li>Vous permettre d'exporter ou supprimer vos données à tout moment</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-3" style="color: #6B2D0E;">6. Disponibilité du service</h2>
          <p>
            Blablabook est un projet pédagogique. Nous ne garantissons pas une disponibilité continue du service. Des interruptions peuvent survenir pour maintenance, mises à jour ou raisons techniques.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-3" style="color: #6B2D0E;">7. Limitation de responsabilité</h2>
          <p class="mb-2">
            Blablabook est fourni "tel quel" sans garantie d'aucune sorte. Nous ne saurions être tenus responsables de :
          </p>
          <ul class="list-disc list-inside mb-2 ml-4">
            <li>La perte de données</li>
            <li>Les interruptions de service</li>
            <li>Les erreurs dans les informations de livres (provenant de Google Books)</li>
            <li>Tout dommage direct ou indirect résultant de l'utilisation du service</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-3" style="color: #6B2D0E;">8. Suspension et résiliation</h2>
          <p>
            Nous nous réservons le droit de suspendre ou supprimer votre compte en cas de non-respect des présentes CGU, sans préavis ni indemnité.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-3" style="color: #6B2D0E;">9. Modifications des CGU</h2>
          <p>
            Ces CGU peuvent être modifiées à tout moment. La date de dernière mise à jour est indiquée ci-dessous. Il est de votre responsabilité de consulter régulièrement ces conditions.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-3" style="color: #6B2D0E;">10. Droit applicable</h2>
          <p>
            Les présentes CGU sont régies par le droit français. Tout litige sera soumis aux tribunaux compétents français.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-3" style="color: #6B2D0E;">11. Contact</h2>
          <p>
            Pour toute question concernant ces CGU, contactez-nous via la <a href="/legal/contact" class="underline font-bold hover:text-amber-700">page de contact</a>.
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