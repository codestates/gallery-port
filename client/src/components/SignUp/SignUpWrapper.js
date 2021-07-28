import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SignUpInfo from './SignUpInfo';
import { checkEmail, checkPassword } from '../../utils/validation';
import { scrollTo } from '../../utils/etc';
import './SignUpWrapper.css';
import { useHistory } from 'react-router-dom';
import AlertModal from '../../utils/alert-modal';

// const END_POINT = 'https://gallery-port-server.com';
const END_POINT = process.env.REACT_APP_API_URL;

function SignUpWrapper() {
  const [user_info, setUser_info] = useState({
    user_name: '',
    user_introduction: '',
    user_github: '',
  });
  const [email_isValid, setEmail_isValid] = useState(false);
  const [pw_isValid, setPw_isValid] = useState(false);
  const [pw_confirm, setPw_confirm] = useState(false);

  const [user_email, setUser_email] = useState(''); //필수
  const [user_password, setUser_password] = useState(''); //필수
  const [password_confirm, setPassword_confirm] = useState(''); //필수
  const [user_image, setUser_image] = useState(''); //필수
  const [modalOpen, setModalOpen] = useState(false);
  const [joinSucc, setJoinSucc] = useState(false);

  // const openModal = () => {
  //   setModalOpen(true);
  // };

  let history = useHistory();

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
    if (user_password === password_confirm) {
      setPw_confirm(true);
    } else {
      setPw_confirm(false);
    }
  }, [user_email, user_password, password_confirm]);

  function postHandler() {
    setModalOpen(true);
    const formData = new FormData();

    formData.append('user_email', user_email);
    formData.append('user_password', user_password);
    formData.append('image', user_image);
    formData.append('user_info', JSON.stringify(user_info));

    for (let el of formData.entries()) {
      console.log(el);
    }
    return axios //preview화면에서 업로드 버튼을 누르면 post요청이 일어나고 로딩화면으로 전환, profile화면으로 redirection 그리고 get으로 post해놓은 data를 불러온다 200ok 떨어지면 로딩화면 off
      .post(`${END_POINT}/signup`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      .then((res) => {
        // history.go(-1);
        setJoinSucc(true);
        // alert('회원가입에 성공하였습니다.');
      })
      .catch((err) => {
        setJoinSucc(false);
        // alert('회원가입에 실패하였습니다.');
      });
  }

  const closeModal = () => {
    setModalOpen(false);
    history.go(-1);
  };

  return (
    <div className="signupWrapper">
      <div className="signupPageContainer">
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
          pw_confirm={pw_confirm}
        />
        <div
          style={
            {
              // display: 'flex',
              // flexDirection: 'column',
              // alignItems: 'center',
            }
          }
        >
          <div
            className="previewBtn"
            onClick={() =>
              user_email &&
              user_password &&
              password_confirm &&
              email_isValid &&
              pw_isValid &&
              pw_confirm
                ? postHandler()
                : scrollTo(0)
            }
          >
            회원가입
          </div>
        </div>
      </div>
      <AlertModal
        open={modalOpen}
        close={closeModal}
        alertString={
          joinSucc ? '회원가입에 성공하였습니다.' : '회원가입에 실패하였습니다.'
        }
        alertBtn="확인"
      />
    </div>
  );
}

export default SignUpWrapper;
