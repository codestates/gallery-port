import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import logo from '../../../images/logo_b.svg';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// const END_POINT = 'https://localhost:80';
const END_POINT = process.env.REACT_APP_API_URL;

function Header(props) {
  const [ScrollY, setScrollY] = useState(0); // window 의 pageYOffset값을 저장
  const [ScrollActive, setScrollActive] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  let history = useHistory();

  const postStackHandler = (string) => {
    return axios
      .get(`${END_POINT}`, {
        params: { stack: string },
        withCredentials: true,
      })
      .then((res) => {
        const projects = res.data.data.projects;
        props.setStackProjectData(projects);
        history.push('/');
      })
      .catch((err) => alert('실패'));
  };

  useEffect(() => {
    if (props.hasUserId !== undefined) {
      setIsLogin(true);
    }
  }, []);

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
    window.location.reload();
    setIsLogin(false);

    return axios
      .post(`${END_POINT}/signout`, {
        withCredentials: true,
      })
      .catch((err) => {
        alert('실패');
      });
  }

  function goProfilepage() {
    return history.push('/profile');
  }

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
              <img
                src={logo}
                alt="logo"
                onClick={() => postStackHandler()}
              ></img>
            </Link>
            <nav>
              <ul>
                <li onClick={() => postStackHandler()}>ALL</li>
                <li onClick={() => postStackHandler('javascript')}>
                  JavaScript
                </li>
                <li onClick={() => postStackHandler('sql')}>SQL</li>
                <li onClick={() => postStackHandler('python')}>Python</li>
                <li onClick={() => postStackHandler('java')}>Java</li>
                <li onClick={() => postStackHandler('c#')}>C#</li>
                <li onClick={() => postStackHandler('php')}>PHP</li>
                <li onClick={() => postStackHandler('etc')}>Etc</li>
              </ul>
            </nav>
            <div className="headerBtn">
              <Link
                to={props.hasUserId !== undefined ? '/profile' : '/signin'}
                className="profile_link"
              >
                <button
                  className="headerProfileBtn"
                  onClick={goProfilepage}
                  style={{ cursor: 'pointer' }}
                >
                  프로필
                </button>
              </Link>
              {props.hasUserId !== undefined ? (
                <button
                  className="headerSigninBtn"
                  onClick={() => handleLogout()}
                >
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
