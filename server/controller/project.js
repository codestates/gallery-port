const { ProjectByUser, Project, Content, StackForProject } = require('../models/index')
const fs = require('fs');
require('dotenv').config();

module.exports = {

    getProjectData: async (req, res) => {
        // TODO: req.params.projectid 에 맞는 project 정보를 조회한다.  
        // TODO: status 200
        // { 
        //     "data" : 
        //     {
        //         "project_name" : "project_name",
        //         "project_content": [
        //             ...
        //             {
        //                 "text": "text"
        //                 "image": path,
        //             }
        //         ],
        //         "project_start": "project_start",
        //         "project_end": "project_end",
        //         "project_introduction": "project_introduction",
        //         "project_thumbnail": path,
        //         "project_feature": "project_feature",
        //         "project_url": "project_url",
        //         "project_github": "project_github",
        //         "project_front_stack": "project_front_stack",
        //         "project_back_stack": "project_back_stack",
        //         "project_deploy_stack": "project_deploy_stack",
        //         "project_team": "project_team",
        //         "id": id
        //     },
        //     "message" : "ok"
        // }
        // TODO: status 404
        // {
        //     "message": "Not Found"
        // }
        res.json({'project' : 'page'})
    },

    createProjectData: async (req, res) => {

        // Project 테이블에 받아온 data 저장 후 id 확보 
        const { project_name, project_content } = req.body
        const project_info = JSON.parse(req.body.project_info);
        let data;
        try {
            data = await Project.create({project_name, project_content, ...project_info, project_thumbnail: 'temp'})
        } catch (err) {
            return res.status(404).json({"message": "Not Found"})
        }
        // thumbnail 사진 path 변경 후 테이블에 저장
        let newFile = req.files.thumbnail[0].filename.split('_')
        newFile.splice(1,1, data.id)
        newFile = newFile.join('_')
        // https://localhost:80/image/project/project_1_thumbnail_8asdf7.png
        data.project_thumbnail = process.env.IMAGE_ENDPOINT + '/image/project/' + newFile
        await data.save();

        // 서버 로컬 디렉토리에 저장된 폴더 이름 변경 
        const oldPath = __dirname + `/../${req.files.thumbnail[0].destination}`;
        const newPath = __dirname + `/../uploads/project/${data.id}`
        fs.renameSync(oldPath, newPath);

        // 서버 로컬 디렉토리에 저장된 파일 이름 변경
        fs.renameSync(oldPath + '/' + req.files.thumbnail[0], newPath + '/' + newFile);

        // ProjectByUser 에 저장
        // Content 에 image, content 저장
        // StackForProject 에 저장

        return res.status(201).json({"message":"ok"})
    },

    fixProjectData: async (req, res) => {
        // TODO: req.params.projectid 에 맞는 Project 의 정보를 수정한다.
        // 중요: 이미지 path 도 수정해야 함 
        // TODO: status 200
        // { 
        //     "message" : "ok"
        // } 
        // TODO: status 404 
        // {
        //     "message": "Not Found"
        // }
        res.json({'project' : 'page'})
    },

    deleteProjectData: async (req, res) => {
        // TODO: req.params.projectid 에 맞는 project 데이터를 전부 삭제한다. 
        // 중요: 저장된 이미지도 삭제해야함 
        // TODO: status 200
        // { 
        //     "message" : "ok"
        // } 
        // TODO: status 404 
        // {
        //     "message": "Not Found"
        // }
        res.json({'project' : 'page'})
    }
    
};

// https://localhost:80/image/project/project_1_thumbnail_profile.jpeg