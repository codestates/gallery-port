import React from 'react';
import { objectToArray } from '../../utils/etc';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@material-ui/core';

function Item(props) {
  return (
    <Paper>
      <img
        src={props.curFile}
        style={{
          width: '1120px',
          height: '450px',
          top: '24px',
          objectFit: 'contain',
        }}
        alt="description"
      />
      <p className="project_page_carousel_desc">
        {props.descriptions !== [] ? props.descriptions[props.idx] : null}
      </p>
    </Paper>
  );
}

function ProjectInfoRender({ curFiles, descriptions, project_info }) {
  const project_info_array = objectToArray(project_info);
  return (
    <>
      <div className="project_page_carousel_wrapper">
        <Carousel animation="slide">
          {curFiles
            ? curFiles.map((curFile, idx) => {
                return (
                  <Item
                    key={idx}
                    curFile={curFile}
                    descriptions={descriptions ? descriptions : []}
                    idx={idx}
                  />
                );
              })
            : null}
        </Carousel>
      </div>
      <div className="project_page_info_wrapper">
        {project_info_array.map(project_info => {
          if (project_info[1]) {
            return (
              <div className="project_page_project_info_render_wrapper">
                <span className="project_page_project_info_render_subject">
                  {project_info[0]}
                </span>
                <p className="project_page_project_info_render_content">
                  {project_info[1]}
                </p>
              </div>
            );
          } else {
            return '';
          }
        })}
      </div>
    </>
  );
}

export default ProjectInfoRender;
