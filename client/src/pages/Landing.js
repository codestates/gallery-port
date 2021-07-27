import React from 'react';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import LandingGallery from '../components/Landing/LandingGallery';
import LandingProjects from '../components/Landing/LandingProjects';

function Landing({
  logoutHandler,
  hasUserId,
  setProjectId,
  setStackProjectData,
  stackProjectData,
}) {
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
        setStackProjectData={setStackProjectData}
      />
      <Footer Landing={true} />
    </div>
  );
}

export default Landing;
