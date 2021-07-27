import React, { useEffect } from 'react';
import './LandingProjects.css';
import ProjectList from './ProjectList';
import axios from 'axios';

// const END_POINT = 'https://localhost:80';
const END_POINT = process.env.REACT_APP_API_URL;

function LandingProjects({
  stackProjectData,
  setProjectId,
  setStackProjectData,
}) {
  useEffect(() => {
    const getAllData = () => {
      return axios
        .get(`${END_POINT}`, { withCredentials: true })
        .then((res) => {
          const projects = res.data.data.projects;
          setStackProjectData(projects);
        });
    };

    getAllData();
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
          {stackProjectData[0] === undefined ? (
            <div>등록된 프로젝트가 없습니다.</div>
          ) : (
            <div>
              {stackProjectData.map((project) => {
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
