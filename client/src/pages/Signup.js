import React from 'react';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import SignUpWrapper from '../components/SignUp/SignUpWrapper';

function Signup({ setStackProjectData, setStackString }) {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Header
        setStackProjectData={setStackProjectData}
        setStackString={setStackString}
      />
      <SignUpWrapper />
      <Footer />
    </div>
  );
}

export default Signup;