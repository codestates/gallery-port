import React from 'react';

import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import LandingGallery from '../components/Landing/LandingGallery';
import LandingProjects from '../components/Landing/LandingProjects';

function Landing() {
  return (
    <div>
      <LandingGallery />
      <Header Landing={true} />
      <LandingProjects />
      <Footer Landing={true} />
    </div>
  );
}

export default Landing;
