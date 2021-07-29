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
          회사명 : 200ok | 서비스 소개 :
          <a
            href="https://github.com/codestates/gallery-port"
            target="_blank"
            rel="noopener noreferrer"
            style={{ cursor: 'pointer' }}
          >
            Gallery:port Github
          </a>
          | 공동 대표 및 연락처 :
          <a
            href="https://github.com/vodkamitlime"
            target="_blank"
            rel="noopener noreferrer"
            style={{ cursor: 'pointer' }}
          >
            강하은 Github
          </a>
          ,
          <a
            href="https://github.com/hyoogu"
            target="_blank"
            rel="noopener noreferrer"
            style={{ cursor: 'pointer' }}
          >
            권효승 Github
          </a>
          ,
          <a
            href="https://github.com/bmaner"
            target="_blank"
            rel="noopener noreferrer"
            style={{ cursor: 'pointer' }}
          >
            박성현 Github
          </a>
          ,
          <a
            href="https://github.com/jong-ah"
            target="_blank"
            rel="noopener noreferrer"
            style={{ cursor: 'pointer' }}
          >
            박종아 Github
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
