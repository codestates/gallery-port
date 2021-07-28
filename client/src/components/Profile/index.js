import React, { useState, useEffect } from 'react';
import './style.css';
import setting from '../../images/setting.svg';
import newProjectClick from '../../images/new_project.svg';
import ProjectList from '../Landing/ProjectList';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const END_POINT = 'https://gallery-port-server.com';
// const END_POINT = process.env.REACT_APP_API_URL;

function ProfileWrapper({ hasUserId, setProjectId}) {
  const [profile, setProfile] = useState('');
  const [projectDataLength, setProjectDataLength] = useState([]);
  const [newNotProjectData, setNewNotProjectData] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [userGithub, setUserGithub] = useState('');
  const [userIntroduction, setUserIntroduction] = useState('');
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState('');

  useEffect(() => {
    axios
      .get(`${END_POINT}/profile/${hasUserId}`, {
        withCredentials: true,
      })
      .then((res)=>{
        const data1 = res.data.data.projects
        setProjectDataLength(data1)
        setNewNotProjectData(data1)
        const data2 = res.data.data.user_email
        setUserEmail(data2)
        const data3 = res.data.data.user_github
        setUserGithub(data3)
        const data4 = res.data.data.user_introduction
        setUserIntroduction(data4)
        const data5 = res.data.data.user_name
        setUserName(data5)
        const data6 = res.data.data.user_photo
        setUserPhoto(data6)
      })
  }, []);

  let history = useHistory();

  if (hasUserId !== undefined && projectDataLength.length === 0) {
    const newproject = {
      project_thumbnail: newProjectClick,
      project_name: 'new project',
      id: 'upload',
      newproject:true,
    };

    projectDataLength.unshift(newproject);
    setProfile(profile);
  } else if (hasUserId !== undefined && !projectDataLength[0].newproject) {
    const newproject = {
      project_thumbnail: newProjectClick,
      project_name: 'new project',
      id: 'upload',
      newproject:true,
    };

    projectDataLength.unshift(newproject);
    setProfile(profile);
  }

  if (hasUserId !== undefined && userPhoto == undefined) {
    setUserPhoto(
      'https://user-images.githubusercontent.com/81145387/126490223-f3914368-22d1-4985-90dc-75cdea66b5dd.jpg'
    );
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
          <button onClick={() => handleGithubLlik(userGithub)}>깃허브</button>
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
             {hasUserId !== undefined ?
              projectDataLength.map((project) => {
                return (
                  <ProjectList
                    key={project.thumbnail}
                    project={project}
                    setProjectId={setProjectId}
                    hasUserId={hasUserId}
                  />
                );
              }): newNotProjectData.map((project) => {
                return (
                  <ProjectList
                    key={project.thumbnail}
                    project={project}
                    setProjectId={setProjectId}
                    hasUserId={hasUserId}
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
