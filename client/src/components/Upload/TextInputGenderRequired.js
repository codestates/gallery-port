import React from 'react';

function TextInputGenderRequired({
  inputname,
  detailString,
  stateName,
  stateFunc,
  placeholder,
  type,
}) {
  //inputname은 이메일 같은거, detailString은 state에 문자열한거, stateName은 state, stateFunc은 set함수
  return (
    <div className={detailString}>
      <div className="subject_wrapper">
        {inputname}
        <span className="required">(필수)</span>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="input_small"
        value={stateName}
        onChange={e => stateFunc(e.target.value)}
      />
    </div>
  );
}

export default TextInputGenderRequired;
