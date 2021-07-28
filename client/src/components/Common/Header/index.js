import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import logo from '../../../images/logo_b.svg';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AlertModal from '../../../utils/alert-modal';

const END_POINT = 'https://gallery-port-server.com';
// const END_POINT = process.env.REACT_APP_API_URL;

function Header(props) {
  const [ScrollY, setScrollY] = useState(0); // window 의 pageYOffset값을 저장
  const [ScrollActive, setScrollActive] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [stringColor, setStringColor] = useState(false);
  const [alertString] = useState('로그아웃 되었습니다.');
  const [alertBtn] = useState('확인');

  let history = useHistory();

  const postStackHandler = (string) => {
    setStringColor('on');
    const stackString = string;
    props.setStackString(stackString);

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
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

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
    setIsLogin(false);
    <AlertModal alertString={alertString} alertBtn={alertBtn} />;
    alert('로그아웃 되었습니다!');
    props.logoutHandler();

    return axios.post(
      `${END_POINT}/signout`,
      {},
      {
        withCredentials: true,
      }
    );
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
                <li className="stack" onClick={() => postStackHandler('')}>
                  ALL
                </li>
                <li
                  className="stack"
                  onClick={() => postStackHandler('javascript')}
                >
                  JavaScript
                </li>
                <li className="stack" onClick={() => postStackHandler('sql')}>
                  SQL
                </li>
                <li
                  className="stack"
                  onClick={() => postStackHandler('python')}
                >
                  Python
                </li>
                <li className="stack" onClick={() => postStackHandler('java')}>
                  Java
                </li>
                <li className="stack" onClick={() => postStackHandler('c#')}>
                  C#
                </li>
                <li className="stack" onClick={() => postStackHandler('php')}>
                  PHP
                </li>
                <li className="stack" onClick={() => postStackHandler('etc')}>
                  Etc
                </li>
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
              {props.hasUserId ? (
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
