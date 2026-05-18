import api from '@/lib/api';
import { Project, ApiResponse, ProjectsState } from '@/types';

export const projectsService = {
  // Récupérer tous les projets
async getProjects(): Promise<Project[]> {
  try {
    const response = await api.get<Project[]>('/projects');
    return response.data ?? [];
  } catch (error) {
    console.error('Erreur API getProjects:', error);
    throw new Error('Impossible de charger les projets.');
  }
},
  // Récupérer un projet par ID
  async getProjectById(id: string): Promise<Project> {
    try {
      const response = await api.get<ApiResponse<Project>>(`/projects/${id}`);
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      throw new Error(response.data.message || 'Projet non trouvé');
    } catch (error) {
      console.error(`Erreur API getProjectById(${id}):`, error);
      throw new Error('Impossible de récupérer le projet');
    }
  },

  // Initialiser l'état des projets
  initializeState(): ProjectsState {
    return {
      projects: [],
      isLoading: false,
      error: null,
    };
  },

  // Définir l'état de chargement
  setLoading(projects: Project[], isLoading: boolean): ProjectsState {
    return {
      projects,
      isLoading,
      error: null,
    };
  },

  // Définir l'état d'erreur
  setError(error: string): ProjectsState {
    return {
      projects: [],
      isLoading: false,
      error,
    };
  },

  // Définir l'état de succès
  setSuccess(projects: Project[]): ProjectsState {
    return {
      projects,
      isLoading: false,
      error: null,
    };
  },
};
