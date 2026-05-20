'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export interface AdminUser {
  id: string;
  email: string;
  fullName: string | null;
  role: 'ADMIN' | 'SUPER_ADMIN';
}

export function useAdminAuth() {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('ngtech_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetch('http://localhost:4000/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('Non autorisé');
        return res.json();
      })
      .then(data => setUser(data))
      .catch(() => {
        localStorage.removeItem('ngtech_token');
        router.push('/admin/login');
      })
      .finally(() => setIsLoading(false));
  }, [router]);

  const logout = () => {
    localStorage.removeItem('ngtech_token');
    router.push('/admin/login');
  };

  const getToken = () => localStorage.getItem('ngtech_token') ?? '';

  return { user, isLoading, logout, getToken };
}