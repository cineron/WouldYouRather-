import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Note: this is just a bare render for now. We'll wrap this in <Provider>
// once our Redux store is ready (Phase 1, Step 4).
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
