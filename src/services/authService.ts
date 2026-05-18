// Service de gestion des tokens JWT pour la sécurité NGTech

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export const authService = {
  // Stocker le token JWT
  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ngtech_token', token);
    }
  },

  // Récupérer le token JWT
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ngtech_token');
    }
    return null;
  },

  // Supprimer le token JWT (déconnexion)
  removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ngtech_token');
    }
  },

  // Vérifier si le token est valide
  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      // Décoder le token JWT (partie payload)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      const payload: TokenPayload = JSON.parse(jsonPayload);
      
      // Vérifier si le token n'est pas expiré
      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch (error) {
      console.error('Erreur lors de la validation du token:', error);
      return false;
    }
  },

  // Décoder le payload du token
  decodeToken(): TokenPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return null;
    }
  },

  // Rafraîchir le token (si disponible)
  async refreshToken(): Promise<boolean> {
    try {
      // Appel à l'API pour rafraîchir le token
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.getToken()}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          this.setToken(data.token);
          return true;
        }
      }
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du token:', error);
    }

    return false;
  },

  // Vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return this.isTokenValid();
  },

  // Obtenir les informations de l'utilisateur
  getUserInfo(): TokenPayload | null {
    return this.decodeToken();
  },

  // Vérifier si l'utilisateur a un rôle spécifique
  hasRole(role: string): boolean {
    const payload = this.decodeToken();
    return payload ? payload.role === role : false;
  },

  // Nettoyer toutes les données d'authentification
  clearAuth(): void {
    this.removeToken();
    // Nettoyer d'autres données si nécessaire
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ngtech_user');
      localStorage.removeItem('ngtech_preferences');
    }
  },
};
