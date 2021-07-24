import React from 'react';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import LoadingText from '../components/Loading';

function Loading() {
  return (
    <>
      <Header />
      <div
        style={{
          width: '100vw',
          height: '82vh',
        }}
      >
        <LoadingText />
      </div>
      <Footer />
    </>
  );
}

export default Loading;
