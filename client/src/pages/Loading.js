import React from 'react';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';

function Loading() {
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
        Loading
      </div>
      <Footer />
    </>
  );
}

export default Loading;
