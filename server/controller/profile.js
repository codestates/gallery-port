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
            return res.status(404).send({ message: "Invalid user" });
        }
        
        const projectsId = await ProjectByUser.findAll({
            where: {
                user_id: id,
            },
            attributes: ['project_id'],
        }).then(data => {
            if (data) {
                return data.map(project => (project.project_id));
            } else {
                return [];
            }
        });
        
        const projects = await Project.findAll({
            where: {
                id: projectsId
            },
            attributes: ['id', 'project_thumbnail', 'project_name']
        }).catch(err => {
            res.stats(500).send(err);
        });
        
        delete user.dataValues.id;
        delete user.dataValues.user_password;
        res.status(200).json({
            "data": {
                projects,
                ...(user.dataValues)
            },
            "message": "Data successfully found"
        });
    }

};