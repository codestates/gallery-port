export function inputBtnClick(e, inputRef) {
  e.preventDefault();
  inputRef.current.click();
}

export function objectToArray(object) {
  return Object.entries(object);
}

export function scrollTo(scrollValue) {
  const scrollOptions = {
    top: scrollValue,
    behavior: 'smooth',
  };
  window.scrollTo(scrollOptions);
}
