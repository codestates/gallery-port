const { User, ProjectByUser, Project } = require('../models/index')

module.exports = {

    createNewUser : async (req, res) => {

        // TODO: 새로운 유저를 만든다.
        // 중요: 이미지 path 수정하고 table 에도 반영한다. 
        // TODO: status 201
        // {
        //     "message": "ok"
        // }
        // TODO: status 404 
        // {
        //     "message": "Not Found"
        // }
        console.log(req.body)
        res.send(req.file)
    }
    
};