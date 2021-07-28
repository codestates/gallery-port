import React from 'react';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import UploadWrapper from '../components/Upload/UploadWrapper';

function Upload({ logoutHandler, hasUserId, setStackProjectData ,setStackString}) {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Header
        logoutHandler={logoutHandler}
        hasUserId={hasUserId}
        setStackProjectData={setStackProjectData}
        setStackString={setStackString}
      />
      <UploadWrapper />
      <Footer />
    </div>
  );
}

export default Upload;
