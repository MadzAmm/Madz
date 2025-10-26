import { useScroll } from 'framer-motion';
import { useRef, React, useState, useEffect } from 'react';
import PageTransition from './PageTransition';
import DateBubble from '../components/DateBubble/DateBubble';
import LiquidGlass from '../components/LiquidGlass/LiquidGlass';
import ProjectPage from '../components/project/ProjectPage';
import { useNavigate } from 'react-router-dom';
import './pages.scss';

/**
 * Hook kustom untuk mengecek media query secara dinamis.
 * @param {string} query - String media query (mis: '(max-width: 768px)')
 * @returns {boolean} - True jika query cocok, false jika tidak.
 */
function useMediaQuery(query) {
  // 1. Dapatkan nilai awal saat komponen dimuat
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    // 2. Buat fungsi listener untuk update state saat layar berubah
    const handleChange = (event) => {
      setMatches(event.matches);
    };

    // 3. Daftarkan listener
    // 'addEventListener' adalah cara baru, 'addListener' adalah fallback
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleChange);
    } else {
      mediaQueryList.addListener(handleChange);
    }

    // 4. Bersihkan listener saat komponen di-unmount
    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', handleChange);
      } else {
        mediaQueryList.removeListener(handleChange);
      }
    };
  }, [query]); // Efek ini akan dijalankan ulang jika string query berubah

  return matches;
}

const sectionStyle = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  padding: '2rem',
  textAlign: 'center',
  fontSize: 'clamp(1.5rem, 5vw, 3rem)',
};

export default function ServicesPage() {
  const navigate = useNavigate();
  // 1. Ganti nama 'ref' menjadi 'scrollRef' agar lebih deskriptif
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });

  // 2. Perbaiki sintaks useRef. 'pageWrapper' akan menjadi container mouse
  const pageWrapperRef = useRef(null);

  const isMobile = useMediaQuery('(max-width: 768px)');

  // Objek konfigurasi Anda (tidak perlu diubah)
  const landingPageWaveConfig = {
    initialY: { desktop: 0, tablet: -50, mobile: 0 },
    finalY: { desktop: -300, tablet: -220, mobile: -150 },
    topWave: {
      wavePreset: { desktop: 'energetic', tablet: 'default', mobile: 'calm' },
      controlPoints: {
        desktop: [120, 0, 150, 0, 150, 120],
        tablet: [100, 150, 50, 150, 100],
        mobile: [100, 130, 100],
      },
    },
    bottomWave: {
      wavePreset: { desktop: 'calm', tablet: 'calm', mobile: 'calm' },
      controlPoints: {
        desktop: [1000, 220, 180],
        tablet: [190, 210, 190],
        mobile: [180, 210, 180],
      },
    },
    springConfig: { stiffness: 70, damping: 30 },
  };

  return (
    <PageTransition label='Project'>
      {/* 'pageWrapper' sekarang menjadi area scroll DAN area pelacakan mouse */}
      <div
        className='pageWrapper'
        ref={pageWrapperRef} // Gunakan ref ini untuk mouse container
        style={{ position: 'relative' }} // Dibutuhkan agar elemen di dalamnya bisa diposisikan
      >
        <DateBubble
          mode='custom'
          motionConfig={{
            xInput: [0, 0.5, 1],
            xOutput: [1000, 0, 10000],
            yInput: [0, 0.5, 1],
            yOutput: [-200, -300, -400],
            scaleInput: [0, 0.5, 1],
            scaleOutput: [1, 1.4, 1],
          }}
          customStages={[
            { range: [0, 0.3], text: 'Our Services' },
            { range: [0.3, 0.6], text: 'Solutions' },
            { range: [0.6, 1], text: 'Support' },
          ]}
          position={{ top: '35%', left: '2rem' }}
        />

        {/* 3. BUAT RENDER BERSYARAT
          Ini artinya: "HANYA render LiquidGlass jika 'isMobile' bernilai 'false'"
        */}
        {!isMobile && (
          <LiquidGlass
            mouseContainer={pageWrapperRef}
            elasticity={0.5}
            mode={'prominent'}
            displacementScale={20}
            blurAmount={0}
            saturation={100}
            aberrationIntensity={10}
            cornerRadius={50}
            overLight={false}
            onClick={() => navigate('/Portfolio')}
            style={{
              position: 'fixed',
              boxSizing: 'border-box',
              bottom: '0',
              left: '50%',
              top: '80%',
              zIndex: 10,
            }}>
            <div
              className='p-6'
              style={{ textAlign: 'center' }}>
              <h1
                style={{
                  fontSize: 'clamp(0.6rem, 1rem + 4vw, 2.6rem)',
                }}>
                All Project
              </h1>
              <p
                style={{
                  fontSize: 'clamp(0.8rem, 0.7rem + 2vw, 1rem)',
                  maxWidth: '400px',
                }}>
                Driving growth and engagement through data-driven strategies.
              </p>
            </div>
          </LiquidGlass>
        )}
        <ProjectPage />
      </div>
    </PageTransition>
  );
}
