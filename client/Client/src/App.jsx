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
import BinLocationsAdmin from './Components/BinLocations/BinLocationsAdmin.jsx'; 
import 'leaflet/dist/leaflet.css';
import TimeScheduling from './Components/TimeSchedulingPage/TimeSchedulingComponents/TimeScheduling.jsx'

import ScheduleManagementOverview from './Components/Admin/timeSchedule/timeOverview.jsx'

import SignUp from './Components/SingUpAndSingOut/SignupForm.jsx'
import Login from './Components/SingUpAndSingOut/Login.jsx'
import ChatBotPage from './Components/ChatBOTPage/ChatBotPage.jsx'
import ChatBotPage2 from './Components/ChatBOTPage/ChatBotPage2.jsx'
import FeedBackAndComp from './Components/Page/FeedbackAndComplains.jsx';




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
        <Route path="/admin/bin-locations" element={<BinLocationsAdmin />} /> 
        <Route path="/time" element={<TimeScheduling />} />

        <Route path="/ScheduleManagementOverview" element={<ScheduleManagementOverview />} />


        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/chat" element={<ChatBotPage />} />
        <Route path="/chat2" element={<ChatBotPage2 />} />
    


        <Route path="/feedback" element={<FeedBackAndComp />} />
        <Route path="/complain" element={<FeedBackAndComp />} />


      </Routes>
    </React.Fragment>
  );
}

export default App;