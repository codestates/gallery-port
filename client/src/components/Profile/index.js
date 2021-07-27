import React, { useState, useEffect } from 'react';
import './style.css';
import setting from '../../images/setting.svg';
import newProjectClick from '../../images/new_project.svg';
import ProjectList from '../Landing/ProjectList';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const END_POINT = 'https://localhost:80';
// const END_POINT = process.env.REACT_APP_API_URL;

function ProfileWrapper({ hasUserId, setProjectId }) {
  const [profile, setProfile] = useState('');
  const [projectDataLength, setProjectDataLength] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userGithub, setUserGithub] = useState('');
  const [userIntroduction, setUserIntroduction] = useState('');
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState('');


  useEffect(() => {
     axios.get(`${END_POINT}/profile/${hasUserId}`, {
        withCredentials: true,
      }).then((res)=>setProjectDataLength(res.data.data.projects))
      .then((res)=>setUserEmail(res.data.data.user_email))
      .then((res)=>setUserGithub(res.data.data.user_github))
      .then((res)=>setUserIntroduction(res.data.data.user_introduction))
      .then((res)=>setUserName(res.data.data.user_name))
      .then((res)=>setUserPhoto(res.data.data.user_photo))
  }, []);


  let history = useHistory();

  if (hasUserId !== undefined && !projectDataLength) {
    const newproject = {
      project_thumbnail: newProjectClick,
      project_name: 'new project',
      id: '/upload',
    };

    projectDataLength.unshift(newproject);
    setProfile(profile);
  }

  function handleGithubLlik(userGithub) {
    window.open(userGithub, '_blank');
  }

  function handleMypage(e) {
    return history.push(`/mypage/${hasUserId}`);
  }

  return (
    <div className="ProfileWrapper">
      <div className="profileUserInfo">
        <div className="photoWraaper">
          <img
            src={userPhoto}
            alt={userName}
            className="profileUserPhoto"
          ></img>
          {hasUserId !== undefined ? (
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
        <div className="profileUserContent name">{userName}</div>
        <div className="profileUserContent introduction">
          {userIntroduction}
        </div>
        <div className="profileUserContent email">{userEmail}</div>
        {userGithub ? (
          <button onClick={() => handleGithubLlik(userGithub)}>
            깃허브
          </button>
        ) : (
          <div></div>
        )}
      </div>
      <div className="profileUserProjects">
        <div className="projectList">
          {!projectDataLength ? (
            <div>등록된 프로젝트가 없습니다.</div>
          ) : (
            <div>
              {projectDataLength.map((project) => {
                return (
                  <ProjectList
                    key={project.thumbnail}
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

export default ProfileWrapper;
