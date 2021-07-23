import React from 'react';

function Modal({ modalOn, setModalOn, curFiles, descriptions }) {
  return (
    <>
      {modalOn && curFiles ? (
        <div className="modalBackdrop">
          <div
            className="modalView"
            onClick={() => {
              setModalOn(!modalOn);
            }}
          >
            {curFiles.map((curFile, idx) => {
              return (
                <div className="projectInfo">
                  <img
                    key={`imgKey${idx}`}
                    src={URL.createObjectURL(curFile)}
                    className="preview"
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Modal;
