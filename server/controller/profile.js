const { User, ProjectByUser, Project } = require('../models/index')

module.exports = {

    getProfileData: async (req, res) => {
        const id = req.params.id;

        const user = await User.findOne({ 
            where: {
                id
            }
        });
        
        if (!user) {
            return res.status(404).send({ message: 'Not Found' });
        }
        
        const projectsId = await ProjectByUser.findAll({
            where: {
                user_id: id,
            },
            attributes: ['project_id'],
        }).then(data => data.map(project => project.project_id));
        
        const projects = await Project.findAll({
            where: {
                id: projectsId
            },
            attributes: ['id','project_thumbnail', 'project_name']
        });
        
        delete user.dataValues.id;
        delete user.dataValues.user_password;
        res.status(200).json({
            "data": {
                projects,
                ...(user.dataValues)
            },
            "message": "Ok"
        });
    }

};