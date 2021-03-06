import React from 'react';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import LoadingText from '../components/Loading';

function Loading({ logoutHandler, hasUserId, setStackProjectData,setStackString }) {
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
        <LoadingText />
      </div>
      <Footer />
    </div>
  );
}

export default Loading;
