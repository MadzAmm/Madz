import { useState } from 'react';
import { motion } from 'framer-motion';
import Links from './Links/Links';
import './sidebar.scss';
import ToogleButton from './toogleButton/ToogleButton';

const variants = {
  open: {
    clipPath: 'circle(2000px at calc(100% - 50px) 50px)', //2000px kalau mau full layar
    transition: { type: 'spring', stiffness: 50, damping: 10 },
  },
  closed: {
    clipPath: 'circle(0 at calc(100% - 50px) 50px)',
    transition: { delay: 0, type: 'spring', stiffness: 300, damping: 40 },
  },
};

// MODIFIKASI: Terima props `itemsForLinks` dari Navbar
const Sidebar = ({ itemsForLinks, onLinkClick, onNavigateRequest }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className='sidebar'
      animate={open ? 'open' : 'closed'}>
      <motion.div
        className='bg'
        variants={variants}
        whileTap={{
          scale: [1, 0.99, 1],
          transition: { duration: 0.4 },
        }}>
        {/* MODIFIKASI: Teruskan props ke komponen Links */}
        <Links
          items={itemsForLinks}
          onNavigate={onNavigateRequest}
          onLinkClick={onLinkClick}
          setOpen={setOpen}
          open={open}
        />
      </motion.div>

      <ToogleButton
        setOpen={setOpen}
        open={open}
      />
    </motion.div>
  );
};

export default Sidebar;
