import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import ProjectUploadInfo from './ProjectUploadInfo';
import { scrollTo } from '../../utils/etc';
import './UploadWrapper.css';
import { useHistory } from 'react-router-dom';

const END_POINT = 'https://gallery-port-server.com';
// const END_POINT = process.env.REACT_APP_API_URL;

function UploadWrapper({ hasUserId }) {
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
  const [modalOn, setModalOn] = useState(false);
  let history = useHistory();

  const stackArray = [
    'JavaScript',
    'SQL',
    'Python',
    'Java',
    'C#',
    'PHP',
    'etc',
  ];

  useEffect(() => {
    if (!hasUserId) {
      history.push('/error');
    }

    const descElemArray = document.querySelectorAll('.descriptionInput');
    setDescription(descElemArray);
  }, [curFiles, project_info, project_stack, hasUserId]);

  function project_stackHandler(checked, itemName) {
    if (checked && !project_stack.includes(stackArray[itemName])) {
      setProject_stack([
        ...project_stack,
        stackArray[itemName].toLocaleLowerCase(),
      ]);
    } else {
      setProject_stack(
        project_stack.filter((el) => {
          return el !== stackArray[itemName].toLocaleLowerCase();
        })
      );
    }
  }

  function postHandler() {
    const formData = new FormData();
    const project_content = [];
    for (let i = 0; i < descriptions.length; i++) {
      project_content.push(descriptions[i].value);
    }
    for (let el of curFiles) {
      formData.append('image', el);
    }
    formData.append('project_name', project_name);
    formData.append('project_stack', JSON.stringify(project_stack));
    formData.append('thumbnail', project_thumbnail);
    formData.append('project_content', JSON.stringify(project_content));
    formData.append('project_info', JSON.stringify(project_info));

    return axios
      .post(`${END_POINT}/project`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      .then((res) => {
        alert('성공');
        history.go(-1);
      })
      .catch((err) => {
        alert('실패');
      });
  }

  function previewHandler() {
    setModalOn(!modalOn);
  }

  return (
    <div className="uploadWrapper">
      <div className="projectUploadPageContainer">
        <ProjectUploadInfo
          project_name={project_name}
          setProject_name={setProject_name}
          postHandler={postHandler}
          project_thumbnail={project_thumbnail}
          setProject_thumbnail={setProject_thumbnail}
          project_info={project_info}
          setProject_info={setProject_info}
          project_stackHandler={project_stackHandler}
          stackArray={stackArray}
          curFiles={curFiles}
          setCurFiles={setCurFiles}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            className="previewBtn"
            onClick={() =>
              project_name && project_stack && project_thumbnail && curFiles
                ? previewHandler()
                : scrollTo(0)
            }
          >
            프로젝트 미리보기
          </div>
          <Modal
            modalOn={modalOn}
            setModalOn={setModalOn}
            descriptions={descriptions}
            curFiles={curFiles}
            postHandler={postHandler}
            project_info={project_info}
            project_name={project_name}
          />
        </div>
      </div>
    </div>
  );
}

export default UploadWrapper;
