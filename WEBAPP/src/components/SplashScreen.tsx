'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface SplashScreenProps {
  onComplete?: () => void;
  duration?: number;
}

export default function SplashScreen({ onComplete, duration = 2500 }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 500);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed inset-0 z-50 bg-white 
        flex flex-col items-center justify-center
        transition-opacity duration-500
        ${fadeOut ? 'opacity-0' : 'opacity-100'}
      `}
    >
      {/* Main Logo */}
      <div className="relative w-[278px] h-[278px] animate-fade-in">
        <Image
          src="/images/nwk-logo.png"
          alt="NWK Muslim Association"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* iSquare Logo at bottom */}
      <div className="absolute bottom-[80px] left-1/2 -translate-x-1/2">
        <div className="relative w-[168px] h-[54px]">
          <Image
            src="/images/isquare-logo.png"
            alt="iSquare Tech Solutions"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
