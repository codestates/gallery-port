import React from 'react';
import ProjectInfoRender from './ProjectInfoRender';

function Modal({
  modalOn,
  setModalOn,
  descriptions,
  curFiles,
  postHandler,
  project_info,
}) {
  return (
    <>
      {modalOn && curFiles ? (
        <div className="modalBackdrop">
          <div className="modalView">
            <ProjectInfoRender
              curFiles={curFiles}
              descriptions={descriptions}
              project_info={project_info}
            />
            <div className="modal_button_wrapper">
              <div
                className="modal_button_cancel"
                onClick={() => {
                  setModalOn(!modalOn);
                }}
              >
                취소
              </div>
              <div className="modal_button_upload" onClick={postHandler}>
                등록
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Modal;
