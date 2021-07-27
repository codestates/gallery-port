import React from 'react';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import SignInWrapper from '../components/SignIn/SignInWrapper';

function Signin({
  loginHandler,
  setHasUserId,
  hasUserId,
  setStackProjectData,
}) {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Header setStackProjectData={setStackProjectData} />
      <SignInWrapper
        loginHandler={loginHandler}
        setHasUserId={setHasUserId}
        hasUserId={hasUserId}
      />
      <Footer />
    </div>
  );
}

export default Signin;
