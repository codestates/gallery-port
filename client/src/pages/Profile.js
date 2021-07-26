import React, { useEffect } from 'react';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import ProfileWrapper from '../components/Profile';

function Profile({ logoutHandler, hasUserId }) {
  useEffect(() => {
    console.log('0000profile', hasUserId);
  }, []);

  return (
    <div style={{ overflowX: 'hidden' }}>
      <Header logoutHandler={logoutHandler} hasUserId={hasUserId} />
      <ProfileWrapper hasUserId={hasUserId} />
      <Footer />
    </div>
  );
}

export default Profile;
