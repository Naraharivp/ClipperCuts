'use client';

import { useEffect } from 'react';

const ScrollAnimation = () => {
  useEffect(() => {
    // Function to check if an element is in viewport
    const isInViewport = (element) => {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
      );
    };

    // Function to handle scroll and reveal elements
    const handleScroll = () => {
      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach((element) => {
        if (isInViewport(element)) {
          element.classList.add('active');
        }
      });
    };

    // Initial check and add event listener
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null; // This component doesn't render anything
};

export default ScrollAnimation;
