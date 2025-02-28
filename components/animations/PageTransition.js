'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// Komponen untuk transisi halaman
export const PageTransition = ({ 
  children, 
  type = 'fade', // 'fade', 'slide', 'zoom'
  duration = 0.3 
}) => {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    setIsAnimating(true);
    
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsAnimating(false);
    }, duration * 1000);
    
    return () => clearTimeout(timer);
  }, [pathname, children, duration]);

  // Tentukan kelas CSS berdasarkan jenis transisi
  const getTransitionClass = () => {
    if (isAnimating) {
      switch (type) {
        case 'slide':
          return 'animate-slide-out';
        case 'zoom':
          return 'animate-zoom-out';
        case 'fade':
        default:
          return 'animate-fade-out';
      }
    } else {
      switch (type) {
        case 'slide':
          return 'animate-slide-in';
        case 'zoom':
          return 'animate-zoom-in';
        case 'fade':
        default:
          return 'animate-fade-in';
      }
    }
  };

  return (
    <div
      className={`${getTransitionClass()}`}
      style={{
        transition: `opacity ${duration}s ease, transform ${duration}s ease`,
      }}
    >
      {displayChildren}
    </div>
  );
};

export default PageTransition;
