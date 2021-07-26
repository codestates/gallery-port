import React, { useState, useEffect } from 'react';

import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import LandingGallery from '../components/Landing/LandingGallery';
import LandingProjects from '../components/Landing/LandingProjects';

function Landing({ logoutHandler, hasUserId, setProjectId }) {
  const [stackProjectData, setStackProjectData] = useState(null);

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
        setStackProjectData={setStackProjectData}
      />
      <LandingProjects
        stackProjectData={stackProjectData}
        setProjectId={setProjectId}
      />
      <Footer Landing={true} />
    </div>
  );
}

export default Landing;
