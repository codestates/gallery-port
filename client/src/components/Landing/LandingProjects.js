import React, { useState } from 'react';
import './LandingProjects.css';
import mockProjects from './mockProjects';
import ProjectList from './ProjectList';

function LandingProjects() {
  const [projects] = useState(mockProjects);

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
          {!projects.length ? (
            <div>등록된 프로젝트가 없습니다.</div>
          ) : (
            <div>
              {projects.map((project) => {
                return <ProjectList key={project.id} project={project} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingProjects;
