import React from 'react';
import './style.css';

function ErrorText() {
  return (
    <div className="errorText">
      <div className="errorTitle stop-dragging">
        페이지가 존재하지 않습니다. <p>5초 후에 메인으로 이동합니다.</p>
      </div>
    </div>
  );
}

export default ErrorText;
