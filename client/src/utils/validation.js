const bcrypt = require('bcryptjs');

export function checkHashedPassword(password, originalPassword) {
  const result = bcrypt.compareSync(password, originalPassword);
  return result;
}

export function checkPassword(password) {
  if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/.test(password)) {
    return false;
  }
  return true;
}

export function checkEmail(asValue) {
  const regExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  if (!regExp.test(asValue)) {
    return false;
  }
  return true;
}
