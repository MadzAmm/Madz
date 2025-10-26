// import React, { useRef } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import './About.scss'; // Kita akan buat file SCSS ini

// // --- (1) GANTI DENGAN PATH GAMBAR ANDA ---
// // Anda bisa impor gambar Anda di sini

// // ===================================================================
// // Komponen Utama Halaman Tentang Saya
// // ===================================================================
// const About = () => {
//   // --- (2) LOGIC PARALLAX (Diambil dari ProjectPage) ---

//   // Logic untuk .parallax-section (Gambar Penuh)
//   const fullParallaxRef = useRef(null);
//   const { scrollYProgress: fullParallaxScroll } = useScroll({
//     target: fullParallaxRef,
//     offset: ['start end', 'end start'],
//   });
//   const fullParallaxY = useTransform(
//     fullParallaxScroll,
//     [0, 1],
//     ['-15%', '15%']
//   );

//   // Logic untuk .typography-section-reworked
//   const typographyRef = useRef(null);
//   const { scrollYProgress: typographyScroll } = useScroll({
//     target: typographyRef,
//     offset: ['start end', 'end start'],
//   });
//   const headingY = useTransform(typographyScroll, [0.2, 1], ['0%', '-100%']);
//   const paragraphY = useTransform(typographyScroll, [0.2, 1], ['0%', '-60%']);
//   const typographyImageY = useTransform(
//     typographyScroll,
//     [0, 1],
//     ['-20%', '20%']
//   );
//   // --- Akhir logic parallax ---

//   // --- (3) RENDER JSX (Struktur diambil dari ProjectPage) ---
//   return (
//     // Kita tidak perlu key atau animasi masuk/keluar di sini
//     <motion.div className='page-container about-page-container'>
//       {/* Kita HILANGKAN CustomCursor.
//         CSS akan mengaktifkan kursor normal kembali.
//       */}

//       {/* Bagian 1: Header (Replikasi .project-intro) */}
//       <section className='project-intro about-intro'>
//         <h1 className='project-title'>About Me</h1>
//         <div className='project-meta'>
//           {/* Ganti konten statis ini sesuai kebutuhan */}
//           <div>
//             <span>ROLE / FOCUS</span>
//             <p>Web Developer & Designer</p>
//           </div>
//           <div>
//             <span>BACKGROUND</span>
//             <p>Aqidah & Islamic Philosophy</p>
//           </div>
//           <div>
//             <span>LOCATION</span>
//             <p>Jakarta, Indonesia</p>
//           </div>
//         </div>
//       </section>

//       {/* Bagian 2: Gambar Parallax Penuh (Replikasi .parallax-section) */}
//       <section
//         ref={fullParallaxRef}
//         className='parallax-section'>
//         <div className='parallax-image-wrapper'>
//           <motion.img
//             src='/kampus.avif' // <-- Konten Statis
//             alt='Potret diri atau ruang kerja' // <-- Konten Statis
//             style={{ y: fullParallaxY, scale: 1.15 }}
//           />
//         </div>
//       </section>

//       {/* Kita HILANGKAN .content-showcase-section (frame putih).
//         Kita juga HILANGKAN .stacked-sections-container karena tidak perlu.
//       */}

//       {/* Bagian 3: Tipografi (Replikasi .typography-section-reworked) */}
//       <section
//         className='typography-section-reworked'
//         ref={typographyRef}>
//         <div className='typography-text-content'>
//           <motion.h2
//             className='typography-heading'
//             style={{ y: headingY }}
//             dangerouslySetInnerHTML={{
//               __html: 'My Philosophy:<br />Code & Clarity', // <-- Konten Statis
//             }}
//           />
//           <motion.p
//             className='typography-paragraph'
//             style={{ y: paragraphY }}>
//             {/* <-- Konten Statis */}
//             My background in philosophy teaches me to dissect complex problems
//             and find logical, ethical, and structured solutions. I approach
//             every project by asking the 'right' questions to build interfaces
//             that are not only beautiful but also intuitive and meaningful.
//           </motion.p>
//         </div>
//         <div className='typography-image-container'>
//           <div className='typography-parallax-image'>
//             <motion.img
//               src='/mjas.avif' // <-- Konten Statis
//               alt='Detail pekerjaan atau hobi' // <-- Konten Statis
//               style={{ y: typographyImageY }}
//             />
//           </div>
//         </div>
//       </section>

//       {/* Kita HILANGKAN .next-project-section.
//        */}
//     </motion.div>
//   );
// };

