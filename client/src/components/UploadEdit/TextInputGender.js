import React from 'react';

function TextInputGender({
  inputname,
  detailString,
  placeholder,
  height1,
  height2,
  project_info,
  onChangeHandler,
  type,
}) {
  return (
    <div className="project_info" style={{ height: `${height1}px` }}>
      <div className="subject_wrapper">{inputname}</div>
      <input
        type={type}
        name={detailString}
        placeholder={placeholder}
        className="project_info_input"
        value={project_info[detailString]}
        onChange={e => onChangeHandler(e, detailString)}
        style={{ height: `${height2}px` }}
      />
    </div>
  );
}

export default TextInputGender;
