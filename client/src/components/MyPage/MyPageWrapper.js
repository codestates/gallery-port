import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyPageInfo from './MyPageInfo';
import { checkEmail, checkPassword, checkHashedPassword } from '../../utils/validation';
import { scrollTo } from '../../utils/etc';
import { useHistory } from 'react-router-dom';
import { debounce } from 'lodash';
import '../SignUp/SignUpWrapper.css';
import { hash } from 'bcryptjs';

// const END_POINT = 'https://gallery-port-server.com';
const END_POINT = process.env.REACT_APP_API_URL;

function MyPageWrapper({ hasUserId }) {
  const [user_info, setUser_info] = useState({
    user_name: '',
    user_introduction: '',
    user_github: '',
  });

  const [email_isValid, setEmail_isValid] = useState(false);
  const [pw_isValid, setPw_isValid] = useState(false);
  const [pw_confirm, setPw_confirm] = useState(false);
  const [isSecond, setIsSecond] = useState(false); //이미지 업로드 함수를 변경하기위한 state
  const [user_email, setUser_email] = useState(''); //필수
  const [user_password, setUser_password] = useState(null); //필수
  const [password_confirm, setPassword_confirm] = useState(''); //필수
  const [user_image, setUser_image] = useState(''); //필수 
  const [hashedPassword, setHashedPassword] = useState('');  // 하은 변경


  useEffect(() => {
    const getUserData = () => {
      axios
        .get(`${END_POINT}/mypage/${hasUserId}`, {
          withCredentials: true,
        })
        .then(res => {
          setUser_email(res.data.data.user_email);
          setHashedPassword(res.data.data.user_password);
          setUser_image(res.data.data.user_photo);
          setUser_info({
            user_name: res.data.data.user_name,
            user_introduction: res.data.data.user_introduction,
            user_github: res.data.data.user_github,
          });
        })
        .catch(err => {
          alert('실패');
        });
    };
    getUserData();
  }, []);

  useEffect(() => {
    if (checkEmail(user_email)) {
      setEmail_isValid(true);
    } else {
      setEmail_isValid(false);
    }
    debouncePasswordValidation();
  }, [user_email, user_password, password_confirm]);

  const debouncePasswordValidation = debounce(() => {
    if (user_password) { // 유저가 비밀번호를 변경할 경우
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
    } else {
      if (checkHashedPassword(password_confirm, hashedPassword)) {
        setPw_isValid(true);
        setPw_confirm(true);
      } else {
        setPw_isValid(true);
        setPw_confirm(false);
      }
    }
  }, 800);

  let history = useHistory();

  function patchHandler() {
    const formData = new FormData();

    formData.append('user_email', user_email);
    formData.append('user_password', user_password);
    formData.append('image', user_image);
    formData.append('user_info', JSON.stringify(user_info));

    for (let el of formData.entries()) {
      console.log(el);
    }
    return axios
      .patch(`${END_POINT}/mypage/${hasUserId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      .then(res => {
        alert('성공');
        history.go(-1);
      })
      .catch(err => {
        alert('실패');
      });
  }

  return (
    <div className="mypageWrapper">
      <div className="mypagePageContainer">
        <MyPageInfo
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
          isSecond={isSecond}
          setIsSecond={setIsSecond}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
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
                ? patchHandler()
                : scrollTo(0)
            }
          >
            정보수정
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPageWrapper;
