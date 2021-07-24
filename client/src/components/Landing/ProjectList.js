import React from 'react';
import './ProjectList.css';

function ProjectList(project) {
  function handleClick(e) {
    window.location.href = './project';
  }

  return (
    <div className="list" key={project.project.id}>
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
