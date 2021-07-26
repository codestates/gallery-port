import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import logo from '../../../images/logo_b.svg';

function Header(props) {
  const [ScrollY, setScrollY] = useState(0); // window 의 pageYOffset값을 저장
  const [ScrollActive, setScrollActive] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  // useEffect(() => {
  //   console.log('되는건가?', props.isLogin);
  //   props.logoutHandler ? setIsLogin(true) : setIsLogin(false);
  // }, []);

  function handleScroll() {
    if (ScrollY > window.innerHeight) {
      setScrollY(window.pageYOffset);
      setScrollActive(true);
    } else {
      setScrollY(window.pageYOffset);
      setScrollActive(false);
    }
  }
  useEffect(() => {
    function scrollListener() {
      window.addEventListener('scroll', handleScroll);
    } //  window 에서 스크롤을 감시 시작
    scrollListener(); // window 에서 스크롤을 감시
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }; //  window 에서 스크롤을 감시를 종료
  });

  function handleLogout() {
    alert('로그아웃 되었습니다!');
    props.logoutHandler();
    setIsLogin(false);
    // props.logoutHandler = false;
    // window.location.href = '/';
  }

  function goProfilepage() {
    window.location.href = '/profile';
  }

  // function goLandingpage() {
  //   window.location.href = '/';
  // }

  return (
    <div style={{ overflow: 'hidden' }}>
      <div
        className={
          props.Landing
            ? ScrollActive
              ? 'fixedBox fixed'
              : 'fixedBox unfixed'
            : 'fixedBox fixed'
        }
      >
        <div className="header">
          <div className="headerInner">
            <Link to="/" className="landing_link">
              <img src={logo} alt="logo"></img>
            </Link>
            <nav>
              <ul>
                <li>ALL</li>
                <li>JavaScript</li>
                <li>SQL</li>
                <li>Python</li>
                <li>Java</li>
                <li>C#</li>
                <li>PHP</li>
                <li>Etc</li>
              </ul>
            </nav>
            <div className="headerBtn">
              <Link to="/profile" className="profile_link">
                <button
                  className="headerProfileBtn"
                  onClick={goProfilepage}
                  style={{ cursor: 'pointer' }}
                >
                  프로필
                </button>
              </Link>
              {isLogin ? (
                <button className="headerSigninBtn" onClick={handleLogout}>
                  로그아웃
                </button>
              ) : (
                <Link to="/signin" className="signin_link">
                  <button className="headerSigninBtn">로그인</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
