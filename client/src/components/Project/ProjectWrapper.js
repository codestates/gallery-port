import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ProjectInfoRender from './ProjectInfoRender';
import anonymous from '../../images/anonymous.jpg';
import '../Upload/UploadWrapper.css';

const END_POINT = 'https://gallery-port-server.com';
// const END_POINT = process.env.REACT_APP_API_URL;

function ProjectWrapper({ hasUserId, projectId }) {
  const [project_info, setProject_info] = useState({
    project_start: '',
    project_end: '',
    project_team: '',
    project_introduction: '',
    project_feature: '',
    project_github: '',
    project_front_stack: '',
    project_back_stack: '',
    project_deploy_stack: '',
    project_url: '',
  });
  const [user_name, setUser_user_name] = useState('');
  const [user_photo, setUser_photo] = useState('');
  const [project_name, setProject_name] = useState('');
  const [curFiles, setCurFiles] = useState('');
  const [descriptions, setDescription] = useState();
  let history = useHistory();

  useEffect(() => {
    const getProjectData = () => {
      axios
        .get(`${END_POINT}/project/${projectId}`, {
          withCredentials: true,
        })
        .then((res) => {
          const urlArr = [];
          const descArr = [];

          res.data.projectdata.project_content.forEach((el) => {
            urlArr.push(el.image);
            descArr.push(el.text);
          });

          setCurFiles(urlArr);
          setDescription(descArr);
          setProject_name(res.data.projectdata.project_name);
          setProject_info({
            project_start: res.data.projectdata.project_start,
            project_end: res.data.projectdata.project_end,
            project_team: res.data.projectdata.project_team,
            project_introduction: res.data.projectdata.project_introduction,
            project_feature: res.data.projectdata.project_feature,
            project_github: res.data.projectdata.project_github,
            project_front_stack: res.data.projectdata.project_front_stack,
            project_back_stack: res.data.projectdata.project_back_stack,
            project_deploy_stack: res.data.projectdata.project_deploy_stack,
            project_url: res.data.projectdata.project_url,
          });
          setUser_user_name(res.data.userdata.user_name);
          setUser_photo(res.data.userdata.user_photo);
        })
        .catch((err) => {
          alert('실패');
        });
    };
    getProjectData();
  }, []);
  function project_delete_handler() {
    let projectid = window.location.href.split('/')[4];
    axios
      .delete(`${END_POINT}/project/${projectid}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (
          res.message === 'Invalid user' ||
          res.message === 'Unauthorized user'
        ) {
          alert(res.message);
        } else {
          alert('삭제');
        }
      });
  }
  return (
    <div className="projectWrapper">
      <div className="projectPageContainer">
        <div className="project-header">
          <div className="project_master">
            <div
              className="user_photo"
              style={
                user_photo
                  ? {
                      position: 'absolute',
                      width: '52px',
                      height: '52px',
                      left: '0px',
                      top: '72px',
                      borderRadius: '50%',
                      backgroundImage: `url(${user_photo})`,
                      backgroundSize: 'cover',
                    }
                  : {
                      position: 'absolute',
                      width: '52px',
                      height: '52px',
                      left: '0px',
                      top: '72px',
                      borderRadius: '50%',
                      backgroundImage: `url(${anonymous})`,
                      backgroundSize: 'cover',
                    }
              }
            ></div>
            <div className="names_wrapper">
              <div className="project_page_project_name">
                {project_name ? project_name : 'project:gallery'}
              </div>
              <div className="project_page_user_name">
                {user_name ? user_name : 'anonymous'}
              </div>
            </div>
          </div>
          <div className="project_button_wrapper">
            <Link to="/uploadedit" className="landing_link">
              <div className="project_button">수정</div>
            </Link>
            <div
              className="project_button"
              onClick={() => {
                project_delete_handler();
              }}
            >
              삭제
            </div>
          </div>
        </div>
        <ProjectInfoRender
          curFiles={curFiles}
          descriptions={descriptions}
          project_info={project_info}
        />
      </div>
    </div>
  );
}

export default ProjectWrapper;
