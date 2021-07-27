import React from 'react';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import UploadEditWrapper from '../components/UploadEdit/UploadEditWrapper';

function UploadEdit({ logoutHandler, hasUserId }) {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Header logoutHandler={logoutHandler} hasUserId={hasUserId} />
      <UploadEditWrapper hasUserId={hasUserId} />
      <Footer />
    </div>
  );
}

export default UploadEdit;