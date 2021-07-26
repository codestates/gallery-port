import React from 'react';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import UploadWrapper from '../components/Upload/UploadWrapper';

function Upload(props) {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Header logoutHandler={props.logoutHandler} isLogin={props.isLogin} />
      <UploadWrapper />
      <Footer />
    </div>
  );
}

export default Upload;
