import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

/**
 * Komponen ini memberikan efek parallax yang halus dan snappy (seperti pegas).
 * @param {React.ReactNode} children - Komponen yang akan dibungkus.
 * @param {number} speed - Faktor kecepatan parallax.
 */
const SpringyParallaxBox = ({ children, speed = 100 }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // 1. Tetap gunakan useTransform untuk memetakan scroll ke rentang nilai posisi
  const yRange = useTransform(scrollYProgress, [0, 1], [-speed, speed]);

  // 2. Bungkus hasil useTransform dengan useSpring
  // Ini akan membuat nilai 'y' mengikuti targetnya (yRange) dengan efek pegas
  const y = useSpring(yRange, {
    stiffness: 400, // Kekakuan pegas (semakin tinggi, semakin cepat responsnya)
    damping: 90, // Redaman (semakin tinggi, semakin sedikit pantulannya)
    restDelta: 0.001,
  });

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative' }}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
};

export default SpringyParallaxBox;
