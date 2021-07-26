import React from 'react';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';

function Project(props) {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Header logoutHandler={props.logoutHandler} isLogin={props.isLogin} />
      <div
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: 'yellow',
        }}
      >
        Project
      </div>
      <Footer />
    </div>
  );
}

export default Project;
