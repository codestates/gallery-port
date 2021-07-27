import React, { useRef } from 'react';
import {
  deleteHandler,
  inputFilesHandler,
  addFilesHandler,
} from '../../utils/fileHandler';
import { inputBtnClick } from '../../utils/etc';
import camera from '../../images/camera.svg';

function ImageUploaderMany({
  project_info_detail,
  required,
  stateName,
  stateFunc,
  condition_subject,
  condition_desc1,
  condition_desc2,
  firstDesc, //이부분에 수정하였음
}) {
  const inputManyRef = useRef(null);
  return (
    <div className="ImageUploaderManyCon">
      <input
        ref={inputManyRef}
        type="file"
        style={{ display: 'none' }}
        onChange={e => {
          stateName.length === 0
            ? inputFilesHandler(inputManyRef, stateFunc)
            : addFilesHandler(inputManyRef, stateName, stateFunc);
        }}
        multiple
      />
      <div className="subject_wrapper">
        {project_info_detail}
        {required === '' ? null : <span className="required">{required}</span>}
      </div>

      <div className="input_file_wrapper">
        <div
          className="img_preview"
          onClick={e => inputBtnClick(e, inputManyRef)}
        >
          <img src={camera} alt="camera" />
        </div>
        <div className="img_conditionMany">
          <p className="condition_desc1">{condition_desc1}</p>
          <div>
            <div className="condition_subject">{condition_subject}</div>
            <p className="condition_desc2">{condition_desc2}</p>
          </div>
        </div>
      </div>
      <div>
        {stateName.length === 0
          ? null
          : stateName.map((el, idx) => {
              return (
                <div
                  key={`project_img_preview_desc${idx}`}
                  style={{ display: 'flex', marginBottom: '8px' }}
                >
                  <div
                    id={idx}
                    className="img_preview"
                    style={{
                      backgroundImage: `url('${el}')`,
                      backgroundSize: 'cover',
                      position: 'relative',
                    }}
                  >
                    <div
                      onClick={e => deleteHandler(e, stateName, stateFunc)}
                      style={{
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0, 0, 0, 0.2)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <svg
                        width="29"
                        height="29"
                        viewBox="0 0 29 29"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M27.9853 3.48534C28.7827 2.68802 28.7827 1.39531 27.9853 0.597991C27.188 -0.19933 25.8953 -0.19933 25.098 0.597991L14.2917 11.4043L3.48534 0.597991C2.68802 -0.19933 1.39531 -0.19933 0.597991 0.597991C-0.19933 1.39531 -0.19933 2.68802 0.597991 3.48534L11.4043 14.2917L0.597991 25.098C-0.19933 25.8953 -0.19933 27.188 0.597991 27.9853C1.39531 28.7827 2.68802 28.7827 3.48534 27.9853L14.2917 17.179L25.098 27.9853C25.8953 28.7827 27.188 28.7827 27.9853 27.9853C28.7827 27.188 28.7827 25.8953 27.9853 25.098L17.179 14.2917L27.9853 3.48534Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                  <input
                    className="descriptionInput"
                    defaultValue={firstDesc[idx]} //이부분에 수정하였음 e.target.value로 defaultValue로 지정한 값을 불러올 수 있다.
                    type="text"
                    placeholder="50자 이내로 입력해주세요."
                  />
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default ImageUploaderMany;
