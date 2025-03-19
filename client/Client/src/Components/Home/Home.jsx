import React from 'react'
import Navbar from '../Navbar.jsx';
import { HeroContentLeft } from '../Hero.jsx';
import SystemBenefits from '../Page/Benifits.jsx'
import  Footer  from '../Footer.jsx';
import TestimonialSlider from '../commentsBaner.jsx'
import MultipleProjects from '../Page/MultipleProjects.jsx';
import FAQSection from '../Page/QuestionAsked.jsx'

function Home() {
  return (
    <div>
      < Navbar />

      < HeroContentLeft /> 
      <MultipleProjects />
      < SystemBenefits/>

      <FAQSection/>

      < TestimonialSlider/>

     < Footer/>
    </div>
  )
}

export default Home;