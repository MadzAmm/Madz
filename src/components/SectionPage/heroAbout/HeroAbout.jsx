import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react'; // <-- Tambahkan useState dan useEffect
import './heroAbout.scss';

// --- 🎨 PANEL KONTROL ANIMASI RESPONSIVE ---
const animationConfig = {
  mobile: {
    sapereX: ['5vw', '-30vw'],
    audeX: ['-80vw', '40vw'],
    causeX: ['-30vw', '40vw'],
  },
  tablet: {
    sapereX: ['-10vw', '-40vw'],
    audeX: ['-90vw', '30vw'],
    causeX: ['-30vw', '30vw'],
  },
  desktop: {
    sapereX: ['-10vw', '-50vw'],
    audeX: ['-116vw', '50vw'],
    causeX: ['-72vw', '50vw'],
  },
};

// --- Fungsi Helper untuk Breakpoint ---
const getBreakpoint = (width) => {
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

const HeroAbout = () => {
  // --- ✅ LOGIKA BREAKPOINT SEKARANG ADA DI SINI ---
  const [breakpoint, setBreakpoint] = useState(() =>
    getBreakpoint(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Dependensi kosong agar hanya berjalan sekali saat komponen dimuat

  // --- Sisa Komponen (Tidak ada yang berubah) ---
  const ref = useRef(null);
  const config = animationConfig[breakpoint];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const sapereX = useTransform(scrollYProgress, [0, 1], config.sapereX);
  const audeX = useTransform(scrollYProgress, [0, 1], config.audeX);
  const causeX = useTransform(scrollYProgress, [0, 1], config.causeX);

  return (
    <section>
      <div
        ref={ref}
        className='textContainer'>
        <motion.h2 style={{ x: sapereX }}>
          <span>Sa</span>pere
        </motion.h2>
        <motion.h1 style={{ x: audeX }}>aude</motion.h1>
        <motion.p
          className='cause'
          style={{ x: causeX }}>
          because the rulers only tolerate intellectuals who happy to simply
          “adorn our chains with flowers".
        </motion.p>
      </div>
    </section>
  );
};

export default HeroAbout;
