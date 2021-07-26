import React from 'react';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import SignInWrapper from '../components/SignIn/SignInWrapper';

function Signin({ loginHandler }) {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Header />
      <SignInWrapper loginHandler={loginHandler} />
      <Footer />
    </div>
  );
}

export default Signin;