// export default About;

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
// import Lottie from 'lottie-react'; // Impor Lottie
// import globeAnimation from '../../assets/globe-animation.json'; // Lokasi file Lottie Anda
import './About.scss';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const openVariants = {
  open: { transition: { staggerChildren: 0.1 } },
  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};
const itemVariants = {
  open: { y: 0, opacity: 1 },
  closed: { y: 200, opacity: 0 },
};

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

  return (
    <motion.div
      className='page-container about-page-container'
      variants={openVariants}
      initial='closed'
      animate='open'>
      {/* Bagian 1: Header (Replikasi .project-intro) */}
      <motion.section
        className='project-intro about-intro'
        variants={itemVariants}>
        <h1 className='project-title'>About Me</h1>
        <div className='project-meta'>
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
      </motion.section>

      {/* Bagian 2: Gambar Parallax Penuh (Replikasi .parallax-section) */}
      <motion.section
        variants={itemVariants}
        ref={fullParallaxRef}
        className='parallax-section'>
        <div className='parallax-image-wrapper'>
          <motion.img
            src='/kampus.avif' // <-- Ganti dengan gambar Anda
            alt='Potret diri atau ruang kerja'
            style={{ y: fullParallaxY, scale: 1.15 }}
          />
        </div>
      </motion.section>

      {/* ========================================================= */}
      {/* BAGIAN BARU: SERVICES SECTION (di bawah gambar pertama) */}
      {/* ========================================================= */}
      <section className='services-section'>
        <div className='services-header'>
          <h2 className='section-title'>I can help you with ...</h2>
        </div>
        <div className='services-grid'>
          <div className='service-item'>
            <span className='service-number'>01</span>
            <h3 className='service-name'>Design</h3>
            <p className='service-description'>
              With a solid track record in designing websites, I deliver strong
              and user-friendly digital designs. (Since 2024 only in combination
              with development)
            </p>
            {/* Tambahkan ikon di sini jika ada */}
          </div>
          <div className='service-item'>
            <span className='service-number'>02</span>
            <h3 className='service-name'>Development</h3>
            <p className='service-description'>
              I build scalable websites from scratch that fit seamlessly with
              design. My focus is on micro animations, transitions and
              interaction. Building with Webflow (or Kirby CMS).
            </p>
            {/* Tambahkan ikon di sini jika ada */}
          </div>
          <div className='service-item'>
            <span className='service-number'>03</span>
            <h3 className='service-name'>The full package</h3>
            <p className='service-description'>
              A complete website from concept to implementation, that's what
              makes me stand out. My great sense for design and my development
              skills enable me to create kick-ass projects.
            </p>
            {/* Tambahkan ikon di sini jika ada */}

            {/* Contoh SVG icon */}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* Bagian 3: Tipografi (Gambar di kiri, Teks di kanan, dengan Lottie) */}
      {/* ========================================================= */}
      <section
        className='typography-section-reworked'
        ref={typographyRef}>
        {/* Gambar Tipografi (Sekarang di kiri) */}
        <div className='typography-image-container'>
          <div className='typography-parallax-image'>
            <motion.img
              src='/mjas.avif' // <-- Ganti dengan gambar Anda
              alt='Detail pekerjaan atau hobi'
              style={{ y: typographyImageY }}
            />
          </div>
        </div>

        {/* Konten Teks Tipografi (Sekarang di kanan) */}
        <div className='typography-text-content'>
          {/* Lottie Globe Animation */}
          <div
            className='lottie-globe-wrapper'
            style={{ y: headingY }}>
            <DotLottieReact
              src='/starGlobe.json'
              loop
              autoplay
            />
            {/* <Lottie
              animationData={globeAnimation}
              loop={true}
              className='lottie-globe'
            /> */}
          </div>

          <motion.h2
            className='typography-heading'
            style={{ y: headingY }}
            dangerouslySetInnerHTML={{
              __html: 'My Philosophy:<br />Code & Clarity',
            }}
          />
          <motion.p
            className='typography-paragraph'
            style={{ y: paragraphY }}>
            My background in philosophy teaches me to dissect complex problems
            and find logical, ethical, and structured solutions. I approach
            every project by asking the 'right' questions to build interfaces
            that are not only beautiful but also intuitive and meaningful.
          </motion.p>
        </div>
      </section>

      {/* Bagian selanjutnya (misal footer atau next project) bisa diletakkan di sini */}
    </motion.div>
  );
};

export default About;
