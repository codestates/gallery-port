import React from 'react';

function CheckboxInputGender({
  stackName,
  isChecked,
  project_stackHandler,
  idx,
}) {
  return (
    <div style={{ display: 'flex', marginRight: '16px' }}>
      <input
        id={stackName}
        type="checkbox"
        defaultChecked={isChecked} //defaultChecked로 선택시켜야한다.
        name={idx}
        onChange={e => project_stackHandler(e.target.checked, e.target.name)}
        className="project_stack"
        style={{ marginRight: '4px' }}
      />
      <label
        style={{
          color: '#8C8D96',
          lineHeight: '16px',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 'normal',
        }}
      >
        {stackName}
      </label>
    </div>
  );
}

export default CheckboxInputGender;
