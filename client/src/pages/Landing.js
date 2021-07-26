import React, { useEffect } from 'react';

import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import LandingGallery from '../components/Landing/LandingGallery';
import LandingProjects from '../components/Landing/LandingProjects';

function Landing({ logoutHandler, hasUserId }) {
  // console.log('000', isLogin);
  useEffect(() => {
    console.log('0000landing', hasUserId);
  }, []);

  return (
    <div style={{ overflowX: 'hidden' }}>
      <LandingGallery />
      <Header
        Landing={true}
        logoutHandler={logoutHandler}
        hasUserId={hasUserId}
      />
      <LandingProjects />
      <Footer Landing={true} />
    </div>
  );
}

export default Landing;
