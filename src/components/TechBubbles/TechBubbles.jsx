// import React, { useRef, useEffect } from 'react';
// import { motion, useAnimationControls } from 'framer-motion';

// // --- Data untuk logo dan ukuran bubble ---
// const techLogos = [
//   { src: '/logos/react.svg', size: 180 },
//   { src: '/logos/figma.svg', size: 130 },
//   { src: '/logos/framer.svg', size: 110 },
//   { src: '/logos/nodejs.svg', size: 200 },
//   { src: '/logos/javascript.svg', size: 100 },
//   { src: '/logos/typescript.svg', size: 160 },
//   { src: '/logos/vite.svg', size: 140 },
//   { src: '/logos/nextjs.svg', size: 220 },
// ];

// // --- Komponen untuk satu bubble ---
// const Bubble = ({ src, size, boundaryRef }) => {
//   const controls = useAnimationControls();
//   const initialX = useRef(Math.random() * 500);
//   const initialY = useRef(Math.random() * 200);

//   // Fungsi untuk gerakan mengambang (float)
//   const startFloating = () => {
//     if (!boundaryRef.current) return;
//     const { width, height } = boundaryRef.current.getBoundingClientRect();

//     controls.start({
//       x: Math.random() * (width - size),
//       y: Math.random() * (height - size),
//       transition: {
//         duration: Math.random() * 7 + 8, // Durasi acak antara 8-15 detik
//         ease: 'easeInOut',
//         repeat: Infinity,
//         repeatType: 'mirror',
//       },
//     });
//   };

//   // Fungsi untuk gerakan memantul (bounce) yang lebih natural
//   const triggerBounce = () => {
//     if (!boundaryRef.current) return;
//     const { width, height } = boundaryRef.current.getBoundingClientRect();

//     // Hanya bergerak ke satu titik acak baru
//     const newX = Math.random() * (width - size);
//     const newY = Math.random() * (height - size);

//     controls
//       .start({
//         x: newX,
//         y: newY,
//         transition: {
//           // Menggunakan fisika spring yang lebih lembut
//           type: 'spring',
//           stiffness: 150, // Kekakuan dikurangi (lebih lembut)
//           damping: 30, // Redaman ditambah (lebih tenang)
//         },
//       })
//       .then(startFloating); // Setelah selesai, kembali mengambang
//   };

//   useEffect(() => {
//     const timer = setTimeout(startFloating, Math.random() * 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <motion.div
//       style={{
//         ...styles.bubble,
//         width: size,
//         height: size,
//       }}
//       initial={{ x: initialX.current, y: initialY.current }}
//       animate={controls}
//       onMouseEnter={triggerBounce}>
//       <img
//         src={src}
//         alt='tech logo'
//         style={styles.logo}
//       />
//     </motion.div>
//   );
// };

// // --- Komponen Utama ---
// const TechBubbles = () => {
//   const containerRef = useRef(null);

//   return (
//     <section style={styles.mainContainer}>
//       <h2 style={styles.title}>Tools and Technologies</h2>
//       <div
//         ref={containerRef}
//         style={styles.bubbleArea}>
//         {techLogos.map((tech, index) => (
//           <Bubble
//             key={index}
//             src={tech.src}
//             size={tech.size}
//             boundaryRef={containerRef}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// // --- Styling dengan perbaikan posisi title ---
// const styles = {
//   mainContainer: {
//     width: '100%',
//     minHeight: '100vh',
//     backgroundColor: 'rgb(255, 178, 97)',
//     display: 'flex',
//     alignItems: 'flex-end',
//     position: 'relative',
//     overflow: 'hidden',
//   },
//   title: {
//     position: 'absolute',
//     bottom: '100px', // Posisi vertikal disesuaikan
//     left: '100px', // Diubah menjadi positif agar terlihat
//     transform: 'rotate(-45deg)',
//     transformOrigin: 'bottom left',
//     fontSize: '50px',
//     fontWeight: 'bold',
//     color: '#FF4D4D',
//     letterSpacing: '2px',
//     textTransform: 'uppercase',
//   },
//   bubbleArea: {
//     width: '100%',
//     height: '100%',
//     position: 'absolute',
//   },
//   bubble: {
//     position: 'absolute',
//     backgroundColor: 'white',
//     borderRadius: '50%',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
//     cursor: 'pointer',
//   },
//   logo: {
//     maxWidth: '60%',
//     maxHeight: '60%',
//     userSelect: 'none',
//   },
// };

