import React from 'react';
import { objectToArray } from '../../utils/etc';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@material-ui/core';

function Item(props) {
  return (
    <Paper>
      <img
        src={URL.createObjectURL(props.curFile)}
        style={{ width: '547px', height: '237px', top: '24px' }}
      />
      <p className="carousel_desc">{props.descriptions[props.idx].value}</p>
    </Paper>
  );
}

function ProjectInfoRender({
  curFiles,
  descriptions,
  project_info,
  modalOn,
  setModalOn,
  postHandler,
  project_name,
}) {
  const project_info_array = objectToArray(project_info);
  return (
    <div className="project_info_render_container">
      <div className="modal_project_name_wrapper">
        <div className="modal_project_name">{project_name}</div>
      </div>
      <div className="carousel_wrapper">
        <Carousel animation="slide">
          {curFiles.map((curFile, idx) => {
            return (
              <Item
                key={idx}
                curFile={curFile}
                descriptions={descriptions}
                idx={idx}
              />
            );
          })}
        </Carousel>
      </div>
      <div className="project_info_wrapper">
        {project_info_array.map(project_info => {
          if (project_info[1]) {
            return (
              <div className="project_info_render_wrapper">
                <span className="project_info_render_subject">
                  {project_info[0]}
                </span>
                <p className="project_info_render_content">{project_info[1]}</p>
              </div>
            );
          } else {
            return '';
          }
        })}
      </div>
      <div className="button_wrapper">
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
            수정
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectInfoRender;
