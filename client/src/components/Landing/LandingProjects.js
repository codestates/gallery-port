import React from 'react';
import './LandingProjects.css';
import ProjectList from './ProjectList';

// const END_POINT = 'https://gallery-port-server.com';
const END_POINT = process.env.REACT_APP_API_URL;

function LandingProjects({
  stackProjectData,
  setProjectId,
  hasUserId,
  Landing,
}) {
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
          {stackProjectData[0] === undefined ? (
            <div>등록된 프로젝트가 없습니다.</div>
          ) : (
            <div>
              {stackProjectData.map(project => {
                return (
                  <ProjectList
                    key={project.id}
                    project={project}
                    setProjectId={setProjectId}
                    hasUserId={hasUserId}
                    Landing={Landing}
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
