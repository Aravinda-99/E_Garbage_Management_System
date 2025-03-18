import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import React from 'react';
import './App.css';

function App() {

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

    </React.Fragment>

  );
}

export default App;
