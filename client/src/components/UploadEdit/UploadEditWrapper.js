import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import ProjectUploadInfo from './ProjectUploadInfo';
import { scrollTo } from '../../utils/etc';
import '../Upload/UploadWrapper.css';
import { useHistory } from 'react-router-dom';

const END_POINT = process.env.REACT_APP_API_URL;

function UploadEditWrapper({ hasUserId, projectId }) {
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
  const [project_name, setProject_name] = useState('');
  const [project_stack, setProject_stack] = useState([]);
  const [project_thumbnail, setProject_thumbnail] = useState('');
  const [curFiles, setCurFiles] = useState([]);
  const [descriptions, setDescription] = useState('');
  const [modalOn, setModalOn] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editSucc, setEditSucc] = useState(false);
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

    const getProjectData = () => {
      axios
        .get(`${END_POINT}/project/${projectId}`, {
          withCredentials: true,
        })
        .then((res) => {
          const isChecked = stackArray.map((el) => {
            if (res.data.projectdata.project_stack.includes(el.toLowerCase())) {
              return true;
            } else {
              return false;
            }
          });
          setCurFiles([]);
          setProject_thumbnail('');
          setFirstStack(isChecked);
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
        });
    };
    getProjectData();
  }, [hasUserId]);

  useEffect(() => {
    const descElemArray = document.querySelectorAll('.descriptionInput');
    setDescription(descElemArray);
  }, [curFiles, project_info, project_stack]);

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

  function patchHandler() {
    setModalOpen(true);
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
      .patch(`${END_POINT}/project/${projectId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      .then((res) => {
        setEditSucc(true);
      })
      .catch((err) => {
        setEditSucc(false);
      });
  }

  const closeModal = () => {
    setModalOpen(false);
    if (editSucc === true) {
      history.go(-1);
    }
  };

  function previewHandler() {
    setModalOn(!modalOn);
  }

  return (
    <div className="uploadWrapper">
      <div className="projectUploadPageContainer">
        <ProjectUploadInfo
          project_name={project_name}
          setProject_name={setProject_name}
          patchHandler={patchHandler}
          project_thumbnail={project_thumbnail}
          setProject_thumbnail={setProject_thumbnail}
          project_info={project_info}
          setProject_info={setProject_info}
          project_stackHandler={project_stackHandler}
          stackArray={stackArray}
          curFiles={curFiles}
          setCurFiles={setCurFiles}
          firstStack={firstStack}
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
            patchHandler={patchHandler}
            project_info={project_info}
            project_name={project_name}
            editSucc={editSucc}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          />
        </div>
      </div>
    </div>
  );
}

export default UploadEditWrapper;