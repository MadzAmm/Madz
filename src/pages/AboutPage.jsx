import { useRef } from 'react';
import { useScroll, useMotionValue } from 'framer-motion';
import PageTransition from './PageTransition';
import DateBubble from '../components/DateBubble/DateBubble';
import HeroAbout from '../components/SectionPage/heroAbout/HeroAbout';
import { useNavigate } from 'react-router-dom';
import useResponsiveBubble from '../components/DateBubble/UseResponsiveBubble';
import StickyTextMerge from '../components/SectionPage/coba/StickyTextMerge';
import { ParallaxScroller } from '../components/SectionPage/coba/ParallaxScroller';
import ContactSection from '.././components/ContactSection/ContactSection';
import Footer from '../components/hero/footer/Footer';
import './AboutPage.scss';
import CoachingApproach from '../components/CoachingApproach/CoachingApproach';
import TechBubbles from '../components/TechBubbles/TechBubbles';

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
export default function AboutPage() {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const { position, motionConfig } = useResponsiveBubble('about'); //key untuk terintegrasi dengan UseResponsive

  //kalau Svg Parallaxnya manual (bisa gunakan state, )
  const controlY = useMotionValue(40);
  const y = useMotionValue(0);

  return (
    <PageTransition label='About'>
      <div
        className='pageWrapper'
        ref={ref}>
        <HeroAbout />
        <StickyTextMerge />
        <div className='coaching-container'>
          <CoachingApproach />
        </div>
        <div className='parallax-wrapper'>
          <ParallaxScroller>
            {/* Section 1 (Tidak interaktif) */}
            {/* <div
              className='bridge'
              height={50} // Beri prop 'height' agar scroller tahu durasinya
              style={{
                ...sectionStyle,
                height: '20vh',
              }}></div> */}

            {/* Section 2 (INTERAKTIF) */}
            <div
              className='tech'
              height={100} // Beri prop 'height' yang lebih besar agar durasi scroll lebih lama
              interactive='true' // <-- TAMBAHKAN PROP INI
              style={{
                ...sectionStyle,
                background: 'rgb(255, 178, 97)',
                marginTop: '-200px',
                boxShadow: '0 20px 20px rgba(0,0,0,0.2)',
              }}>
              {/* Karena parent-nya (div ini) sudah diatur interaktif oleh Section,
        maka TechBubbles di dalamnya otomatis bisa di-hover di seluruh area.
      */}
              <TechBubbles />
            </div>

            {/* Section 3 (INTERAKTIF) */}
            <div
              height={75}
              interactive='true'>
              <ContactSection />
            </div>
          </ParallaxScroller>
        </div>
        <Footer />
        <DateBubble
          mode='custom'
          scrollYProgress={scrollYProgress}
          navigate={navigate} //atur navigate di customStages dibawah
          position={position} //atur di UseResponsive
          motionConfig={motionConfig} //atur di UseResponsive
          customStages={[
            {
              range: [0, 0.1],
              text: 'Motto',
              hoverText: 'date',
              baseBg: '',
              bg: 'rgba(0,0,0,0.3)',
              color: '#fff',
              onClick: () => console.log('Stage 1'),
            },
            {
              range: [0.1, 0.7],
              text: 'My Values',
              hoverText: 'Sustainable',
              baseBg: '',
              bg: 'rgba(32,42,68,0.6)',
              color: '#eee',
              onClick: () => navigate('/'), //navigasi ke Homepage
            },
            {
              range: [0.75, 0.9],
              text: 'Smart Tools',
              hoverText: 'Power Tools',
              baseBg: '',
              bg: 'rgba(255,255,255,0.6)',
              color: 'cadetblue',
              onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }), //navigasi ke scroll 0 atau posisi atas
            },
            {
              range: [0.9, 1],
              text: 'Tap to top',
              hoverText: 'Hi',
              baseBg: '',
              bg: 'rgba(255,255,255,0.6)',
              color: 'cadetblue',
              onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }), //navigasi ke scroll 0 atau posisi atas
            },
          ]}
        />
      </div>
    </PageTransition>
  );
}
