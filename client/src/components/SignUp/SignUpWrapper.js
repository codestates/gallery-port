import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SignUpInfo from './SignUpInfo';
import { checkEmail, checkPassword } from '../../utils/validation';
import './SignUpWrapper.css';

function SignUpWrapper() {
  const [user_info, setUser_info] = useState({
    user_name: '',
    user_introduction: '',
    user_github: '',
  });
  const [email_isValid, setEmail_isValid] = useState(false);
  const [pw_isValid, setPw_isValid] = useState(false);

  const [user_email, setUser_email] = useState(''); //필수
  const [user_password, setUser_password] = useState(''); //필수
  const [password_confirm, setPassword_confirm] = useState(''); //필수
  const [user_image, setUser_image] = useState(''); //필수

  useEffect(() => {
    if (checkEmail(user_email)) {
      setEmail_isValid(true);
    } else {
      setEmail_isValid(false);
    }

    if (checkPassword(user_password)) {
      setPw_isValid(true);
    } else {
      setPw_isValid(false);
    }
  }, [user_email, user_password]);

  function postHandler() {
    const formData = new FormData();

    formData.append('user_email', user_email);
    formData.append('user_password', user_password);
    formData.append('image', user_image);
    formData.append('user_info', user_info);

    for (let el of formData.entries()) {
      console.log(el);
    }
    return axios //preview화면에서 업로드 버튼을 누르면 post요청이 일어나고 로딩화면으로 전환, profile화면으로 redirection 그리고 get으로 post해놓은 data를 불러온다 200ok 떨어지면 로딩화면 off
      .post(`https://gallery-port-server.com/signup`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      .then(res => {
        alert('성공');
      })
      .catch(err => {
        alert('실패');
      });
  }

  return (
    <div className="signupWrapper">
      <div className="projectUploadPageContainer">
        <SignUpInfo
          user_email={user_email}
          setUser_email={setUser_email}
          user_password={user_password}
          setUser_password={setUser_password}
          password_confirm={password_confirm}
          setPassword_confirm={setPassword_confirm}
          user_image={user_image}
          setUser_image={setUser_image}
          user_info={user_info}
          setUser_info={setUser_info}
          email_isValid={email_isValid}
          pw_isValid={pw_isValid}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className="previewBtn" onClick={() => postHandler()}>
            회원가입
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpWrapper;