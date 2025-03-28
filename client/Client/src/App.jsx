import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import React from 'react';
import './App.css';
import { Gallery } from './Components/Home/Gallary'; 
import ContactUs from './Components/ContactUS'; 
import AdminDashboard from './Components/Admin/AdminDashboard.jsx';
import RequestPage from './Components/RequestPage/RequestPage.jsx';
import UserProfileView from './Components/ProfilePage/UserProfileView.jsx';
import BinLocations from './Components/BinLocations/BinLocations.jsx';
import BinLocationsAdmin from './Components/BinLocations/BinLocationsAdmin.jsx'; // Import the new admin component

import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <React.Fragment>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/bin-locations" element={<BinLocations />} />
        
        {/* User Routes */}
        <Route path="/RequestPage" element={<RequestPage />} />
        <Route path="/UserProfileView" element={<UserProfileView />} />

        {/* Admin Routes */}
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/admin/bin-locations" element={<BinLocationsAdmin />} /> {/* New route for bin locations admin */}
      </Routes>
    </React.Fragment>
  );
}

export default App;