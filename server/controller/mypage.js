const { User } = require('../models/index')

module.exports = {

    getUserData: async (req, res) => {
        //TODO: req.params.id 에 맞는 user 정보를 조회하여 반환한다. 
        //TODO: status 200
        // { 
        //     "data" : 
        //     {
        //         "user_email": example@gmail.com,
        //         "user_password": , 
        //         "user_name": ,
        //         "user_introduction": ,
        //         "user_github":
        //         "user_photo": 
        //     },
        //     "message" : "ok"
        // }
        //TODO: status 404
        // { "message": "Not Found" }
        res.json({'my' : 'page'})
    },

    fixUserData: async (req, res) => {
        // TODO: req.params.id 에 맞는 user 의 정보를 수정한다.
        // 중요: image path 수정하고, update 해야 함 
        // TODO: status 200
        // {
        //     "message": "ok"
        // }
        //TODO: status 404
        // { "message": "Not Found" }
        res.send('ok')
    }
    
};
