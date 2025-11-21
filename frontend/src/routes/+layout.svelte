<script>
  import '../app.css';
  import Navbar from '$lib/components/Navbar.svelte';
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
</script>

<Navbar />

<main>
  {#key $page.url.pathname}
    <div in:fade={{ duration: 200, delay: 200 }} out:fade={{ duration: 200 }}>
      <slot />
    </div>
  {/key}
</main>

<style>
  main {
    min-height: calc(100vh - 64px);
    padding-top: 64px; /* Compense la navbar fixe */
  }
</style>