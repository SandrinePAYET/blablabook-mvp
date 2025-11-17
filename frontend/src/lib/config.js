/**
 * Configuration de l'application
 * Centralise les URLs et paramètres configurables
 */

// URL de l'API Backend
// En développement: utilise VITE_API_URL du fichier .env
// Par défaut: http://localhost:3000
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Helper pour construire les URLs d'API
export const getApiUrl = (endpoint) => {
  // S'assure que l'endpoint commence par /
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_URL}${normalizedEndpoint}`;
};
