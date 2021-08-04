import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TextInputGenderRequired from './TextInputGenderRequired';
import './SignInWrapper.css';
import AlertModal from '../../utils/alert-modal';

const END_POINT = process.env.REACT_APP_API_URL;

function SignInWrapper({ loginHandler, setHasUserId, hasUserId }) {
  const [signInInfo, setSignInInfo] = useState({
    user_email: '',
    user_password: '',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [signinSucc, setSigninSucc] = useState(true);

  function onChangeHandler(e, property) {
    const copied = Object.assign({}, signInInfo);
    copied[property] = e.target.value;
    setSignInInfo(copied);
  }

  function postHandler() {
    return axios
      .post(`${END_POINT}/signin`, signInInfo, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        return res.data.id;
      })
      .then((data) => {
        setHasUserId(data);
        return data;
      })
      .then((userId) => {
        loginHandler(userId);
        window.localStorage.setItem('userId', userId);
        window.history.go(-1);
      })
      .catch((err) => {
        setModalOpen(true);
        console.log(err);
        setSigninSucc(false);
      });
  }

  const closeModal = () => {
    setModalOpen(false);
  };

  const requiredTextInputData = [
    ['email', '이메일 입력', 'user_email', '30'],
    ['password', '비밀번호 입력', 'user_password', '20'],
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
                  maxLength={el[3]}
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
      <AlertModal
        open={modalOpen}
        close={closeModal}
        alertString="로그인 실패하셨습니다."
        alertBtn="확인"
      />
    </div>
  );
}
export default SignInWrapper;
