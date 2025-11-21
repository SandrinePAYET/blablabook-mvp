<script>
  import { goto } from '$app/navigation';
  import Footer from '$lib/components/Footer.svelte';

  let formData = $state({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  let status = $state('');

  function handleSubmit(e) {
    e.preventDefault();
    
    // Validation simple
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      status = 'error';
      return;
    }

    // Simulation d'envoi (dans un vrai projet, appel API ici)
    status = 'success';
    
    // Réinitialiser le formulaire après 2 secondes
    setTimeout(() => {
      formData = { name: '', email: '', subject: '', message: '' };
      status = '';
    }, 2000);
  }
</script>

<svelte:head>
  <title>Contact - Blablabook</title>
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
        📧 Nous contacter
      </h1>

      <div class="mb-8" style="color: #78350f;">
        <p class="mb-4">
          Vous avez une question, une suggestion ou rencontrez un problème ? N'hésitez pas à nous contacter via le formulaire ci-dessous.
        </p>
        <p class="text-sm" style="color: #6B2D0E;">
          <strong>Note :</strong> Ce formulaire est actuellement une démonstration dans le cadre d'un projet pédagogique. Les messages ne sont pas réellement envoyés.
        </p>
      </div>

      <form onsubmit={handleSubmit} class="space-y-6">
        
        <!-- Nom -->
        <div>
          <label for="name" class="block font-bold mb-2" style="color: #78350f;">
            👤 Votre nom
          </label>
          <input
            type="text"
            id="name"
            bind:value={formData.name}
            required
            placeholder="Entrez votre nom"
            class="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-amber-600"
            style="border-color: #C19A6B; background: white;"
          />
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="block font-bold mb-2" style="color: #78350f;">
            📧 Votre email
          </label>
          <input
            type="email"
            id="email"
            bind:value={formData.email}
            required
            placeholder="votre@email.com"
            class="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-amber-600"
            style="border-color: #C19A6B; background: white;"
          />
        </div>

        <!-- Sujet -->
        <div>
          <label for="subject" class="block font-bold mb-2" style="color: #78350f;">
            📋 Sujet
          </label>
          <select
            id="subject"
            bind:value={formData.subject}
            required
            class="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-amber-600"
            style="border-color: #C19A6B; background: white;"
          >
            <option value="">Sélectionnez un sujet</option>
            <option value="question">Question générale</option>
            <option value="bug">Signaler un bug</option>
            <option value="suggestion">Suggestion d'amélioration</option>
            <option value="data">Demande concernant mes données (RGPD)</option>
            <option value="other">Autre</option>
          </select>
        </div>

        <!-- Message -->
        <div>
          <label for="message" class="block font-bold mb-2" style="color: #78350f;">
            💬 Votre message
          </label>
          <textarea
            id="message"
            bind:value={formData.message}
            required
            placeholder="Décrivez votre demande..."
            rows="6"
            class="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-amber-600"
            style="border-color: #C19A6B; background: white; resize: vertical;"
          ></textarea>
        </div>

        <!-- Messages de status -->
        {#if status === 'success'}
          <div class="p-4 rounded-lg" style="background: #D1FAE5; color: #065F46; border: 2px solid #10B981;">
            <p class="font-bold">✅ Message envoyé avec succès !</p>
            <p class="text-sm">Nous vous répondrons dans les plus brefs délais.</p>
          </div>
        {/if}

        {#if status === 'error'}
          <div class="p-4 rounded-lg" style="background: #FEE2E2; color: #991B1B; border: 2px solid #DC2626;">
            <p class="font-bold">❌ Erreur</p>
            <p class="text-sm">Veuillez remplir tous les champs du formulaire.</p>
          </div>
        {/if}

        <!-- Bouton d'envoi -->
        <button
          type="submit"
          class="w-full px-8 py-4 font-bold rounded-full transition-all shadow-lg text-lg"
          style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; box-shadow: 0 6px 16px rgba(16, 185, 129, 0.5);"
        >
          📤 Envoyer le message
        </button>

      </form>

      <div class="mt-8 p-6 rounded-lg" style="background: rgba(212, 165, 116, 0.2); border-left: 4px solid #6B2D0E;">
        <h3 class="font-bold mb-2" style="color: #78350f;">📌 Informations importantes</h3>
        <ul class="list-disc list-inside space-y-1 text-sm" style="color: #6B2D0E;">
          <li>Nous traitons vos données conformément à notre <a href="/legal/privacy" class="underline font-bold hover:text-amber-700">politique de confidentialité</a></li>
          <li>Temps de réponse estimé : 24-48 heures</li>
          <li>Pour les demandes RGPD, précisez votre email d'inscription</li>
        </ul>
      </div>

    </div>
  </div>

  <Footer />
</div>