<<<<<<< Updated upstream
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import React from 'react';
import './App.css';
=======
import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
>>>>>>> Stashed changes

function App() {

  return (
<<<<<<< Updated upstream
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

    </React.Fragment>

  );
=======
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
    </Routes>
   </BrowserRouter>
  )
>>>>>>> Stashed changes
}

export default App;
