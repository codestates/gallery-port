import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Upload/UploadWrapper.css';

const END_POINT = process.env.REACT_APP_API_URL;

function ProejctWrapper() {
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
  const [project_name, setProject_name] = useState(''); //필수
  const [project_stack, setProject_stack] = useState([]); //필수
  const [project_thumbnail, setProject_thumbnail] = useState(''); //필수
  const [curFiles, setCurFiles] = useState(''); //필수
  const [descriptions, setDescription] = useState(); //필수

  function project_delete_handler() {
    let projectid = window.location.href.split('/')[4];
    axios.delete(`${END_POINT}/project/${projectid}`, {
      withCredentials: true,
    }).then(res => {
      if (res.message === "Invalid user" || res.message === "Unauthorized user") {
        alert(res.message);
      } else {
        alert("삭제");
        // history.go(-1);
      }
    });
  }
  return (
    <div className="projectWrapper">
      <div className="projectPageContainer">
        <div className="projectHeader">
          <div className="projectMaster"></div>
          <div className="project_button_wrapper">
            <Link to="/uploadedit" className="landing_link">
              <div className="edit_button">수정</div>
            </Link>
            <div
              className="delete_button"
              onClick={() => {
                project_delete_handler();
              }}
            >
              삭제
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProejctWrapper;
