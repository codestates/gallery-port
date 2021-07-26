import React from 'react';
import './ProjectList.css';

function ProjectList(project) {
  function handleClick(e) {
    window.location.href = './project';
  }

  function handleUpload(e) {
    window.location.href = './upload';
  }
  // console.log(project.project.project_new);

  return project.project.project_new ? (
    <div className="list" onClick={() => handleUpload()}>
      <div onClick={handleClick}>
        <img
          src={project.project.project_thumbnail}
          alt={project.project.project_name}
        ></img>
        <p className="listName">{project.project.project_name}</p>
      </div>
    </div>
  ) : (
    <div className="list">
      <div onClick={handleClick}>
        <img
          src={project.project.project_thumbnail}
          alt={project.project.project_name}
        ></img>
        <p className="listName">{project.project.project_name}</p>
      </div>
    </div>
  );
}

export default ProjectList;
