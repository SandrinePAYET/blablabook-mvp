/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
  ],
  theme: {
    extend: {
      colors: {
        // === THÈME BIBLIOTHÈQUE BOIS ===
        // Bois / Marron
        wood: {
          dark: '#5D4E37',      // Fond sombre (footer, sections)
          darker: '#4A3F2F',    // Variante plus sombre
        },
        brown: {
          text: '#6B2D0E',      // Texte accessible (WCAG AA - 5.5:1)
          medium: '#92400e',    // Référence ancienne couleur
        },
        // Beige / Crème
        beige: {
          light: '#F5F5DC',     // Beige (fond principal)
          wheat: '#F5DEB3',     // Wheat (liens footer accessibles)
          footer: '#E5D5C0',    // Copyright accessible
          accent: '#D4A574',    // Accents décoratifs
          sand: '#C19A6B',      // Tons sable
        },

        // === COULEURS NAVBAR BLEUE ===
        navy: {
          dark: '#1E3A8A',      // Fond navbar (gradient start)
          border: '#1E40AF',    // Bordure navbar
        },
        'blue-nav': {
          DEFAULT: '#3B82F6',   // Bleu principal navbar (gradient end)
          light: '#60A5FA',     // Variante claire
          medium: '#2563EB',    // Variante moyenne
        },

        // === COULEURS UI ===
        // Violet (Ma Bibliothèque)
        purple: {
          library: '#8B5CF6',   // Bouton bibliothèque
          dark: '#7C3AED',      // Hover bibliothèque
        },
        // Orange (Menu burger)
        orange: {
          bright: '#F59E0B',    // Bouton burger
          medium: '#D97706',    // Hover burger
          dark: '#B45309',      // Bordure burger
        },
        // Vert (Inscription)
        green: {
          register: '#10B981',  // Bouton inscription
          dark: '#059669',      // Hover inscription
        },
        // Rouge (Déconnexion)
        red: {
          logout: '#DC2626',    // Bouton déconnexion
          dark: '#B91C1C',      // Hover déconnexion
        },
      },
      fontFamily: {
        lobster: ['Lobster', 'cursive'],      // Police principale (logo, titres)
        satisfy: ['Satisfy', 'cursive'],      // Police décorative
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
