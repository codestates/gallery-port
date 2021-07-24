import React from 'react';
import { objectToArray } from '../../utils/etc';

function ProjectInfoRender({ curFiles, descriptions, project_info }) {
  const project_info_array = objectToArray(project_info);
  return (
    <div className="project_info_render_container">
      <div className="temper_image_viewer">
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
      </div>
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
  );
}

export default ProjectInfoRender;
