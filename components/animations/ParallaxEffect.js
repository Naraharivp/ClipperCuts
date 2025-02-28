'use client';

import { useEffect, useRef, useState } from 'react';

// Komponen untuk efek parallax sederhana
export const ParallaxEffect = ({ 
  children, 
  speed = 0.5,
  className = ''
}) => {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const { top } = ref.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      if (top < windowHeight && top > -ref.current.offsetHeight) {
        setOffset(-(top * speed));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return (
    <div 
      ref={ref} 
      className={`relative overflow-hidden ${className}`}
    >
      <div
        style={{
          transform: `translateY(${offset}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
};

// Komponen untuk efek hover yang menarik
export const HoverEffect = ({ 
  children, 
  scale = 1.05, 
  rotate = 0, 
  translateY = 0,
  shadow = true,
  className = '',
  duration = 0.3
}) => {
  return (
    <div
      className={`transition-all duration-300 ${className}`}
      style={{
        transition: `transform ${duration}s ease, box-shadow ${duration}s ease`,
      }}
    >
      <div
        className="hover-container"
        style={{
          display: 'inline-block',
          transformOrigin: 'center center',
        }}
      >
        <div
          className="hover-inner"
          style={{
            transition: `transform ${duration}s ease, box-shadow ${duration}s ease`,
            transformOrigin: 'center center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = `scale(${scale}) rotate(${rotate}deg) translateY(${translateY}px)`;
            if (shadow) {
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) rotate(0deg) translateY(0)';
            if (shadow) {
              e.currentTarget.style.boxShadow = 'none';
            }
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

// Komponen untuk efek text typing
export const TypewriterEffect = ({ 
  text, 
  speed = 50, 
  delay = 0,
  className = '',
  onComplete = () => {}
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout;
    let currentIndex = 0;
    
    // Reset jika text berubah
    setDisplayText('');
    setIsComplete(false);
    
    // Delay awal sebelum memulai animasi
    const initialDelay = setTimeout(() => {
      // Fungsi untuk menambahkan karakter satu per satu
      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayText(prev => prev + text[currentIndex]);
          currentIndex++;
          timeout = setTimeout(typeNextChar, speed);
        } else {
          setIsComplete(true);
          onComplete();
        }
      };
      
      typeNextChar();
    }, delay);
    
    return () => {
      clearTimeout(initialDelay);
      clearTimeout(timeout);
    };
  }, [text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
};
