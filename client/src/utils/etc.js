export function inputBtnClick(e, inputRef) {
  e.preventDefault();
  inputRef.current.click();
}

export function objectToArray(object) {
  return Object.entries(object);
}
