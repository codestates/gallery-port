import React, { useState, useEffect } from 'react';
import './LandingProjects.css';
// import mockProjects from './mockProjects';
import ProjectList from './ProjectList';
// import axios from 'axios';

// const END_POINT = `${process.env.REACT_APP_API_URL}`;

function LandingProjects({ stackProjectData, setProjectId }) {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    setProjects(stackProjectData);
  }, []);

  return (
    <div
      className="landingProjects"
      style={{
        position: 'absolute',
        top: window.innerHeight + 80,
        left: 0,
      }}
    >
      <div className="landingProjectsInner">
        <div className="projectList">
          {!projects ? (
            <div>등록된 프로젝트가 없습니다.</div>
          ) : (
            <div>
              {projects.map((project) => {
                return (
                  <ProjectList
                    key={project.id}
                    project={project}
                    setProjectId={setProjectId}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingProjects;
