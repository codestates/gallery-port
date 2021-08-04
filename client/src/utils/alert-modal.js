import React from 'react';
import './alert-modal.css';

function AlertModal(props) {
  const { open, close, alertString, alertBtn } = props;

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      <div className="ModalContainer">
        {open === true ? (
          <div className="ModalBackdrop">
            <div className="ModalView">
              <div className="desc">
                {alertString}
                <button className="closeBtn" onClick={close}>
                  {alertBtn}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AlertModal;
