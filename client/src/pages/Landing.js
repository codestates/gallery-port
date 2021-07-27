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
  stackString,
  setStackString,
}) {

  return (
    <div style={{ overflowX: 'hidden' }}>
      <LandingGallery />
      <Header
        Landing={true}
        logoutHandler={logoutHandler}
        hasUserId={hasUserId}
        setStackProjectData={setStackProjectData}
        setStackString={setStackString}
      />
      <LandingProjects
        stackProjectData={stackProjectData}
        setProjectId={setProjectId}
        setStackProjectData={setStackProjectData}
        hasUserId={hasUserId}
        stackString={stackString}
      />
      <Footer Landing={true} />
    </div>
  );
}

export default Landing;
