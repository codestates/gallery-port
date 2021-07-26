import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TextInputGenderRequired from './TextInputGenderRequired';
import './SignInWrapper.css';
import mockSigup from './mockSignup';

const END_POINT = process.env.REACT_APP_API_URL;

function SignInWrapper({ loginHandler, setHasUserId, hasUserId }) {
  const [signInInfo, setSignInInfo] = useState({
    user_email: '',
    user_password: '',
  });

  function onChangeHandler(e, property) {
    const copied = Object.assign({}, signInInfo);
    copied[property] = e.target.value;
    setSignInInfo(copied);
  }

  // ! axios 연결됐을 때 사용
  function postHandler() {
    return axios
      .post(`${END_POINT}/signin`, signInInfo, {
        withCredentials: true,
      })
      .then(res => res.json())
      .then(data => {
        setHasUserId(data.id);
        return data.id;
      })
      .then(userId => {
        loginHandler(userId);
        window.history.go(-1);
      })
      .catch(err => {
        alert('실패');
      });
  }

  // // ! test용
  // function postHandler() {
  //   console.log(signInInfo);
  //   for (let i = 0; i < mockSigup.length; i++) {
  //     if (
  //       mockSigup[i].user_email === signInInfo.email &&
  //       mockSigup[i].user_password === signInInfo.password
  //     ) {
  //       console.log({ message: 'ok', id: mockSigup[i].id });
  //       loginHandler(mockSigup[i].id);
  //     }
  //   }
  //   window.history.go(-1);
  // }

  const requiredTextInputData = [
    ['email', '이메일 입력', 'user_email'],
    ['password', '비밀번호 입력', 'user_password'],
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
export default SignInWrapper;
