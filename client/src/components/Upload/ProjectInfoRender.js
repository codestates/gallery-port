import React from 'react';
import { objectToArray } from '../../utils/etc';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@material-ui/core';

function Item(props) {
  return (
    <Paper>
      <img src={URL.createObjectURL(props.curFile)} style={{ width: '40vw' }} />
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
}) {
  const project_info_array = objectToArray(project_info);
  return (
    <div className="project_info_render_container">
      {/* <div className="temper_image_viewer">
        {curFiles.map((curFile, idx) => {
          //description과 함께 처리하는 부분 알아보자
          return (
            <div className="projectInfo">
              <img
                key={idx}
                src={URL.createObjectURL(curFile)}
                className="preview"
              />
              {descriptions ? <p>{descriptions[idx].value}</p> : null}
            </div>
          );
        })}
      </div> */}
      <Carousel animation="slide">
        {curFiles.map((curFile, idx) => {
          return <Item key={idx} curFile={curFile} />;
        })}
      </Carousel>
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
  );
}

export default ProjectInfoRender;
