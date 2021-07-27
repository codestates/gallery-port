import React from 'react';
import ProjectInfoRender from './ProjectInfoRender';

function Modal({
  modalOn,
  setModalOn,
  descriptions,
  curFiles,
  patchHandler,
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
              patchHandler={patchHandler}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Modal;
