import { useScroll } from 'framer-motion';
import React, { useRef, lazy, Suspense } from 'react';
import PageTransition from './PageTransition';
import DateBubble from '../components/DateBubble/DateBubble';
import Portfolio from '../components/Portfolio/Portfolio';
import ContactSection from '../components/ContactSection/ContactSection';
import Wave from '../components/MorphingWave/Wave';
import Footer from '../components/hero/footer/Footer';

export default function PortfolioPage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const landingPageWaveConfig = {
    initialY: { desktop: 3100, tablet: -50, mobile: 0 },
    finalY: { desktop: -1820, tablet: -220, mobile: -150 },
    topWave: {
      wavePreset: { desktop: 'energetic', tablet: 'default', mobile: 'calm' },
      controlPoints: {
        desktop: [0, 0, 0, 0, 0, 0],
        tablet: [100, 150, 50, 150, 100],
        mobile: [100, 130, 100],
      },
    },
    bottomWave: {
      wavePreset: { desktop: 'calm', tablet: 'calm', mobile: 'calm' },
      controlPoints: {
        desktop: [800, 800, 420],
        tablet: [190, 210, 190],
        mobile: [180, 210, 180],
      },
    },
    springConfig: { stiffness: 10000, damping: 100 },
  };

  return (
    <PageTransition label='Portfolio'>
      <div
        className='pageWrapper'
        ref={ref}
        style={{ position: 'relative' }}>
        <main
          style={{
            zIndex: '3',
            position: 'relative',
            backgroundColor: '#fff7ed',
          }}>
          <Portfolio />
        </main>
        <div></div>

        <footer
          style={{
            zIndex: '1',
            position: 'relative',
            backgroundColor: '#fff7ed',
          }}>
          <ContactSection style={{ zIndex: '1' }} />
          <Footer />
        </footer>

        <DateBubble
          mode='custom'
          motionConfig={{
            xInput: [0, 0.5, 1],
            xOutput: [100, 0, -100],
            yInput: [0, 0.5, 1],
            yOutput: [240, 300, 380],
            scaleInput: [0, 0.5, 1],
            scaleOutput: [1, 1.5, 1],
          }}
          customStages={[
            {
              range: [0, 0.3],
              text: 'Featured Work',
              bg: 'rgba(0,0,0,0.3)',
              color: '#fff',
              onClick: () => console.log('Featured Work clicked'),
            },
            {
              range: [0.3, 0.6],
              text: 'Design Showcase',
              bg: 'rgba(32,42,68,0.6)',
              color: '#eee',
              onClick: () => console.log('Design Showcase clicked'),
            },
            {
              range: [0.6, 1],
              text: 'Recent Projects',
              bg: 'rgba(255,255,255,0.6)',
              color: 'cadetblue',
              onClick: () => console.log('Recent Projects clicked'),
            },
          ]}
          position={{ top: '34%', left: '2rem' }}
        />
      </div>
    </PageTransition>
  );
}
