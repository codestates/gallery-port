import React, { useState } from 'react';
import ProjectInfoRender from './ProjectInfoRender';
import { useHistory } from 'react-router-dom';
import AlertModal from '../../utils/alert-modal';

function Modal({
  modalOn,
  setModalOn,
  descriptions,
  curFiles,
  patchHandler,
  project_info,
  project_name,
  editSucc,
  modalOpen,
  setModalOpen,
}) {
  // const [modalOpen, setModalOpen] = useState(false);
  // const [editSucc, setEditSucc] = useState(false);
  let history = useHistory();

  const closeModal = () => {
    setModalOpen(false);
    if (editSucc === true) {
      history.go(-1);
    }
  };

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
              project_name={project_name}
            />
          </div>
          <AlertModal
            style={{ zindex: '999' }}
            open={modalOpen}
            close={closeModal}
            alertString={
              editSucc
                ? '프로젝트 수정하였습니다.'
                : '프로젝트 수정에 실패하였습니다.'
            }
            alertBtn="확인"
          />
        </div>
      ) : null}
    </>
  );
}

export default Modal;