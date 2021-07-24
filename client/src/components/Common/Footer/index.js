import React from 'react';
import './style.css';
import arrow from '../../../images/arrow_right_b.svg';

function Footer(props) {
  return (
    <div
      className={props.Landing ? 'footerBox unfixed' : 'footerBox fiexd'}
      style={{
        postion: 'absolute',
        top: window.innerHeight + 1180 + 80,
      }}
    >
      <div className="footerInner">
        <div>
          <p className="csTitle">
            고객센터<img src={arrow} alt="arrow"></img>
          </p>
          <p className="csContact">02-1004-1004</p>
          <p className="csWorkTime">평일 09:00 ~ 18:00 (주말 & 공휴일 제외)</p>
        </div>
        <div className="okteam">
          회사명 : 200ok | 서비스 소개 : Gallery:port Github | 공동 대표 및
          {`연락처 : 강하은 Github, 권효승 ${process.env.REACT_APP_TEST}, 박성현 Github, 박종아 Github`}
        </div>
      </div>
    </div>
  );
}

export default Footer;
