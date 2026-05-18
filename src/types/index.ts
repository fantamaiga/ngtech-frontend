// Types pour l'API NGTech

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  projectType: 'MOBILE' | 'FULLSTACK';
  isCommunityProject: boolean;
  coverImageUrl?: string | null;
  repoUrl?: string | null;
  liveUrl?: string | null;
  techStack: string[];
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

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

export interface NewsletterData {
  email: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

// Types pour les états de chargement
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface ContactState extends LoadingState {
  isSubmitted: boolean;
}

export interface NewsletterState extends LoadingState {
  isSubscribed: boolean;
  email: string;
}

export interface ProjectsState extends LoadingState {
  projects: Project[];
}
