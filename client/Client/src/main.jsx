import React from 'react';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.css'

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);