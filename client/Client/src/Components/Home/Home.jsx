import React from 'react';
import Navbar from '../Navbar.jsx';
import { HeroContentLeft } from '../Hero.jsx';
import SystemBenefits from '../Page/Benifits.jsx';
import Footer from '../Footer.jsx';
import TestimonialSlider from '../commentsBaner.jsx';
import MultipleProjects from '../Page/MultipleProjects.jsx';
import FAQSection from '../Page/QuestionAsked.jsx';
import FeedBackAndComp from '../Page/FeedbackAndComplains.jsx';

function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Navbar with highest z-index to ensure it stays on top */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Main content wrapper */}
      <div className="relative z-10">
        {/* Hero section with margin-top to account for navbar height */}
        <div className="relative">
          <HeroContentLeft />
        </div>
        
        {/* Other sections */}
        <MultipleProjects />
        <SystemBenefits />
        <FAQSection />
        <TestimonialSlider />
        <FeedBackAndComp />
        <Footer />
      </div>
    </div>
  );
}

export default Home;