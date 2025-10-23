import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import Hero from '../components/hero/Hero';
import Footer from '../components/hero/footer/Footer';
import PageTransition from './PageTransition';
import DateBubble from '../components/DateBubble/DateBubble';
import './pages.scss';
import useResponsiveBubble from '../components/DateBubble/UseResponsiveBubble';
import ContactSection from '.././components/ContactSection/ContactSection';
import Activity from '../components/aboutSection/Activity';

export default function Homepage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const containerRef = useRef(null);
  const { position, motionConfig } = useResponsiveBubble();

  // const x = useSpring(
  //   useTransform(
  //     scrollYProgress,
  //     [0, 0.1, 0.3, 0.7, 1],
  //     [350, -500, -200, 200, -280]
  //   ),
  //   { stiffness: 100, damping: 20 }
  // );

  // const y = useSpring(
  //   useTransform(scrollYProgress, [0, 0.1, 0.3, 1], [300, 300, 200, 340]),
  //   { stiffness: 100, damping: 20 }
  // );

  // const scale = useTransform(
  //   scrollYProgress,
  //   [0, 0.1, 0.3, 0.7, 1],
  //   [1, 0.5, 3, 0.5, 1]
  // );

  // const [isAtTop, setIsAtTop] = useState(true);
  // useMotionValueEvent(scrollYProgress, 'change', (latest) => {
  //   setIsAtTop(latest < 0.01);
  // });

  return (
    <PageTransition label='Homepage'>
      <div
        className='pageWrapper'
        ref={ref}>
        <div className='contentLayer'>
          <Hero />
        </div>
        <div>
          {' '}
          <Activity />
        </div>

        <div className='dateBubbleLayer'>
          <DateBubble
            scrollYProgress={scrollYProgress}
            mode='default'
            position={position}
            motionConfig={motionConfig}
          />
        </div>

        <div className='footerLayer'>
          <ContactSection />
          <Footer />
        </div>
      </div>
    </PageTransition>
  );
}
