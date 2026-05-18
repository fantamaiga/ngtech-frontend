import api from '@/lib/api';
import { ContactState } from '@/types';

// Formulaire front (champs UI)
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service: string;
  projectDescription: string;
  budget?: string;
  timeline?: string;
}

// Mapping service frontend → enum backend
const serviceToEnum = (service: string): string => {
  if (service.toLowerCase().includes('mobile')) return 'MOBILE';
  if (service.toLowerCase().includes('fullstack')) return 'FULLSTACK';
  if (service.toLowerCase().includes('cyber') || service.toLowerCase().includes('audit')) return 'CYBER_AUDIT';
  return 'MOBILE';
};

// Validation email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validation formulaire
export const validateContactForm = (data: ContactFormData): { isValid: boolean; errors: Partial<ContactFormData> } => {
  const errors: Partial<ContactFormData> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Le nom doit contenir au moins 2 caractères';
  }
  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Veuillez entrer une adresse email valide';
  }
  if (!data.service) {
    errors.service = 'Veuillez sélectionner un service';
  }
  if (!data.projectDescription || data.projectDescription.trim().length < 10) {
    errors.projectDescription = 'La description doit contenir au moins 10 caractères';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const contactService = {
  async submitContact(data: ContactFormData): Promise<void> {
    const validation = validateContactForm(data);
    if (!validation.isValid) {
      throw new Error('Formulaire invalide');
    }

    // Mapping champs frontend → champs backend
    const payload = {
      kind: 'QUOTE_REQUEST',
      fullName: data.name,
      email: data.email,
      phone: data.phone || undefined,
      subject: `Demande de devis — ${data.service}`,
      message: data.projectDescription,
      serviceDesired: serviceToEnum(data.service),
      budget: data.budget || undefined,
      company: data.company || undefined,
    };

    try {
      const response = await api.post('/contact', payload);
      // Le backend retourne { received: true, id: "..." } → succès si 2xx
      if (!response.data.received) {
        throw new Error('Erreur lors de l\'envoi du message');
      }
    } catch (error) {
      console.error('Erreur API submitContact:', error);
      if (error instanceof Error) {
        if (error.message.includes('Network Error') || error.message.includes('ERR_NETWORK')) {
          throw new Error('Le serveur backend n\'est pas accessible.');
        }
        throw error;
      }
      throw new Error('Impossible d\'envoyer votre message. Veuillez réessayer.');
    }
  },

  initializeState(): ContactState {
    return { isLoading: false, error: null, isSubmitted: false };
  },

  setLoading(isLoading: boolean): ContactState {
    return { isLoading, error: null, isSubmitted: false };
  },

  setSuccess(): ContactState {
    return { isLoading: false, error: null, isSubmitted: true };
  },

  setError(error: string): ContactState {
    return { isLoading: false, error, isSubmitted: false };
  },
};