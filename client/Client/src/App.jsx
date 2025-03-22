
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import React from 'react';
import './App.css';
import AdminDashboard from './Components/Admin/AdminDashboard.jsx'
import RequestPage from './Components/RequestPage/RequestPage.jsx'
import UserProfileView from './Components/ProfilePage/UserProfileView.jsx'

function App() {

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/RequestPage" element={<RequestPage />} />
        <Route path="/UserProfileView" element={<UserProfileView />} />
      </Routes>

    </React.Fragment>

  );
}

export default App;