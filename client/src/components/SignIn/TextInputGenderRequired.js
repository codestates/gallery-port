import React from 'react';

function TextInputGenderRequired({
  type,
  placeholder,
  property,
  onChangeHandler,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="input_large"
      onChange={e => onChangeHandler(e, property)}
    />
  );
}

export default TextInputGenderRequired;
