import React from 'react';
import Navbar from '../Navbar.jsx';
import { Stats } from './Stat';
import { Process } from './Process';
import { Gallery } from './Gallary';
import { useInView } from "react-intersection-observer";
import { HeroContentLeft } from '../Hero.jsx';
import SystemBenefits from '../Page/Benifits.jsx';
import Footer from '../Footer.jsx';
import TestimonialSlider from '../commentsBaner.jsx';
import MultipleProjects from '../Page/MultipleProjects.jsx';
import FAQSection from '../Page/QuestionAsked.jsx';
import FeedBackAndComp from '../Page/FeedbackAndComplains.jsx';
import Card from '../Admin/FeedBackButton/Card.jsx';
import AIBot from '../AIBot/AIBot.jsx';
import FeedbackBanner from '../../Components/Admin/FeedbackInrerface/FeedbackBanner.jsx';

import FeedbackBanner from '../../Components/Admin/FeedbackInrerface/FeedbackBanner.jsx';


function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Navbar with highest z-index to ensure it stays on top */}
      <div className="relative z-50">
        <Navbar />
      </div>
      <AIBot/>

      {/* Main content wrapper */}
      <div className="relative z-10">
        {/* Hero section with margin-top to account for navbar height */}
        <div className="relative">
          <HeroContentLeft />
        </div>

         {/* Gallery Section */}
         <Gallery />

         <SystemBenefits />

         {/* Stats Section */}
         <Stats />

         
        {<div className="text-center py-20 bg-emerald-900">
        <h1 className="text-3xl font-bold text-white mb-4 animate-fade-in">
        Reducing E-Waste, Building a Greener Tomorrow
        </h1>
        <p className="text-xl text-emerald-200 max-w-2xl mx-auto animate-fade-in-up">
          Revolutionizing waste management with sustainable solutions for a cleaner, greener future.
        </p>
      </div> }
        
        

        {/* Process Section */}
        <Process />

        <Card />
        <FeedbackBanner />
        
        {/* Other sections */}
        <MultipleProjects />
        


    
        {/* <FAQSection /> */}
        {/* <TestimonialSlider /> */}
        {/* <FeedBackAndComp /> */}
        <Footer />

        
      </div>
    </div>
  );
}

export default Home;