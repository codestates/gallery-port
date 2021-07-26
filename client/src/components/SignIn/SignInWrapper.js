import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TextInputGenderRequired from './TextInputGenderRequired';
import './SignInWrapper.css';
import mockSigup from './mockSignup';
import { useHistory } from 'react-router-dom';

const END_POINT = process.env.REACT_APP_API_URL;

function SignUpWrapper({ loginHandler }) {
  const [signInInfo, setSignInInfo] = useState({
    email: '',
    password: '',
  });

  let history = useHistory();

  function onChangeHandler(e, property) {
    const copied = Object.assign({}, signInInfo);
    copied[property] = e.target.value;
    setSignInInfo(copied);
  }

  // ! axios 연결됐을 때 사용
  // function postHandler() {
  //   return (
  //     axios
  //       .post(`${END_POINT}/signin`, signInInfo, {
  //         withCredentials: true,
  //       })
  //       .then((res) => res.json())
  //       .then(data => setUserId(data.id)) //전역에 선언한 userId 앞으로 유저의 정보를 받아올 때는 userId와 token을 함께 요청 보낸다.
  //       .then(userId=> loginHandler(userId))
  //       .then((_)=> window.history.go(-1);) // 로그인 성공 후 landing으로 돌아가기
  //       .catch((err) => {
  //         alert('실패');
  //       })
  //   );
  // }

  // ! test용
  function postHandler() {
    console.log(signInInfo);
    for (let i = 0; i < mockSigup.length; i++) {
      if (
        mockSigup[i].user_email === signInInfo.email &&
        mockSigup[i].user_password === signInInfo.password
      ) {
        console.log({ message: 'ok', id: mockSigup[i].id });
        loginHandler(mockSigup[i].id);
      }
    }
    window.history.go(-1);
  }

  const requiredTextInputData = [
    ['email', '이메일 입력', 'email'],
    ['password', '비밀번호 입력', 'password'],
  ];
  return (
    <div className="signinWrapper">
      <div className="signinPageContainer">
        <div className="signinPageContent">
          <div className="signinFormWrapper">
            {requiredTextInputData.map((el, idx) => {
              return (
                <TextInputGenderRequired
                  key={`TextInputGenderRequired${idx}`}
                  type={el[0]}
                  placeholder={el[1]}
                  property={el[2]}
                  onChangeHandler={onChangeHandler}
                />
              );
            })}
            <div className="signinBtn" onClick={postHandler}>
              로그인
            </div>
          </div>
          <div className="signupRouterWrapper">
            <div className="signupRouterText">아직 회원이 아니신가요?</div>
            <Link to="/signup" className="profile_link">
              <div className="signupBtn">회원가입</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUpWrapper;
