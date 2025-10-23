import { motion } from 'framer-motion';

const ToogleButton = ({ setOpen, open }) => {
  return (
    <motion.button onClick={() => setOpen((prev) => !prev)}>
      {/* Lingkaran putih dengan bounce */}
      <motion.div
        className='circleWrapper'
        whileHover={{
          scale: [1, 1.1, 0.95, 1.05, 1],
          transition: { duration: 0.6, ease: 'easeInOut' },
        }}
        whileTap={{
          scale: [1, 0.9, 1.05, 1],
          transition: { duration: 0.4, ease: 'easeOut' },
        }}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}>
        {/* Ikon hamburger/X */}
        <svg
          width='23'
          height='23'
          viewBox='0 0 23 23'>
          <motion.path
            strokeWidth='3'
            stroke='#002f45'
            strokeLinecap='round'
            variants={{
              closed: { d: 'M 2 2.5 L 20 2.5' },
              open: { d: 'M 3 16.5 L 17 2.5' },
            }}
            initial='closed'
            animate={open ? 'open' : 'closed'}
          />
          <motion.path
            strokeWidth='3'
            stroke='#002f45'
            strokeLinecap='round'
            d='M 2 9.423 L 20 9.423'
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
            initial='closed'
            animate={open ? 'open' : 'closed'}
          />
          <motion.path
            strokeWidth='3'
            stroke='#002f45'
            strokeLinecap='round'
            variants={{
              closed: { d: 'M 2 16.346 L 20 16.346' },
              open: { d: 'M 3 2.5 L 17 16.346' },
            }}
            initial='closed'
            animate={open ? 'open' : 'closed'}
          />
        </svg>
      </motion.div>
    </motion.button>
  );
};

export default ToogleButton;
