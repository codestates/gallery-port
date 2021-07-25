import React, { useState, useEffect } from 'react';
import './style.css';
import setting from '../../images/setting.svg';
import newProjectClick from '../../images/new_project.svg';
import mockProfile from './mockProfile';
import ProjectList from '../Landing/ProjectList';

function ProfileWrapper() {
  const [profile, setProfile] = useState(mockProfile);
  const [logged, setLogged] = useState(true);

  useEffect(() => {
    // console.log('test1');
    // console.log(profile.projects[0].project_new);
    if (logged && !profile.projects[0].project_new === true) {
      const abcsd = {
        project_thumbnail: newProjectClick,
        project_name: 'new project',
        project_new: true,
      };
      //   console.log('test2');
      profile.projects.unshift(abcsd);
      //   console.log(profile);
      setProfile(profile);
    }
  }, []);

  function handleGithubLlik(user_github) {
    window.open(user_github, '_blank');
  }

  function handleMypage(e) {
    window.location.href = './mypage';
  }

  return (
    <div className="ProfileWrapper">
      <div className="profileUserInfo">
        <div className="photoWraaper">
          <img
            src={profile.user_photo}
            alt={profile.user_name}
            className="profileUserPhoto"
          ></img>
          {logged ? (
            <img
              src={setting}
              alt="setting"
              className="setting"
              onClick={() => handleMypage()}
            ></img>
          ) : (
            <div></div>
          )}
        </div>
        <div className="profileUserContent name">{profile.user_name}</div>
        <div className="profileUserContent introduction">
          {profile.user_introduction}
        </div>
        <div className="profileUserContent email">{profile.user_email}</div>
        {profile.user_github ? (
          <button onClick={() => handleGithubLlik(profile.user_github)}>
            깃허브
          </button>
        ) : (
          <div></div>
        )}
      </div>
      <div className="profileUserProjects">
        <div className="projectList">
          {!profile.projects.length ? (
            <div>등록된 프로젝트가 없습니다.</div>
          ) : (
            <div>
              {profile.projects.map((project) => {
                return (
                  <ProjectList key={project.thumbnail} project={project} />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileWrapper;
