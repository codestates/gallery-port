import React from 'react';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import ProfileWrapper from '../components/Profile';

function Profile({
  logoutHandler,
  hasUserId,
  setStackProjectData,
  setProjectId,
}) {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Header
        logoutHandler={logoutHandler}
        hasUserId={hasUserId}
        setStackProjectData={setStackProjectData}
      />
      <ProfileWrapper hasUserId={hasUserId} setProjectId={setProjectId} />
      <Footer />
    </div>
  );
}

export default Profile;
