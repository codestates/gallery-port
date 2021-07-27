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
          <div className="modalView" style={{ overflow: 'hidden' }}>
            <ProjectInfoRender
              curFiles={curFiles}
              descriptions={descriptions}
              project_info={project_info}
              modalOn={modalOn}
              setModalOn={setModalOn}
              postHandler={postHandler}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Modal;
