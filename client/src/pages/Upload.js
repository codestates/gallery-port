import React, { useEffect } from 'react';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import UploadWrapper from '../components/Upload/UploadWrapper';

function Upload({ logoutHandler, hasUserId }) {
  useEffect(() => {
    console.log('0000upload', hasUserId);
  }, []);

  return (
    <div style={{ overflowX: 'hidden' }}>
      <Header logoutHandler={logoutHandler} hasUserId={hasUserId} />
      <UploadWrapper />
      <Footer />
    </div>
  );
}

export default Upload;
