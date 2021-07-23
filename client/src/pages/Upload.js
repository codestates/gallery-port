import React from 'react';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';

function Upload() {
  return (
    <>
      <Header />
      <div
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: 'yellow',
        }}
      >
        Upload
      </div>
      <Footer />
    </>
  );
}

export default Upload;
