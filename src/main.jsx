// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
// import { BrowserRouter } from 'react-router-dom'; // ⬅️ Tambahkan ini

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// 1. Ganti import ini
// import { BrowserRouter } from 'react-router-dom';
// Menjadi ini:
import { HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Ganti tag ini */}
    {/* <BrowserRouter> */}
    <HashRouter>
      <App />
    </HashRouter>
    {/* </BrowserRouter> */}
  </React.StrictMode>
);

// Hashrouter akan menggunakan hash (#) di URL untuk mengelola routing,
// yang membuatnya lebih kompatibel dengan berbagai lingkungan hosting tanpa konfigurasi tambahan.
// Contoh URL dengan HashRouter: http://example.com/#/your-route
// Contoh URL dengan BrowserRouter: http://example.com/your-route
// Perubahan ini membantu menghindari masalah 404 pada refresh halaman di beberapa server.
// Untuk aplikasi yang dihosting di platform seperti GitHub Pages, HashRouter seringkali menjadi pilihan yang lebih baik.
// Namun, perlu diingat bahwa penggunaan HashRouter dapat mempengaruhi SEO karena URL dengan hash tidak selalu diindeks dengan baik oleh mesin pencari.
//
