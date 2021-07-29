import React from 'react';
import './style.css';
function LoadingText() {

  return (
    <>
      <div className="loadingText">
        <div className="loadingTitle stop-dragging">
          로딩 중입니다. <p>잠시만 기다려 주십시오.</p>
        </div>
      </div>
    </>
  );
}

export default LoadingText;
