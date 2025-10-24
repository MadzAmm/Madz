import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './Footer.scss';
import Magnetic from '../../DateBubble/Magnetic';
import { AnimateInteractiveText } from '../../AnimatedText/AnimateInteractiveText ';

const Footer = () => {
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const jakartaTime = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Jakarta',
      }).format(new Date());

      setLocalTime(jakartaTime);
    };

    updateTime(); // initial call
    const interval = setInterval(updateTime, 1000); // update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.footer
      className='footer'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}>
      <div className='topLine'>
        <div className='footer__section'>
          <h4>VERSION</h4>
          <p>2025 © Edition</p>
        </div>

        <div className='footer__section_time'>
          <h4>LOCAL TIME</h4>
          <p>{localTime} GMT+7</p>
        </div>
      </div>
      <div className='bottomLine'>
        <div className='footerBottom'>
          <h4>SOCIALS</h4>

          <ul>
            <Magnetic
              pullForceParent={0.5}
              pullForceChild={0.25}>
              <motion.li
                whileHover={{ color: 'white', scale: 1.1 }}
                whileTap={{ scale: 0.85 }}>
                <AnimateInteractiveText
                  as='a'
                  initialColor='#fff7ed'
                  href='#'>
                  Facebook
                </AnimateInteractiveText>
              </motion.li>
            </Magnetic>
            <Magnetic
              pullForceParent={0.5}
              pullForceChild={0.25}>
              <motion.li
                whileHover={{ color: 'white', scale: 1.1 }}
                whileTap={{ scale: 0.85 }}>
                <AnimateInteractiveText
                  as='a'
                  initialColor='#fff7ed'
                  href='#'>
                  Instagram
                </AnimateInteractiveText>
              </motion.li>
            </Magnetic>
            <Magnetic
              pullForceParent={0.5}
              pullForceChild={0.25}>
              <motion.li
                whileHover={{ color: 'white', scale: 1.1 }}
                whileTap={{ scale: 0.85 }}>
                <AnimateInteractiveText
                  as='a'
                  initialColor='#fff7ed'
                  href='#'>
                  Twitter
                </AnimateInteractiveText>
              </motion.li>
            </Magnetic>
            <Magnetic
              pullForceParent={0.5}
              pullForceChild={0.25}>
              <motion.li
                whileHover={{ color: 'white', scale: 1.1 }}
                whileTap={{ scale: 0.85 }}>
                <AnimateInteractiveText
                  as='a'
                  initialColor='#fff7ed'
                  href='#'>
                  Threads
                </AnimateInteractiveText>
              </motion.li>
            </Magnetic>
          </ul>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
