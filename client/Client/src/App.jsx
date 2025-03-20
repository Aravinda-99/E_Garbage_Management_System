
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import React from 'react';
import './App.css';
import AdminDashboard from './Components/Admin/AdminDashboard.jsx'

function App() {

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
      </Routes>

    </React.Fragment>

  );
}

export default App;