import React from 'react';

function CheckboxInputGender({ stackName, index, project_stackHandler }) {
  return (
    <div style={{ display: 'flex', marginRight: '16px' }}>
      <input
        id={stackName}
        type="checkbox"
        name={index}
        onChange={e => project_stackHandler(e.target.checked, e.target.name)}
        className="project_stack"
        style={{ marginRight: '4px' }}
      />
      <label
        for={stackName}
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
