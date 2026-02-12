'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SplashScreen from '@/components/SplashScreen';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);

    // Wait for auth check to finish
    if (isLoading) return;

    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} duration={2500} />;
  }

  // If splash is done but auth is still loading, show a minimal loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[var(--brand)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return null;
}
