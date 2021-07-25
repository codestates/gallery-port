import React from 'react';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import ProfileWrapper from '../components/Profile';

function Profile() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Header />
      <ProfileWrapper />
      <Footer />
    </div>
  );
}

export default Profile;
