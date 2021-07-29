import React from 'react';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import ErrorText from '../components/Error';

function Error({ logoutHandler, hasUserId, setStackProjectData,setStackString }) {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Header
        logoutHandler={logoutHandler}
        hasUserId={hasUserId}
        setStackProjectData={setStackProjectData}
        setStackString={setStackString}
      />
      <div
        style={{
          width: '100vw',
          height: '82vh',
        }}
      >
        <ErrorText />
      </div>
      <Footer />
    </div>
  );
}

export default Error;
