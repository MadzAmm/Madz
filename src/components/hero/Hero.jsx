// import './hero.scss';
// import { motion } from 'framer-motion';
// import { useRef } from 'react';
// import { useScroll } from 'framer-motion';

// // Animasi text di hero
// const variants = {
//   open: { transition: { staggerChildren: 0.1 } },
//   closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
// };
// const itemVariants = {
//   open: { y: 0, opacity: 1 },
//   closed: { y: 200, opacity: 0 },
// };

// // Animasi text sliding nama
// const sliderVariants = {
//   initial: {
//     x: 0,
//   },
//   animate: {
//     x: '-50%',
//     transition: {
//       repeat: Infinity,
//       duration: 30,
//       repeatType: 'mirror',
//     },
//   },
// };

// const Hero = () => {
//   const ref = useRef(null);

//   // Scroll tracking (optional if bubble moved to Homepage)
//   useScroll({
//     target: ref,
//     offset: ['start start', 'end start'],
//   });

//   return (
//     <motion.div
//       variants={variants}
//       initial='closed'
//       animate='open'
//       className='hero'
//       ref={ref}>
//       <div className='wrapper'>
//         <motion.div
//           className='textContainer'
//           variants={itemVariants}>
//           <motion.h3 variants={itemVariants}>Next-Gen Professional</motion.h3>
//         </motion.div>

//         <motion.div
//           className='imageContainer'
//           variants={itemVariants}>
//           <motion.div
//             className='slidingTextContainer'
//             variants={sliderVariants}
//             initial='initial'
//             animate='animate'>
//             무하마드*Muhammad
//           </motion.div>
//           <motion.img
//             variants={itemVariants}
//             src='/mad.png'
//             alt='mad'
//           />
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default Hero;

import './hero.scss';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// ... (variants dan sliderVariants tetap sama)
const variants = {
  open: { transition: { staggerChildren: 0.1 } },
  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};
const itemVariants = {
  open: { y: 0, opacity: 1 },
  closed: { y: 200, opacity: 0 },
};
const sliderVariants = {
  initial: { x: 0 },
  animate: {
    x: '-50%',
    transition: {
      repeat: Infinity,
      duration: 30,
      repeatType: 'mirror',
    },
  },
};

const Hero = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const yImage = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // 1. TAMBAHKAN TRANSFORMASI BARU UNTUK SLIDING TEXT
  // Kita buat bergerak ke atas ('-200%') saat halaman scroll ke bawah
  const ySlidingText = useTransform(scrollYProgress, [0, 1], ['0%', '-200%']);

  return (
    <motion.div
      variants={variants}
      initial='closed'
      animate='open'
      className='hero'
      ref={ref}>
      <div className='wrapper'>
        <motion.div
          className='textContainer'
          variants={itemVariants}
          style={{ y: yText }}>
          <motion.h3 variants={itemVariants}>Next-Gen Professional</motion.h3>
        </motion.div>

        <motion.div
          className='imageContainer'
          variants={itemVariants}
          style={{ y: yImage }}>
          <motion.div
            className='slidingTextContainer'
            variants={sliderVariants}
            initial='initial'
            animate='animate'
            style={{ y: ySlidingText }} // 2. TERAPKAN STYLE DI SINI
          >
            무하마드*Muhammad
          </motion.div>
          <motion.img
            variants={itemVariants}
            src='/mad.png'
            alt='mad'
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;
