import React, { useState, useEffect } from 'react';

import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import LandingGallery from '../components/Landing/LandingGallery';
import LandingProjects from '../components/Landing/LandingProjects';

function Landing(props) {
  // console.log('000', isLogin);
  useEffect(() => {
    console.log('000000', props.hasUserId);
  }, []);

  return (
    <div style={{ overflowX: 'hidden' }}>
      <LandingGallery />
      <Header
        Landing={true}
        logoutHandler={props.logoutHandler}
        isLogin={props.hasUserId}
      />
      <LandingProjects />
      <Footer Landing={true} />
    </div>
  );
}

export default Landing;
