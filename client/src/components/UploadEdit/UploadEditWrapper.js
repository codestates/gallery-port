import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import ProjectUploadInfo from './ProjectUploadInfo';
import { scrollTo } from '../../utils/etc';
import '../Upload/UploadWrapper.css';
import { useHistory } from 'react-router-dom';

const END_POINT = 'https://localhost:80';
// const END_POINT = process.env.REACT_APP_API_URL;

function UploadEditWrapper({ hasUserId }) {
  const [isSecond, setIsSecond] = useState(false);
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
  const [firstStack, setFirstStack] = useState([]);
  const [firstDesc, setFirstDesc] = useState([]);
  const [project_name, setProject_name] = useState(''); //필수
  const [project_stack, setProject_stack] = useState([]); //필수
  const [project_thumbnail, setProject_thumbnail] = useState(''); //필수
  const [curFiles, setCurFiles] = useState(''); //필수
  const [descriptions, setDescription] = useState(); //필수
  const [modalOn, setModalOn] = useState(false);

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
    const getProjectData = () => {
      axios
        .get(`${END_POINT}/project/${hasUserId}`, {
          // projectid app.js에서 가져오기
          withCredentials: true,
        })
        .then(res => {
          const urlArr = [];
          const descArr = [];

          res.data.data.projectdata.project_content.forEach(el => {
            urlArr.push(el.image);
            descArr.push(el.text);
          });
          const isChecked = stackArray.map(el => {
            if (
              res.data.data.projectdata.project_stack.includes(el.toLowerCase())
            ) {
              return true;
            } else {
              return false;
            }
          });
          setFirstStack(isChecked);
          setFirstDesc(descArr);
          setCurFiles(urlArr);
          setProject_name(res.data.data.projectdata.project_name);
          setProject_thumbnail(res.data.data.projectdata.project_thumbnail);
          setProject_info({
            project_start: res.data.data.projectdata.project_start,
            project_end: res.data.data.projectdata.project_end,
            project_team: res.data.data.projectdata.project_team,
            project_introduction:
              res.data.data.projectdata.project_introduction,
            project_feature: res.data.data.projectdata.project_feature,
            project_github: res.data.data.projectdata.project_github,
            project_front_stack: res.data.data.projectdata.project_front_stack,
            project_back_stack: res.data.data.projectdata.project_back_stack,
            project_deploy_stack:
              res.data.data.projectdata.project_deploy_stack,
            project_url: res.data.data.projectdata.project_url,
          });
        })
        .catch(err => {
          alert('실패');
        });
    };
    getProjectData();
  }, []);

  useEffect(() => {
    const descElemArray = document.querySelectorAll('.descriptionInput');
    setDescription(descElemArray);
  }, [curFiles]);

  function project_stackHandler(checked, itemName) {
    if (checked && !project_stack.includes(stackArray[itemName])) {
      setProject_stack([
        ...project_stack,
        stackArray[itemName].toLocaleLowerCase(),
      ]);
    } else {
      setProject_stack(
        project_stack.filter(el => {
          return el !== stackArray[itemName].toLocaleLowerCase();
        })
      );
    }
  }

  let history = useHistory();

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
    for (let el of formData.entries()) {
      console.log(el);
    }
    return axios //preview화면에서 업로드 버튼을 누르면 post요청이 일어나고 로딩화면으로 전환, profile화면으로 redirection 그리고 get으로 post해놓은 data를 불러온다 200ok 떨어지면 로딩화면 off
      .post(`${END_POINT}/project`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      .then(res => {
        alert('성공');
        history.go(-1);
      })
      .catch(err => {
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
          firstDesc={firstDesc}
          firstStack={firstStack}
          isSecond={isSecond}
          setIsSecond={setIsSecond}
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
          />
        </div>
      </div>
    </div>
  );
}

export default UploadEditWrapper;
