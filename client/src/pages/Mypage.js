import React from 'react';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import MyPageWrapper from '../components/MyPage/MyPageWrapper';

function Mypage(props) {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Header logoutHandler={props.logoutHandler} isLogin={props.isLogin} />
      <MyPageWrapper />
      <Footer />
    </div>
  );
}

export default Mypage;
