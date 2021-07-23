import React from 'react';
import './style.css';
import logo from '../../../images/logo_b.svg';

function Header() {
  return (
    <div className="header">
      <div className="headerInner">
        <img src={logo} alt="logo"></img>
      </div>
    </div>
  );
}

export default Header;
