import React from 'react';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import SignInWrapper from '../components/SignIn/SignInWrapper';

function Signin() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Header />
      <SignInWrapper />
      <Footer />
    </div>
  );
}

export default Signin;
