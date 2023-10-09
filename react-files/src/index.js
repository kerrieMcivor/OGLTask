import {createRoot} from 'react-dom/client';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; 
import './index.css';
import App from './App.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Router>
    <React.StrictMode>
      <Header />
      <App />
      <Footer />
    </React.StrictMode>
  </Router>,
);
