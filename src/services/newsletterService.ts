import api from '@/lib/api';
import { NewsletterData, ApiResponse, NewsletterState } from '@/types';
import { validateEmail } from './contactService';

export const newsletterService = {
  // S'inscrire à la newsletter
  async subscribe(email: string): Promise<void> {
    try {
      // Validation côté client (double sécurité)
      if (!email || !validateEmail(email)) {
        throw new Error('Adresse email invalide');
      }

      const response = await api.post<ApiResponse<void>>('/newsletter', { email });
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Erreur lors de l\'inscription à la newsletter');
      }
    } catch (error) {
      console.error('Erreur API newsletter subscribe:', error);
      
      // Gérer spécifiquement les erreurs réseau (backend non démarré)
      if (error instanceof Error) {
        if (error.message.includes('Network Error') || error.message.includes('ERR_NETWORK')) {
          throw new Error('Le serveur backend n\'est pas accessible. Veuillez démarrer le serveur NestJS sur http://localhost:4000');
        }
        throw error;
      }
      
      throw new Error('Impossible de vous inscrire à la newsletter. Veuillez réessayer.');
    }
  },

  // Initialiser l'état de la newsletter
  initializeState(): NewsletterState {
    return {
      isLoading: false,
      error: null,
      isSubscribed: false,
      email: '',
    };
  },

  // Définir l'état de chargement
  setLoading(isLoading: boolean): NewsletterState {
    return {
      isLoading,
      error: null,
      isSubscribed: false,
      email: '',
    };
  },

  // Définir l'état de succès
  setSuccess(): NewsletterState {
    return {
      isLoading: false,
      error: null,
      isSubscribed: true,
      email: '',
    };
  },

  // Définir l'état d'erreur
  setError(error: string): NewsletterState {
    return {
      isLoading: false,
      error,
      isSubscribed: false,
      email: '',
    };
  },

  // Définir l'email
  setEmail(email: string): NewsletterState {
    return {
      isLoading: false,
      error: null,
      isSubscribed: false,
      email,
    };
  },
};