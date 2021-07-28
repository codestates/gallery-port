import React from 'react';
import './style.css';
import { useHistory } from 'react-router-dom';

function ErrorText() {
  let history = useHistory();

  setTimeout(function () {
    history.push('/');
  }, 3000);

  return (
    <div className="errorText">
      <div className="errorTitle stop-dragging">
        페이지가 존재하지 않습니다. <p>3초 후에 메인으로 이동합니다.</p>
      </div>
    </div>
  );
}

export default ErrorText;
