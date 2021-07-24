import React from 'react';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import ErrorText from '../components/Error';

function Error() {
  return (
    <>
      <Header />
      <div
        style={{
          width: '100vw',
          height: '82vh',
        }}
      >
        <ErrorText />
      </div>
      <Footer />
    </>
  );
}

export default Error;
