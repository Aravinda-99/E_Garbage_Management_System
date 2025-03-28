
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import React from 'react';
import './App.css';
import { Gallery } from './Components/Home/Gallary'; 
import ContactUs from './Components/ContactUS'; 
import AdminDashboard from './Components/Admin/AdminDashboard.jsx'
import RequestPage from './Components/RequestPage/RequestPage.jsx'
import UserProfileView from './Components/ProfilePage/UserProfileView.jsx'
import TimeScheduling from './Components/TimeSchedulingPage/TimeSchedulingComponents/TimeScheduling.jsx'


function App() {

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/RequestPage" element={<RequestPage />} />
        <Route path="/UserProfileView" element={<UserProfileView />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/time" element={<TimeScheduling />} />
      </Routes>

    </React.Fragment>

  );
}

export default App;