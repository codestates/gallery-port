import React, { useState, useEffect } from 'react';
import './LandingProjects.css';
import mockProjects from './mockProjects';
import ProjectList from './ProjectList';
import axios from 'axios';

// const END_POINT = `${process.env.REACT_APP_API_URL}`;

function LandingProjects() {
  const [projects, setProjects] = useState(mockProjects);

  // ! axios 연결됐을 때 사용
  // useEffect(() => {
  //   const getProjectsData = async () => {
  //     await axios
  //       // .get(`${END_POINT}/mypage/${userId}`, {
  //       .get(END_POINT, {
  //         withCredentials: true,
  //       })
  //       .then((res) => {
  //         console.log(res.data.data.projects);
  //         setProjects(res.data.data.projects);
  //       })
  //       .catch((err) => {
  //         alert('실패');
  //       });
  //   };
  //   getProjectsData();
  // }, []);

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
