import React from 'react';
import TextInputGender from './TextInputGender';
import CheckboxInputGender from './CheckboxInputGender';
import ImageUploaderOne from './ImageUploaderOne';
import ImageUploaderMany from './ImageUploaderMany';
import TextInputGenderRequired from './TextInputGenderRequired';

function ProjectUploadInfo({
  project_info,
  project_name,
  project_thumbnail,
  setProject_info,
  setProject_name,
  setProject_thumbnail,
  project_stackHandler,
  stackArray,
  curFiles,
  setCurFiles,
}) {
  const textInputData = [
    ['프로젝트 팀', 'project_team', '팀원', 72, 40, 'text'],
    [
      '프로젝트 소개',
      'project_introduction',
      '50자 이내로 입력해주세요.',
      112,
      80,
      'text',
    ],
    [
      '프로젝트 기능',
      'project_feature',
      '50자 이내로 입력해주세요.',
      112,
      80,
      'text',
    ],
    ['프로젝트 사이트', 'project_url', 'url', 72, 40, 'url'],
    ['프로젝트 깃허브', 'project_github', 'url', 72, 40, 'url'],
    [
      '프론트엔드 스택',
      'project_front_stack',
      '50자 이내로 입력해주세요.',
      112,
      80,
      'text',
    ],
    [
      '백엔드 스택',
      'project_back_stack',
      '50자 이내로 입력해주세요.',
      112,
      80,
      'text',
    ],
    [
      '배포 스택',
      'project_deploy_stack',
      '50자 이내로 입력해주세요.',
      112,
      80,
      'text',
    ],
  ];

  function onChangeHandler(e, property) {
    const copied = Object.assign({}, project_info);
    copied[property] = e.target.value; //copied.property로는 변수일경우 할당을 못함....ㅠㅠㅠㅠ
    setProject_info(copied);
  }

  return (
    <>
      <TextInputGenderRequired
        inputname={'프로젝트명'}
        detailString={'project_name'}
        stateName={project_name}
        stateFunc={setProject_name}
        placeholder={'20자 이내로 입력해주세요.'}
        type={'text'}
      />
      <ImageUploaderOne
        project_info_detail={'프로필 썸네일'}
        required={'(필수)'}
        stateName={project_thumbnail}
        stateFunc={setProject_thumbnail}
        condition_subject={'등록조건'}
        condition_desc={'170x280(px), 25KB 이하, jpg, jpeg, png만 가능'}
      />
      <ImageUploaderMany
        project_info_detail={'프로젝트 사진'}
        required={'(필수)'}
        stateName={curFiles}
        stateFunc={setCurFiles}
        condition_subject={'등록조건'}
        condition_desc1={'다중 등록 가능하고, 등록 후 설명을 쓸 수 있어요.'}
        condition_desc2={
          '1120x450(px),  150KB 이하, jpg, jpeg, png, gif만 가능'
        }
      />
      <div className="project_stack" style={{ display: 'flex' }}>
        <div className="subject_wrapper">
          프로젝트 주요스택<span className="required">(필수)</span>
        </div>
        <div
          className="checkboxInputContainer"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            marginBottom: '24px',
          }}
        >
          {stackArray.map((el, idx) => {
            return (
              <CheckboxInputGender
                stackName={el}
                idx={idx}
                key={`CheckboxInput${idx}`}
                project_stackHandler={project_stackHandler}
              />
            );
          })}
        </div>
      </div>
      <div className="project_term">
        프로젝트 기간
        <div className="date_input_wrapper">
          <input
            type="date"
            value={project_info.project_start}
            onChange={e => onChangeHandler(e, 'project_start')}
            className="date_input"
            style={{ marginRight: '6px' }}
          />
          ~
          <input
            type="date"
            value={project_info.project_end}
            onChange={e => onChangeHandler(e, 'project_end')}
            className="date_input"
            style={{ marginLeft: '6px' }}
          />
        </div>
      </div>
      <div className="textInputContainer">
        {textInputData.map((el, idx) => {
          return (
            <TextInputGender
              key={`TextInput${idx}`}
              inputname={el[0]}
              detailString={el[1]}
              placeholder={el[2]}
              height1={el[3]}
              height2={el[4]}
              project_info={project_info}
              onChangeHandler={onChangeHandler}
              type={el[5]}
            />
          );
        })}
      </div>
    </>
  );
}

export default ProjectUploadInfo;
