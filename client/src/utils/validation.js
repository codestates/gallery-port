// 하은 변경
const bcrypt = require('bcryptjs');

export function checkHashedPassword(password, originalPassword) {
  const result = bcrypt.compareSync(password, originalPassword);
  return result;
}

export function checkPassword(password) {
  if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/.test(password)) {
    // alert('비밀번호는 숫자와 영문자 조합으로 8~20자리를 사용해야 합니다.');
    return false;
  }
  return true;
}

export function checkEmail(asValue) {
  const regExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  if (!regExp.test(asValue)) {
    // alert('이메일 형식에 맞게 다시 작성해 주십시오.');
    return false;
  }
  return true;
}
