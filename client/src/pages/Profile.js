import React from 'react';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import ProfileWrapper from '../components/Profile';

function Profile({
  logoutHandler,
  hasUserId,
  setStackProjectData,
  setProjectId,
  setStackString,
}) {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Header
        logoutHandler={logoutHandler}
        hasUserId={hasUserId}
        setStackProjectData={setStackProjectData}
        setStackString={setStackString}
      />
      <ProfileWrapper hasUserId={hasUserId} setProjectId={setProjectId} />
      <Footer />
    </div>
  );
}

export default Profile;
