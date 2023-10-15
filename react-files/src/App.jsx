import './App.css';
import React from 'react';
import Home from './Home';
import Product from './Product';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  Glueguns from './Glueguns';
import Handtools from './Handtools';
import Saws from './Saws';
import Drills from './Drills';
import Torches from './Torches';
import Sandpaper from './Sandpaper';

function App() {
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:sku" element={<Product />} />
        <Route path="/glueguns" element={<Glueguns />} />
        <Route path="/handtools" element={<Handtools />} />
        <Route path="/saws" element={<Saws />} />
        <Route path="/drills" element={<Drills />} />
        <Route path="/torches" element={<Torches />} />
        <Route path="/sandpaper" element={<Sandpaper />} />
      </Routes>
    </div>
  );
}

export default App;
