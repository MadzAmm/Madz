import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const AnimateInteractiveText = ({
  children,
  className,
  as: Tag = 'div',
  // --- PROPS BARU UNTUK WARNA ---
  initialColor = '#033b54', // Warna default saat teks terlihat
  hoverColor = 'cadetblue', // Warna default saat di-hover
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const text = children;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02 },
    },
    hover: {
      transition: { staggerChildren: 0.03 },
    },
  };

  // --- VARIAN PINDAH KE DALAM FUNGSI KOMPONEN ---
  // Agar bisa mengakses props 'initialColor' dan 'hoverColor'
  const letterVariants = {
    hidden: { opacity: 0, y: '100%' },
    visible: {
      opacity: 1,
      color: initialColor, // Menggunakan prop initialColor
      y: '0',
      transition: { ease: 'easeOut', duration: 0.1 },
    },
    hover: {
      y: -5,
      color: hoverColor, // Menggunakan prop hoverColor
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
        duration: 0.3,
      },
    },
  };

  return (
    <Tag
      ref={ref}
      className={className}>
      <motion.span
        style={{
          display: 'inline-block',
          overflow: 'hidden',
          cursor: 'pointer',
          paddingTop: '10px',
        }}
        variants={containerVariants}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
        whileHover='hover'>
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            style={{ display: 'inline-block' }}>
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
};
