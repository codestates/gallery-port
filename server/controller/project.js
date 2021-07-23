const { User, ProjectByUser, Project, Content } = require('../models/index')

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

    addProjectData: async (req, res) => {
        // TODO: 새로운 Project 를 생성한다.
        // 중요: image path 수정하고, update 해야 함
        // TODO: status 201
        // {
        //     "message": "ok",
        //         "id": id
        // }
        // TODO: status 404 
        // {
        //     "message": "Not Found"
        // }
        res.json({'project' : 'page'})
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