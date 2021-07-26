import React from 'react';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import MyPageWrapper from '../components/MyPage/MyPageWrapper';

function Mypage({ logoutHandler, hasUserId }) {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Header logoutHandler={logoutHandler} hasUserId={hasUserId} />
      <MyPageWrapper hasUserId={hasUserId} />
      <Footer />
    </div>
  );
}

export default Mypage;
