import React from 'react';
import TextInputGender from './TextInputGender';
import ImageUploaderOne from './ImageUploaderOne';
import TextInputGenderRequired from './TextInputGenderRequired';

function SignUpInfo({
  user_email,
  setUser_email,
  user_password,
  setUser_password,
  password_confirm,
  setPassword_confirm,
  user_image,
  setUser_image,
  user_info,
  setUser_info,
  email_isValid,
  pw_isValid,
  pw_confirm,
}) {
  const textInputData = [
    ['유저 이름', 'user_name', '팀원', 72, 40, 'text'],
    [
      '유저 소개',
      'user_introduction',
      '50자 이내로 입력해주세요.',
      112,
      80,
      'text',
    ],
    ['깃허브 링크', 'user_github', 'url', 72, 40, 'url'],
  ];

  const requiredTextInputData = [
    [
      '이메일',
      'user_email',
      user_email,
      setUser_email,
      '이메일',
      'email',
      email_isValid,
    ],
    [
      '비밀번호',
      'user_password',
      user_password,
      setUser_password,
      '8자 이상 입력해주세요',
      'password',
      pw_isValid,
    ],
    [
      '비밀번호 확인',
      'password_confirm',
      password_confirm,
      setPassword_confirm,
      '비밀번호 확인',
      'password',
      pw_confirm,
    ],
  ];
  function onChangeHandler(e, property) {
    const copied = Object.assign({}, user_info);
    copied[property] = e.target.value;
    setUser_info(copied);
  }

  return (
    <>
      {requiredTextInputData.map(el => {
        return (
          <TextInputGenderRequired
            inputname={el[0]}
            detailString={el[1]}
            stateName={el[2]}
            stateFunc={el[3]}
            placeholder={el[4]}
            type={el[5]}
            isValid={el[6]}
          />
        );
      })}
      <ImageUploaderOne
        project_info_detail={'유저 사진'}
        required={'(필수)'}
        stateName={user_image}
        stateFunc={setUser_image}
        condition_subject={'등록조건'}
        condition_desc={'170x280(px), 25KB 이하, jpg, jpeg, png만 가능'}
      />
      <div className="textInputContainer">
        {textInputData.map(el => {
          return (
            <TextInputGender
              inputname={el[0]}
              detailString={el[1]}
              placeholder={el[2]}
              height1={el[3]}
              height2={el[4]}
              user_info={user_info}
              onChangeHandler={onChangeHandler}
              type={el[5]}
            />
          );
        })}
      </div>
    </>
  );
}

export default SignUpInfo;
