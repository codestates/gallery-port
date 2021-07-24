import React from 'react';

function TextInputGender({
  inputname,
  detailString,
  placeholder,
  height1,
  height2,
  user_info,
  onChangeHandler,
  type,
}) {
  return (
    <div className="user_info" style={{ height: `${height1}px` }}>
      <div className="subject_wrapper">{inputname}</div>
      <input
        type={type}
        name={detailString}
        placeholder={placeholder}
        className="user_info_input"
        value={user_info[detailString]}
        onChange={e => onChangeHandler(e, detailString)}
        style={{ height: `${height2}px` }}
      />
    </div>
  );
}

export default TextInputGender;
