import React, { useState, useEffect } from 'react';
import './style.css';
import setting from '../../images/setting.svg';
import newProjectClick from '../../images/new_project.svg';
import mockProfile from './mockProfile';
import ProjectList from '../Landing/ProjectList';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// const END_POINT = `${process.env.REACT_APP_API_URL}/profile/${userId}`;

function ProfileWrapper({ hasUserId }) {
  const [profile, setProfile] = useState(mockProfile);

  // ! axios 연결됐을 때 사용
  // useEffect(() => {
  //   const getProfileData = async () => {
  //     await axios
  //       .get(END_POINT, {
  //         withCredentials: true,
  //       })
  //       .then((res) => {
  //         console.log(res.data.data);
  //         setProfile(res.data.data);
  //       })
  //       .catch((err) => {
  //         alert('실패');
  //       });
  //   };
  //   getProfileData();
  // }, []);

  let history = useHistory();

  if (hasUserId !== undefined && !profile.projects[0].project_new === true) {
    const abcsd = {
      project_thumbnail: newProjectClick,
      project_name: 'new project',
      project_new: true,
    };

    profile.projects.unshift(abcsd);
    setProfile(profile);
  }

  function handleGithubLlik(user_github) {
    window.open(user_github, '_blank');
  }

  function handleMypage(e) {
    return history.push('/mypage');
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
