import React from 'react';
import './ProjectList.css';
import { useHistory } from 'react-router-dom';

function ProjectList({ project, setProjectId }) {
  let history = useHistory();

  function handleClick(e) {
    setProjectId(project.project.id);
    return history.push(`/project/${project.project.id}`);
  }

  function handleUpload(e) {
    return history.push('/upload');
  }

  return project.project.project_new ? (
    <div className="list" onClick={() => handleUpload()}>
      <div onClick={handleClick} style={{ cursor: 'pointer' }}>
        <img
          className="listimg"
          src={project.project.project_thumbnail}
          alt={project.project.project_name}
        ></img>
        <p className="listName">{project.project.project_name}</p>
      </div>
    </div>
  ) : (
    <div className="list">
      <div onClick={handleClick} style={{ cursor: 'pointer' }}>
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
