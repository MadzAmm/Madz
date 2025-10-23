// import './app.scss';
// import { Routes, Route, useLocation } from 'react-router-dom';
// import { AnimatePresence } from 'framer-motion';
// import Navbar from './components/navbar/Navbar';
// import Homepage from './pages/Homepage';
// import ServicesPage from './pages/ServicesPage';
// import PortfolioPage from './pages/PortfolioPage';
// import ContactPage from './pages/ContactPage';
// import AboutPage from './pages/AboutPage';

// export default function App() {
//   const location = useLocation();

//   return (
//     <div>
//       <Navbar /> {/* Tetap global */}
//       <AnimatePresence mode='wait'>
//         <Routes
//           location={location}
//           key={location.pathname}>
//           <Route
//             path='/'
//             element={<Homepage />}
//           />
//           <Route
//             path='/services'
//             element={<ServicesPage />}
//           />
//           <Route
//             path='/portfolio'
//             element={<PortfolioPage />}
//           />
//           <Route
//             path='/contact'
//             element={<ContactPage />}
//           />
//           <Route
//             path='/about'
//             element={<AboutPage />}
//           />
//         </Routes>
//       </AnimatePresence>
//     </div>
//   );
// }

import './app.scss';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/navbar/Navbar';
import Homepage from './pages/Homepage';
import ServicesPage from './pages/ServicesPage'; // <- Halaman induk
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  const location = useLocation();

  return (
    <div>
      <Navbar /> {/* Tetap global */}
      <AnimatePresence mode='wait'>
        <Routes
          location={location}
          key={location.pathname}>
          <Route
            path='/'
            element={<Homepage />}
          />

          {/* Rute ini untuk halaman '/services' utama Anda */}
          <Route
            path='/services'
            element={<ServicesPage />}
          />

          {/* --- TAMBAHAN DI SINI --- */}
          {/* Rute dinamis untuk setiap detail proyek. */}
          {/* Ini akan me-render ServicesPage, yang kemudian */}
          {/* akan me-render ProjectPage di dalamnya. */}
          <Route
            path='/project/:projectId'
            element={<ServicesPage />}
          />
          {/* ------------------------ */}

          <Route
            path='/portfolio'
            element={<PortfolioPage />}
          />
          <Route
            path='/contact'
            element={<ContactPage />}
          />
          <Route
            path='/about'
            element={<AboutPage />}
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
