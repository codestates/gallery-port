const { User, Project, StackForProject } = require('../models/index')

module.exports = {

    getAllProjects: async (req, res) => {

        // TODO: req.query.stack 가 있으면 stack 별 project 를 조회한다.
        // TODO: query 가 없다면 전체 project 중 최신순으로 18개를 조회한다. 

        // TODO: status 200 
        // { "data" : 
        // 		[
        // 		...
        // 		    {
        // 						"id" : id, 
        // 		        "project_thumbnail": path,
        // 		        "project_name": "example"
        // 		    }
        // 		],
        // 	"message" : "ok"
        // } 

        // TODO: status 404
        // {
        //     "message": "Not Found"
        // }
        
        res.json({'landing' : 'page'})
    },

};