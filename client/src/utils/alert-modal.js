import React, { useState } from 'react';
import './alert-modal.css';
import { useHistory } from 'react-router-dom';

function AlertModal({ alertString, alertBtn }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  console.log('받는값', alertString, alertBtn);
  return (
    <>
      <div className="ModalContainer">
        <button className="ModalBtn" onClick={openModalHandler}>
          {isOpen === false ? 'Open Modal' : 'Opened!'}
        </button>
        {isOpen === true ? (
          <div className="ModalBackdrop">
            <div className="ModalView">
              <div className="desc">
                {alertString}
                <button className="closeBtn" onClick={openModalHandler}>
                  {alertBtn}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default AlertModal;