// export default TechBubbles;

import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

// --- Custom Hook untuk Mendeteksi Ukuran Layar (Stabil) ---
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: null,
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

const allTechLogos = [
  { src: 'illustrator.png', size: 180 },
  { src: 'python.png', size: 130 },
  { src: 'js.avif', size: 110 },
  { src: 'word.png', size: 200 },
  { src: 'react.png', size: 100 },
  { src: 'excel.png', size: 160 },
  { src: 'photoshop.png', size: 140 },
  { src: 'ppt.png', size: 220 },
];

const Bubble = ({ src, size, boundaryRef }) => {
  const controls = useAnimationControls();

  const startFloating = () => {
    if (!boundaryRef.current) return;
    const { width, height } = boundaryRef.current.getBoundingClientRect();

    controls.start({
      x: Math.random() * (width - size),
      y: Math.random() * (height - size),
      transition: {
        duration: Math.random() * 7 + 8,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'mirror',
      },
    });
  };

  const triggerBounce = () => {
    if (!boundaryRef.current) return;
    const { width, height } = boundaryRef.current.getBoundingClientRect();
    const newX = Math.random() * (width - size);
    const newY = Math.random() * (height - size);

    controls
      .start({
        x: newX,
        y: newY,
        transition: {
          type: 'spring',
          stiffness: 150,
          damping: 30,
        },
      })
      .then(startFloating);
  };

  useEffect(() => {
    if (!boundaryRef.current) return;
    const { width, height } = boundaryRef.current.getBoundingClientRect();

    const initialX = Math.random() * (width - size);
    const initialY = Math.random() * (height - size);

    controls.set({ x: initialX, y: initialY });
    startFloating();
  }, []);

  return (
    <motion.div
      style={{
        ...styles.bubble,
        width: size,
        height: size,
      }}
      animate={controls}
      onMouseEnter={triggerBounce}>
      <img
        src={src}
        alt='tech logo'
        style={styles.logo}
      />
    </motion.div>
  );
};

const TechBubbles = () => {
  const containerRef = useRef(null);
  const { width } = useWindowSize();

  // KUNCI UTAMA: Tunda render sampai ukuran layar diketahui
  if (width === null) {
    return <section style={styles.mainContainer} />;
  }

  const isMobile = width <= 768;

  const techLogos = isMobile
    ? allTechLogos
        .slice(0, 8)
        .map((logo) => ({ ...logo, size: logo.size * 0.7 }))
    : allTechLogos;

  const titleStyle = isMobile
    ? { ...styles.title, ...styles.mobileTitle }
    : styles.title;

  return (
    <section style={styles.mainContainer}>
      <h2 style={titleStyle}>Tools and Technologies</h2>
      <div
        ref={containerRef}
        style={styles.bubbleArea}>
        {techLogos.map((tech, index) => (
          <Bubble
            key={index}
            src={tech.src}
            size={tech.size}
            boundaryRef={containerRef}
          />
        ))}
      </div>
    </section>
  );
};

// Styling
const styles = {
  mainContainer: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: 'rgb(255, 178, 97)',
    display: 'flex',
    alignItems: 'flex-end',
    position: 'relative',
    overflow: 'hidden',
  },
  title: {
    position: 'absolute',
    bottom: '100px',
    left: '100px',
    transform: 'rotate(-90deg)',
    transformOrigin: 'bottom left',
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#FF4D4D',
    letterSpacing: '2px',
    borderBottom: '1px solid #EAE0D4',
    textTransform: 'uppercase',
    transition: 'all 0.3s ease-in-out',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '0.5px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '25px',
    padding: '20px',
    boxShadow: '-8px  0px 20px rgba(0, 0, 0, 0.08)',
  },
  mobileTitle: {
    bottom: '40px',
    left: '20px',
    transform: 'none',
    fontSize: '32px',
  },
  bubbleArea: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  bubble: {
    position: 'absolute',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '0.5px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
    cursor: 'pointer',
  },
  logo: {
    maxWidth: '60%',
    maxHeight: '60%',
    userSelect: 'none',
  },
};

export default TechBubbles;
