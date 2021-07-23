const { User, ProjectByUser, Project } = require('../models/index')

module.exports = {

    getProfileData: async (req, res) => {
        //TODO: req.params.id 에 맞는 user 의 개인정보와 프로젝트 정보를 불러온다. 
        //TODO: status 200
        // { "data" : 
        //     { 
        //     "projects: [
        //         {
        //             "project_thumbnail": path,
        //             "project_name": "example"
        //         }
        //     ], 
        //     "user_name" : "user_name",
        //     "user_photo" : path,
        //     "user_email" : "user_email",
        //     "user_github" : "user_github",
        //     "user_introduction" : "user_introduction"
        //     }
        //     "message" : "ok"
        // } 
        //TODO: status 404
        // {
        //     "message": "Not Found"
        // }
        res.json({'profile' : 'page'})
    }
    
};