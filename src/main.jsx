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
