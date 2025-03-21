import React, { useState } from 'react';
import Navbar from '../Navbar.jsx';
import Footer from '../Footer.jsx';
import RequestForm from '../RequestPage/requestPageComponent/RequestForm.jsx';
import ElevateFarmingSection from '../RequestPage/requestPageComponent/ElevateFarmingSection.jsx';
import CleaningBenefits from '../RequestPage/requestPageComponent/CleaningBenefits.jsx';
import RecentProject from '../RequestPage/requestPageComponent/recentProject.jsx'; // Capitalized import

const RequestPage = () => {
  const [requests, setRequests] = useState([]);

  const handleSubmit = (newRequest) => {
    setRequests([...requests, { ...newRequest, id: Date.now() }]);
  };

  const handleDelete = (request) => {
    setRequests(requests.filter((r) => r.id !== request.id));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="pt-20">
        <ElevateFarmingSection />
        <div className="container mx-auto p-4">
          <div className="flex justify-center mb-4">
            <RequestForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
      <CleaningBenefits />
      <RecentProject /> {/* Capitalized component name */}
      <Footer />
    </div>
  );
};

export default RequestPage;