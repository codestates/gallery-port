import React from 'react';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import UploadEditWrapper from '../components/UploadEdit/UploadEditWrapper';

function UploadEdit({ logoutHandler, hasUserId, projectId ,setStackString}) {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Header logoutHandler={logoutHandler} hasUserId={hasUserId} setStackString={setStackString} />
      <UploadEditWrapper hasUserId={hasUserId} projectId={projectId} />
      <Footer />
    </div>
  );
}

export default UploadEdit;
