import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import Magnetic from '../../DateBubble/Magnetic';

const MotionNavLink = motion(NavLink);

// transisi muncul link sidebar
const variants = {
  open: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};
const itemVariants = {
  open: {
    x: 0,
    opacity: 1,
  },
  closed: {
    x: 100,
    opacity: 0,
  },
};

// MODIFIKASI: Terima props `items` dari Sidebar
const Links = ({ items, setOpen, open, onLinkClick }) => {
  // MODIFIKASI: Hapus array 'items' yang statis (hardcoded).
  // const items = ['homepage', 'services', 'portfolio', 'contact', 'about']; // <-- BARIS INI DIHAPUS

  return (
    <motion.div
      className='links'
      variants={variants}
      initial='closed'
      animate={open ? 'open' : 'closed'}>
      <motion.div
        className='navigation'
        variants={itemVariants}>
        <h3>NAVIGATION</h3>
      </motion.div>

      {/* MODIFIKASI: .map() sekarang menggunakan 'items' dari props secara dinamis */}
      {items.map((item) => {
        const path =
          item.toLowerCase() === 'homepage' ? '/' : `/${item.toLowerCase()}`;
        return (
          <motion.div
            key={item}
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.85 }}
            className='nav-item'>
            <Magnetic
              pullForceParent={0.5}
              pullForceChild={0.25}>
              <MotionNavLink
                to={path}
                onClick={() => {
                  onLinkClick(); // 1. Beri sinyal ke Navbar
                  setOpen(false); // 2. Tutup sidebar
                }}
                className={({ isActive }) =>
                  isActive ? 'link active' : 'link'
                }>
                <div
                  className='slot-viewport'
                  data-text={item}>
                  <span className='slot-text'>{item}</span>
                </div>
              </MotionNavLink>
            </Magnetic>
          </motion.div>
        );
      })}

      {/* Bagian Socials tidak berubah */}
      <motion.div
        className='social'
        variants={itemVariants}>
        <h3>SOCIALS</h3>
        <div className='linkSocial'>
          {['Instagram', 'Facebook', 'Twitter', 'LinkedIn'].map((social) => (
            <Magnetic
              key={social}
              pullForceParent={0.5}
              pullForceChild={0.25}>
              <motion.a
                href='#'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.85 }}>
                <div
                  className='slot-viewport'
                  data-text={social}>
                  <span className='slot-text'>{social}</span>
                </div>
              </motion.a>
            </Magnetic>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Links;
