import React from 'react';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import ProjectWrapper from '../components/Project/ProjectWrapper';

function Project({ logoutHandler, hasUserId, setStackProjectData,setStackString,projectId }) {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Header
        logoutHandler={logoutHandler}
        hasUserId={hasUserId}
        setStackProjectData={setStackProjectData}
        setStackString={setStackString}
      />
      <ProjectWrapper projectId={projectId} />
      <Footer />
    </div>
  );
}

export default Project;
