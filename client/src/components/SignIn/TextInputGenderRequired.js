import React from 'react';

function TextInputGenderRequired({
  type,
  placeholder,
  property,
  onChangeHandler,
  maxLength,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      style={{ textAlign: 'center' }}
      className="input_large"
      onChange={e => onChangeHandler(e, property)}
      maxLength={maxLength}
    />
  );
}

export default TextInputGenderRequired;
