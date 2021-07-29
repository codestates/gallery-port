const { User, Project, Stack ,StackForProject } = require('../models/index')

module.exports = {

    getAllProjects: async (req, res) => {
        const stack = req.query.stack;

        // 특정 스택 조회
        if (stack) {
            // stack id 조회
            const stackId = await Stack.findOne({
                where: {
                    stack_name: stack
                }
            }).then(stack => {
                return stack.id;
            }).catch(err => {
                return res.status(404).send({ "message": "Invalid stack" });
            });

            // 스택에 해당하는 프로젝트 id
            const projectsId = await StackForProject.findAll({
                where: {
                    stack_id: stackId
                },
                attributes: ['project_id']
            }).then(data => {
                if (data) {
                    return data.map(project => (project.project_id));
                } else {
                    return [];
                }
            });

            // 해당 프로젝트 id 조회
            const projects = await Project.findAll({
                limit: 18,
                where: {
                    id: projectsId
                },
                attributes: ['id','project_thumbnail', 'project_name'],
                order: [['id', 'DESC']]
            });
            
            res.status(200).json({ "data": { projects }, "message": `Projects for ${stack} successfully found` });
        } else {
            const projects = await Project.findAll({
                limit: 18,
                attributes: ['id','project_thumbnail', 'project_name'],
                order: [['id', 'DESC']]
            });

            res.status(200).json({ "data": { projects }, "message": "Projects successfully found" });
        }
    },
    
};