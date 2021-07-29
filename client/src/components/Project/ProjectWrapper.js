import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProjectInfoRender from './ProjectInfoRender';
import anonymous from '../../images/anonymous.jpg';
import '../Upload/UploadWrapper.css';
import AlertModal from '../../utils/alert-modal';
import { scrollTo } from '../../utils/etc';

// const END_POINT = 'https://gallery-port-server.com';
const END_POINT = process.env.REACT_APP_API_URL;

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
  const [user_id, setUser_id] = useState('');
  const [user_name, setUser_name] = useState('');
  const [user_photo, setUser_photo] = useState('');
  const [project_name, setProject_name] = useState('');
  const [curFiles, setCurFiles] = useState('');
  const [descriptions, setDescription] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [delSucc, setDelSucc] = useState(false);

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
          setUser_id(res.data.userdata.user_id);
          setUser_name(res.data.userdata.user_name);
          setUser_photo(res.data.userdata.user_photo);
          scrollTo(0)
        })
        .catch((err) => {
          alert('프로젝트 정보를 받아오는데 실패하였습니다.');
        });
    };
    getProjectData();
  }, []);
  async function projectDeleteHandler() {
    await axios
      .delete(`${END_POINT}/project/${projectId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setModalOpen(true);
        if (
          res.message === 'Invalid user' ||
          res.message === 'Unauthorized user'
        ) {
          setDelSucc(false);
          // alert(res.message);
        } else {
          // window.history.go(-1);
          setDelSucc(true);
          // alert('삭제');
        }
      });
  }

  const closeModal = () => {
    setModalOpen(false);

    if (delSucc === true) {
      window.history.go(-1);
    }
  };

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
          {user_id === Number(window.localStorage.getItem('userId')) && user_id ? (
          <div className="project_button_wrapper">
            <Link to="/uploadedit" className="landing_link">
              <div className="project_button">수정</div>
            </Link>
            <div
              className="project_button"
              onClick={() => {
                projectDeleteHandler();
              }}
            >
              삭제
            </div>
          </div>
          ) : null}
        </div>
        <ProjectInfoRender
          curFiles={curFiles}
          descriptions={descriptions}
          project_info={project_info}
        />
      </div>
      <AlertModal
        open={modalOpen}
        close={closeModal}
        alertString={
          delSucc
            ? '프로젝트 삭제하였습니다.'
            : '프로젝트 삭제에 실패하였습니다.'
        }
        alertBtn="확인"
      />
    </div>
  );
}

export default ProjectWrapper;
