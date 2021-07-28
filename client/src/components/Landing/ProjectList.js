import React from 'react';
import './ProjectList.css';
import { useHistory } from 'react-router-dom';

function ProjectList({ project, setProjectId, hasUserId }) {
  let history = useHistory();

  function handleClick(e) {
    if (project.id === 'upload') {
      return history.push('/upload');
    }

    const projects = project.id;
    setProjectId(projects);
    return history.push(`/project/${project.id}`);
  }

  return (
    <div className={hasUserId !== undefined ? 'list' : `list ${project.id}`}>
      <div onClick={() => handleClick()} style={{ cursor: 'pointer' }}>
        <img
          className="listimg"
          src={project.project_thumbnail}
          alt={project.project_name}
        ></img>
        <p className="listName">{project.project_name}</p>
      </div>
    </div>
  );
}

export default ProjectList;
