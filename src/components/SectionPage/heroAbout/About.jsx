import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './About.scss'; // Kita akan buat file SCSS ini

// --- (1) GANTI DENGAN PATH GAMBAR ANDA ---
// Anda bisa impor gambar Anda di sini
import { MasterData } from '../../data/MasterData';

// ===================================================================
// Komponen Utama Halaman Tentang Saya
// ===================================================================
const About = () => {
  // --- (2) LOGIC PARALLAX (Diambil dari ProjectPage) ---

  // Logic untuk .parallax-section (Gambar Penuh)
  const fullParallaxRef = useRef(null);
  const { scrollYProgress: fullParallaxScroll } = useScroll({
    target: fullParallaxRef,
    offset: ['start end', 'end start'],
  });
  const fullParallaxY = useTransform(
    fullParallaxScroll,
    [0, 1],
    ['-15%', '15%']
  );

  // Logic untuk .typography-section-reworked
  const typographyRef = useRef(null);
  const { scrollYProgress: typographyScroll } = useScroll({
    target: typographyRef,
    offset: ['start end', 'end start'],
  });
  const headingY = useTransform(typographyScroll, [0.2, 1], ['0%', '-100%']);
  const paragraphY = useTransform(typographyScroll, [0.2, 1], ['0%', '-60%']);
  const typographyImageY = useTransform(
    typographyScroll,
    [0, 1],
    ['-20%', '20%']
  );
  // --- Akhir logic parallax ---

  // --- (3) RENDER JSX (Struktur diambil dari ProjectPage) ---
  return (
    // Kita tidak perlu key atau animasi masuk/keluar di sini
    <motion.div className='page-container about-page-container'>
      {/* Kita HILANGKAN CustomCursor. 
        CSS akan mengaktifkan kursor normal kembali.
      */}

      {/* Bagian 1: Header (Replikasi .project-intro) */}
      <section className='project-intro about-intro'>
        <h1 className='project-title'>About Me</h1>
        <div className='project-meta'>
          {/* Ganti konten statis ini sesuai kebutuhan */}
          <div>
            <span>ROLE / FOCUS</span>
            <p>Web Developer & Designer</p>
          </div>
          <div>
            <span>BACKGROUND</span>
            <p>Aqidah & Islamic Philosophy</p>
          </div>
          <div>
            <span>LOCATION</span>
            <p>Jakarta, Indonesia</p>
          </div>
        </div>
      </section>

      {/* Bagian 2: Gambar Parallax Penuh (Replikasi .parallax-section) */}
      <section
        ref={fullParallaxRef}
        className='parallax-section'>
        <div className='parallax-image-wrapper'>
          <motion.img
            src={aboutHeroImage} // <-- Konten Statis
            alt='Potret diri atau ruang kerja' // <-- Konten Statis
            style={{ y: fullParallaxY, scale: 1.15 }}
          />
        </div>
      </section>

      {/* Kita HILANGKAN .content-showcase-section (frame putih).
        Kita juga HILANGKAN .stacked-sections-container karena tidak perlu.
      */}

      {/* Bagian 3: Tipografi (Replikasi .typography-section-reworked) */}
      <section
        className='typography-section-reworked'
        ref={typographyRef}>
        <div className='typography-text-content'>
          <motion.h2
            className='typography-heading'
            style={{ y: headingY }}
            dangerouslySetInnerHTML={{
              __html: 'My Philosophy:<br />Code & Clarity', // <-- Konten Statis
            }}
          />
          <motion.p
            className='typography-paragraph'
            style={{ y: paragraphY }}>
            {/* <-- Konten Statis */}
            My background in philosophy teaches me to dissect complex problems
            and find logical, ethical, and structured solutions. I approach
            every project by asking the 'right' questions to build interfaces
            that are not only beautiful but also intuitive and meaningful.
          </motion.p>
        </div>
        <div className='typography-image-container'>
          <div className='typography-parallax-image'>
            <motion.img
              src={aboutDetailImage} // <-- Konten Statis
              alt='Detail pekerjaan atau hobi' // <-- Konten Statis
              style={{ y: typographyImageY }}
            />
          </div>
        </div>
      </section>

      {/* Kita HILANGKAN .next-project-section.
       */}
    </motion.div>
  );
};

export default About;
