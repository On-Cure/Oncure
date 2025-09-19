'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';

export default function ClientAuthGuard({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      // User is authenticated, allow access to protected routes
      return;
    }
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  // Don't render anything until auth is checked
  if (loading || !user) {
    return null;
  }

  return children;
}