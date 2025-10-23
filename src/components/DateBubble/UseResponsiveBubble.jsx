import { useEffect, useState } from 'react';

export default function useResponsiveBubble(pageKey = 'default') {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);
  const [isTablet, setIsTablet] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 480);
      setIsTablet(width >= 480 && width < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const config = {
    //atur bubble homepage (pageKey=default)
    default: {
      position: isMobile
        ? { bottom: '2rem', right: '5rem' }
        : isTablet
        ? { top: '45%', right: '2rem' }
        : { top: '50%', right: '4rem', translateY: '-50%' },
      motionConfig: {
        xInput: [0, 0.1, 0.3, 0.7, 1],
        xOutput: isMobile
          ? [280, 50, 50, 280, 160]
          : isTablet
          ? [100, -100, -50, 50, -80]
          : [470, -400, 450, 500, 500],
        yInput: [0, 0.1, 0.3, 0.7, 1],
        yOutput: isMobile
          ? [780, 200, 500, 200, 430]
          : isTablet
          ? [250, 250, 220, 210, 260]
          : [300, 300, 200, 300, 190],
        scaleInput: [0, 0.1, 0.3, 0.7, 1],
        scaleOutput: isMobile
          ? [0.6, 0.8, 1.3, 1, 1]
          : isTablet
          ? [1, 0.9, 1.5, 0.9, 1]
          : [1, 0.5, 2, 1.5, 2],
      },
    },

    //atur bubble di about (pageKey=about)
    about: {
      position: isMobile
        ? { bottom: '5rem', right: '1rem' }
        : isTablet
        ? { top: '45%', right: '2rem' }
        : { top: '10%', right: '4rem', translateY: '-50%' },
      motionConfig: {
        xInput: [0, 0.1, 0.3, 0.7, 1], //persantase scroll
        xOutput: isMobile
          ? [0, 0, 0, 0, 0]
          : isTablet
          ? [100, -100, -50, 50, -80]
          : [100, -900, 50, -900, -180],
        yInput: [0, 0.1, 0.3, 1], //persantase scroll
        yOutput: isMobile
          ? [600, 200, 200, 200]
          : isTablet
          ? [250, 250, 220, 260]
          : [200, 150, 100, 140],
        scaleInput: [0, 0.1, 0.3, 0.7, 1], //persantase scroll
        scaleOutput: isMobile
          ? [0.8, 0.8, 0.8, 0.8, 0.8]
          : isTablet
          ? [1, 0.9, 1.5, 0.9, 1]
          : [1.5, 1, 2, 1, 1.2],
      },
    },

    contact: {
      position: isMobile
        ? { bottom: '5rem', right: '1rem' }
        : isTablet
        ? { top: '45%', right: '2rem' }
        : { top: '10%', right: '4rem', translateY: '-50%' },
      motionConfig: {
        xInput: [0, 0.1, 0.3, 0.7, 1], //persantase scroll
        xOutput: isMobile
          ? [0, -300, 0, 100, 0]
          : isTablet
          ? [100, -100, -50, 50, -80]
          : [-150, -900, -1000, -500, -80],
        yInput: [0, 0.1, 0.3, 1], //persantase scroll
        yOutput: isMobile
          ? [-500, -400, -300, -90]
          : isTablet
          ? [250, 250, 220, 260]
          : [100, 200, 400, 360],
        scaleInput: [0, 0.1, 0.3, 0.7, 1], //persantase scroll
        scaleOutput: isMobile
          ? [0.8, 0.8, 0.8, 0.8, 0.8]
          : isTablet
          ? [1, 0.9, 1.5, 0.9, 1]
          : [1, 0.5, 1.5, 0.5, 1],
      },
    },
    // Tambahkan konfigurasi untuk halaman lain di sini dengan tambahkan pageKey, pasang const { position, motionConfig } = useResponsiveBubble(misal'about'); di page masing-masing.
  };

  return config[pageKey] || config.default;
}
