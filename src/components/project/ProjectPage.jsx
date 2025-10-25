import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import './ProjectPage.scss'; // Menggunakan SCSS

// --- (1) IMPORT BARU ---
import { useParams, useNavigate } from 'react-router-dom';
import { MasterData } from '../../data/MasterData'; // <-- Sesuaikan path ke masterData

// ===================================================================
// Kursor Kustom (Tidak ada perubahan)
// ===================================================================
const CustomCursor = ({ variant }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  const variants = {
    default: {
      height: 25,
      width: 25,
      backgroundColor: 'white',
      mixBlendMode: 'difference',
      transition: { type: 'spring', stiffness: 500, damping: 28 },
    },
    hover: {
      height: 120,
      width: 120,
      backgroundColor: '#0041c2',
      mixBlendMode: 'normal',
      transition: { type: 'spring', stiffness: 400, damping: 25 },
    },
  };

  return (
    <motion.div
      className='custom-cursor'
      variants={variants}
      animate={variant}
      style={{ left: mousePosition.x, top: mousePosition.y }}>
      <AnimatePresence>
        {variant === 'hover' && (
          <motion.span
            className='cursor-text'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.1 } }}
            exit={{ opacity: 0 }}>
            Next
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ===================================================================
// Komponen Parallax Gambar (Tidak ada perubahan)
// ===================================================================
const ContentParallaxImage = ({
  src,
  alt,
  offset = ['start end', 'end start'],
  speed = 0.1,
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset,
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${speed * 100}%`, `${speed * 100}%`]
  );

  return (
    <div
      className='content-parallax-wrapper'
      ref={ref}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        onContextMenu={(e) => e.preventDefault()} // Mencegah klik kanan
        onDragStart={(e) => e.preventDefault()} // Mencegah drag
        draggable='false' //mencegah drag di beberapa browser yang berbasis webkit (chrome, safari)
        className='content-parallax-image'
      />
    </div>
  );
};

// ===================================================================
// Komponen Utama Halaman Proyek (DINAMIS)
// ===================================================================
const ProjectPage = () => {
  const [cursorVariant, setCursorVariant] = useState('default');

  // --- (2) AMBIL DATA DINAMIS ---
  const { projectId } = useParams(); // Ambil ID dari URL (misal: "1", "12")
  const navigate = useNavigate();

  // Cari proyek saat ini berdasarkan ID.
  // Gunakan parseInt karena ID di URL adalah string.
  const project = MasterData.find((p) => p.id === parseInt(projectId));

  // Cari proyek BERIKUTNYA untuk link "Next Case".
  // Temukan index proyek saat ini.
  const currentIndex = MasterData.findIndex(
    (p) => p.id === parseInt(projectId)
  );
  let nextProject = null;
  // Pastikan currentIndex valid sebelum mencari nextProject
  if (currentIndex !== -1) {
    // Gunakan modulo (%) agar kembali ke awal jika sudah di akhir array.
    nextProject = MasterData[(currentIndex + 1) % MasterData.length];
  }

  // --- (3) PERSIAPAN SCROLL & ANIMASI (Tidak ada perubahan) ---
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

  const cardWalletVariants = {
    rest: {
      y: 120,
      scale: 0.95,
      transition: { type: 'tween', ease: 'easeOut', duration: 0.4 },
    },
    hover: {
      y: 40,
      scale: 1,
      transition: { type: 'spring', stiffness: 250, damping: 30 },
    },
  };

  const titleVariants = {
    rest: {
      opacity: 1,
      transition: { type: 'tween', ease: 'easeOut', duration: 0.4 },
    },
    hover: {
      opacity: 0.2,
      transition: { type: 'tween', ease: 'easeIn', duration: 0.3 },
    },
  };

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
  // --- Akhir persiapan scroll ---

  // --- (4) PENANGANAN JIKA PROYEK TIDAK DITEMUKAN ---
  useEffect(() => {
    // Jika 'project' tidak ditemukan (ID salah) ATAU 'nextProject' tidak ditemukan (seharusnya tidak terjadi dengan modulo, tapi jaga-jaga)
    if (!project || !nextProject) {
      console.error(`Project with ID ${projectId} not found.`); // Log error
      // Tunggu sebentar lalu redirect
      const timer = setTimeout(() => {
        navigate('/portfolio', { replace: true }); // replace: true agar tidak masuk history
      }, 1500); // Redirect setelah 1.5 detik

      // Cleanup timer jika komponen unmount sebelum timeout
      return () => clearTimeout(timer);
    }
  }, [project, nextProject, projectId, navigate]);

  // Jika data belum siap (misal ID salah dan sedang menunggu redirect)
  if (!project || !nextProject) {
    return (
      <div
        className='page-container'
        style={{
          padding: '5rem',
          textAlign: 'center',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <h1>Loading Project...</h1>
        <p>If you see this for too long, the project might not exist.</p>
        <p>Redirecting back shortly...</p>
      </div>
    );
  }

  // --- (5) RENDER JSX DINAMIS ---
  return (
    // Gunakan key unik agar Framer Motion mendeteksi perubahan halaman
    <motion.div
      key={project.id} // <-- Tambahkan key di sini
      className='page-container'
      initial={{ opacity: 0 }} // Animasi masuk halaman
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} // Animasi keluar halaman
      transition={{ duration: 0.5 }}>
      <CustomCursor variant={cursorVariant} />

      {/* Bagian 1: Header Proyek (DINAMIS) */}
      <section className='project-intro'>
        <h1 className='project-title'>{project.title}</h1>
        <div className='project-meta'>
          <div>
            <span>ROLE / SERVICES</span>
            <p>{project.category.join(' & ')}</p>
          </div>
          <div>
            <span>CREDITS</span>
            <p>Owned By: {project.company}</p>
          </div>
          <div>
            <span>LOCATION & YEAR</span>
            <p>
              {project.place} © {project.year}
            </p>
          </div>
        </div>
      </section>

      {/* Bagian 2: Gambar Parallax Pertama (DINAMIS) */}
      <section
        ref={fullParallaxRef}
        className='parallax-section'>
        <div className='parallax-image-wrapper'>
          <motion.img
            src={project.heroImage} // <-- DINAMIS
            alt={project.title} // <-- DINAMIS
            style={{ y: fullParallaxY, scale: 1.15 }}
            onContextMenu={(e) => e.preventDefault()} // Mencegah klik kanan
            onDragStart={(e) => e.preventDefault()} // Mencegah drag
            draggable='false' //mencegah drag di beberapa browser yang berbasis webkit (chrome, safari)
          />
        </div>
      </section>

      {/* Bagian 3: Showcase Frame Putih (DINAMIS) */}
      <section className='content-showcase-section'>
        <div className='showcase-frame'>
          <header className='frame-header'>
            <div className='frame-logo'>© 마드잠</div> {/* Ganti jika perlu */}
            <div className='frame-nav'>
              {/* Ambil kategori pertama atau default */}
              <span>{(project.category[0] || 'Project').toUpperCase()}</span>
              <span>{project.year}</span> {/* <-- DINAMIS */}
              <div className='frame-menu-icon'>
                <span></span>
                <span></span>
              </div>
            </div>
          </header>
          <div className='frame-content'>
            <ContentParallaxImage
              src={project.detailImage1} // <-- DINAMIS
              alt={`${project.title} detail`} // <-- DINAMIS
              speed={0.1}
            />
          </div>
          <footer className='frame-footer'>
            {/* Menggunakan dangerouslySetInnerHTML untuk memproses <br /> */}
            <h3
              className='footer-title'
              dangerouslySetInnerHTML={{
                __html: project.tagline.toUpperCase(),
              }} // <-- DINAMIS
            />
            <div className='footer-partner'>
              <span>Sapere aude</span> {/* Ganti jika perlu */}
            </div>
          </footer>
        </div>
      </section>

      {/* Container untuk menumpuk dua section terakhir */}
      <div className='stacked-sections-container'>
        {/* Bagian 4: Tipografi (DINAMIS) */}
        <section
          className='typography-section-reworked'
          ref={typographyRef}>
          <div className='typography-text-content'>
            <motion.h2
              className='typography-heading'
              style={{ y: headingY }}
              dangerouslySetInnerHTML={{ __html: project.descriptionTitle }} // <-- DINAMIS
            />
            <motion.p
              className='typography-paragraph'
              style={{ y: paragraphY }}>
              {project.descriptionBody} {/* <-- DINAMIS */}
            </motion.p>
          </div>
          <div className='typography-image-container'>
            <div className='typography-parallax-image'>
              <motion.img
                src={project.detailImage2} // <-- DINAMIS
                alt={`${project.title} mood`} // <-- DINAMIS
                style={{ y: typographyImageY }}
                onContextMenu={(e) => e.preventDefault()} // Mencegah klik kanan
                onDragStart={(e) => e.preventDefault()} // Mencegah drag
                draggable='false' //mencegah drag di beberapa browser yang berbasis webkit (chrome, safari)
              />
            </div>
          </div>
        </section>

        {/* Bagian 5: Proyek Berikutnya (DINAMIS) */}
        <section className='next-project-section'>
          {/* Menggunakan onClick + navigate untuk SPA navigation yang lebih baik */}
          <motion.div // Mengganti <a> dengan <div> atau elemen non-link
            // Hapus href
            className='next-project-link' // Tetap gunakan class untuk styling
            onClick={() => navigate(`/project/${nextProject.id}`)} // <-- DINAMIS
            style={{ cursor: 'pointer' }} // Tambahkan pointer cursor
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            initial='rest'
            whileHover='hover'
            animate='rest'>
            <div className='next-project-content'>
              <span>Next Project</span>
              <motion.h2 variants={titleVariants}>
                {nextProject.title} {/* <-- DINAMIS */}
              </motion.h2>
              <div className='card-animation-wrapper'>
                <motion.div
                  className='next-project-card-frame'
                  variants={cardWalletVariants}>
                  <div className='card-frame-content'>
                    <img
                      src={nextProject.imageUrl} // <-- DINAMIS (Gunakan imageUrl list)
                      alt={`${nextProject.title} Preview`} // <-- DINAMIS
                      onContextMenu={(e) => e.preventDefault()} // Mencegah klik kanan
                      onDragStart={(e) => e.preventDefault()} // Mencegah drag
                      draggable='false' //mencegah drag di beberapa browser yang berbasis webkit (chrome, safari)
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>{' '}
          {/* Tutup motion.div pengganti <a> */}
        </section>
      </div>
    </motion.div> // Tutup motion.div utama dengan key
  );
};

export default ProjectPage;
