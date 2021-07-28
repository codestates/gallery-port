import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import ProjectUploadInfo from './ProjectUploadInfo';
import { scrollTo } from '../../utils/etc';
// import { convertURLtoFile } from '../../utils/fileHandler';
import '../Upload/UploadWrapper.css';
import { useHistory } from 'react-router-dom';
import { first } from 'lodash';

// const END_POINT = 'https://gallery-port-server.com';
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
  // const [firstDesc, setFirstDesc] = useState([]);
  const [project_name, setProject_name] = useState('');
  const [project_stack, setProject_stack] = useState([]);
  const [project_thumbnail, setProject_thumbnail] = useState('');
  const [curFiles, setCurFiles] = useState([]);
  const [descriptions, setDescription] = useState('');
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

    const getProjectData = () => {
      axios
        .get(`${END_POINT}/project/${projectId}`, {
          withCredentials: true,
        })
        .then((res) => {
          // console.log(res);
          // const urlArr = [];
          // const descArr = [];

          // res.data.projectdata.project_content.forEach(el => {
          //   urlArr.push(el.image);
          //   descArr.push(el.text);
          // });

          // const fileArr = [];

          // for (let el of urlArr) {
          //   const toFile = async el => {
          //     const response = await axios.get(el);
          //     const data = await response.blob();
          //     const jpg = el.split('.').pop();
          //     const filename = el.split('/').pop();
          //     const metadata = { type: `image/${jpg}` };
          //     return new File([data], filename, metadata);
          //   };
          //   const data = toFile(el);
          //   fileArr.push(data);
          // }

          const isChecked = stackArray.map((el) => {
            if (res.data.projectdata.project_stack.includes(el.toLowerCase())) {
              return true;
            } else {
              return false;
            }
          });
          setCurFiles([]);
          setProject_thumbnail('');
          // convertURLtoFile(res.data.projectdata.project_thumbnail)
          setFirstStack(isChecked);
          // setFirstDesc(descArr);
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
        })
        .then((_) => history.go(-1));
      // .catch((err) => {
      //   alert('실패');
      // });
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
          patchHandler={patchHandler}
          project_thumbnail={project_thumbnail}
          setProject_thumbnail={setProject_thumbnail}
          project_info={project_info}
          setProject_info={setProject_info}
          project_stackHandler={project_stackHandler}
          stackArray={stackArray}
          curFiles={curFiles}
          setCurFiles={setCurFiles}
          // firstDesc={firstDesc}
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
          />
        </div>
      </div>
    </div>
  );
}

export default UploadEditWrapper;
